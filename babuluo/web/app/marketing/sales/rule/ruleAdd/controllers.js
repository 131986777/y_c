AndSellMainModule.controller('salesRuleAddController', function ($scope,$http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;

    $scope.bindData = function(form){
        form['SALES.PROID'] = $scope.product;
        if(form['SALES.SALE_TYPE'] ==3||form['SALES.SALE_TYPE'] ==4){
            form['SALES.SALE_CONTENT1'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM1']+'}';
            form['SALES.SALE_CONTENT2'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM2']+'}';
            form['SALES.SALE_CONTENT3'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM3']+'}';
            form['SALES.SALE_CONTENT4'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM4']+'}';
            form['SALES.SALE_CONTENT5'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM5']+'}';
            form['SALES.SALE_CONTENT6'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM6']+'}';
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

        if ($scope.salesInfo['SALES.NAME'] == undefined ||$scope.salesInfo['SALES.INTRO'] == undefined) {
            modalFactory.showAlert("请填写完整信息");
            return;
        }
        else{
            var form = $scope.bindData($scope.salesInfo);
            salesFactory.AddSales (form).get({}, function (response) {
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
        $scope.salesInfo = {};
}

    $scope.prdItemSwitch= function (data) {
        $scope.product = data['SHOP_PRODUCT_SKU.PRD_ID'];
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
        }

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