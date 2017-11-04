/** stores the current session data for the logged in user */
(function(){
    "use strict";

    function Session($localStorage, $rootScope, BROADCASTS){
        
        var self = this;
        
        self.create = function(user){
            
            _.assign(self, user);
            
            $localStorage.$default(user);
            $rootScope.$broadcast(BROADCASTS.SESSION_CREATED, user);
        };

        this.destroy = function(){
            this.firstName = null;
            this.lastName = null;
            this.userRole = null;
            this.userId = null;
            this.thumbnailUrl = null;
            
            $localStorage.$reset();
        };
    }

    angular.module("mack")
           .service("Session", Session);

})();