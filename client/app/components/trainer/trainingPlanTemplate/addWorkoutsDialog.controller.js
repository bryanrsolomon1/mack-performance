(function () {
    "use strict";
    
    function AddWorkoutsDialogCtrl(Workouts, $mdDialog, Exercises) {
        var self = this;
        
        self.selectedWorkouts = [];
        
        self.toggleWorkoutCheck = toggleWorkoutCheck;
        self.addWorkouts = addWorkouts;
        self.cancel = cancel;
        
        Workouts.getWorkouts().then(function(data) {
            var workoutIds = Object.keys(self.trainingPlan.calendar);
            self.workouts = data.filter(function(workout) {
                return workoutIds.indexOf(workout.objectId) === -1;
            });
            
            self.workouts.forEach(function(workout) {
                Exercises.downloadAndAssignExercisesForWorkout(workout);
            });
        });
        
        function toggleWorkoutCheck(workout) {
            var idx = self.selectedWorkouts.indexOf(workout);
            if (idx === -1) {
                self.selectedWorkouts.push(workout);
            } else {
                self.selectedWorkouts.splice(idx, 1);
            }
        }
        
        function addWorkouts(workouts) {
            $mdDialog.hide(workouts);
        }
        
        function cancel() {
            $mdDialog.cancel();
        }
    }
    
    angular.module("mack").controller("AddWorkoutsDialogCtrl", AddWorkoutsDialogCtrl);
    
})();