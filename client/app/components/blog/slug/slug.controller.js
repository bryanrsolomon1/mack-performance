(function() {
    "use strict";
    
    function SlugCtrl(Tumblr, $stateParams, $sce) {
        
        var self = this;
        
        self.post = $stateParams.post;
        if (!self.post) { // the post wasn't passed in (can of course happen if someone bookmarked the slug directly, etc.)
            Tumblr.getPost($stateParams.id).then(function(response) {
                self.post = response.response.posts[0];
            }, function(error) {
                console.error(error);
            });
        }
        self.$sce = $sce;
    }
    
    angular.module("mack").controller("SlugCtrl", SlugCtrl);
    
})();