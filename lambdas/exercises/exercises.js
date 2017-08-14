var AWS = require("aws-sdk");
var q = require("q");

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
        TableName : "Exercises",
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
            deferred.resolve(buildSuccessResponse(data.Items));
        }
    });
    
    return deferred.promise;
}

module.exports.post = (event) => {
    
    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    
    if (!user || !user.userId) {
        deferred.reject(new Error("No trainer was specified as the exercise creator"));
    }
    
    if (user.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Unauthorized", 401));
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
            exercise.createdByTrainerId = user.userId;
                        
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