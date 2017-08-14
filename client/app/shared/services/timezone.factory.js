(function() {
    
    function Timezones() {
        
        return {
            getTimezoneAbbreviation: getTimezoneAbbreviation,
            getCurrentTimezoneOffset: getCurrentTimezoneOffset
        }
        
        function getTimezoneAbbreviation(tzMomentName) {
            return moment.tz([2012, 0], tzMomentName).zoneAbbr();
        }
        
        function getCurrentTimezoneOffset(tzMomentName) {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth();
            var year = dateObj.getUTCFullYear();
            return moment.tz([year, month], tzMomentName).format('Z');
        }
    }
    
    angular.module("mack").factory("Timezones", Timezones);
    
})();