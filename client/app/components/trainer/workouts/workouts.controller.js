(function() {
    "use strict";

    function WorkoutsCtrl(Workouts, $mdDialog, WORKOUTS, Exercises, Generic, EXERCISES) {
        
        var self = this;
        var url = WORKOUTS.URL;
                
        self.sidenavName = "trainer-workouts-sidenav";
        self.WORKOUTS = WORKOUTS;
        
        self.selectWorkout = selectWorkout;
        self.create = create;
        self.watchVideo = Exercises.watchVideo;
        
        /* initial download */
        downloadWorkouts();
        
        function downloadWorkouts() {
            Generic.get(url).then(function(data) {
                self.workouts = data;
                
                if (!self.selectedWorkout && self.workouts.length >= 1) {
                    selectWorkout(self.workouts[0]);
                } else {
                    self.selectedWorkout = _.find(self.workouts, function(workout) {
                       return workout.objectId === self.selectedWorkout.objectId; 
                    });
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