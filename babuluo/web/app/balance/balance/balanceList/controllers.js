angular.module('AndSell.Main').controller('balance_balance_balanceList_Controller', function ($scope, $stateParams, balanceFactory, modalFactory) {
    modalFactory.setTitle('资金明细');
    modalFactory.setBottom(false);

    //获得所有资金明细
    $scope.bindData = function (response) {
        console.log(response);
        $scope.balanceList = response.data;
        $scope.searchlist = response.data;
        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.userFininanceMap = response.extraData.userFininanceMap;
    };

    //根据用户ID查询用户个人信息
    $scope.queryById = function (memberId){
        $scope.memberDetail = $scope.userDetailMap[memberId];
        console.log($scope.memberDetail);
    }

    //动态计算账户余额
    $scope.getDynamicBala = function (){
        if($scope.changeType ==1){
            $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])+ parseFloat($scope.modifyvalue)).toFixed(2);
        }
        else if($scope.changeType ==0){
            $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])- parseFloat($scope.modifyvalue)).toFixed(2);
        }
        else {
            alert("请输入变更类型");
        }
    }

    //保存时更新账户余额
    $scope.saveAccount = function (){

        //给资金明细表添加记录--FINANCE_LIST（添加操作记录）
        $scope.ModifyBalanceInfo = {};
        $scope.ModifyBalanceInfo['FINANCE_LIST.BALANCE']=$scope.memberDetail['MEMBER.BALANCE'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.USER_ID']= $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.SERVICE_ID']= $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT']= "手动更改";
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT_INTRO']= $scope.introduction;
        $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_VALUE']= $scope.modifyvalue;
        if($scope.changeType == 1){
            $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_TYPE']= 'increase';
        }
        else{
            $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_TYPE']= 'decrease';
        }
        balanceFactory.addFinanceList ($scope.ModifyBalanceInfo).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
            }
        });
        $scope.$broadcast('pageBar.reload');
    }

    //根据登录ID查询财务信息
    $scope.queryFinanceByLoginId = function(loginId){
        console.log(loginId);
        if(loginId == null||loginId == ''){
            $scope.balanceList = $scope.searchlist ;
        }else {
            $scope.roundList =$scope.searchlist;
            $scope.balanceList =[];
            for(var i=0;i< $scope.roundList.length;i++){
                if( $scope.roundList[i]['FINANCE_LIST.LOGIN_ID']==loginId){
                    $scope.balanceList.push($scope.roundList[i]);
                }
            }
        }
        return $scope.balanceList;
    }

    $scope.delete = function (){
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
    }

    $scope.empty = function (){
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
        $scope.memberDetail = null;
        $scope.memberId = null;
        $scope.changeType = null;
    }

    $scope.fun = function (){
        var node = document.getElementById("hello");
        node.style.color = "black";
    }
});
