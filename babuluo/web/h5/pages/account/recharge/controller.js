angular.module('AndSell.H5.Main').controller('pages_account_recharge_Controller', function ($scope, $state, $stateParams, balanceFactory ,weUI) {


    $scope.initLoad  = function () {
        $scope.uid = getCookie('ANDSELLID');
        $scope.queryAccount($scope.uid);
    }

    $scope.queryAccount = function (uid){
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = uid;
        balanceFactory.queryAccountByUid(form, function (response) {
            console.log(response);
            $scope.balanceInfo = response.data;
            $scope.serviceId = $scope.balanceInfo[0]['MEMBER_ACCOUNT.SERVICE_ID'];
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }

    $scope.updateBalance  = function (){
        if($scope.balanceInfo['CHANGE_VALUE'] = undefined){
            weUI.toast.error('请输入充值金额');
        }else if($scope.addressType = undefined){
            weUI.toast.error('请选择充值方式');
        }
        var form = {};
        form['FINANCE_LIST.BALANCE'] = $scope.balanceInfo[0]['MEMBER_ACCOUNT.BALANCE'];
        form['FINANCE_LIST.SERVICE_ID'] =$scope.serviceId;
        form['FINANCE_LIST.USER_ID'] = $scope.uid;
        form['FINANCE_LIST.CHANGE_VALUE'] = $scope.balanceInfo['CHANGE_VALUE'];
        if($scope.addressType == 0){
            form['FINANCE_LIST.EVENT'] = '微信充值';
        }
        else {
            form['FINANCE_LIST.EVENT'] = '支付宝充值';
        }
        form['FINANCE_LIST.CHANGE_TYPE'] = 'increase';
        balanceFactory.updateFinanceList(form, function (response) {
            console.log(form);
            weUI.toast.ok('充值成功');
            $state.go('pages/account/balance');
        }, function (response) {
            weUI.toast.error(response.msg);
        });
    }
    $scope.initLoad();
});




