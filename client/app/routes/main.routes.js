/**
 * Created by KGraham on 5/26/16.
 *
 * This file handles all the abstract and root level routes. The structure is root is the base and then root either
 * branches to root.login or root.main.body.<route_name>. Root level provides the page holder div and the logo
 * footer for all pages. Main level plugs into root's "page" div and sets the skeleton for navbar, pageheader, and page
 * body, then root.main.body populates these three and provides a pluggable div for each page to flesh out in the
 * form of a one line in-line template (defined below). All corresponding routes then plug into this div and inherit
 * the other states
 *
 * See uiRouter 3rd party library online for API information
 */
(function () {
    "use strict";

    function Routes($urlRouterProvider, $stateProvider, STATES) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state("root", {
                abstract: true,
                url: "/",
                templateUrl: "app/components/root/root.html",
                controller: "RootCtrl as Root"
            })
            .state("root.main", {
                abstract: true,
                views: {
                    page: {
                        templateUrl: "app/components/main/main.html"
                    }
                }
            })
            .state("root.main.body", {
                abstract: true,
                views: {
                    navBar: {
                        templateUrl: "app/components/navBar/navBar.html",
                        controller: "NavBarCtrl as NavBar"
                    },
                    pageHeader: {
                        templateUrl: "app/components/pageHeader/pageHeader.html",
                        controller: "PageHeaderCtrl as PageHeader"
                    },
                    body: {
                        template: "<div ui-view flex layout=\"column\"></div>"
                    }
                }
            })
            .state(STATES.HOME, {
                url: "home",
                templateUrl: "app/components/home/home.html",
                controller: "HomeCtrl as Home"
            })
            .state(STATES.BLOG, {
                url: "blog",
                templateUrl: "app/components/blog/blog.html",
                controller: "BlogCtrl as Blog"
            })
            .state(STATES.BLOG_SLUG, {
                url: "blog/:slug/:id",
                templateUrl: "app/components/blog/slug/slug.html",
                controller: "SlugCtrl as Slug",
                params: { post: null },
                onEnter: function(){
                     angular.element(document).find("body").addClass("slug-background");
                  },
                onExit: function(){
                    angular.element(document).find("body").removeClass("slug-background");
                }
            })
            .state(STATES.LOGIN, {
                url: "login",
                templateUrl: "app/components/login/login.html",
                controller: "LoginCtrl as Login",
                params: { message: null }
            })
            .state(STATES.PASSWORD_RESET, {
                url: "reset?token",
                templateUrl: "app/components/passwordReset/passwordReset.html",
                controller: "PasswordResetCtrl as Password"
            })
            .state(STATES.TRAIN_WITH_ME, {
                url: "trainWithMe",
                templateUrl: "app/components/trainWithMe/trainWithMe.html",
                controller: "TrainWithMeCtrl as TrainWithMe"
            })
            .state(STATES.TRAINER.MAIN, {
                url: "trainer",
                templateUrl: "app/components/trainer/trainer.html",
                controller: "TrainerCtrl as Trainer"
            })
            .state(STATES.CLIENT.MAIN, {
                url: "client",
                templateUrl: "app/components/client/client.html",
                controller: "ClientCtrl as Client"
            });
    }

    angular.module("mack")
        .config(Routes);

})();
