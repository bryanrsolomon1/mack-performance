"use strict";

var google = require("googleapis");
var Q = require("q");

var API_KEY = "AIzaSyDI6jsFAZUqhgV93knM-H7XhRk7rRiM2eQ";

var service = google.youtube("v3");

module.exports.getPlaylistItems = function(event) {
    
    var deferred = Q.defer();
    
    service.playlistItems.list({
        auth: API_KEY,
        playlistId: event.queryStringParameters.playlistId,
        part: 'id,snippet'
    }, function(err, response) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(buildSuccessResponse(response.items));
        }
    });
    
    return deferred.promise;
}

module.exports.getVideos = function(event) {
    
    var deferred = Q.defer();

    service.videos.list({
        auth: API_KEY,
        id: event.queryStringParameters.videoIds,
        part: 'id,snippet,player'
    }, function(err, response) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(buildSuccessResponse(response.items));
        }
    });
    
    return deferred.promise;
}

module.exports.getPlaylists = function(event) {
    
    var deferred = Q.defer();

    service.playlists.list({
        auth: API_KEY,
        channelId: event.queryStringParameters.channelId,
        part: 'id,snippet',
        maxResults: 50
    }, function(err, response) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(buildSuccessResponse(response.items));
        }
    });
    
    return deferred.promise;
}

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