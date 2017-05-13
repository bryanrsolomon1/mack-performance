/**
 * Created by KGraham on 5/26/16.
 */
(function(){
    "use strict";

    angular.module("DCX")
           .constant("LOGIN_STATE", "root.login")
           .constant("VCX_STATES", {
               "DEVICES": "root.main.body.vcxDevices",
               "PARAMETERS": "root.main.body.vcxParameters",
               "TEMPLATES": "root.main.body.vcxTemplates"
           });
})();