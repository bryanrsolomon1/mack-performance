(function() {
    "use strict";

    function ExercisesCtrl(Youtube, $mdDialog, Exercises) {
        
        var self = this;
        
        var fakeTrainerId = "1";
        
        self.watchVideo = Exercises.watchVideo;
        self.create = create;
        
        downloadExercises(fakeTrainerId);
        
        function downloadExercises(trainerId) {
            Exercises.getExercisesByTrainerId(trainerId).then(function(data) {
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
                downloadExercises(fakeTrainerId);
            });
        }
    }
    
    angular.module("mack").controller("ExercisesCtrl", ExercisesCtrl);
    
})();