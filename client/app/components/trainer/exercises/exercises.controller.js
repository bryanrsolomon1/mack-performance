(function() {
    "use strict";

    function ExercisesCtrl(Youtube, $mdDialog, Exercises, Generic, EXERCISES) {
        
        var self = this;
        var url = EXERCISES.URL;
        
        self.watchVideo = Exercises.watchVideo;
        self.create = create;
        self.selectExercise = selectExercise;
        self.deleteExercise = deleteExercise;
        
        downloadExercises();
        
        function downloadExercises() {
            Generic.get(url).then(function(data) {
                self.exercises = data;
            });
        }
        
        function create(exercise) {
            var locals = {};
            locals.exercise = exercise || {};
            $mdDialog.show(
                {
                    templateUrl: "app/components/trainer/exercises/createExerciseDialog.html",
                    locals: locals,
                    bindToController: true,
                    controller: "CreateExerciseCtrl",
                    controllerAs: "Create",
                    clickOutsideToClose: false
                }
            ).then(function() {
                downloadExercises();
            });
        }
        
        function selectExercise(exercise) {
            self.selectedExercise = exercise;
        }
        
        function deleteExercise(exercise) {
            var confirm = $mdDialog.confirm()
                              .title('Are you sure you wish to delete this exercise?')
                              .ok("Yes")
                              .cancel("Cancel");
                $mdDialog.show(confirm).then(function() {
                    Generic.deleteObj(url, exercise).then(function() {
                        self.exercises.splice(self.exercises.indexOf(exercise), 1);
                    });
                });
        }
    }
    
    angular.module("mack").controller("ExercisesCtrl", ExercisesCtrl);
    
})();