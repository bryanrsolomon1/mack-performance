(function () {
    "use strict";

    function Routes($stateProvider, STATES) {

        $stateProvider
            .state(STATES.TRAINER.EXERCISES, {
                templateUrl: "app/components/trainer/exercises/exercises.html",
                controller: "ExercisesCtrl as Exercises"
            })
            .state(STATES.TRAINER.OVERVIEW, {
                    templateUrl: "app/components/trainer/overview/overview.html",
                    controller: "OverviewCtrl as Overview"
            })
            .state(STATES.TRAINER.MESSAGES, {
                    templateUrl: "app/components/trainer/messages/messages.html",
                    controller: "MessagesCtrl as Messages"
            })
            .state(STATES.TRAINER.CLIENTS.MAIN, {
                    templateUrl: "app/components/trainer/clients/clients.html",
                    controller: "ClientsCtrl as Clients"
            })
            .state(STATES.TRAINER.WORKOUTS, {
                    templateUrl: "app/components/trainer/workouts/workouts.html",
                    controller: "WorkoutsCtrl as Workouts"
            });
    }

    angular.module("mack")
        .config(Routes);

})();
