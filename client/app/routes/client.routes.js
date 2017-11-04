(function () {
    "use strict";

    function Routes($stateProvider, STATES) {

        $stateProvider
            .state(STATES.CLIENT.OVERVIEW, {
                templateUrl: "app/components/client/overview/overview.html",
                controller: "ClientOverviewCtrl as CO"
            })
            .state(STATES.CLIENT.CALENDAR, {
                templateUrl: "app/components/client/calendar/calendar.html",
                controller: "CalendarCtrl as Cal"
            })
            .state(STATES.CLIENT.TRAINING_PLAN, {
                    templateUrl: "app/components/client/trainingPlan/trainingPlan.html",
                    controller: "TrainingPlanCtrl as Training"
            })
            .state(STATES.CLIENT.MEAL_PLAN, {
                    templateUrl: "app/components/client/mealPlan/mealPlan.html",
                    controller: "MealPlanCtrl as Meal"
            });
    }

    angular.module("mack")
        .config(Routes);

})();
