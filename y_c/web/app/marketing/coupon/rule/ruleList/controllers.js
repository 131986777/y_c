angular.module('AndSell.Main').controller('marketing_coupon_rule_ruleList_Controller', function ($scope, $stateParams, couponFactory, modalFactory) {

    modalFactory.setTitle('优惠券规则列表');

    $scope.bindData = function (response) {
        $scope.couponList = {};
        $scope.couponList = response.data;
    };
    $scope.detailClick = function (item) {
        $scope.detail = item;
    }

    $scope.addRule = function () {
        couponFactory.addCouponRule($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = {};
            $scope.add['COUPON_RULE.TYPE'] = '1';
            $("#addRule").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };
    $scope.modifyClick = function (item) {

        $scope.mod = clone(item);
        $scope.mod['COUPON_RULE.ID'] = item['COUPON_RULE.ID'];
        if (item['COUPON_RULE.TYPE'] == 1 || item['COUPON_RULE.TYPE'] == 3) {
            $scope.mod['COUPON_RULE.FACE_VALUE'] = (item['COUPON_RULE.FACE_VALUE']
            / 100).toFixed(2);
        } else {
            $scope.mod['COUPON_RULE.FACE_VALUE'] = (item['COUPON_RULE.FACE_VALUE'] / 10).toFixed(1);
        }

        $scope.mod['COUPON_RULE.CONDITION_PRICE'] = (item['COUPON_RULE.CONDITION_PRICE']
        / 100).toFixed(2);
        $scope.mod['COUPON_RULE.MAX_PRICE_LIMIT'] = (item['COUPON_RULE.MAX_PRICE_LIMIT']
        / 100).toFixed(2);

    };

    $scope.modRule = function () {
        couponFactory.modifyCouponRule($scope.mod, function (response) {
            $("#couponMod").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.stopCoupon = function (item) {
        if (item['COUPON_RULE.STATE'] == 1) {
            modalFactory.showAlert("确认停用吗?", function () {
                item['COUPON_RULE.STATE'] = -1;
                couponFactory.stopCouponRuleById(item, function (res) {
                    modalFactory.showShortAlert("停用成功");
                    $scope.$broadcast('pageBar.reload');
                });
            });
        } else {
            item['COUPON_RULE.STATE'] = 1;
            couponFactory.stopCouponRuleById(item, function (res) {
                modalFactory.showShortAlert("启用成功");
                $scope.$broadcast('pageBar.reload');
            });
        }

    };

    //delCoupon
    $scope.delCoupon = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            couponFactory.delCouponRule(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });
    }

});
