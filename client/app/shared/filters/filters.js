(function() {
    
    function combineName() {
        return function(firstName, lastName) {
            return firstName + " " + lastName;
        }
    }
    
    angular.module("mack").filter("combineName", combineName);
    
})();