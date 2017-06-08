(function() {

    function TrainerCtrl($mdSidenav, STATES, $state) {

        var self = this;
        
        self.sidenavName = "trainer-sidenav";
        self.sidenavs = sidenavs();
        
        self.selectSidenav = selectSidenav;
        
        function selectSidenav(sidenav) {
            self.selectedSidenav = sidenav;
            $state.go(sidenav.state);
        }
        
        function sidenavs() {
            return [
                {
                    "name": "Overview",
                    "icon": "fa-computer",
                    "state": STATES.TRAINER.OVERVIEW
                },
                {
                    "name": "Messages",
                    "icon": "fa-computer",
                    "state": STATES.TRAINER.MESSAGES
                },
                {
                    "name": "Clients",
                    "icon": "fa-computer",
                    "state": STATES.TRAINER.CLIENTS
                },
                {
                    "name": "Exercises",
                    "icon": "fa-computer",
                    "state": STATES.TRAINER.EXERCISES
                },
                {
                    "name": "Workouts",
                    "icon": "fa-computer",
                    "state": STATES.TRAINER.WORKOUTS
                }
            ]
        }
    }

    angular.module("mack").controller("TrainerCtrl", TrainerCtrl);

})();