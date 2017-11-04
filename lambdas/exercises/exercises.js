"use strict";

var AWS = require("aws-sdk");
var q = require("q");
var uuid = require("uuid/v4");

module.exports.get = function(event) {

    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
        
    if (user.userRole !== "TRAINER") {
        deferred.resolve(buildClientSideErrorResponse("Forbidden", 403));
    } else {
    
        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName : "Exercises",
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
                deferred.resolve(buildSuccessResponse(data.Items));
            }
        });
    }
    
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

        objectIds.forEach(function(objectId) {

            var params = {
                TableName : "Exercises",
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
                        responses.push(data.Items[0]);
                    }
                    counter++;
                    if (counter === objectIds.length) {
                        deferred.resolve(buildSuccessResponse(responses));
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
    
    if (user.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {
    
        var exercise;

        try {
            exercise = JSON.parse(event.body);
        } catch (err) {
            deferred.resolve(buildClientSideErrorResponse("The exercise was not properly formatted"));
        }

        if (!exercise) {
            deferred.resolve(buildClientSideErrorResponse("The exercise did not contain any data"));
        } else {
            exercise = cleanInput(exercise);
            
            /* this method will also update so we don't want to overwrite things */
            if (!exercise.createdByTrainerId) {
                exercise.createdByTrainerId = user.userId;
            }
            if (!exercise.createDate) {
                exercise.createDate = new Date().toISOString();
            }
            if (!exercise.objectId) {
                exercise.objectId = uuid();
            }
                        
            var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                TableName: "Exercises",
                Item: exercise
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

module.exports.delete = function(event) {

    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
        
    if (user.userRole !== "TRAINER") {
        deferred.resolve(buildClientSideErrorResponse("Forbidden", 403));
    } else {
    
        var exercise;

        try {
            exercise = JSON.parse(event.body);
        } catch (err) {
            deferred.resolve(buildClientSideErrorResponse("The exercise to delete was not properly formatted"));
        }

        if (!exercise) {
            deferred.resolve(buildClientSideErrorResponse("The exercise did not contain any data"));
        } else {
            
            if (user.userId !== exercise.createdByTrainerId) {
                deferred.resolve(buildClientSideErrorResponse("Forbidden", 403));
            } else {
                var dynamoDb = new AWS.DynamoDB();

                var params = {
                    TableName : "Exercises",
                    Key: {
                        createdByTrainerId: {
                            S: exercise.createdByTrainerId
                        },
                        name: {
                            S: exercise.name
                        }
                    }
                };

                dynamoDb.deleteItem(params, function(err, data) {
                    if (err) {
                        console.error("Unable to delete exercise. Error:", JSON.stringify(err, null, 2));
                        deferred.reject(err);
                    } else {
                        deferred.resolve(buildSuccessResponse(data));
                    }
                }); 
            }
        }
    }
    
    return deferred.promise;
}

function cleanInput(obj) {
    var attributes = ["createdByTrainerId", "createDate", "name", "objectId", "description", "player", "thumbnailUrl", "videoId", "channelId", "playlistId"];
    for (var attr in obj) {
        if (attributes.indexOf(attr) === -1) {
            delete obj[attr];
        }
    }

    return obj;
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