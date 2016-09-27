"use strict";

angular.module('demo')

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    $scope.showDish = true;
    $scope.message = 'Loading ...';
    $scope.dish = {};
    $scope.dish.id = 0;

    menuFactory.getDishes().get({
        id: parseInt($scope.dish.id, 10)
    }).$promise.then(function(response) {
        $scope.dish = response;
        $scope.showDish = true;
    }, function(response) {
        $scope.mssage = 'Error: ' + response.status + '' + response.statusText;
    });
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.mycomment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };

    $scope.commentEdited = {};

    $scope.editComment = function(comment) {
        $scope.commentEdited = comment;
    };

    $scope.saveComment = function() {
        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);

        $("#editComment").modal("hide");
    };

    $scope.submitComment = function() {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);

        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    };
}]);
