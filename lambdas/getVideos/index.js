var google = require('googleapis');

var API_KEY = "AIzaSyDI6jsFAZUqhgV93knM-H7XhRk7rRiM2eQ";

exports.handler = (event, context, callback) => {

  var service = google.youtube('v3');
  service.videos.list({
    auth: API_KEY,
    id: event.videoIds,
    part: 'id,snippet,player'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      callback(err);
    } else {
      callback(null, response.items);
    }
  });
}