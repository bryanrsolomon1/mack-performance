var AWS = require("aws-sdk");
var q = require("q");
var fs = require("fs");
var uuid = require("uuid/v4");

var SIGNATURE_SECRET = "white_hat_only";
var RESET_TOKEN_SECRET = "teenage_mutant_ninja_bicycles";

module.exports.batchGet = function(event) {

    var deferred = q.defer();

    var user = event.requestContext.authorizer;

    if (user.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {
        
        getTrainersClientList()
        .then(batchGetClients)
        .then(function(clients) {
            deferred.resolve(buildSuccessResponse(clients));
        });
    }

    return deferred.promise;
    
    function getTrainersClientList() {
        var deferred = q.defer();
        
        var docClient = new AWS.DynamoDB.DocumentClient();
        
        var queryParams = {
            TableName : "Users",
            ProjectionExpression: "clients",
            KeyConditionExpression: "emailAddress = :emailAddress",
            ExpressionAttributeValues: {
                ":emailAddress" : user.emailAddress
            }
        };
        
        docClient.query(queryParams, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                deferred.reject(new Error("Error while looking up trainer", e));
            } else if (data.Items.length === 1 && data.Items[0].clients) {
                deferred.resolve(data.Items[0].clients);
            } else {
                 deferred.reject(new Error("No clients found for that trainer or the trainer could not be found"));
            }
        });
        
        return deferred.promise;
    }
    
    function batchGetClients(clients) {
        var deferred = q.defer();
        
        if (clients.length === 0) {
            deferred.resolve([]);
        } else {
            var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                RequestItems: {
                    Users: {
                        Keys: [],
                        AttributesToGet: "emailAddress,firstName,lastName,userId,thumbnailUrl,trainingPlans".split(",")
                    }
                }
            };

            clients.forEach(function(email) {
                params.RequestItems.Users.Keys.push({
                    emailAddress: email
                });
            });

            docClient.batchGet(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    deferred.resolve(data.Responses.Users);
                }
            });
        }
        
        return deferred.promise;
    }
}

module.exports.addClient = function(event) {

    var deferred = q.defer();

    var trainer = event.requestContext.authorizer;
    var newUser = JSON.parse(event.body);

    if (trainer.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {        
        newUser.createdByTrainerId = trainer.userId;
        newUser.userStatus = "INTAKE";
        newUser.userRole = "CLIENT";
        newUser.thumbnailUrl = "http://eyebeam.org/archive/sites/default/files/imagecache/node_size/people/images/blank_person_23.png";
        newUser.userId = uuid();
        newUser.password = "empty_needs_resetting";
        newUser.trainingPlans = [];
        newUser.createData = new Date().toISOString();
        
        newUser = cleanClientInput(newUser);
        
        putNewUser(newUser)
        .then(addUserToClientListOfTrainer)
        .then(createResetToken)
        .then(sendNewUserEmail)
        .then(function(data) {
            deferred.resolve(buildSuccessResponse(data));
        });
    }

    return deferred.promise;
    
    function putNewUser() {
        var deferred = q.defer();

        var docClient = new AWS.DynamoDB.DocumentClient();

        var putParams = {
              TableName : 'Users',
              Item: newUser
            };

        docClient.put(putParams, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                deferred.reject(e);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function addUserToClientListOfTrainer() {
        var deferred = q.defer();

        var docClient = new AWS.DynamoDB.DocumentClient();

        var updateParams = {
              TableName: 'Users',
              Key: { emailAddress : trainer.emailAddress },
              UpdateExpression: 'SET #attrName = list_append(#attrName, :attrValue)',
              ExpressionAttributeNames : {
                '#attrName' : 'clients'
              },
              ExpressionAttributeValues : {
                ':attrValue' : [newUser.emailAddress]
              }
        };

        docClient.update(updateParams, function(err, data) {
           if (err) {
               console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
               deferred.reject(err);
           } else {
               deferred.resolve(data);
           }
        });

        return deferred.promise;
    }

    function createResetToken() {
        var jwt = require("jsonwebtoken");

        var deferred = q.defer();
        var docClient = new AWS.DynamoDB.DocumentClient();

        var tokenObj = {emailAddress: newUser.emailAddress, userId: newUser.userId};
        var token = jwt.sign(tokenObj, RESET_TOKEN_SECRET);

        var itemToPut = {
            token: token,
            attempts: 0
        }

        var putParams = {
              TableName : 'PasswordResetTokens',
              Item: itemToPut
        };

        docClient.put(putParams, function(err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(token);
            }
        });

        return deferred.promise;
    }

    function sendNewUserEmail(resetToken) {
        var deferred = q.defer();

        var ses = new AWS.SES({apiVersion: '2010-12-01'});

        var template = fs.readFileSync('./welcome_email_template.html').toString("utf8");

        template = template.replace("___firstName___", newUser.firstName);
        template = template.replace("___intake_url___", "http://www.mackperformance.com/#!/reset?token=" + resetToken);
        template = template.replace("___unsubscribe_url___", "http://www.mackperformance.com");

        var messageParams = { 
            Source: 'mack@mackperformance.com', 
            Destination: { ToAddresses: [newUser.emailAddress]},
            Message: {
                Subject: {
                    Charset: "UTF-8",
                    Data: 'Welcome to Mack Performance!'
                },
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: template
                    }
                }
            }
        }

        // this sends the email
        ses.sendEmail(messageParams, function(err, data) {
            if(err) {
               deferred.reject(err);
            } else {
               deferred.resolve(data);
            }
        });

        return deferred.promise;
    }
};

module.exports.update = function(event) {
    
    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    var toUpdate;
    
    try {
        toUpdate = JSON.parse(event.body);
    } catch (err) {
        deferred.resolve(buildClientSideErrorResponse("The user obj was not properly formatted"));
    }
    
    if (user.userRole !== "TRAINER") {
        deferred.reject(buildClientSideErrorResponse("Forbidden", 403));
    } else {
        if (!toUpdate) {
            deferred.resolve(buildClientSideErrorResponse("The user obj did not contain any data"));
        } else {
            toUpdate = cleanClientInput(toUpdate);
            
            var docClient = new AWS.DynamoDB.DocumentClient();
            
            var params = {
                TableName: "Users",
                Item: toUpdate
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    deferred.reject(err);
                } else {
                    deferred.resolve(buildSuccessResponse(toUpdate));
                }
            });
        }
    }
    
    return deferred.promise;
};

function cleanClientInput(obj) {
    var attributes = ["createdByTrainerId", "createDate", "emailAddress", "firstName", "lastName", "timezone", "password", "userRole", "userStatus", "trainingPlans", "thumbnailUrl", "userId"];
    for (attr in obj) {
        if (attributes.indexOf(attr) === -1) {
            delete obj[attr];
        }
    }
    return obj;
}

function buildSuccessResponse(items) {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(items)
    };
}

function buildClientSideErrorResponse(errorMessage, statusCode) {
    statusCode = statusCode | 400;
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: errorMessage
    }
}