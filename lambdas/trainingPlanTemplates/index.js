"use strict";

var trainingPlanTemplates = require('./trainingPlanTemplates.js');

module.exports.handler = function(event, context, callback) {

    if(event.httpMethod === 'GET') {
        console.log("Calling get");
        trainingPlanTemplates.get(event).then(function(response) {
            callback(null, response);
            console.log("Good handler called");
        }, function(err) {
            console.log("Error handler called");
            callback(err);
        });
        
    } else if(event.httpMethod === 'POST') {
        
        trainingPlanTemplates.post(event).then(function(response) {
            callback(null, response);
        }, function(err) {
            callback(err);
        });
        
    } else if(event.httpMethod === 'PUT') {
        
        trainingPlanTemplates.update(event).then(function(response) {
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