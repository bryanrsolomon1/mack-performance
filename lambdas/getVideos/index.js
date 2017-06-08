#!/usr/bin/env node

var google = require('googleapis');

var API_KEY = "AIzaSyDI6jsFAZUqhgV93knM-H7XhRk7rRiM2eQ";
var CHANNEL_ID = "UCZtNRp4ocEGOHOJ3USQYeAQ";

function getChannel() {
  var service = google.youtube('v3');
  service.playlists.list({
    auth: API_KEY,
    channelId: CHANNEL_ID,
    part: 'id',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var playlists = response.items;
    if (playlists.length == 0) {
      console.log('No playlists found.');
    } else {
      console.log('This playlists\'s ID is %s.',
                  playlists[0].id);
    }
  });
}

getChannel();