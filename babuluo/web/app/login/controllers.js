angular.module('app',[]).controller('login_Controller', function ($scope,$http) {

    $scope.login = function () {  
        ajaxPost('/AndSell/bubu/login/login','LOGIN_ID='+$scope.userName+'&PWD='+$scope.password, function (response) {
            console.log(response);
            if (JSON.parse(response).code == 0) {
                window.location.href='../main/main_index.html';
            } else {
                alert(JSON.parse(response).msg);
            }
        });
    }
});

