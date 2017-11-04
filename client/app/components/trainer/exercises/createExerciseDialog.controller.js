(function() {
    
    function CreateExerciseCtrl($mdDialog, Youtube, Generic, EXERCISES){
                        
        var self = this;
        var url = EXERCISES.URL;
        
        self.channels = [
            {
                name: "MackPerformance",
                id: "UCZtNRp4ocEGOHOJ3USQYeAQ"
            }
        ];
        
        if (!self.exercise.channelId) {
            /* select first since we only have one */
            self.exercise.channelId = self.channels[0].id;
            getPlaylistsByChannelId(self.exercise.channelId);
        } else {
            getPlaylistsByChannelId(self.exercise.channelId);
            if (self.exercise.playlistId) {
                getPlaylistItems(self.exercise.playlistId);
            }
        }
        
        self.cancel = cancel;
        self.getPlaylistsByChannelId = getPlaylistsByChannelId;
        self.getPlaylistItems = getPlaylistItems;
        self.validExercise = validExercise;
        self.save = save;

        function cancel(){
            $mdDialog.hide();
        };
        
        function getPlaylistsByChannelId(channelId) {
            if (channelId) {
                Youtube.getPlaylistsByChannelId(channelId).then(function(playlists) {
                    self.playlists = playlists;
                });
            }
        }
        
        function getPlaylistItems(playlistId) {
            if (playlistId) {
                Youtube.getPlaylistItems(playlistId).then(function(videos) {
                    self.videos = videos;
                });
            }
        }
        
        function validExercise(exercise) {
            return exercise.name && exercise.videoId
        }
        
        function save(exercise) {
            if (self.validExercise(exercise)) {
                Youtube.getVideos([exercise.videoId]).then(function(data) {
                    var video = data[0];
                    exercise.thumbnailUrl = video.snippet.thumbnails.default.url;
                    exercise.player = video.player.embedHtml;
                    Generic.save(url, exercise).then(function(response) {
                        $mdDialog.hide();
                        var confirm = $mdDialog.confirm()
                                      .title("Workout saved!")
                                      .ok("Great");

                        $mdDialog.show(confirm);
                   });
                });
            }
        }
    }
    
    angular.module("mack").controller("CreateExerciseCtrl", CreateExerciseCtrl);
    
})();