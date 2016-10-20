AndSellMainModule.controller('salesAddController', function ($scope,$http, $stateParams, salesFactory, modalFactory) {
    modalFactory.setBottom(true);




    $scope.memberId = $stateParams.id;

    /*function loadInputData(form){
        form['SALES.SALE_TARGET'] = $scope.memberId;
        form['SALES.IS_DEL'] = -1;
        form['SALES.STATE'] = 1;   //启用
        return form;
    }*/


    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        //var form = loadInputData($scope.salesInfo);
        console.log("++++++");
        console.log($scope.salesInfo);
        salesFactory.AddSales (form).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {

            }
        });

        //验证
        /*if ($scope.memberData['MEMBER_INFO.TRUE_NAME'] == undefined) {
         modalFactory.showAlert("真实姓名不能为空。");
         return;
         }
         if ($scope.ADDR_SHENG != undefined && $scope.ADDR_SHENG != '') {

         $scope.memberData['MEMBER_INFO.ADDR_SHENG']= $scope.ADDR_SHENG.p;
         if ($scope.ADDR_SHI != undefined) {
         $scope.memberData['MEMBER_INFO.ADDR_SHI'] = $scope.ADDR_SHI.n;
         }
         if ($scope.ADDR_XIAN != undefined) {
         $scope.memberData['MEMBER_INFO.ADDR_XIAN']= $scope.ADDR_XIAN.s;
         }
         }
         memberFactory.modMemberDataById($scope.memberData).get({}, function (response) {
         if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
         modalFactory.showShortAlert(response.msg);
         } else if (response.extraData.state == 'true') {
         modalFactory.showShortAlert("保存成功");
         // $scope.modifyID = false;
         $scope.initLoad();
         }
         });
         // console.log('要提交的数据为'+$scope.memberData);

         }, function () {
         //取消事件
         $scope.initLoad();*/
    });








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