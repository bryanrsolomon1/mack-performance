(function(){
    "use strict";

    var root = "root";
    var main = root + ".main";
    var body = main + ".body";
    
    angular.module("DCX")
        .constant("STATES", {
                LOGIN: "login",
                HOME: body + ".home",
                BLOG: body + ".blog"
            });
})();