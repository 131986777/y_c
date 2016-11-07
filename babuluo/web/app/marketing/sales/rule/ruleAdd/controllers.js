angular.module('AndSell.Main').controller('sales_rule_ruleAdd_Controller', function ($scope,$http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);
    modalFactory.setTitle('新增促销规则');

    $scope.memberId = $stateParams.id;
    $scope. serviceId = $stateParams.serviceId;

    var array = new Array();
    $scope.saveCurrentInfo = function (num) {
        if($scope.salesInfo['SALES.SALE_TYPE'] == 3){
            var str = '{'+'"ProId"'+':'+$scope.productId+',' +'"Num"'+':'+$scope.salesInfo['SALES.PRONUM'+num]+'}';
        }else {
            console.log($scope.salesInfo['SALES.PRONUM'+num]);
            var str = '{'+'"ProId"'+':'+$scope.couponId+',' +'"Num"'+':'+$scope.salesInfo['SALES.PRONUM'+num]+'}';
        }
        array.push(str);
        $scope.salesDetailInfo = array;
        console.log($scope.salesDetailInfo);
    }

    $scope.bindData = function(form){
        form['SALES.SERVICE_ID'] = $scope.serviceId;
        form['SALES.PROID'] = $scope.product;
        if(form['SALES.SALE_TYPE'] ==3||form['SALES.SALE_TYPE'] ==4){
            form['SALES.SALE_CONTENT1'] = $scope.salesDetailInfo[0];
            form['SALES.SALE_CONTENT2'] = $scope.salesDetailInfo[1];
            form['SALES.SALE_CONTENT3'] = $scope.salesDetailInfo[2];
            form['SALES.SALE_CONTENT4'] = $scope.salesDetailInfo[3];
            form['SALES.SALE_CONTENT5'] = $scope.salesDetailInfo[4];
            form['SALES.SALE_CONTENT6'] = $scope.salesDetailInfo[5];
        }
        if(form['SALES.CONDITION_TYPE'] ==true){
            form['SALES.CONDITION_TYPE'] =2;
        }else {
            form['SALES.CONDITION_TYPE'] =1;
        }
        form['SALES.SALE_TARGET'] = $scope.memberId;
        return form;
    }


    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        console.log($scope.salesInfo['SALES.SALE_CONTENT1']);
        console.log($scope.salesInfo);
        if($scope.salesInfo == undefined){
            modalFactory.showAlert("请填写完整信息");
            $scope.empty();
        }
        else{
            var form = $scope.bindData($scope.salesInfo);
            console.log(form);
            salesFactory.AddSales (form).get({}, function (response) {
                console.log(form);
                if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                    modalFactory.showShortAlert(response.msg);
                } else if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("保存成功");
                    $scope.empty();
                    $scope.$broadcast('pageBar.reload');
                }
            });
        }
    });

 //清空所有表单信息
    $scope.empty = function () {
        $scope.salesInfo = null;
}
    //清空部分表单信息
    $scope.enEmpty = function (){
        $scope.salesInfo = null;
    }

    $scope.getNum = function (num){
        $scope.num = num;
    }

    $scope.prdItemSwitch= function (data) {
        if($scope.memberId==1){
            $scope.productId = data['SHOP_PRODUCT_SKU.SKU_ID'];
            $scope.productName = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
            var num = $scope.num;
            $("#A"+num).text($scope.productName);
        }
        else {
            $scope.productId = data['SHOP_PRODUCT_SKU.SKU_ID'];
            $scope.productName = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
            var num = $scope.num;
            $("#C"+num).text($scope.productName);
        }

    };

    $scope.couponItemSwitch= function (data) {
        if($scope.memberId==1){
            console.log(data);
            $scope.couponId = data['COUPON.ID'];
            $scope.couponName = data['COUPON.NAME'];
            var tag = $scope.num;
            $("#B"+tag).text($scope.couponName);
        }else {
            $scope.couponId = data['COUPON.ID'];
            $scope.couponName = data['COUPON.NAME'];
            var tag = $scope.num;
            $("#D"+tag).text($scope.couponName);
        }
    }


    //前端Jquery逻辑
    $(function(){
        $('.checkbox').click(function(){
                if($('#meiman').is(":checked")){
                    $('.meimanjian-ruler').removeClass('hidden');
                    $('.manjian-ruler').addClass('hidden');
                }
                else{
                    $('.meimanjian-ruler').addClass('hidden');
                    $('.manjian-ruler').removeClass('hidden');
                }
            }
        );

        var len = $('.radio').length;
        for(var i = 0 ; i<len;i++){
            $('.radio').eq(i).click(function(){
                //点击显示
                $(this).children('.content').removeClass('hidden');
                $(this).siblings().children('.content').addClass('hidden');
            });
        };



        $('.addItem').on("click",function(){
            var a = $(this).parents('.content'),
                b = a.find('.hidden');
            if(b.length==1){
                b.eq(0).removeClass('hidden');
                $(this).addClass('hidden');
            }
            else{
                b.eq(0).removeClass('hidden');
            }
        });
        $('.itemDel').click(function(){
            $(this).parents('.detailBox').addClass('hidden');
            if($(this).parents('.content').find('.hidden').length<6){
                $('.content').children('.addItem').removeClass('hidden');
            }
        });
    })
});