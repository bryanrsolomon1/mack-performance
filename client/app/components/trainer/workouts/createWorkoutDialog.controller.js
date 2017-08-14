(function() {
    "use strict";
    
    function CreateWorkoutCtrl(Exercises, $mdDialog, WORKOUTS, Workouts) {
        
        var self = this;
                
        self.workout = {parts: []};
        self.selectedParts = [];
        self.WORKOUTS = WORKOUTS;
        
        self.save = save;
        self.validWorkout = validWorkout;
        self.cancel = cancel;
        self.watchVideo = Exercises.watchVideo;
        self.partDropCallback = partDropCallback;
        self.togglePart = togglePart;
        self.superset = superset;
        self.canSuperset = canSuperset;
        self.circuit = circuit;
        self.canCircuit = canCircuit;
        self.interval = interval;
        self.canInterval = canInterval;
        self.canDelete = canDelete;
        self.doDelete = doDelete;
        
        Exercises.getExercises().then(function(data) {
            self.exercises = data;
        });
        
        function save(workout) {
            if (self.validWorkout(workout)) {
                Workouts.saveWorkout(workout).then(function(response) {
                    Workouts.clearCache();
                    $mdDialog.hide();
                    var confirm = $mdDialog.confirm()
                                  .title('Workout created!')
                                  .ok('Great');
                    $mdDialog.show(confirm);
               });
            }
        }
        
        function validWorkout(workout) {
            return workout.name && workout.description && workout.parts.length > 0;
        }
        
        function cancel() {
            $mdDialog.hide();
        }
        
        function partDropCallback(index, item, external, type) {
            /* convert a dropped exercise into a workout 'part' */
            if (type === "exercise") {
                item.target = "";
                var part = {
                    type: WORKOUTS.TYPES.SET,
                    multiplier: 0,
                    multiplier_type: WORKOUTS.MULTIPLIER_TYPES.COUNT,
                    multiplier_unit: WORKOUTS.UNITS.ONE,
                    segments: [item]
                }
                return part;
            }
            return item;
        }
        
        function togglePart(part) {
            var index = self.selectedParts.indexOf(part);
            if (index === -1) {
                self.selectedParts.push(part);
            } else {
                self.selectedParts.splice(index, 1);
            }
        }
        
        function canSuperset(selectedParts) {
            if (selectedParts.length !== 2) {
                return false;
            }
            if (selectedParts[0].type !== WORKOUTS.TYPES.SET || selectedParts[1].type !== WORKOUTS.TYPES.SET) {
                return false;
            }
            if (selectedParts[0].segments.length !== 1 || selectedParts[1].segments.length !== 1) {
                return false;
            }
            return true;
        }
        
        function canCircuit(selectedParts) {
            var result = true;
            if (selectedParts.length <= 2) {
                result = false;
            }
            selectedParts.forEach(function(selectedPart) {
                 if (selectedPart.type !== WORKOUTS.TYPES.SET) {
                     result = false;
                 }
            });
            return result;
        }
        
        function canInterval(selectedParts) {
            return canCircuit(selectedParts);
        }
        
        function superset(){
            if (canSuperset(self.selectedParts)) {
                /* build the superset */
                self.selectedParts[0].segments.push(self.selectedParts[1].segments[0]);
                self.selectedParts[0].type = WORKOUTS.TYPES.SUPERSET;
                
                /* remove the old standalone set */
                self.workout.parts.splice(self.workout.parts.indexOf(self.selectedParts[1]), 1);
                
                /* remove the old selected part */
                self.selectedParts.splice(1, 1);
            }
        }
        
        function circuit(selectedParts){
            if (canCircuit(self.selectedParts)) {
                /* build the circuit */
                self.selectedParts.forEach(function(selectedPart, index) {
                    if (index !== 0) {
                        self.selectedParts[0].segments.push(selectedPart.segments[0]);
                    }
                });
                self.selectedParts[0].type = WORKOUTS.TYPES.CIRCUIT;
                
                /* remove the old standalone set(s) */
                self.selectedParts.forEach(function(selectedPart, index) {
                    if (index !== 0) {
                        self.workout.parts.splice(self.workout.parts.indexOf(selectedPart), 1);
                    }
                });
                
                /* remove the old selected parts */
                self.selectedParts = [self.selectedParts[0]];
            }
        }
        
        function interval(selectedParts){
            if (canInterval(self.selectedParts)) {
                /* build the circuit */
                self.selectedParts.forEach(function(selectedPart, index) {
                    if (index !== 0) {
                        self.selectedParts[0].segments.push(selectedPart.segments[0]);
                    }
                });
                self.selectedParts[0].type = WORKOUTS.TYPES.INTERVAL;
                self.workout.multiplier_type = WORKOUTS.MULTIPLIER_TYPES.TIME;
                self.workout.multiplier_unit = WORKOUTS.UNITS.SECONDS;
                
                /* remove the old standalone set(s) */
                self.selectedParts.forEach(function(selectedPart, index) {
                    if (index !== 0) {
                        self.workout.parts.splice(self.workout.parts.indexOf(selectedPart), 1);
                    }
                });
                
                /* remove the old selected parts */
                self.selectedParts = [self.selectedParts[0]];
            }
        }
        
        function canDelete(parts) {
            if (parts.length > 0) {
                return true;
            }
            return false;
        }
        
        function doDelete(parts) {
            if (canDelete(parts)) {
                parts.forEach(function(part) {
                    self.workout.parts.splice(self.workout.parts.indexOf(part), 1);
                });
                self.selectedParts = [];
            }
        }
    }
    
    angular.module("mack").controller("CreateWorkoutCtrl", CreateWorkoutCtrl);
    
})();