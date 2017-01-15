angular.module('AndSell.PC.Main').controller('pages_account_balance_Controller', function (productFactory, $interval, $scope, $state, modalFactory, balanceFactory) {

    modalFactory.setTitle("账户明细");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);
    modalFactory.setCateGory(true);


    $scope.balanceDetail = "收支明细";
    $scope.initLoad  = function () {
        $scope.uid = getCookie('ANDSELLID');
        $scope.queryFinanceListByUid($scope.uid);
        $scope.queryAccountListByUid($scope.uid);
    }

    $scope.queryFinanceListByUid = function(uid){
        var form = {};
        form['FINANCE_LIST.USER_ID'] = uid;
        balanceFactory.queryByUid(form, function (response) {
            $scope.balanceInfo = response.data;
            $scope.typeInfo = $scope.balanceInfo;
        });
    }

    $scope.queryAccountListByUid = function(uid){
        var form = {};
        form['FINANCE_LIST.USER_ID'] = uid;
        balanceFactory.queryAccountByUid(form, function (response) {
            $scope.balance = response.data[0]['MEMBER_ACCOUNT.BALANCE'];
        });
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
