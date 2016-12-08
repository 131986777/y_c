angular.module('AndSell.Main').controller('balance_balance_balanceList_Controller', function ($q, $scope, $stateParams, cardFactory, memberFactory, balanceFactory, modalFactory, shopFactory) {
    modalFactory.setTitle('资金明细');
    modalFactory.setBottom(false);

    var deferred_balance = $q.defer();
    var deferred_shop = $q.defer();

    //获得所有资金明细
    $scope.bindData = function (response) {
        $scope.balanceList = response.data;
        if ($scope.shopMap == undefined) {
            deferred_balance.resolve(response);
        } else {
            $scope.balanceList.forEach(function (ele) {
                if (ele['FINANCE_LIST.SHOP_ID'] != undefined) {
                    ele['FINANCE_LIST.SHOP_NAME'] = $scope.shopMap[ele['FINANCE_LIST.SHOP_ID']]['SHOP.SHOP_NAME'];
                }
            });
        }
    };

    $scope.initData = function () {
        $scope.getShop();
    }

    $scope.getShop = function () {
        shopFactory.getShopList({}, function (response) {
            $scope.shopList = response.data;
            $scope.shopMap = listToMap($scope.shopList, 'SHOP.SHOP_ID');
            deferred_shop.resolve(response);
        });
    }

    $q.all([deferred_balance.promise, deferred_shop.promise]).then(function (result) {
        $scope.balanceList.forEach(function (ele) {
            if (ele['FINANCE_LIST.SHOP_ID'] != undefined) {
                ele['FINANCE_LIST.SHOP_NAME'] = $scope.shopMap[ele['FINANCE_LIST.SHOP_ID']]['SHOP.SHOP_NAME'];
            }
        });
    })

    //根据用户ID查询用户个人信息
    $scope.queryById = function (loginId) {
        if (loginId == '') {
            $scope.$broadcast('pageBar.reload');
            return;
        }
        $scope.memberDetail = {};
        $scope.cardList = {};
        memberFactory.getCardByLoginId({'MEMBER.LOGIN_ID': loginId}, function (response) {
            if (response.data.length > 0) {
                $scope.memberDetail['MEMBER.USER_ID'] = response.extraData.member['MEMBER.USER_ID'];
                var tempMOBILE = response.extraData.member['MEMBER.MOBILE'];
                var tempEMAIL = response.extraData.member['MEMBER.EMAIL'];
                $scope.cardList = response.data;
                var map = {};
                var money = 0;
                $scope.cardList.forEach(function (ele) {
                    map[ele['MEMBER_CARD.CARD_ID']] = ele;
                    money = money + Number(ele['MEMBER_CARD.BALANCE']);
                });
                $scope.cardMap = map;
                $scope.cardTotalMoney = moneyFormat(money);

                cardFactory.getMemberInfoByUserId({'MEMBER_INFO.USER_ID': response.extraData.member['MEMBER.USER_ID']}, function (response1) {
                    $scope.memberDetail['MEMBER.USER_NAME'] = response1.data[0]['MEMBER_INFO.TRUE_NAME'];
                    $scope.memberDetail['MEMBER.MOBILE'] = tempMOBILE;
                    $scope.memberDetail['MEMBER.EMAIL'] = tempEMAIL;
                });
            } else {
                modalFactory.showShortAlert("查不到相关数据");
            }
        });
    };

    $scope.getCardBalance = function (id) {
        var card = $scope.cardMap[id];
        if (card != undefined) {
            $scope.memberDetail['MEMBER.BALANCE'] = card['MEMBER_CARD.BALANCE'] / 100;
            $scope.memberDetail['MEMBER.CARD_ID'] = card['MEMBER_CARD.CARD_ID'];
            $scope.memberDetail['MEMBER.CARD_NO'] = card['MEMBER_CARD.CARD_NO'];
            $scope.memberDetail.select = true;
        } else {
            $scope.memberDetail['MEMBER.BALANCE'] = undefined;
            $scope.memberDetail['MEMBER.CARD_ID'] = undefined;
            $scope.memberDetail['MEMBER.CARD_NO'] = undefined;
            $scope.memberDetail.select = false;
        }
    };

    //动态计算账户余额
    $scope.getDynamicBala = function () {
        if ($scope.changeType == undefined) {
            modalFactory.showShortAlert("请输入变更类型");
            return false;
        }
        if ($scope.modifyvalue == undefined || $scope.modifyvalue == '') {
            modalFactory.showShortAlert("请输入调整数值");
            return false;
        }
        if ($scope.memberDetail['MEMBER.CARD_NO'] != undefined) {
            if ($scope.changeType == 1) {
                $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])
                + parseFloat($scope.modifyvalue)).toFixed(2);
            } else {
                $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])
                - parseFloat($scope.modifyvalue)).toFixed(2);
            }
        } else {
            if ($scope.changeType == 1) {
                $scope.afterModify = (parseFloat($scope.cardTotalMoney)
                + parseFloat($scope.modifyvalue)).toFixed(2);
            } else {
                $scope.afterModify = (parseFloat($scope.cardTotalMoney)
                - parseFloat($scope.modifyvalue)).toFixed(2);
            }
        }
        return true;
    }

    //保存时更新账户余额
    $scope.saveAccount = function () {
        if (!$scope.getDynamicBala()) {
            return;
        }
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
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_BALANCE'] = $scope.memberDetail['MEMBER.BALANCE'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_ID'] = $scope.memberDetail['MEMBER.CARD_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_NO'] = $scope.memberDetail['MEMBER.CARD_NO'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.SERVICE_ID'] = $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT'] = "后台";
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
    $scope.queryFinanceByLoginId = function (content) {
        $scope.filter = {'FINANCE_LIST.CHANGE_TYPE': 'null'};
        if (content != '') {

            if ($scope.searchType == 'LOGIN_ID') {
                var uid = 0;
                memberFactory.getUIDByLOGINID({'MEMBER.LOGIN_ID': content}, function (response) {
                    var ret = response.data;
                    if (ret.length > 0) {
                        $scope.filter['FINANCE_LIST.USER_ID'] = ret[0]['MEMBER.USER_ID'];
                    } else {
                        modalFactory.showShortAlert('查不到相关信息');
                    }
                });
            } else if ($scope.searchType == 'PRICE') {
                $scope.filter['FINANCE_LIST.CHANGE_VALUE'] = Number(content) * 100;
            } else if ($scope.searchType == 'CARD_NO') {
                $scope.filter['FINANCE_LIST.EVENT_CARD_NO'] = content;
            }
        }
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
        $scope.cardList = undefined;
        $scope.MEMBER_CARD_ID = 'null';
        $scope.changeType = 1;
        $scope.cardTotalMoney = 0;
    }

    $scope.fun = function () {
        var node = document.getElementById("hello");
        node.style.color = "black";
    }
});
