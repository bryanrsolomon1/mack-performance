var AWS = require("aws-sdk");
var q = require("q");
var uuid = require("uuid/v4");
var _ = require("lodash");

module.exports.batchGetByObjectIds = function(event) {

    var deferred = q.defer();

    if (!event.queryStringParameters || !event.queryStringParameters.batchObjectIds) {
        deferred.resolve(buildClientSideErrorResponse("No training plan ids provided"));
    } else {
        var objectIds = event.queryStringParameters.batchObjectIds.split(",");

        if (objectIds.length === 0) {
            deferred.resolve(buildSuccessResponse([]));
        } else {
            
            var docClient = new AWS.DynamoDB.DocumentClient();
            
            var params = {
                RequestItems: {
                    TrainingPlans: {
                        Keys: [],
                        AttributesToGet: "objectId,createDate,name,startDate,endDate,summary,calendar".split(",")
                    }
                }
            };

            objectIds.forEach(function(objectId) {
                params.RequestItems.TrainingPlans.Keys.push({
                    objectId: objectId
                });
            });

            docClient.batchGet(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    /* get workouts in plans */
                    var downloadPromises = data.Responses.TrainingPlans.map(function(trainingPlan) {
                        return downloadWorkoutsForTrainingPlan(trainingPlan);
                    });

                    q.all(downloadPromises).done(function(trainingPlans) {
                        deferred.resolve(buildSuccessResponse(trainingPlans)); 
                    });
                }
            });
        }
    }

    return deferred.promise;
    
    function downloadWorkoutsForTrainingPlan(trainingPlan) {
                
        var deferred = q.defer();
        
        var workoutIds = Object.keys(trainingPlan.calendar);
        
        if (workoutIds.length === 0) {
            deferred.resolve(trainingPlan);
        } else {
            trainingPlan.workouts = [];
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
                            trainingPlan.workouts.push(data.Items[0]);
                            downloadExercisePromises.push(downloadExercisesForWorkout(data.Items[0]));
                        }
                        counter++;
                        if (counter === workoutIds.length) {
                            q.all(downloadExercisePromises).done(function() {
                                deferred.resolve(trainingPlan); 
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
                            console.log("Resolving workout:\n", JSON.stringify(workout));
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
    
        var trainingPlan;

        try {
            trainingPlan = JSON.parse(event.body);
        } catch (err) {
            deferred.resolve(buildClientSideErrorResponse("The training plan was not properly formatted"));
        }

        if (!trainingPlan) {
            deferred.resolve(buildClientSideErrorResponse("The training plan did not contain any data"));
        } else {
            trainingPlan = cleanInput(trainingPlan);
            
            trainingPlan.objectId = uuid();
            trainingPlan.createDate = new Date().toISOString();
            if (!trainingPlan.calendar) {
                trainingPlan.calendar = {};
            }
            
            var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                TableName: "TrainingPlans",
                Item: trainingPlan
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    deferred.resolve(buildSuccessResponse(trainingPlan));
                }
            });
        }
    }
    
    return deferred.promise;
};

module.exports.update = function(event) {
    
    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    var trainingPlan;
    
    try {
        trainingPlan = JSON.parse(event.body);
    } catch (err) {
        deferred.resolve(buildClientSideErrorResponse("The training plan was not properly formatted"));
    }
        
    if (user.userRole !== "TRAINER") {
        deferred.resolve(buildClientSideErrorResponse("Forbidden", 403));
    } else {
        if (!trainingPlan) {
            deferred.resolve(buildClientSideErrorResponse("The training plan did not contain any data"));
        } else {
            trainingPlan = cleanInput(trainingPlan);
                        
            var docClient = new AWS.DynamoDB.DocumentClient();
            
            var params = {
                TableName: "TrainingPlans",
                Item: trainingPlan
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    deferred.resolve(buildSuccessResponse(trainingPlan));
                }
            });
        }
    }
    
    return deferred.promise;
};

function cleanInput(trainingPlan) {
    var attributes = ["createDate", "name", "startDate", "endDate", "objectId", "summary", "calendar"];
    for (attr in trainingPlan) {
        if (attributes.indexOf(attr) === -1) {
            delete trainingPlan[attr];
        }
    }
    return trainingPlan;
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