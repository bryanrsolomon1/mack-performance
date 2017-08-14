"use strict";

var Q = require("q");
//var GoogleAuth = require('google-auth-library');
var AWS = require("aws-sdk");
var jwt = require("jsonwebtoken");

var SIGNATURE_SECRET = "white_hat_only";

module.exports.plain = function(event) {
    
    var deferred = Q.defer();
        
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var request;
    
    try {
        request = JSON.parse(event.body);
        if (!request.emailAddress || !request.password) {
            request = nul;
            throw new Error();
        }
    } catch (err){
        deferred.reject(buildClientSideErrorResponse("Invalid email address and or password")); 
    }
    
    if (request) {
    
        var queryParams = {
            TableName : "Users",
            KeyConditionExpression: "emailAddress = :emailAddress",
            ExpressionAttributeValues: {
                ":emailAddress" : request.emailAddress
            }
        };
        
        docClient.query(queryParams, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return new Error("Error while looking up user", e);
            } else {
                if (data.Items.length == 1) {
                    var user = data.Items[0];
                    if (user.password == request.password) {
                        // successful login, let's build session token
                        var token = jwt.sign(user, SIGNATURE_SECRET, {
                          expiresIn: "1 day"
                        });
                        var result = {
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userRole: user.userRole,
                                thumbnailUrl: user.thumbnailUrl
                            }, 
                            token: token
                        };
                        deferred.resolve(buildSuccessResponse(result));
                    }
                } else {
                    buildClientSideErrorResponse("No user exists with that username/password combination");
                }
            }
        });
    }
    
    return deferred.promise;
}

//var CLIENT_ID = "4748194119-k0un4gt3utos3u40vrn2sbnvbbfuppa0.apps.googleusercontent.com";
//var auth = new GoogleAuth;
//var client = new auth.OAuth2(CLIENT_ID, '', '');
//
//module.exports.googlePlusLogin = function(event) {
//    
//    var deferred = Q.defer();
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
        body: errorMessage
    }
}