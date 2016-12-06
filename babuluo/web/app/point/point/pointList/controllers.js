angular.module('AndSell.Main').controller('point_point_pointList_Controller', function ($scope, $stateParams, memberFactory, pointFactory, modalFactory) {

    modalFactory.setTitle('积分管理');
    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        console.log(response);
        $scope.pointList = response.data;
    };

    $scope.queryById = function (loginId) {
        memberFactory.getMemberAccountByLoginId({'MEMBER.LOGIN_ID': loginId}, function (response) {
            if (response.data.length > 0) {
                $scope.memberDetail = response.data[0];
                $scope.memberDetail['MEMBER.POINT'] = response.extraData.memberAccount[0]['MEMBER_ACCOUNT.POINT'];
            } else {
                modalFactory.showShortAlert("查不到相关数据");
            }
        });

    }

    //根据登录ID查询财务信息
    $scope.queryPointByLoginId = function (content) {
        $scope.filter = {'MEMBER_POINT_LIST.CHANGE_TYPE':'null'};
        if (content != '') {

            var uid = 0;
            memberFactory.getUIDByLOGINID({'MEMBER.LOGIN_ID': content}, function (response) {
                var ret = response.data;
                if (ret.length > 0) {
                    $scope.filter['MEMBER_POINT_LIST.USER_ID'] = ret[0]['MEMBER.USER_ID'];
                } else {
                    modalFactory.showShortAlert('查不到相关信息');
                }
            });

            // if ($scope.searchType == 'LOGIN_ID') {
            //     var uid = 0;
            //     memberFactory.getUIDByLOGINID({'MEMBER.LOGIN_ID': content}, function (response) {
            //         var ret = response.data;
            //         if (ret.length > 0) {
            //             $scope.filter['MEMBER_POINT_LIST.USER_ID'] = ret[0]['MEMBER.USER_ID'];
            //         } else {
            //             modalFactory.showShortAlert('查不到相关信息');
            //         }
            //     });
            // } else if ($scope.searchType == 'PRICE') {
            //     $scope.filter['MEMBER_POINT_LIST.CHANGE_VALUE'] = Number(content) * 100;
            // } else if ($scope.searchType == 'CARD_NO') {
            //     $scope.filter['MEMBER_POINT_LIST.EVENT_CARD_NO'] = content;
            // }
        }
    }

    //动态计算账户余额
    $scope.getDynamicBala = function () {
        if ($scope.changeType == undefined) {
            modalFactory.showShortAlert("请输入变更类型");
            return;
        }
        if ($scope.modifyvalue == undefined || $scope.modifyvalue == '') {
            modalFactory.showShortAlert("请输入调整数值");
            return;
        }
        if ($scope.changeType == 1) {
            $scope.afterModify = parseInt($scope.memberDetail['MEMBER.POINT'])
                + parseInt($scope.modifyvalue);
        } else {
            $scope.afterModify = parseInt($scope.memberDetail['MEMBER.POINT'])
                - parseInt($scope.modifyvalue);
        }
    }

    //保存时更新账户余额
    $scope.saveAccount = function () {

        if (isEmptyObject($scope.memberDetail)) {
            modalFactory.showAlert("未选择客户");
            return;
        }

        if ($scope.afterModify < 0) {
            modalFactory.showAlert("减少积分不能超过用户剩余积分");
            return;
        }

        //修改积分详情表--FINANCE_LIST（添加操作记录）
        $scope.ModifyBalanceInfo = {};
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.POINT'] = $scope.memberDetail['MEMBER.POINT'];
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.SERVICE_ID'] = $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.EVENT'] = "后台";
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.EVENT_INTRO'] = $scope.introduction;
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.CHANGE_POINT'] = $scope.modifyvalue;
        $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.SERVICE_ID'] = $scope.memberDetail['MEMBER.SERVICE_ID'];
        if ($scope.changeType == 1) {
            $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.CHANGE_TYPE'] = 'increase';
        } else {
            $scope.ModifyBalanceInfo['MEMBER_POINT_LIST.CHANGE_TYPE'] = 'decrease';
        }
        pointFactory.addPointList($scope.ModifyBalanceInfo, function (response) {
            modalFactory.showShortAlert("积分调整成功");
            $("#point").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.empty = function () {
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
        $scope.memberDetail = null;
        $scope.memberId = null;
        $scope.changeType = null;
    }

    $scope.delete = function () {
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
    }
});


