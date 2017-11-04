"use strict";

var exercises = require('./exercises.js');

module.exports.handler = function(event, context, callback) {

    console.log("Event object:\n", JSON.stringify(event, null, 2));

    if(event.httpMethod === 'GET') {
        
        if (event.queryStringParameters) {
            if (event.queryStringParameters.batchObjectIds) {
                /* batch get */
                exercises.batchGetByObjectIds(event).then(function(response) {
                    callback(null, response);
                }, function(err) {
                    callback(err);
                });
            }
        } else {
            /* regular get */
            exercises.get(event).then(function(response) {
                callback(null, response);
            }, function(err) {
                callback(err);
            });
        }
        
    } else if(event.httpMethod === 'POST') {
        
        exercises.post(event).then(function(response) {
            callback(null, response);
        }, function(err) {
            callback(err);
        });
        
    } else if(event.httpMethod === 'DELETE') {
        
        exercises.delete(event).then(function(response) {
            callback(null, response);
        }, function(err) {
            callback(err);
        });
        
    } else {
        
        // log the world for debugging purposes
        console.log("Event object:\n", JSON.stringify(event, null, 2));
        console.log("Context object:\n", JSON.stringify(context, null, 2));
        
        callback(new Error("Invalid route:", event.path));
    }
};