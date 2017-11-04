"use strict";

var AWS = require("aws-sdk");
var q = require("q");
var uuid = require("uuid/v4");
var _ = require("lodash");

module.exports.get = (event) => {

    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    
    var trainerId;
    
    if (user.userRole === "TRAINER") {
        trainerId = user.userId;
    } else if (user.userRole === "CLIENT") {
        trainerId = user.createdByTrainerId;
    }
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName : "Workouts",
        KeyConditionExpression: "createdByTrainerId = :id",
        ExpressionAttributeValues: {
            ":id": trainerId
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            deferred.reject(err);
        } else {
            /* get exercises in workouts */
            var downloadPromises = data.Items.map(function(workout) {
                return downloadExercisesForWorkout(workout);
            });
            
            q.all(downloadPromises).done(function(workouts) {
                deferred.resolve(buildSuccessResponse(workouts)); 
            });
        }
    });
    
    return deferred.promise;
}

module.exports.batchGetByObjectIds = function(event) {

    var deferred = q.defer();

    var objectIds = event.queryStringParameters.batchObjectIds.split(",");

    if (objectIds.length === 0) {
        deferred.resolve(buildSuccessResponse([]));
    } else {
        var docClient = new AWS.DynamoDB.DocumentClient();

        var counter = 0;
        var responses = [];
        var downloadExercisePromises = [];

        objectIds.forEach(function(objectId) {

            var params = {
                TableName : "Workouts",
                IndexName: "objectId",
                KeyConditionExpression: "objectId = :id",
                ExpressionAttributeValues: {
                    ":id": objectId
                }
            };

            docClient.query(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    if (data.Items.length > 0) {
                        downloadExercisePromises.push(downloadExercisesForWorkout(data.Items[0]));
                    }
                    counter++;
                    if (counter === objectIds.length) {
                        q.all(downloadExercisePromises).done(function(workouts) {
                            deferred.resolve(buildSuccessResponse(workouts)); 
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

module.exports.post = function(event) {
    
    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    
    var trainerId;
    
    if (user.userRole !== "TRAINER") {
        deferred.resolve(buildClientSideErrorResponse("Forbidden", 403));
    } else {
        trainerId = user.userId;
    
        var workout;

        try {
            workout = JSON.parse(event.body);
        } catch (err) {
            deferred.resolve(buildClientSideErrorResponse("The workout was not properly formatted"));
        }

        if (!workout) {
            deferred.resolve(buildClientSideErrorResponse("The workout did not contain any data"));
        } else {
            workout = cleanInput(workout);
            
            workout.createdByTrainerId = trainerId;
            workout.objectId = uuid();
            workout.createDate = new Date().toISOString();
            
            var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                TableName: "Workouts",
                Item: workout
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

function cleanInput(workout) {
    var workoutAttributes = ["createdByTrainerId", "createDate", "name", "description", "objectId", "parts"];
    for (var attr in workout) {
        if (workoutAttributes.indexOf(attr) === -1) {
            delete workout[attr];
        }
    }
    
    var segmentAttributes = ["objectId", "target"];
    workout.parts.forEach(function(part) {
        part.segments.forEach(function(segment) {
            for (var attr in segment) {
                if (segmentAttributes.indexOf(attr) === -1) {
                    delete segment[attr];
                } else if (attr === segmentAttributes[1]) {
                    if (segment[attr] === "") {
                        segment[attr] = "___empty___"; // dynamo can't handle empty strings
                    }
                }
            }
        });
    });
    return workout;
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