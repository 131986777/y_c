"use strict";

angular.module("sortedList")
    .controller("SortListController", ["$scope", function($scope) {
        $scope.sortedList = [{
            index: 0,
            name: "list1"
        }, {
            index: 1,
            name: "list2"
        }, {
            index: 2,
            name: "list3"
        }];

        $scope.down = function(item) {
            var nextItem = $scope.sortedList[item.index + 1];

            $scope.sortedList.splice(item.index, 2, nextItem, item);
            item.index++;
            nextItem.index--;
        };

        $scope.up = function(item) {
            var preItem = $scope.sortedList[item.index - 1];

            $scope.sortedList.splice(preItem.index, 2, item, preItem);
            item.index--;
            preItem.index++;
        };

    }]);
