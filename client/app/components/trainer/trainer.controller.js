(function() {

    function TrainerCtrl($mdSidenav, STATES, $state) {

        var self = this;
        
        self.sidenavName = "trainer-sidenav";
        self.sidenavs = sidenavs();
        
        self.selectSidenav = selectSidenav;
        
        selectSidenav(self.sidenavs[0]);
        
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
                    "state": STATES.TRAINER.CLIENTS.MAIN
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
                },
                {
                    "name": "Plan Templates",
                    "icon": "fa-computer",
                    "state": STATES.TRAINER.TRAINING_PLAN_TEMPLATES
                }
            ]
        }
    }

    angular.module("mack").controller("TrainerCtrl", TrainerCtrl);

})();