/** stores the current session data for the logged in user */
(function(){
    "use strict";

    function Navigator(STATES, $location){

        var self = this;
        
        self.calculateSelected = function(){
            var selected = $location.url();
            self.navigators.forEach(function(navigator) {
                if (selected.indexOf(navigator.url) >= 0) {
                    self.selectedNavigator = navigator;
                }
            })
        };
        
        self.navigators = [
            { name: "home",
              url: "/home",
              state: STATES.HOME
            },
            { name: "train with me",
              url: "/trainWithMe",
              state: STATES.TRAIN_WITH_ME
            },
            { name: "blog",
              url: "/blog",
              state: STATES.BLOG
            },
            { name: "login",
              url: "/login",
              state: STATES.LOGIN
            }
        ];
    }

    angular.module("DCX")
           .service("Navigator", Navigator);

})();