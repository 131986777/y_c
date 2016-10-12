AndSellMainModule.controller('pointListController', function ($scope, $stateParams, pointFactory, modalFactory) {

    modalFactory.setTitle('积分管理');
    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        //console.log(response);
        $scope.pointList = response.data;
        $scope.userDetailMap = response.extraData.userDetailMap;
    };

    $scope.queryById = function (memberId){
        $scope.memberDetail = $scope.userDetailMap[memberId];

    }

    //根据登录ID查询财务信息
    $scope.queryPointByLoginId = function(loginId){
        $scope.roundList =$scope.pointList;
        $scope.pointList =[];
        for(var i=0;i< $scope.roundList.length;i++){
            console.log($scope.roundList[i]);
            if( $scope.roundList[i]['MEMBER_POINT_LIST.LOGIN_ID']==loginId){
                $scope.pointList.push($scope.roundList[i]);

            }
        }

    }

    //动态计算账户余额
    $scope.getDynamicBala = function (){
        if($scope.changeType ==1){
            $scope.afterModify = parseInt($scope.memberDetail['MEMBER.POINT'])+ parseInt($scope.modifyvalue);
        }
        else if($scope.changeType ==0){
            $scope.afterModify = parseInt($scope.memberDetail['MEMBER.POINT'])- parseInt($scope.modifyvalue);
        }
        else {
            alert("请输入变更类型");
        }
    }

    //保存时更新账户余额
    $scope.saveAccount = function (){

        //修改用户账户表--MEMBER_ACCOUNT
        $scope.ModifyInfo = {};
        $scope.ModifyInfo['MEMBER_ACCOUNT.POINT']=$scope.afterModify;
        $scope.ModifyInfo['MEMBER_ACCOUNT.USER_ID']= $scope.memberDetail['MEMBER.USER_ID'];;
        pointFactory.modMemberAccount($scope.ModifyInfo).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
            }
        });

        //修改积分详情表--FINANCE_LIST（添加操作记录）
        $scope.ModifyBalanceInfo = {};

        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.POINT']=$scope.afterModify;
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.USER_ID']= $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.SERVICE_ID']= $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.EVENT']= "手动更改";
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.EVENT_INTRO']= $scope.introduction;
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.CHANGE_POINT']=$scope.modifyvalue;
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.SERVICE_ID']= $scope.memberDetail['MEMBER.SERVICE_ID'];
        if($scope.changeType == 1){
            $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.CHANGE_TYPE']= 'increase';
        }
        else{
            $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.CHANGE_TYPE']= 'decrease';
        }
        pointFactory.addFinanceList ($scope.ModifyBalanceInfo).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
            }
        });
    }

});


