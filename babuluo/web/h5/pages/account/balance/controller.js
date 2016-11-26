angular.module('AndSell.H5.Main').controller('pages_account_balance_Controller', function ($scope, $state, $stateParams, balanceFactory,weUI) {

    $scope.balanceDetail = "收支明细";
    $scope.initLoad  = function () {
        $scope.uid = getCookie('ANDSELLID');
        $scope.queryFinanceListByUid($scope.uid);
    }

    $scope.queryFinanceListByUid = function(uid){
        var form = {};
        form['FINANCE_LIST.USER_ID'] = uid;
        balanceFactory.queryByUid(form, function (response) {
            $scope.balanceInfo = response.data;
            $scope.balance = $scope.balanceInfo[0]['FINANCE_LIST.BALANCE'];
            $scope.typeInfo = $scope.balanceInfo;
        })
    }

    $scope.initLoad();

    $scope.chooseType = function (type){
        console.log(type);
        if(type == 'null'){
            $scope.balanceInfo = $scope.typeInfo;
            $scope.balanceDetail = "收支明细";
        }
        else{
            if(type == 'decrease'){
                $scope.balanceDetail = "支出";
            }
            if(type == 'increase'){
                $scope.balanceDetail = "收入";
            }
            $scope.balanceInfo =[];
            var array = new Array();
            $scope.typeInfo.forEach(function (ele) {
                if(ele['FINANCE_LIST.CHANGE_TYPE'] == type){
                    array.push(ele);
                }
            })
            $scope.balanceInfo = array;
        }
        return $scope.balanceInfo;
    }
});




