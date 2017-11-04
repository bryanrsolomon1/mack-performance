(function() {
    "use strict";
    
    function ClientOverviewCtrl(Session) {
        var self = this;
        
        self.notifications = gatherNotifications();
        
        function gatherNotifications() {
//            if (Session.intake)
        }
    }
    
    angular.module("mack").controller("ClientOverviewCtrl", ClientOverviewCtrl);
    
})();