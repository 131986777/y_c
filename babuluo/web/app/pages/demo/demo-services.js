'use strict';

angular.module('demo')

        .constant('baseURL', 'http://localhost:3000/')

        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            this.getDishes = function(){
                
                return $resource(baseURL+"dishes/:id", null,  {'update':{method:'PUT' }});
            };

            this.getComment = function() {
                $resource(baseURL + 'dishes/:id/comments/:date', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            };

        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};
    
            corpfac.getLeaders = function() {

                return $resource(baseURL + 'leadership/:id', null);
            };

            return corpfac;
    
    
        }])

        .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getFeedback = function() {

                return $resource(baseURL + 'feedback/', null, {
                    'update': {method: 'PUT'}
                });
            };

        }]);
