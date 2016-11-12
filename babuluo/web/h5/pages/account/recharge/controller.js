angular.module('AndSell.H5.Main').controller('pages_account_recharge_Controller', function ($scope, $state, $stateParams, balanceFactory) {

    $scope.updateBalance  = function (){
        var form = {};
        balanceFactory.updateFinanceList().get({}, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
            $scope.userInfo = response.extraData.userMap;
            uid = getCookie('ANDSELLID')
            loginId = $scope.userInfo[uid];
            $scope.bindData(loginId);
        })
    }
});




