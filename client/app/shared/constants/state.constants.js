(function () {
    "use strict";

    var root = "root";
    var main = root + ".main";
    var body = main + ".body";
    var trainer = body + ".trainer";
    var trainerClients = trainer + ".clients";
    var client = body + ".client";

    angular.module("mack")
        .constant("STATES", {
            LOGIN: body + ".login",
            PASSWORD_RESET: body + ".reset",
            HOME: body + ".home",
            BLOG: body + ".blog",
            BLOG_SLUG: body + ".blog-slug",
            TRAIN_WITH_ME: body + ".trainWithMe",
            TRAINER: {
                MAIN: trainer,
                EXERCISES: trainer + ".exercises",
                WORKOUTS: trainer + ".workouts",
                OVERVIEW: trainer + ".overview",
                CLIENTS: {
                    MAIN: trainerClients,
                    TRAINING_PLAN: trainerClients + ".trainingPlan",
                    MEAL_PLAN: trainerClients + ".mealPlan",
                    CALENDAR: trainerClients + ".calendar"
                },
                MESSAGES: trainer + ".messages",
                TRAINING_PLAN_TEMPLATES: trainer + ".trainingPlanTemplate"
            },
            CLIENT: {
                MAIN: client,
                OVERVIEW: client + ".overview",
                CALENDAR: client + ".calendar",
                TRAINING_PLAN: client + ".trainingPlan",
                MEAL_PLAN: client + ".mealPlan",
            }
        });
})();