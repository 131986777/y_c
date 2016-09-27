'use strict';

angular.module('list', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'nav': {
                        templateUrl : '../../components/nav/nav.html',
                    },
                    'footer': {
                        templateUrl : '../../components/footer/footer.html',
                    }
                }

            });
    
        $urlRouterProvider.otherwise('/');
    });