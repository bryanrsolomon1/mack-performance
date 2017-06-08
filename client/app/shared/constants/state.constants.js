(function () {
    "use strict";

    var root = "root";
    var main = root + ".main";
    var body = main + ".body";
    var trainer = body + ".trainer";

    angular.module("mack")
        .constant("STATES", {
            LOGIN: body + ".login",
            HOME: body + ".home",
            BLOG: body + ".blog",
            BLOG_SLUG: body + ".blog-slug",
            TRAIN_WITH_ME: body + ".trainWithMe",
            TRAINER: {
                MAIN: trainer,
                EXERCISES: trainer + ".exercises",
                WORKOUTS: trainer + ".workouts",
                OVERVIEW: trainer + ".overview",
                CLIENTS: trainer + ".clients",
                MESSAGES: trainer + ".messages"
            },
            CLIENT: body + ".client"
        });
})();