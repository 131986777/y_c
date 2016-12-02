angular.module('AndSell.Main').controller('marketing_sales_rule_ruleAdd_Controller', function ($scope, $http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);
    modalFactory.setTitle('新增促销规则');

    $scope.memberId = $stateParams.id;
    $scope.serviceId = $stateParams.serviceId;

    var array = new Array();
    $scope.saveCurrentInfo = function (num) {
        if ($scope.salesInfo['SALES.SALE_TYPE'] == 3) {
            var str = '{'
                + '"ProId"'
                + ':'
                + $scope.productId
                + ','
                + '"Num"'
                + ':'
                + $scope.salesInfo['SALES.PRONUM' + num]
                + '}';
        } else {
            var str = '{'
                + '"ProId"'
                + ':'
                + $scope.couponId
                + ','
                + '"Num"'
                + ':'
                + $scope.salesInfo['SALES.PRONUM' + num]
                + '}';
        }
        array.push(str);
        $scope.salesDetailInfo = array;
    }

    $scope.bindData = function (form) {
        form['SALES.SERVICE_ID'] = $scope.serviceId;
        form['SALES.PROID'] = $scope.product;
        if (form['SALES.SALE_TYPE'] == 3 || form['SALES.SALE_TYPE'] == 4) {
            form['SALES.SALE_CONTENT1'] = $scope.salesDetailInfo[0];
            form['SALES.SALE_CONTENT2'] = $scope.salesDetailInfo[1];
            form['SALES.SALE_CONTENT3'] = $scope.salesDetailInfo[2];
            form['SALES.SALE_CONTENT4'] = $scope.salesDetailInfo[3];
            form['SALES.SALE_CONTENT5'] = $scope.salesDetailInfo[4];
            form['SALES.SALE_CONTENT6'] = $scope.salesDetailInfo[5];
        } else if (form['SALES.SALE_TYPE'] == 2) {
            form['SALES.SALE_CONTENT1'] = form['SALES.SALE_CONTENT1'] * 10;
            form['SALES.SALE_CONTENT2'] = form['SALES.SALE_CONTENT2'] * 10;
            form['SALES.SALE_CONTENT3'] = form['SALES.SALE_CONTENT3'] * 10;
            form['SALES.SALE_CONTENT4'] = form['SALES.SALE_CONTENT4'] * 10;
            form['SALES.SALE_CONTENT5'] = form['SALES.SALE_CONTENT5'] * 10;
            form['SALES.SALE_CONTENT6'] = form['SALES.SALE_CONTENT6'] * 10;
        }
        if (form['SALES.CONDITION_TYPE'] == true) {
            form['SALES.CONDITION_TYPE'] = 2;
        } else {
            form['SALES.CONDITION_TYPE'] = 1;
        }
        form['SALES.SALE_TARGET'] = $scope.memberId;
        return form;
    }

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        console.log($scope.salesInfo);
        if ($scope.salesInfo == undefined) {
            modalFactory.showAlert("请填写完整信息");
            $scope.empty();
        } else if ($scope.salesInfo['SALES.NAME']
            == undefined
            || $scope.salesInfo['SALES.INTRO']
            == undefined) {
            modalFactory.showShortAlert("请填写完整信息");
        } else if ($scope.salesInfo['SALES.CONDITION_NUM1'] == undefined) {
            modalFactory.showShortAlert("请填写完整信息");
        } else {
            var form = $scope.bindData($scope.salesInfo);
            salesFactory.AddSales(form, function (response) {
                modalFactory.showShortAlert("保存成功");
                $scope.empty();
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    });

    //清空所有表单信息
    $scope.empty = function () {
        $scope.salesInfo = null;
    }
    //清空部分表单信息
    $scope.enEmpty = function (num) {
        if (num == 1 || num == 2) {
            $scope.salesInfo['SALES.SALE_CONTENT1'] = null;
            $scope.salesInfo['SALES.CONDITION_NUM1'] = null;
            $scope.salesInfo['SALES.PRONUM1'] = null;
        } else if (num == 3 || num == 4) {
            $scope.salesInfo['SALES.SALE_CONTENT1'] = null;
            $scope.salesInfo['SALES.CONDITION_NUM1'] = null;
            $scope.salesInfo['SALES.PRONUM1'] = null;
            for (var i = 1; i <= 7; i++) {
                $("#A" + i).text('（选择赠送商品）');
                $("#B" + i).text('（选择赠送优惠券）');
                $("#C" + i).text('（选择赠送商品）');
                $("#D" + i).text('（选择赠送优惠券）');
            }
        }
    }

    //前台传参
    $scope.getNum = function (num) {
        $scope.num = num;
    }

    $scope.prdItemSwitch = function (data) {
        if ($scope.memberId == 1) {
            $scope.productId = data['SHOP_PRODUCT_SKU.SKU_ID'];
            $scope.productName = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
            var num = $scope.num;
            $("#A" + num).text($scope.productName);
            data = null;
            $scope.$broadcast('pageBar.reload');
        } else {
            $scope.productId = data['SHOP_PRODUCT_SKU.SKU_ID'];
            $scope.productName = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
            var num = $scope.num;
            $("#C" + num).text($scope.productName);
            data = null;
            $scope.$broadcast('pageBar.reload');
        }
    };

    $scope.couponItemSwitch = function (data) {
        if ($scope.memberId == 1) {
            console.log(data);
            $scope.couponId = data['COUPON.ID'];
            $scope.couponName = data['COUPON.NAME'];
            var tag = $scope.num;
            $("#B" + tag).text($scope.couponName);
            data = null;
            $scope.$broadcast('pageBar.reload');
        } else {
            $scope.couponId = data['COUPON.ID'];
            $scope.couponName = data['COUPON.NAME'];
            var tag = $scope.num;
            $("#D" + tag).text($scope.couponName);
            data = null;
            $scope.$broadcast('pageBar.reload');
        }
    }

    //前端Jquery逻辑
    $(function () {
        $('.checkbox').click(function () {
            if ($('#meiman').is(":checked")) {
                $('.meimanjian-ruler').removeClass('hidden');
                $('.manjian-ruler').addClass('hidden');
            } else {
                $('.meimanjian-ruler').addClass('hidden');
                $('.manjian-ruler').removeClass('hidden');
            }
        });

        var len = $('.radio').length;
        for (var i = 0; i < len; i++) {
            $('.radio').eq(i).click(function () {
                //点击显示
                $(this).children('.content').removeClass('hidden');
                $(this).siblings().children('.content').addClass('hidden');
            });
        }
        ;

        $('.addItem').on("click", function () {
            var a = $(this).parents('.content'), b = a.find('.hidden');
            if (b.length == 1) {
                b.eq(0).removeClass('hidden');
                $(this).addClass('hidden');
            } else {
                b.eq(0).removeClass('hidden');
            }
        });
        $('.itemDel').click(function () {
            $(this).parents('.detailBox').addClass('hidden');
            if ($(this).parents('.content').find('.hidden').length < 6) {
                $('.content').children('.addItem').removeClass('hidden');
            }
        });
    })
});