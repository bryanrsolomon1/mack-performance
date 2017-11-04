/** root controller. Can be used to set global properties. Should not be used for anything that can be done in a
 * more limited scoping. Currently only sets the time a user has to recover from an idle session warning. 
 */
(function(){
    "use strict";

    function RootCtrl(){
        
        var self = this
    }

    angular.module("mack")
           .controller("RootCtrl", RootCtrl);

})();