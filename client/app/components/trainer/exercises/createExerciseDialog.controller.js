(function() {
    
    function CreateExerciseCtrl($mdDialog, Youtube, Exercises){
                        
        var self = this;
        
        self.exercise = {};
        self.channels = [
            {
                name: "MackPerformance",
                id: "UCZtNRp4ocEGOHOJ3USQYeAQ"
            }
        ];
        
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
                    Exercises.saveExercise(exercise).then(function(response) {
                        Exercises.clearCache();
                        $mdDialog.hide();
                        var confirm = $mdDialog.confirm()
                                      .title('Workout created!')
                                      .ok('Great');

                        $mdDialog.show(confirm);
                   });
                });
            }
        }
    }
    
    angular.module("mack").controller("CreateExerciseCtrl", CreateExerciseCtrl);
    
})();