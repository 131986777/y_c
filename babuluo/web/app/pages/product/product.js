'use strict';

angular.module('product', ['ui.router', 'ngResource', 'treeList',
        'jiaOrder.service', 'jiaOrder.ui', 'ngTagsInput', 'nya.bootstrap.select'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        // route for the home page
            .state('product', {
                url:'/',
                views: {
                    'nav': {
                        templateUrl: '../../components/nav/nav.html'
                    },
                    'footer': {
                        templateUrl: '../../components/footer/footer.html'
                    },
                    'add-product': {
                        templateUrl: 'add-product.jsp',
                        controller: 'AddProductController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });