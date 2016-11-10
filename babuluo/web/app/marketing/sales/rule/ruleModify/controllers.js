angular.module('AndSell.Main').controller('salesRuleModifyController', function ($scope, $stateParams, salesFactory, modalFactory) {

    modalFactory.setTitle('促销规则详情');

    modalFactory.setBottom(true);

    //console.log($stateParams.id);


    $scope.initLoad = function () {
        console.log('+++');
        var form = {};
        form['SALES.ID'] =$stateParams.id;
        salesFactory.querySalesById(form).get({}, function (response) {
            console.log(response);
            $scope.bindData(response);
        });
    }

    $scope.initLoad();
    $scope.bindData = function (response) {
        console.log(response);
        $scope.salesInfo = response.data[0];
    };

    modalFactory.setBottom(true, function () {
            salesFactory.ModifySalesState ($scope.salesInfo).get({}, function (response) {
                if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                    modalFactory.showShortAlert(response.msg);
                } else if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("保存成功");
                    $scope.empty();
                    $scope.$broadcast('pageBar.reload');
                }
            });
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


    /*$scope.queryByGivenInfo = function (form) {
        var array = new Array();
        var middleArray = new Array();
        if (form['SALES.CONDITION_NUM1'] != null) {
            var salesObj1 = new Object();
            salesObj1.CONDITION_NUM = form['SALES.CONDITION_NUM1'];
            salesObj1.SALE_CONTENT = form['SALES.SALE_CONTENT1'];
            array.push(salesObj1);

        }
        if (form['SALES.CONDITION_NUM2'] != null) {
            var salesObj2 = new Object();
            salesObj2.CONDITION_NUM = form['SALES.CONDITION_NUM2'];
            salesObj2.SALE_CONTENT = form['SALES.SALE_CONTENT2'];
            array.push(salesObj2);

        }
        if (form['SALES.CONDITION_NUM3'] != null) {
            var salesObj3 = new Object();
            salesObj3.CONDITION_NUM = form['SALES.CONDITION_NUM3'];
            salesObj3.SALE_CONTENT = form['SALES.SALE_CONTENT3'];
            array.push(salesObj3);

        }
        if (form['SALES.CONDITION_NUM4'] != null) {
            var salesObj4 = new Object();
            salesObj4.CONDITION_NUM = form['SALES.CONDITION_NUM4'];
            salesObj4.SALE_CONTENT = form['SALES.SALE_CONTENT4'];
            array.push(salesObj4);
        }
        if (form['SALES.CONDITION_NUM5'] != null) {
            var salesObj5 = new Object();
            salesObj5.CONDITION_NUM = form['SALES.CONDITION_NUM5'];
            salesObj5.SALE_CONTENT = form['SALES.SALE_CONTENT5'];
            array.push(salesObj5);

        }
        if (form['SALES.CONDITION_NUM6'] != null) {
            var salesObj6 = new Object();
            salesObj6.CONDITION_NUM = form['SALES.CONDITION_NUM6'];
            salesObj6.SALE_CONTENT = form['SALES.SALE_CONTENT6'];
            array.push(salesObj6);
        }

        array.forEach(function (item) {
            var array = new Array();
            var saleJson = JSON.parse(item['SALE_CONTENT'].toString());
            var name = $scope.productMap[saleJson['ProId']];
            switch (form['SALES.SALE_TARGET']) {
                case '1':
                    switch (form['SALES.CONDITION_TYPE']) {
                        case '1':
                            switch (form['SALES.SALE_TYPE']) {
                                case '1':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "元减", item['SALE_CONTENT'], "元");
                                    middleArray.push(array);
                                    break;
                                case '2':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "元打", item['SALE_CONTENT'], "折");
                                    middleArray.push(array);
                                    break;
                                case '3':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "元送", saleJson['Num'], "件", name);
                                    middleArray.push(array);
                                    break;
                                case '4':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "元送", saleJson['Num'], "张", name);
                                    middleArray.push(array);
                                    break;
                                default:
                            }
                            break;
                        case '2':
                            switch (form['SALES.SALE_TYPE']) {
                                case '1':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "元减", item['SALE_CONTENT'], "元");
                                    middleArray.push(array);
                                    break;
                                case '2':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "元打", item['SALE_CONTENT'], "折");
                                    middleArray.push(array);
                                    break;
                                case '3':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "元送", saleJson['Num'], "件", name);
                                    middleArray.push(array);
                                    break;
                                case '4':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "元送", saleJson['Num'], "张", name);
                                    middleArray.push(array);
                                    break;
                                default:
                            }
                            break;
                        default:
                    }
                    break;
                case '2':
                    switch (form['SALES.CONDITION_TYPE']) {
                        case '1':
                            switch (form['SALES.SALE_TYPE']) {
                                case '1':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "件减", item['SALE_CONTENT'], "元");
                                    middleArray.push(array);
                                    break;
                                case '2':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "件打", item['SALE_CONTENT'], "折");
                                    middleArray.push(array);
                                    break;
                                case '3':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "件送", saleJson['Num'], "件", name);
                                    middleArray.push(array);
                                    break;
                                case '4':
                                    array = putParaTogether("满", item['CONDITION_NUM'], "件送", saleJson['Num'], "张", name);
                                    middleArray.push(array);
                                    break;
                                default:
                            }
                            break;
                        case '2':
                            switch (form['SALES.SALE_TYPE']) {
                                case '1':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "件减", item['SALE_CONTENT'], "元");
                                    middleArray.push(array);
                                    break;
                                case '2':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "件打", item['SALE_CONTENT'], "折");
                                    middleArray.push(array);
                                    break;
                                case '3':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "件送", saleJson['Num'], "件", name);
                                    middleArray.push(array);
                                    break;
                                case '4':
                                    array = putParaTogether("每满", item['CONDITION_NUM'], "件送", saleJson['Num'], "张", name);
                                    middleArray.push(array);
                                    break;
                                default:
                            }
                            break;
                        default:
                    }
                    break;
                default:
            }
        });

        var jointList = {};
        $scope.detailSaleListInfo = middleArray;
        jointList['SALES.ID'] = form['SALES.ID'];
        jointList['SALES. SALE_TYPE'] = form['SALES.SALE_TYPE'];
        jointList['SALES.NAME'] = form['SALES.NAME'];
        jointList['SALES.INTRO'] = form['SALES.INTRO'];
        jointList['SALES.SALE_TARGET'] = form['SALES.SALE_TARGET'];
        jointList['SALES.SALE_TYPE'] = form['SALES.SALE_TYPE'];
        $scope.detailSaleList = jointList;
    };


    //根据ID修改优惠状态（停用or启用）
    $scope.changeState = function (form) {
        if (form['SALES.STATE'] == '1') {
            modalFactory.showAlert("确定停用?", function () {
                form['SALES.STATE'] = -1;
                salesFactory.ModifySalesState(form).get({}, function (response) {
                    if (response.extraData.state == 'true') {
                        modalFactory.showShortAlert("停用成功");
                        $scope.$broadcast('pageBar.reload');
                    }
                });
            });
        }
        else {
            form['SALES.STATE'] = 1;
            salesFactory.ModifySalesState(form).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("启用成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        }
    };

    //根据ID删除优惠规则
    $scope.Delete = function (form) {
        modalFactory.showAlert("确定删除?", function () {
            form['SALES.IS_DEL'] = 1;
            salesFactory.ModifySalesState(form).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        })
    };
    function putParaTogether() {
        var array = new Array();
        for (var i = 0; i < arguments.length; i++) {
            array.push(arguments[i])
        }
        return array;
    }

    $scope.saveSales = function () {
        console.log($scope.detailSaleListInfo);
        for(var i=0;i<$scope.detailSaleListInfo.length;i++){
            var conditionStr = 'SALES.CONDITION_NUM'+(i+1);
            var contentStr = 'SALES.SALE_CONTENT'+(i+1);
            if($scope.detailSaleListInfo['SALES. SALE_TYPE'] ==3 ||$scope.detailSaleListInfo['SALES. SALE_TYPE'] ==4){

            }
                $scope.detailSaleList[conditionStr] = $scope.detailSaleListInfo[i][1];
                $scope.detailSaleList[contentStr] = $scope.detailSaleListInfo[i][3];
            }
        salesFactory.ModifySalesState($scope.detailSaleList).get({}, function (response) {
            console.log($scope.detailSaleList);
            if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("修改成功");
                $scope.$broadcast('pageBar.reload');
            }
        });
    };*/
});


