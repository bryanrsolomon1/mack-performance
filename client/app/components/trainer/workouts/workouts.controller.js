(function() {
    "use strict";

    function WorkoutsCtrl(Workouts, $mdDialog, WORKOUTS, Exercises) {
        
        var self = this;
                
        self.sidenavName = "trainer-workouts-sidenav";
        self.WORKOUTS = WORKOUTS;
        
        self.selectWorkout = selectWorkout;
        self.create = create;
        self.watchVideo = Exercises.watchVideo;
        
        /* initial download */
        downloadWorkouts();
        
        function downloadWorkouts() {
            Workouts.getWorkouts().then(function(data) {
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
            $mdDialog.show({
                    templateUrl: "app/components/trainer/workouts/createWorkoutDialog.html",
                    locals: {},
                    bindToController: true,
                    controller: "CreateWorkoutCtrl as CW"
            }).then(function() {
                downloadWorkouts();
            })
        }
    }
    
    angular.module("mack").controller("WorkoutsCtrl", WorkoutsCtrl);
    
})();