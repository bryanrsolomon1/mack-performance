(function () {
    "use strict";

    var root = "root";
    var main = root + ".main";
    var body = main + ".body";

    angular.module("mack")
        .constant("STATES", {
            LOGIN: body + ".login",
            HOME: body + ".home",
            BLOG: body + ".blog",
            BLOG_SLUG: body + ".blog-slug",
            TRAIN_WITH_ME: body + ".trainWithMe",
            TRAINER: body + ".trainer",
            CLIENT: body + ".client"
        });
})();