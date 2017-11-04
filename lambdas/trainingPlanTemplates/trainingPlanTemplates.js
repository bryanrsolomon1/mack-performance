var AWS = require("aws-sdk");
var q = require("q");
var uuid = require("uuid/v4");
var _ = require("lodash");

module.exports.get = function(event) {

    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
        
    if (user.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {

        var docClient = new AWS.DynamoDB.DocumentClient();
        
        var params = {
            TableName : "TrainingPlanTemplates",
            KeyConditionExpression: "createdByTrainerId = :id",
            ExpressionAttributeValues: {
                ":id": user.userId
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                deferred.reject(err);
            } else {
                /* get workouts in templates */
                var downloadPromises = data.Items.map(function(template) {
                    return downloadWorkoutsForTemplate(template);
                });
                
                q.all(downloadPromises).done(function(templates) {
                    deferred.resolve(buildSuccessResponse(templates)); 
                });
            }
        });
    }
        
    return deferred.promise;
    
    function downloadWorkoutsForTemplate(template) {
                
        var deferred = q.defer();
        
        var workoutIds = Object.keys(template.calendar);
        
        if (workoutIds.length === 0) {
            deferred.resolve(template);
        } else {
            template.workouts = [];
            var docClient = new AWS.DynamoDB.DocumentClient();

            var counter = 0;
            var responses = [];
            var downloadExercisePromises = [];
            
            workoutIds.forEach(function(workoutId) {

                var params = {
                    TableName : "Workouts",
                    IndexName: "objectId",
                    KeyConditionExpression: "objectId = :id",
                    ExpressionAttributeValues: {
                        ":id": workoutId
                    }
                };

                docClient.query(params, function(err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                        deferred.reject(err);
                    } else {
                        if (data.Items.length > 0) {
                            template.workouts.push(data.Items[0]);
                            downloadExercisePromises.push(downloadExercisesForWorkout(data.Items[0]));
                        }
                        counter++;
                        if (counter === workoutIds.length) {
                            q.all(downloadExercisePromises).done(function() {
                                deferred.resolve(template); 
                            });
                        }
                    }
                });

            });
        }
        return deferred.promise;
    }
    
    function downloadExercisesForWorkout(workout) {

        var deferred = q.defer();

        var exerciseIds = _.flatMap(workout.parts, function(part) {
            return part.segments.map(function(segment) {
                return segment.objectId;
            });
        });

        exerciseIds = _.uniq(exerciseIds);

        if (exerciseIds.length === 0) {
            deferred.resolve(workout);
        } else {
            var docClient = new AWS.DynamoDB.DocumentClient();

            var counter = 0;

            exerciseIds.forEach(function(workoutId) {

                var params = {
                    TableName : "Exercises",
                    IndexName: "objectId",
                    KeyConditionExpression: "objectId = :id",
                    ExpressionAttributeValues: {
                        ":id": workoutId
                    }
                };

                docClient.query(params, function(err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                        deferred.reject(err);
                    } else {
                        if (data.Items.length > 0) {
                            var exercises = data.Items;
                            workout.parts.forEach(function(part) {
                                part.segments.forEach(function(segment) {
                                    var exercise = _.find(exercises, function(exercise) {
                                       return exercise.objectId === segment.objectId; 
                                    });
                                    _.assign(segment, exercise);
                                });
                            });
                        }
                        counter++;
                        if (counter === exerciseIds.length) {
                            deferred.resolve(workout);
                        }
                    }
                });

            });
        }
        return deferred.promise;
    }
}

module.exports.post = function(event) {
    
    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    
    var trainerId;
    
    if (user.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {
        trainerId = user.userId;
    
        var trainingPlanTemplate;

        try {
            trainingPlanTemplate = JSON.parse(event.body);
        } catch (err) {
            deferred.resolve(buildClientSideErrorResponse("The training plan was not properly formatted"));
        }

        if (!trainingPlanTemplate) {
            deferred.resolve(buildClientSideErrorResponse("The training plan did not contain any data"));
        } else {
            trainingPlanTemplate = cleanInput(trainingPlanTemplate);
            
            trainingPlanTemplate.createdByTrainerId = trainerId;
            trainingPlanTemplate.createDate = new Date().toISOString();
            trainingPlanTemplate.calendar = {};
            
            var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                TableName: "TrainingPlanTemplates",
                Item: trainingPlanTemplate
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    deferred.resolve(buildSuccessResponse());
                }
            });
        }
    }
    
    return deferred.promise;
};

module.exports.update = function(event) {
    
    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    var trainingPlanTemplate;
    
    try {
        trainingPlanTemplate = JSON.parse(event.body);
    } catch (err) {
        deferred.resolve(buildClientSideErrorResponse("The training plan was not properly formatted"));
    }
    
    if (user.userRole !== "TRAINER" || user.userId !== trainingPlanTemplate.createdByTrainerId) {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {
        if (!trainingPlanTemplate) {
            deferred.resolve(buildClientSideErrorResponse("The training plan did not contain any data"));
        } else {
            trainingPlanTemplate = cleanInput(trainingPlanTemplate);
            
            var docClient = new AWS.DynamoDB.DocumentClient();
            
            var params = {
                TableName: "TrainingPlanTemplates",
                Item: trainingPlanTemplate
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    deferred.resolve(buildSuccessResponse(data));
                }
            });
        }
    }
    
    return deferred.promise;
};

function cleanInput(trainingPlanTemplate) {
    var attributes = ["createdByTrainerId", "createDate", "name", "summary", "calendar"];
    for (attr in trainingPlanTemplate) {
        if (attributes.indexOf(attr) === -1) {
            delete trainingPlanTemplate[attr];
        }
    }

    /* dynamo can't handle empty strings */
    if (trainingPlanTemplate.summary && trainingPlanTemplate.summary === "") {
        delete trainingPlanTemplate.summary;
    }

    return trainingPlanTemplate;
}

function buildSuccessResponse(items) {
    return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(items)
    };
}

function buildClientSideErrorResponse(errorMessage, statusCode) {
    statusCode = statusCode | 400;
    return {
        statusCode: statusCode,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: errorMessage
    }
}