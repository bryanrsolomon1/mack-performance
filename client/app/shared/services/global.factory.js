(function() {
    "use strict";
    
    function Global($mdDialog) {
        
        var loadingDialog;
        
        return {
            startLoading: startLoading,
            stopLoading: stopLoading
        }
        
        function startLoading(){
            loadingDialog = $mdDialog.show({
                template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>',
                clickOutsideToClose: false,
                escapeToClose: false,
                multiple: true
            });
        }
        
        function stopLoading() {
            $mdDialog.hide(loadingDialog);
        }
    }
    
    angular.module("mack").factory("Global", Global);
    
})();