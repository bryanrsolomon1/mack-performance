(function() {
    
    function combineName() {
        return function(firstName, lastName) {
            return firstName + " " + lastName;
        }
    }
    
    angular.module("mack").filter("combineName", combineName);

    function workoutTarget() {
        return function(target) {
            return target === "___empty___" ? "" : target;
        }
    }
    
    angular.module("mack").filter("workoutTarget", workoutTarget);
    
})();