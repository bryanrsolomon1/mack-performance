(function () {
    "use strict";

    function Routes($stateProvider, STATES) {

        $stateProvider
            .state(STATES.TRAINER.CLIENTS.TRAINING_PLAN, {
                templateUrl: "app/components/trainer/clients/trainingPlan/trainingPlan.html",
                controller: "TrainerTrainingPlanCtrl as TrainingPlan"
            })
            .state(STATES.TRAINER.CLIENTS.MEAL_PLAN, {
                    templateUrl: "app/components/trainer/clients/mealPlan/mealPlan.html",
                    controller: "TrainerMealPlanCtrl as MealPlan"
            })
            .state(STATES.TRAINER.CLIENTS.CALENDAR, {
                    templateUrl: "app/components/trainer/clients/calendar/calendar.html",
                    controller: "TrainerClientsCalendarCtrl as Calendar"
            });
    }

    angular.module("mack").config(Routes);

})();