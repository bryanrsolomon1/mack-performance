(function() {
    "use strict";

    function WorkoutsCtrl(Workouts, $mdDialog, WORKOUTS, Exercises) {
        
        var self = this;
        
        var fakeTrainerId = "1";
        
        self.sidenavName = "trainer-workouts-sidenav";
        self.WORKOUTS = WORKOUTS;
        
        self.selectWorkout = selectWorkout;
        self.create = create;
        self.watchVideo = Exercises.watchVideo;
        
        /* initial download */
        downloadWorkouts(fakeTrainerId);
        
        function downloadWorkouts(trainerId) {
            Workouts.getWorkoutsByTrainerId(trainerId).then(function(data) {
                self.workouts = data;
                
                if (self.workouts.length >= 1) {
                    selectWorkout(self.workouts[0]);
                }
            });
        }
        
        function selectWorkout(workout) {
            self.selectedWorkout = workout;
        }
        
        function create() {
            $mdDialog.show(
                {
                    templateUrl: "app/components/trainer/workouts/workoutTypeDialog.html",
                    locals: {},
                    bindToController: true,
                    controller: "WorkoutTypeCtrl as WT"
                }
            ).then(function() {
                downloadWorkouts(fakeTrainerId);
            })
        }
    }
    
    angular.module("mack").controller("WorkoutsCtrl", WorkoutsCtrl);
    
})();