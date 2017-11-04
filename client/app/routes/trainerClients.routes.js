(function () {
    "use strict";

    function Routes($stateProvider, STATES) {

        $stateProvider
            .state(STATES.TRAINER.CLIENTS.TRAINING_PLAN, {
                templateUrl: "app/components/trainer/clients/trainingPlan/trainingPlan.html",
                controller: "TrainerClientTrainingPlanCtrl as TrainingPlan",
                params: {
                    client: null
                }
            })
            .state(STATES.TRAINER.CLIENTS.MEAL_PLAN, {
                templateUrl: "app/components/trainer/clients/mealPlan/mealPlan.html",
                controller: "TrainerMealPlanCtrl as MealPlan",
                params: {
                    client: null
                }
            })
            .state(STATES.TRAINER.CLIENTS.CALENDAR, {
                templateUrl: "app/components/trainer/clients/calendar/calendar.html",
                controller: "TrainerClientCalendarCtrl as Calendar",
                params: {
                    client: null
                }
            });
    }

    angular.module("mack").config(Routes);

})();