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
            })
            .state(STATES.TRAINER.TRAINING_PLAN_TEMPLATES, {
                    templateUrl: "app/components/trainer/trainingPlanTemplate/trainingPlanTemplate.html",
                    controller: "TrainingPlanTemplateCtrl as Training"
            });
    }

    angular.module("mack")
        .config(Routes);

})();
