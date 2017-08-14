/** stores the current session data for the logged in user */
(function(){
    "use strict";

    function Session($localStorage){
        
        this.create = function(user){
            if (user.firstName) {
                this.firstName = user.firstName;
            }
            if (user.lastName) {
                this.lastName = user.lastName;
            }
            if (user.userRole) {
                this.userRole = user.userRole;
            }
            if (user.userId) {
                this.userId = user.userId;
            }
            if (user.thumbnailUrl) {
                this.thumbnailUrl = user.thumbnailUrl;
            }
            
            $localStorage.$default(user);
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