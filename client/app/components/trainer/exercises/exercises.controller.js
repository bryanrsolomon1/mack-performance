(function() {
    "use strict";

    function ExercisesCtrl(Youtube, $mdDialog, Exercises) {
        
        var self = this;
                
        self.watchVideo = Exercises.watchVideo;
        self.create = create;
        
        downloadExercises();
        
        function downloadExercises() {
            Exercises.getExercises().then(function(data) {
                self.exercises = data;
            });
        }
        
        function create() {
            $mdDialog.show(
                {
                    templateUrl: "app/components/trainer/exercises/createExerciseDialog.html",
                    locals: {},
                    bindToController: true,
                    controller: "CreateExerciseCtrl",
                    controllerAs: "Create",
                    clickOutsideToClose: false
                }
            ).then(function() {
                downloadExercises();
            });
        }
    }
    
    angular.module("mack").controller("ExercisesCtrl", ExercisesCtrl);
    
})();