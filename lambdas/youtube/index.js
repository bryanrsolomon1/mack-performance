"use strict";

var youtube = require('./youtube.js');

module.exports.handler = function(event, context, callback) {

    if(event.pathParameters.proxy === 'playlistitems' && event.httpMethod === 'GET') {
        
        youtube.getPlaylistItems(event).then(function(response) {
            callback(null, response);
        }, function(err) {
            callback(err);
        });
        
    } else if(event.pathParameters.proxy === 'playlists' && event.httpMethod === 'GET') {
        
        youtube.getPlaylists(event).then(function(response) {
            callback(null, response);
        }, function(err) {
            callback(err);
        });
        
    } else if(event.pathParameters.proxy === 'videos' && event.httpMethod === 'GET') {
        
        youtube.getVideos(event).then(function(response) {
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