"use strict";

var q = require("q");
//var GoogleAuth = require('google-auth-library');
var AWS = require("aws-sdk");
var jwt = require("jsonwebtoken");

var SIGNATURE_SECRET = "white_hat_only";
var RESET_TOKEN_SECRET = "teenage_mutant_ninja_bicycles";

module.exports.plain = function(event) {
    
    var deferred = q.defer();
            
    var request;
    
    try {
        request = JSON.parse(event.body);
        if (!request.emailAddress || !request.password) {
            request = null;
            deferred.resolve(buildClientSideErrorResponse("Username or password could not be parsed"));
        }
    } catch (err){
        deferred.resolve(buildClientSideErrorResponse("The message payload was improperly structured"));
    }
    
    if (request) {
        
        var docClient = new AWS.DynamoDB.DocumentClient();

        var queryParams = {
            TableName : "Users",
            KeyConditionExpression: "emailAddress = :emailAddress",
            ProjectionExpression: "emailAddress,password,userRole,firstName,lastName,userId,thumbnailUrl,userStatus,trainingPlans",
            ExpressionAttributeValues: {
                ":emailAddress" : request.emailAddress
            }
        };
        
        docClient.query(queryParams, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                deferred.reject(new Error("Error while looking up user", e));
            } else {
                if (data.Items.length == 1) {
                    var user = data.Items[0];
                    if (user.password == request.password) {
                        // successful login, let's build session token
                        delete user.password;
                        var result = buildSessionTokenObj(user);
                        deferred.resolve(buildSuccessResponse(result));
                    } else {
                        deferred.resolve(buildClientSideErrorResponse("No user exists with that username/password combination"));
                    }
                } else {
                    deferred.resolve(buildClientSideErrorResponse("No user exists with that username/password combination"));
                }
            }
        });
    }
    
    return deferred.promise;
}

module.exports.resetPassword = function(event) {
    
    var deferred = q.defer();
        
    var request, databaseTokenObj;
    
    try {
        request = JSON.parse(event.body);
        if (!request.password || !request.token) {
            request = null;
            deferred.resolve(buildClientSideErrorResponse("Reset password payload is missing fields"));
        }
    } catch (err){
        deferred.reject(new Error("The message payload was improperly structured")); 
    }
    
    if (request) {
        
        verifyTokenIsStillValid()
        .then(decodeResetToken)
        .then(getUserFromDatabase)
        .then(deleteResetToken)
        .then(setNewPasswordForUser)
        .then(function(user) {
            // lastly let's build them a session token
            var sessionTokenObj = buildSessionTokenObj(user);
            deferred.resolve(buildSuccessResponse(sessionTokenObj));
        })
        .catch(function(error) {
            console.error(JSON.stringify(error, null, 2));
            if (typeof(error) === "string") {
                deferred.resolve(buildClientSiderErrorResponse(error));
            } else {
                deferred.reject(error);
            }
        });
    }
    
    return deferred.promise;
    
    function verifyTokenIsStillValid() {
        var deferred = q.defer();
        
        var docClient = new AWS.DynamoDB.DocumentClient();

        var tokenQuery = {
            TableName : "PasswordResetTokens",
            KeyConditionExpression: "#t = :token",
            ExpressionAttributeNames: {
                "#t" : "token"
            },
            ExpressionAttributeValues: {
                ":token" : request.token
            }
        }

        docClient.query(tokenQuery, function(err, tokens) {
            if (err) {
                deferred.reject(new Error("Error while looking up reset token", e));
            } else {
                if (tokens.Items.length == 1) {

                    databaseTokenObj = tokens.Items[0];

                    if (databaseTokenObj.attempts != 0) {
                        deferred.reject("The reset password link has expired.");
                    } else {
                        deferred.resolve();
                    }
                } else {
                    deferred.reject("The reset password link is invalid.")
                }
            }
        });
        
        return deferred.promise;
    }
    
    function decodeResetToken() {
        var deferred = q.defer();
        
        jwt.verify(request.token, RESET_TOKEN_SECRET, function(err, decoded) {
            if (err) {
                deferred.reject(new Error("Error decoding the reset token"));
            } else {
                deferred.resolve(decoded);
            }
        });
        
        return deferred.promise;
    }
    
    function getUserFromDatabase(decoded) {
        var deferred = q.defer();
        
        var docClient = new AWS.DynamoDB.DocumentClient();
        
        var userQuery = {
            TableName : "Users",
            KeyConditionExpression: "emailAddress = :emailAddress",
            ProjectionExpression: "emailAddress,userRole,firstName,lastName,userId,thumbnailUrl,userStatus",
            ExpressionAttributeValues: {
                ":emailAddress" : decoded.emailAddress
            }
        };

        docClient.query(userQuery, function(err, data) {
            if (err) {
                deferred.reject(new Error("Error while looking up user", e));
            } else {
                if (data.Items.length == 1) {
                    deferred.resolve(data.Items[0]);
                } else {
                    deferred.reject("No user with that emailAddress exists");
                }
            }
        });
        
        return deferred.promise;
    }
    
    function deleteResetToken(user) {
        // successful reset, let's deprecate reset token to be unusable going forward
        var deferred = q.defer();
        
        var dynamoDb = new AWS.DynamoDB();
        
        var params = {
            TableName : "PasswordResetTokens",
            Key: {
                token: {
                    S: databaseTokenObj.token
                }
            }
        };

        dynamoDb.deleteItem(params, function(err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        
        return deferred.promise;
    }
    
    function setNewPasswordForUser(user) {
        var deferred = q.defer();
        
        var docClient = new AWS.DynamoDB.DocumentClient();
 
        var passwordUpdate = {
            TableName: 'Users',
            Key: { emailAddress : user.emailAddress },
            UpdateExpression: 'SET #attrName = :attrValue',
            ExpressionAttributeNames : {
                '#attrName' : 'password'
            },
            ExpressionAttributeValues : {
                ':attrValue' : request.password
            }
        };

        docClient.update(passwordUpdate, function(err, response) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        
        return deferred.promise;
    }
}

function buildSessionTokenObj(user) {
    var token = jwt.sign(user, SIGNATURE_SECRET, {expiresIn: "1 day"});
    return {
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            userStatus: user.userStatus,
            thumbnailUrl: user.thumbnailUrl
        }, 
        token: token
    };
}

//var CLIENT_ID = "4748194119-k0un4gt3utos3u40vrn2sbnvbbfuppa0.apps.googleusercontent.com";
//var auth = new GoogleAuth;
//var client = new auth.OAuth2(CLIENT_ID, '', '');
//
//module.exports.googlePlusLogin = function(event) {
//    
//    var deferred = q.defer();
//    
//    /* we do this per google's recommendation. we're verifying the token sent from the browser,
//     * which could've been tampered with */
//    client.verifyIdToken(event.token, CLIENT_ID, function(err, login) { 
//            if (err) {
//                deferred.reject(err);
//            } else {
//                var payload = login.getPayload();
//                var userid = payload['sub'];
//                console.log(JSON.stringify(login, null, 2));
//                
//                deferred.resolve(buildSuccessResponse(login));
//            }
//        }
//    );
//}

function buildSuccessResponse(items) {
    return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(items)
    };
}

function buildClientSideErrorResponse(errorMessage) {
    return {
        statusCode: 400,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({message: errorMessage})
    }
}