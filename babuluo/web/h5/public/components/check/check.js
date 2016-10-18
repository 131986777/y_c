angular.module('myCheck', [])
    .directive('myCheck', function() {
        return {
            restrict: 'E',
            scope: {
                item: '='
            },
            transclude: true,
            templateUrl: '../../public/components/check/check.html'
        };
    });
