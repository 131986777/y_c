AndSellMainModule.controller('salesRuleAddController', function ($scope,$http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;

    $scope.bindData = function(form){
        form['SALES.PROID'] = $scope.product;
        if(form['SALES.SALE_TYPE'] ==3||form['SALES.SALE_TYPE'] ==4){
            form['SALES.SALE_CONTENT1'] = '{'+'"ProId"'+':'+form['SALES.PROID']+','
                                             +'"Num"'+':'+form['SALES.PRONUM']+'}';
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
        //if ($scope.salesInfo['SALES.NAME'] == undefined ||salesInfo['SALES.INTRO']) {
            //modalFactory.showAlert("请填写完整信息");
            //return;
        //}
        //else{
        var form = $scope.bindData($scope.salesInfo);
        console.log($scope.salesInfo);
        salesFactory.AddSales (form).get({}, function (response) {
                if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                    modalFactory.showShortAlert(response.msg);
                } else if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("保存成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        //}
    });

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
                b = a.find('.template').clone();
            b.removeClass("template hidden").addClass("detail");
            var c = a.find('.detailBox');
            c.append(b);
            $('.itemDel').on('click',function(){
                $(this).parents('.detail').remove();

            });
        });
    })
});