(function() {
    
    function HomeCtrl(Tumblr, $sce, $state, STATES, Clients, $mdDialog) {

        var self = this;

        self.$sce = $sce;
        self.newUser = {};
        
        Tumblr.getRecentPosts().then(function(blogs) {
            try {
                self.recentPosts = blogs.response.posts;
            } catch (e) {
                // TODO
            }
        });
        
        self.go = go;
        self.signUp = signUp;
        
        function go(post) {
            $state.go(STATES.BLOG_SLUG, {"slug" : post.slug, "id" : post.id, "post" : post});
        }
        
        function signUp(newUser) {
            Clients.signUp(newUser).then(function(response) {
                console.log("User saved:", JSON.stringify(newUser));
            }, function(err) {
                console.log("Failed:", JSON.stringify(err));
            });
        }
    }
    
    angular.module("mack").controller("HomeCtrl", HomeCtrl);
    
})();