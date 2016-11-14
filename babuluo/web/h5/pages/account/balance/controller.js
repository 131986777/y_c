angular.module('AndSell.H5.Main').controller('pages_account_balance_Controller', function ($scope, $state, $stateParams, balanceFactory) {


    $scope.initLoad  = function (){
        balanceFactory.queryAll({}, function (response) {
            $scope.balanceInfo = response.data;
            $scope.userInfo = response.extraData.userMap;
            uid = getCookie('ANDSELLID');
            loginId = $scope.userInfo[$scope.uid];
            $scope.bindData(loginId);
        })
    }

    $scope.initLoad();

    $scope.bindData = function (loginId){
        var array = new Array();
        $scope.balanceInfo.forEach(function(ele){
            if(ele['FINANCE_LIST.LOGIN_ID'] == loginId){
                array.push(ele);
            }
        })
        $scope.ckeckedList = array;
        $scope.balanceList = $scope.ckeckedList;
    }

    $scope.chooseType = function (type){
        console.log(type);
        if(type == 'null'){
            $scope.ckeckedList = $scope.balanceList;
        }
        else{
            var array = new Array();
            $scope.ckeckedList = $scope.balanceList;
            $scope.ckeckedList.forEach(function (ele) {
                if(ele['FINANCE_LIST.CHANGE_TYPE'] == type){
                    array.push(ele);
                }
            })
            $scope.ckeckedList = array;
        }
        return $scope.ckeckedList;
    }
});




