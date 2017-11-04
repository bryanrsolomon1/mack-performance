(function () {
    'use strict';

    function Exercises($mdDialog, Generic, EXERCISES) {
        
        return {
            watchVideo: watchVideo,
            downloadAndAssignExercisesForWorkout: downloadAndAssignExercisesForWorkout
        };
        
        function watchVideo(exercise) {
            $mdDialog.show(
                {
                    templateUrl: "app/components/watchExercise/watchExerciseDialog.html",
                    locals: {exercise: exercise},
                    bindToController: true,
                    controller: function($mdDialog, $sce){
                        this.hide = function(){
                            $mdDialog.hide();
                        };
                        this.$sce = $sce;
                    },
                    multiple: true,
                    controllerAs: "Watch",
                    clickOutsideToClose: false
                }
            );
        }
        
        function downloadAndAssignExercisesForWorkout(workout) {
            if (workout.parts) {
                var exerciseIds = _.flatMap(workout.parts, function(part) {
                    return part.segments.map(function(segment) {
                        return segment.objectId;
                    });
                });
                
                exerciseIds = _.uniq(exerciseIds);
                
                Generic.batchGetByObjectIds(EXERCISES.URL, exerciseIds).then(function(exercises) {
                    workout.parts.forEach(function(part) {
                        part.segments.forEach(function(segment) {
                            var exercise = _.find(exercises, function(exercise) {
                               return exercise.objectId === segment.objectId; 
                            });
                            _.assign(segment, exercise);
                        });
                    });
                });
                
                workout.$$downloadedExercises = true;
            }
        }
    }

    angular.module("mack").factory("Exercises", Exercises);

})();