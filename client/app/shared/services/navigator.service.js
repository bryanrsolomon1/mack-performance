/** stores the current session data for the logged in user */
(function(){
    "use strict";

    function Navigator(STATES, $location, $localStorage){

        var self = this;
        
        self.loginNavigator = defaultLoginNavigator();
        
        /* check if user was previously logged in */
        if ($localStorage.firstName) {
            self.loginNavigator.name = $localStorage.firstName;
        }
        
        self.calculateSelected = function(){
            var selected = $location.url();
            self.navigators.forEach(function(navigator) {
                if (selected.indexOf(navigator.url) !== -1) {
                    self.selectedNavigator = navigator;
                }
            });
            
            if (selected.indexOf(self.loginNavigator.url) !== -1) {
                self.selectedNavigator = self.loginNavigator;
            }
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
            }
        ];
        
        function defaultLoginNavigator() {
            return {
                name: "login",
                url: "/login",
                state: STATES.LOGIN
            };
        }
    }

    angular.module("mack")
           .service("Navigator", Navigator);

})();