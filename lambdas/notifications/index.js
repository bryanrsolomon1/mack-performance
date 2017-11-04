"use strict";

var notifications = require('./notifications.js');

module.exports.handler = function(event, context, callback) {
    
    if(event.httpMethod === 'GET') {
        
        notifications.get(event).then(function(response) {
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