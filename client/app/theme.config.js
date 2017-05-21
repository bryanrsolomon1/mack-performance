/**
 * Created by KGraham on 5/26/16.
 */
(function () {
    "use strict";

    function ThemeConfig($mdThemingProvider) {

        // sets the md-primary used by angular material all across the app. See angular material > themes for more info
        var mackYellowMap = $mdThemingProvider.extendPalette("yellow", {
            "500": "ffcb2f"
        });

        $mdThemingProvider.definePalette("mackYellow", mackYellowMap);

        $mdThemingProvider.theme("default")
            .primaryPalette("mackYellow", {
                "hue-1": "800"
            })
            .warnPalette("blue")
            .accentPalette("grey");
    }

    angular.module('DCX').config(ThemeConfig);

})();