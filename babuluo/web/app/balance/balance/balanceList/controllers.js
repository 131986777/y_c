angular.module('AndSell.Main').controller('balance_balance_balanceList_Controller', function ($scope, $stateParams, balanceFactory, modalFactory) {
    modalFactory.setTitle('资金明细');
    modalFactory.setBottom(false);

    //获得所有资金明细
    $scope.bindData = function (response) {
        $scope.balanceList = response.data;
        $scope.searchlist = response.data;
        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.userFininanceMap = response.extraData.userFininanceMap;
    };

    //根据用户ID查询用户个人信息
    $scope.queryById = function (memberId) {
        $scope.memberDetail = $scope.userDetailMap[memberId];
    }

    //动态计算账户余额
    $scope.getDynamicBala = function () {
        if ($scope.changeType == 1) {
            $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])
            + parseFloat($scope.modifyvalue)).toFixed(2);
        } else if ($scope.changeType == 0) {
            $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])
            - parseFloat($scope.modifyvalue)).toFixed(2);
        } else {
            modalFactory.showShortAlert("请输入变更类型");
        }

    }

    //保存时更新账户余额
    $scope.saveAccount = function () {

        if (isEmptyObject($scope.memberDetail)) {
            modalFactory.showAlert("未选择客户");
            return;
        }

        if ($scope.afterModify < 0) {
            modalFactory.showAlert("减少金额不能超过用户余额");
            return;
        }
        //给资金明细表添加记录--FINANCE_LIST（添加操作记录）
        $scope.ModifyBalanceInfo = {};
        $scope.ModifyBalanceInfo['FINANCE_LIST.BALANCE'] = $scope.memberDetail['MEMBER.BALANCE'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.SERVICE_ID'] = $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT'] = "后台更改";
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT_INTRO'] = $scope.introduction;
        $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_VALUE'] = $scope.modifyvalue;
        if ($scope.changeType == 1) {
            $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_TYPE'] = 'increase';
        } else {
            $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_TYPE'] = 'decrease';
        }
        balanceFactory.addFinanceList($scope.ModifyBalanceInfo, function (response) {
            modalFactory.showShortAlert("资金调整成功");
            $("#balance").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    //根据登录ID查询财务信息
    $scope.queryFinanceByLoginId = function (loginId) {
        console.log(loginId);
        if (loginId == null || loginId == '') {
            $scope.balanceList = $scope.searchlist;
        } else {
            $scope.roundList = $scope.searchlist;
            $scope.balanceList = [];
            for (var i = 0; i < $scope.roundList.length; i++) {
                if ($scope.roundList[i]['FINANCE_LIST.LOGIN_ID'] == loginId) {
                    $scope.balanceList.push($scope.roundList[i]);
                }
            }
        }
        return $scope.balanceList;
    }

    $scope.delete = function () {
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
    }

    $scope.empty = function () {
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
        $scope.memberDetail = null;
        $scope.memberId = null;
        $scope.changeType = null;
    }

    $scope.fun = function () {
        var node = document.getElementById("hello");
        node.style.color = "black";
    }
});
