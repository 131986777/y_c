
angular.module("treeList", [])
    .controller("TreeListController", ["$scope", function($scope) {
        $scope.multimenuList = [{
            name: "parent1",
            childList: [{
                name: "child1",
                childList: [{
                    name: "child2"
                }]
            }]
        }];
        $scope.itemEdited = {};

    }]);
