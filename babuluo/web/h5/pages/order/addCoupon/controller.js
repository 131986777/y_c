angular.module('AndSell.H5.Main').controller('pages_order_addCoupon_Controller', function ($scope, $state, $stateParams, personalFactory, modalFactory) {

    modalFactory.setTitle('可用优惠券');
   // modalFactory.setBottom(true);

    console.log(789);

    $scope.orderList = JSON.parse($stateParams.PRODUCTS);     //所有的订单信息
    $scope.totalMoney = Math.round($stateParams.MONEY);       //目前订单的总价
    console.log($scope.orderList);
    console.log('总价为' + $scope.totalMoney);

    $scope.initData = function () {
        console.log('初始化数据');

        var member = {};
        member['MEMBER_COUPON.USER_ID'] = 1000;
        personalFactory.getCouponListByUser(member).get({}, function (response) {
            $scope.memberCouponList = response.data;       //客户的所有优惠券
            console.log('客户的所有优惠券');
            console.log($scope.memberCouponList);
            $scope.judgeUsableCoupon();
        });
    }


    /**
     * 判断可用优惠券
     */
    $scope.useableList = new Array();   //可用的优惠券数组，如可用压入里面

    $scope.judgeUsableCoupon = function () {

        //console.log(456);

        var week=new Date().getDay();     //得到的今日的星期
        if(week=0){
            week=7;
        }

        // console.log(couponList.length);
        if ($scope.memberCouponList.length <= 0) {
            weUI.toast.info("无可用优惠券！");
        } else {
            $scope.memberCouponList.forEach(function (ele) {
                var targetObjArray = ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_ID'];  //限定对象数组
                var weekArray=ele['MEMBER_COUPON.COUPON_INFO']['COUPON.USE_TIME_CYCLE'];    //优惠券的星期数组
                if ((ele['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO']['COUPON_RULE.CONDITION_PRICE']) / 100 < $scope.totalMoney) {   //满足使用门槛
                    if(weekArray.indexOf(week)!=-1){       //如果今天的星期在优惠券的星期数组
                        if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == 1) {   //限定商品

                            for (i = 0; i < $scope.orderList.length; i++) {   //遍历订单中的每一个商品
                                if (targetObjArray.indexOf($scope.orderList[i]['SHOP_PRODUCT_SKU.SKU_ID']) == -1) {
                                    break;
                                }
                                if (i == $scope.orderList.length - 1) {
                                    console.log('商品');
                                    $scope.useableList.push(ele);
                                }


                            }

                        }
                        if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == 2) {   //限定类别

                            for (i = 0; i < $scope.orderList.length; i++) {   //遍历订单中的每一个商品

                                if (targetObjArray.indexOf($scope.orderList[i]['SHOP_PRODUCT.CLASS_ID']) == -1) {   //该商品id不在限定对象数组中，直接跳出
                                    break;
                                }
                                if (i == $scope.orderList.length - 1) {
                                    console.log('类别');
                                    $scope.useableList.push(ele);
                                }


                            }

                        }
                        if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == 3) {   //限定标签

                            for (i = 0; i < $scope.orderList.length; i++) {   //遍历订单中的每一个商品
                                console.log($scope.orderList[i]['SHOP_PRODUCT.TAG_ID']);
                                var tagIdArray = $scope.orderList[i]['SHOP_PRODUCT.TAG_ID'].split(',');
                                for (j = 0; j < tagIdArray.length; j++) {
                                    if (targetObjArray.indexOf(tagIdArray[j]) != -1) {         //商品的标签ID有多个，只要有一个在限定数组中即可
                                        if (i == $scope.orderList.length - 1) {
                                            $scope.useableList.push(ele);
                                        }
                                        break;
                                    }
                                }



                            }

                        }
                        if (ele['MEMBER_COUPON.COUPON_INFO']['COUPON.TARGET_OBJ_TYPE'] == -1) {   //不限定
                            console.log('不限定');
                            $scope.useableList.push(ele);

                        }//

                    }



                }

            })

        }

    }


    $scope.initData();

    $scope.checkItem = function (item) {
        console.log(item);
        $scope.selectItem=item;



    }

    $scope.returnData=function () {
        $scope.money=$scope.totalMoney;
       //console.log($scope.selectItem);
        if ($scope.selectItem!=undefined) {
            //读取到选中的优惠券的面值
            var faceValue = $scope.selectItem['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO']['COUPON_RULE.FACE_VALUE'];
            var type = $scope.selectItem['MEMBER_COUPON.COUPON_INFO']['COUPON.RULE_INFO']['COUPON_RULE.TYPE'];
            if (type == 1) {   //减价
                $scope.money = $scope.totalMoney - (faceValue / 100).toFixed(2);
            } else if (type == 2) {  //打折
                $scope.money = $scope.totalMoney * (faceValue / 10).toFixed(1);
            }
            console.log('总价'+$scope.money);
            $state.go('pages/order/add',{MONEY:$scope.money,COUPON_ID:$scope.selectItem['.MAX_ID']});
        }

    }


    $scope.detailData = function (data) {

        var str = data.replace(/<br>/g, " ");
        return str;

    }


    $scope.parseArray = function (data) {
        if (data != undefined) {
            data = data.split(',');
        }
        return data;
    }


});
