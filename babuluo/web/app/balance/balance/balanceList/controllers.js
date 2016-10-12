AndSellMainModule.controller('balanceListController', function ($scope, $stateParams, balanceFactory, modalFactory) {
    modalFactory.setTitle('资金明细');
    modalFactory.setBottom(false);

    //获得所有资金明细
    $scope.bindData = function (response) {
        $scope.balanceList ={};

        $scope.balanceList = response.data;
        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.userFininanceMap = response.extraData.userFininanceMap;
        console.log(response);
    };

    //根据用户ID查询用户个人信息
    $scope.queryById = function (memberId){
        $scope.memberDetail = $scope.userDetailMap[memberId];

    }

    //动态计算账户余额
    $scope.getDynamicBala = function (){
        if($scope.changeType ==1){
            console.log($scope.modifyvalue);
            $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])+ parseFloat($scope.modifyvalue)).toFixed(2);
        }
        else if($scope.changeType ==0){
            $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])- parseFloat($scope.modifyvalue)).toFixed(2);
            console.log($scope.afterModify);
        }
        else {
            alert("请输入变更类型");
        }
    }

    //保存时更新账户余额
    $scope.saveAccount = function (){

        //修改用户资金表--MEMBER_ACCOUNT
        $scope.ModifyInfo = {};
        $scope.ModifyInfo['MEMBER_ACCOUNT.BALANCE']=$scope.afterModify*100;
        $scope.ModifyInfo['MEMBER_ACCOUNT.USER_ID']= $scope.memberDetail['MEMBER.USER_ID'];
        balanceFactory.modMemberAccount($scope.ModifyInfo).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
            }
        });

        //修改余额表--FINANCE_LIST（添加操作记录）
        $scope.ModifyBalanceInfo = {};
        $scope.ModifyBalanceInfo['FINANCE_LIST.BALANCE']=$scope.afterModify*100;
        $scope.ModifyBalanceInfo['FINANCE_LIST.USER_ID']= $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.SERVICE_ID']= $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT']= "手动更改";
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT_INTRO']= $scope.introduction;
        console.log($scope.introduction);
        $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_VALUE']= $scope.modifyvalue*100;
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
    }

    //根据登录ID查询财务信息
    $scope.queryFinanceByLoginId = function(loginId){

        //$scope.balanceList = {};
        //$scope.balanceList[0] = $scope.userFininanceMap[loginId];

        $scope.roundList =$scope.balanceList;
        $scope.balanceList =[];
        for(var i=0;i< $scope.roundList.length;i++){
            if( $scope.roundList[i]['FINANCE_LIST.LOGIN_ID']==loginId){
                console.log($scope.roundList[i]);
                $scope.balanceList.push($scope.roundList[i]);

            }
        }
    }
});
