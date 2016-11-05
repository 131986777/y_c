AndSellMainModule.controller('salesRuleAddController', function ($scope,$http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);
    modalFactory.setTitle('新增促销规则');

    $scope.memberId = $stateParams.id;
    $scope. serviceId = $stateParams.serviceId;
    $scope.proName = "（选择赠送商品）";

    var array = new Array();
    $scope.saveCurrentInfo = function (num) {
        var str = '{'+'"ProId"'+':'+$scope.product+',' +'"Num"'+':'+$scope.salesInfo['SALES.PRONUM'+num]+'}';
        array.push(str);
        $scope.salesDetailInfo = array;
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
        if($scope.salesInfo == undefined){
            modalFactory.showAlert("请填写完整信息");
            $scope.empty();
        }
        else{
            var form = $scope.bindData($scope.salesInfo);
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
    
    $scope.empty = function () {
        $scope.salesInfo = null;
}

    $scope.getNum = function (num){
       $scope.num = num;
    }

    $scope.prdItemSwitch= function (data) {
        $scope.productName = data['SHOP_PRODUCT_SKU.PRD_INFO']['SHOP_PRODUCT.PRD_NAME'];
        if($scope.num == 1){
            $('.A').text($scope.productName);
        }
        else if($scope.num == 2){
            $('.B').text($scope.productName);
        }
        else if($scope.num == 3){
            $('.C').text($scope.productName);
        }
        else if($scope.num == 4){
            $('.D').text($scope.productName);
        }else if($scope.num == 5){
            $('.E').text($scope.productName);
        }
        else if($scope.num == 6){
            $('.F').text($scope.productName);
        }
    };

    $scope.couponItemSwitch= function (data) {
        console.log('coupon item switch');
        console.log(data);
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