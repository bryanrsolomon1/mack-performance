(function() {
    
    angular.module("mack").constant("WORKOUTS", {
        TYPES: {
            SET: "SET",
            SUPERSET: "SUPERSET",
            CIRCUIT: "CIRCUIT",
            INTERVAL: "INTERVAL"
        },
        MULTIPLIER_TYPES: {
            COUNT: "COUNT"  
        },
        UNITS: {
            ONE: "ONE",
            SECONDS: "SECONDS"
        }
    });
    
})();