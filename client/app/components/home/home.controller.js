(function() {
    
    function HomeCtrl(Tumblr, $sce, $state, STATES) {

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
        
        function go(post) {
            $state.go(STATES.BLOG_SLUG, {"slug" : post.slug, "id" : post.id, "post" : post});
        }
    }
    
    angular.module("DCX").controller("HomeCtrl", HomeCtrl);
    
})();