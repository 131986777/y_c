angular.module('app',[]).controller('login_Controller', function ($scope) {

    $scope.login = function () {
        ajaxPost('/AndSell/bubu/login/userLogin','LOGIN_ID='+$scope.userName+'&PWD='+$scope.password, function (response) {
            console.log(response);
            if (JSON.parse(response).code == 0) {
                var isShop = JSON.parse(response).extraData.IS_SHOP;

                if(undefined == isShop || isShop == null || isShop == "false"){
                    window.location.href='../main/main_index.html';
                }else{
                    window.location.href='../main/main_shop.html';
                }

            } else {
                alert(JSON.parse(response).msg);
            }
        });
    }
});

