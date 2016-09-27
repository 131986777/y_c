"use strict";

angular.module('list')
.controller("ListController", ["$scope", function($scope) {
	$scope.list = [{
		name: "list1",
		type: "type1"
	}, {
		name: "lsit2",
		type: "type2"
	}];

	$scope.edit = function(menu) {
        $scope.itemEdited = menu;
    };

    $scope.saveChage = function() {

    };
}]);