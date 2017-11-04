(function () {
    "use strict";

    function Workouts($mdDialog) {
        
        return {
            displayClientWorkout: displayClientWorkout
        };
        
        function displayClientWorkout(workout) {
            $mdDialog.show(
                {
                    templateUrl: "app/components/clients/displayClientWorkout/displayClientWorkout.html",
                    locals: {workout: workout},
                    bindToController: true,
                    controller: function($mdDialog){
                        this.hide = function(){
                            $mdDialog.hide();
                        };
                    },
                    multiple: true,
                    controllerAs: "Display",
                    clickOutsideToClose: false
                }
            );
        }
    }

    angular.module("mack").factory("Workouts", Workouts);

})();