angular.module('AndSell.Main').controller('marketing_sales_rule_ruleAdd_Controller', function ($scope, $http,http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);
    modalFactory.setTitle('新增促销规则');

    $scope.memberId = $stateParams.id;
    $scope.serviceId = $stateParams.serviceId;
    $scope.skuIds = [] ;

    var array = new Array();
    //$scope.saveCurrentInfo = function (num) {
    //    if ($scope.salesInfo['SALES.SALE_TYPE'] == 3) {
    //        var str = '{'
    //            + '"ProId"'
    //            + ':'
    //            + $scope.productId
    //            + ','
    //            + '"Num"'
    //            + ':'
    //            + $scope.salesInfo['SALES.PRONUM' + num]
    //            + '}';
    //    } else {
    //        var str = '{'
    //            + '"ProId"'
    //            + ':'
    //            + $scope.couponId
    //            + ','
    //            + '"Num"'
    //            + ':'
    //            + $scope.salesInfo['SALES.PRONUM' + num]
    //            + '}';
    //    }
    //    array.push(str);
    //    $scope.salesDetailInfo = array;
    //}

    $scope.initJson = function (){
        var roles = [] ;
        var role = {} ;
        if ($scope.memberId == 1) {
            role['price'] = $scope.salesInfo['SALES.CONDITION_NUM1'] * 100;
        } else if ($scope.memberId == 2) {
            role['num'] = $scope.salesInfo['SALES.CONDITION_NUM1'] ;
        }
        if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
            role['cut'] = $scope.salesInfo['SALES.SALE_CONTENT1'] * 100 ;
        }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
            role['discount'] = $scope.salesInfo['SALES.SALE_CONTENT1'] * 10 ;
        }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
            role['presents'] = [{'skuId': $scope.skuIds[0] , 'num' :  $scope.salesInfo['SALES.PRONUM1']}] ;
        }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

        }
        roles.push(role) ;
        if ($scope.salesInfo['SALES.CONDITION_NUM2'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM2'] != null){
             role = {} ;
            if ($scope.memberId == 1) {
                role['price'] = $scope.salesInfo['SALES.CONDITION_NUM2'] * 100;
            } else if ($scope.memberId == 2) {
                role['num'] = $scope.salesInfo['SALES.CONDITION_NUM2'] ;
            }
            if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
                role['cut'] = $scope.salesInfo['SALES.SALE_CONTENT2'] * 100 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
                role['discount'] = $scope.salesInfo['SALES.SALE_CONTENT2'] * 10 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
                role['presents'] = [{'skuId': $scope.skuIds[1] , 'num' :  $scope.salesInfo['SALES.PRONUM2']}] ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

            }
            roles.push(role) ;
        }
        if ($scope.salesInfo['SALES.CONDITION_NUM3'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM3'] != null){
            role = {} ;
            if ($scope.memberId == 1) {
                role['price'] = $scope.salesInfo['SALES.CONDITION_NUM3'] * 100;
            } else if ($scope.memberId == 2) {
                role['num'] = $scope.salesInfo['SALES.CONDITION_NUM3'] ;
            }
            if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
                role['cut'] = $scope.salesInfo['SALES.SALE_CONTENT3'] * 100 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
                role['discount'] = $scope.salesInfo['SALES.SALE_CONTENT3'] * 10 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
                role['presents'] = [{'skuId': $scope.skuIds[2] , 'num' :  $scope.salesInfo['SALES.PRONUM3']}] ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

            }
            roles.push(role) ;
        }
        if ($scope.salesInfo['SALES.CONDITION_NUM4'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM4'] != null){
            role = {} ;
            if ($scope.memberId == 1) {
                role['price'] = $scope.salesInfo['SALES.CONDITION_NUM4'] * 100;
            } else if ($scope.memberId == 2) {
                role['num'] = $scope.salesInfo['SALES.CONDITION_NUM4'] ;
            }
            if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
                role['cut'] = $scope.salesInfo['SALES.SALE_CONTENT4'] * 100 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
                role['discount'] = $scope.salesInfo['SALES.SALE_CONTENT4'] * 10 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
                role['presents'] = [{'skuId': $scope.skuIds[3] , 'num' :  $scope.salesInfo['SALES.PRONUM4']}] ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

            }
            roles.push(role) ;
        }
        if ($scope.salesInfo['SALES.CONDITION_NUM5'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM5'] != null){
            role = {} ;
            if ($scope.memberId == 1) {
                role['price'] = $scope.salesInfo['SALES.CONDITION_NUM5'] * 100;
            } else if ($scope.memberId == 2) {
                role['num'] = $scope.salesInfo['SALES.CONDITION_NUM5'] ;
            }
            if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
                role['cut'] = $scope.salesInfo['SALES.SALE_CONTENT5'] * 100 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
                role['discount'] = $scope.salesInfo['SALES.SALE_CONTENT5'] * 10 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
                role['presents'] = [{'skuId': $scope.skuIds[4] , 'num' :  $scope.salesInfo['SALES.PRONUM5']}] ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

            }
            roles.push(role) ;
        }
        if ($scope.salesInfo['SALES.CONDITION_NUM6'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM6'] != null){
            role = {} ;
            if ($scope.memberId == 1) {
                role['price'] = $scope.salesInfo['SALES.CONDITION_NUM6'] * 100;
            } else if ($scope.memberId == 2) {
                role['num'] = $scope.salesInfo['SALES.CONDITION_NUM6'] ;
            }
            if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
                role['cut'] = $scope.salesInfo['SALES.SALE_CONTENT6'] * 100;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
                role['discount'] = $scope.salesInfo['SALES.SALE_CONTENT6'] * 10 ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
                role['presents'] = [{'skuId': $scope.skuIds[5] , 'num' :  $scope.salesInfo['SALES.PRONUM6']}] ;
            }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

            }
            roles.push(role) ;
        }
        var json = JSON.stringify(roles) ;
        return json ;


        //var json = "[";
        //if ($scope.memberId == 1) {
        //    json += "{'price':" + $scope.salesInfo['SALES.CONDITION_NUM1'] + ",";
        //} else if ($scope.memberId == 2) {
        //    json += "{'num':" + $scope.salesInfo['SALES.CONDITION_NUM1'] + ',' ;
        //}
        //if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
        //    json += "'cut':" + $scope.salesInfo['SALES.SALE_CONTENT1'] + '}' ;
        //}else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
        //    json += "'discount':" + $scope.salesInfo['SALES.SALE_CONTENT1'] * 10 + '}' ;
        //}else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
        //    json += "'presents':[{'skuId':" + $scope.productId + ",'num':" + $scope.salesInfo['SALES.PRONUM1'] + '}]}' ;
        //}else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){
        //
        //}
        //if ($scope.salesInfo['SALES.CONDITION_NUM2'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM2'] != null){
        //    if ($scope.memberId == 1) {
        //        json += ",{'price':" + $scope.salesInfo['SALES.CONDITION_NUM2'] + ',';
        //    } else if ($scope.memberId == 2) {
        //        json += "{'num':" + $scope.salesInfo['SALES.CONDITION_NUM2'] + ',' ;
        //    }
        //    if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
        //        json += "'cut':" + $scope.salesInfo['SALES.SALE_CONTENT2'] + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
        //        json += "'discount':" + $scope.salesInfo['SALES.SALE_CONTENT2'] * 10 + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
        //        json += "'presents':[{'skuId':" + $scope.productId + ",'num':" + $scope.salesInfo['SALES.PRONUM2'] + '}]}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){
        //
        //    }
        //}
        //if ($scope.salesInfo['SALES.CONDITION_NUM3'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM3'] != null){
        //    if ($scope.memberId == 1) {
        //        json += ",{'price':" + $scope.salesInfo['SALES.CONDITION_NUM3'] + ',';
        //    } else if ($scope.memberId == 2) {
        //        json += "{'num':" + $scope.salesInfo['SALES.CONDITION_NUM3'] + ',' ;
        //    }
        //    if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
        //        json += "'cut':" + $scope.salesInfo['SALES.SALE_CONTENT3'] + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
        //        json += "'discount':" + $scope.salesInfo['SALES.SALE_CONTENT3'] * 10 + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
        //        json += "'presents':[{'skuId':" + $scope.productId + ",'num':" + $scope.salesInfo['SALES.PRONUM3'] + '}]}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){
        //
        //    }
        //}
        //if ($scope.salesInfo['SALES.CONDITION_NUM4'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM4'] != null){
        //    if ($scope.memberId == 1) {
        //        json += ",{'price':" + $scope.salesInfo['SALES.CONDITION_NUM4'] + ',';
        //    } else if ($scope.memberId == 2) {
        //        json += "{'num':" + $scope.salesInfo['SALES.CONDITION_NUM4'] + ',' ;
        //    }
        //    if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
        //        json += "'cut':" + $scope.salesInfo['SALES.SALE_CONTENT4'] + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
        //        json += "'discount':" + $scope.salesInfo['SALES.SALE_CONTENT4'] * 10 + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
        //        json += "'presents':[{'skuId':" + $scope.productId + ",'num':" + $scope.salesInfo['SALES.PRONUM4'] + '}]}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){
        //
        //    }
        //}
        //if ($scope.salesInfo['SALES.CONDITION_NUM5'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM5'] != null){
        //    if ($scope.memberId == 1) {
        //        json += ",{'price':" + $scope.salesInfo['SALES.CONDITION_NUM5'] + ',';
        //    } else if ($scope.memberId == 2) {
        //        json += "{'num':" + $scope.salesInfo['SALES.CONDITION_NUM5'] + ',' ;
        //    }
        //    if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
        //        json += "'cut':" + $scope.salesInfo['SALES.SALE_CONTENT5'] + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
        //        json += "'discount':" + $scope.salesInfo['SALES.SALE_CONTENT5'] * 10 + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
        //        json += "'presents':[{'skuId':" + $scope.productId + ",''num'':" + $scope.salesInfo['SALES.PRONUM5'] + '}]}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){
        //
        //    }
        //}
        //if ($scope.salesInfo['SALES.CONDITION_NUM6'] != undefined || $scope.salesInfo['SALES.CONDITION_NUM6'] != null){
        //    if ($scope.memberId == 1) {
        //        json += ",{'price':" + $scope.salesInfo['SALES.CONDITION_NUM6'] + ',';
        //    } else if ($scope.memberId == 2) {
        //        json += "{'num':" + $scope.salesInfo['SALES.CONDITION_NUM6'] + ',' ;
        //    }
        //    if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
        //        json += "'cut':" + $scope.salesInfo['SALES.SALE_CONTENT6'] + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
        //        json += "'discount':" + $scope.salesInfo['SALES.SALE_CONTENT6'] * 10 + '}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
        //        json += "'presents':[{''skuId'':" + $scope.productId + ",''num'':" + $scope.salesInfo['SALES.PRONUM6'] + '}]}' ;
        //    }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){
        //
        //    }
        //}
        //json += ']' ;
        //return json ;
    }

    $scope.bindData = function () {
        var json = $scope.initJson() ;
        var form  = {};
        form['PROMOTION_ROLE.service_id'] = $scope.serviceId;
        form['PROMOTION_ROLE.name'] = $scope.salesInfo['SALES.NAME'];
        form['PROMOTION_ROLE.describes'] = $scope.salesInfo['SALES.INTRO'];
        if ($scope.salesInfo['SALES.CONDITION_TYPE'] == 1) {
            if ($scope.memberId == 1) {
                form['PROMOTION_ROLE.promotion_type_condition'] = 'eachPrice';
            } else if ($scope.memberId == 2) {
                form['PROMOTION_ROLE.promotion_type_condition'] = 'eachNum';
            }
        }else {
            if ($scope.memberId == 1) {
                form['PROMOTION_ROLE.promotion_type_condition'] = 'price';
            } else if ($scope.memberId == 2) {
                form['PROMOTION_ROLE.promotion_type_condition'] = 'num';
            }
        }
        if ($scope.salesInfo['SALES.SALE_TYPE'] == 1){
            form['PROMOTION_ROLE.promotion_type_action'] = 'cut';
        }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 2){
            form['PROMOTION_ROLE.promotion_type_action'] = 'discount';
        }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 3){
            form['PROMOTION_ROLE.promotion_type_action'] = 'present';
        }else if ($scope.salesInfo['SALES.SALE_TYPE'] == 4){

        }
        form['PROMOTION_ROLE.promotion_role'] = json ;
        form['PROMOTION_ROLE.isDel'] = -1 ;
        form['promo_role_andSell.STATE'] = "inUse" ;
        if ($scope.memberId == 1){
            form['promo_role_andSell.PROMOTION_TYPE'] = "order" ;
        }else if ($scope.memberId == 2){
            form['promo_role_andSell.PROMOTION_TYPE'] = "prd" ;
        }
        return form;
    }

    //$scope.bindData = function (form) {
    //    form['SALES.SERVICE_ID'] = $scope.serviceId;
    //    form['SALES.PROID'] = $scope.product;
    //    if (form['SALES.SALE_TYPE'] == 3 || form['SALES.SALE_TYPE'] == 4) {
    //        form['SALES.SALE_CONTENT1'] = $scope.salesDetailInfo[0];
    //        form['SALES.SALE_CONTENT2'] = $scope.salesDetailInfo[1];
    //        form['SALES.SALE_CONTENT3'] = $scope.salesDetailInfo[2];
    //        form['SALES.SALE_CONTENT4'] = $scope.salesDetailInfo[3];
    //        form['SALES.SALE_CONTENT5'] = $scope.salesDetailInfo[4];
    //        form['SALES.SALE_CONTENT6'] = $scope.salesDetailInfo[5];
    //    } else if (form['SALES.SALE_TYPE'] == 2) {
    //        form['SALES.SALE_CONTENT1'] = form['SALES.SALE_CONTENT1'] * 10;
    //        form['SALES.SALE_CONTENT2'] = form['SALES.SALE_CONTENT2'] * 10;
    //        form['SALES.SALE_CONTENT3'] = form['SALES.SALE_CONTENT3'] * 10;
    //        form['SALES.SALE_CONTENT4'] = form['SALES.SALE_CONTENT4'] * 10;
    //        form['SALES.SALE_CONTENT5'] = form['SALES.SALE_CONTENT5'] * 10;
    //        form['SALES.SALE_CONTENT6'] = form['SALES.SALE_CONTENT6'] * 10;
    //    }
    //    if (form['SALES.CONDITION_TYPE'] == true) {
    //        form['SALES.CONDITION_TYPE'] = 2;
    //    } else {
    //        form['SALES.CONDITION_TYPE'] = 1;
    //    }
    //    form['SALES.SALE_TARGET'] = $scope.memberId;
    //    return form;
    //}

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
            var form = $scope.bindData();
            //http.post_ori("http://192.168.2.105:8080/bubu/promo/role/add",form
            //    //console.log(response);
            //    , function (response) {
            //        modalFactory.showShortAlert("保存成功");
            //        $scope.empty();
            //    }
            //    , function (response) {
            //        modalFactory.showShortAlert(response.msg);
            //    })
            salesFactory.AddPromoRoleAdaptor(form
                , function (response) {
                modalFactory.showShortAlert("保存成功");
                $scope.empty();
            }
                , function (response) {
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
            $scope.skuIds.push(data['SHOP_PRODUCT_SKU.SKU_ID']) ;
            $scope.productName = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
            var num = $scope.num;
            $("#A" + num).text($scope.productName);
            data = null;
            $scope.$broadcast('pageBar.reload');
        } else {
            $scope.productId = data['SHOP_PRODUCT_SKU.SKU_ID'];
            $scope.skuIds.push(data['SHOP_PRODUCT_SKU.SKU_ID']) ;
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
            console.log(a)
            console.log("b")
            console.log(b)
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