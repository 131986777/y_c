"use strict";

angular.module("sortedList",['pencilService'])
    .controller("SortListController", ["$scope", "pencilFactory", function ($scope, pencilFactory) {

        pencilFactory.getPencils().get({}, function (repsonce) {
            console.log(repsonce);
            $scope.sortedList = repsonce.list;
            $scope.sortedList.forEach(function (ele, index, arr) {
                ele.index = index;
            });
        }, null);


        $scope.down = function (item) {
            var nextItem = $scope.sortedList[item.index + 1];

            $scope.sortedList.splice(item.index, 2, nextItem, item);
            item.index++;
            nextItem.index--;
        };

        $scope.up = function (item) {
            var preItem = $scope.sortedList[item.index - 1];

            $scope.sortedList.splice(preItem.index, 2, item, preItem);
            item.index--;
            preItem.index++;
        };

    }]);
