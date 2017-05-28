(function() {
    
    function BlogCtrl(Tumblr, $sce, $state, STATES) {
        var self = this;
        
        self.$sce = $sce;
        
        /* default page load here is 8 posts, starting from most recent (0) */
        Tumblr.getPosts(8, 0).then(function(blogs) {
           self.posts = blogs.response.posts; 
        });
        
        self.go = go;
        
        function go(post) {
            $state.go(STATES.BLOG_SLUG, {"slug" : post.slug, "id" : post.id, "post" : post});
        }
    }
    
    angular.module("DCX").controller("BlogCtrl", BlogCtrl);
    
})();