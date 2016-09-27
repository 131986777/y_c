"use strict";

angular.module('list', ['pencilService'])
    .controller("ListController", ["$scope", 'pencilFactory', function ($scope, pencilFactory) {

        //pencilFactory.getPencils().get({}, function (repsonce) {
        //    console.log(repsonce);
        //    $scope.list = repsonce.list;
        //}, null);

        pencilFactory.getComment().get({}, function (repsonce) {
            console.log(repsonce);
            $scope.list = repsonce.list;
        }, null);
        pencilFactory.getTag().get({}, function (repsonce) {
            console.log(repsonce);
            $scope.list = repsonce.list;
        }, null);
        pencilFactory.getCommentById(1001).get({}, function (repsonce) {
            console.log(repsonce);
            $scope.list = repsonce.list;
        }, null);



        $scope.edit = function (item) {
            $scope.itemEdited.NAME = item.NAME;
            $scope.itemEdited.PSTATE = item.PSTATE;
        };

        $scope.saveChage = function () {

        };

    }]);