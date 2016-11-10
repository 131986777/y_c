angular.module('app',[]).controller('login_Controller', function ($scope,$http) {

    $scope.login = function () {

        ajaxPost('http://localhost:8081/AndSell/bubu/login/login','LOGIN_ID='+$scope.userName+'&PWD='+$scope.password, function (response) {
            if (response.code == 400) {
              alert(response.msg);
            } else {
                window.location.href='http://localhost:8081/AndSell/app/main/main_index.html';
            }
        });

    }
});

