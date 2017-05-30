(function() {
    
    function HomeCtrl(Tumblr, $sce, $state, STATES, Client) {

        var self = this;

        self.$sce = $sce;
        
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
            Client.signUp(newUser).then(function(response) {
                // TODO
            })
        }
    }
    
    angular.module("mack").controller("HomeCtrl", HomeCtrl);
    
})();