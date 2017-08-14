(function(){
    "use strict";

    angular.module("mack")
           .constant("TIMEZONES", {
            "US_PACIFIC": {
                displayText: "Pacific Time (US & Canada)",
                momentName: "America/Los_Angeles"
            },
            "US_MOUNTAIN": {
                displayText: "Mountain Time (US & Canada)",
                momentName: "America/Denver"
            },
            "US_CENTRAL": {
                displayText: "Central Time (US & Canada)",
                momentName: "America/Chicago"
            },
            "US_EASTERN": {
                displayText: "Eastern Time (US & Canada)",
                momentName: "America/New_York"
            }
        }
    );

})();