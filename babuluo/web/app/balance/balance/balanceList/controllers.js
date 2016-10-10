AndSellMainModule.controller('balanceListController', function ($scope, $stateParams, balanceFactory, modalFactory) {
    modalFactory.setTitle('资金明细');
    modalFactory.setBottom(false);

    //获得所有资金明细
    $scope.bindData = function (response) {
        $scope.balanceList = response.data;
    };

    //根据用户ID查询用户个人信息以及账单流水信息
    $scope.queryById = function (memberId){
        $scope.accountList = {};
        $scope.privateInfo= {};
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID']=memberId;
         balanceFactory.queryMemberAccount(form).get({} ,function (response){
             $scope.accountList = response.data[0];
             $scope.privateInfo = response.extraData.member[0];
             console.log(response);
        });
    }

    //根据资金流向加载客户账单流水信息
    $scope.getBalanceByType = function (balanceType) {
        var newlist = [];
        var list = $scope.balanceList;
        for(var i=0 ;i<list.length;i++){
            if(list[i]['FINANCE_LIST.CHANGE_TYPE'] ==balanceType){
               newlist.push(list[i]);
            }
        }
        $scope.balanceList = newlist;
        console.log($scope.balanceList);
    };


    //动态计算账户余额
    $scope.getDynamicBala = function (){
        if($scope.value ==1){
            $scope.afterModify = parseInt($scope.accountList['MEMBER_ACCOUNT.BALANCE'])+ parseInt($scope.modifyvalue);
        }
        else if($scope.value ==0){
            $scope.afterModify = parseInt($scope.accountList['MEMBER_ACCOUNT.BALANCE'])- parseInt($scope.modifyvalue);
        }
        else {
            alert("请输入变更类型");
        }
    }

    //保存时更新账户余额
    $scope.saveAccount = function (accountList){
        $scope.accountList['MEMBER_ACCOUNT.BALANCE']=$scope.afterModify;
        balanceFactory.modMemberAccount($scope.accountList).get({}, function (response) {

            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
            }
        });

        /*balanceFactory.modMemberBalanceById (balanceList).get({}, function (response) {
            console.log("======");
            console.log(balanceList);
            $scope.balanceList['FINANCE_LIST.BALANCE']=$scope.afterModify;
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
            }
        });*/
    }



    //根据登录ID查询客户信息
    $scope.searchInfo = function (loginId){
        var form={};
        form['FINANCE_LIST.ID'] =loginId;
        balanceFactory.getMemberData(form).get({} ,function (response){
            $scope.balanceList = response.data;
        });
    }
});
