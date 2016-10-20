AndSellMainModule.controller('salesRuleListController', function ($scope, $stateParams, salesFactory, modalFactory) {

    modalFactory.setTitle('促销管理');
    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        console.log(response);
        $scope.salesList = response.data;
        $scope.productMap = response.extraData.productMap;
    };




    $scope.queryByGivenInfo = function (form) {
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

        array.forEach(function(item ){
            var array = new Array();
            var saleJson = JSON.parse(item['SALE_CONTENT'].toString());
            var name = $scope.productMap[saleJson['ProId']];
            switch (form['SALES.SALE_TARGET']){
             case '订单':
                 switch (form['SALES.CONDITION_TYPE']){
                     case '1':
                         switch (form['SALES.SALE_TYPE']){
                             case '1':
                                 array= putParaTogether("满",item['CONDITION_NUM'],"元减",item['SALE_CONTENT'],"元");
                                 middleArray.push(array);
                                 break;
                             case '2':
                                 array= putParaTogether("满",item['CONDITION_NUM'],"元打",item['SALE_CONTENT'],"折");
                                 middleArray.push(array);
                                 break;
                             case '3':
                                 array= putParaTogether("满",item['CONDITION_NUM'],"元送",saleJson['Num'],"件",name);
                                 middleArray.push(array);
                                 break;
                             case '4':
                                 array= putParaTogether("满",item['CONDITION_NUM'],"元送",saleJson['Num'],"张",name);
                                 middleArray.push(array);
                                 break;
                             default:
                         }
                         break;
                     case '2':
                         switch (form['SALES.SALE_TYPE']){
                             case '1':
                                 array= putParaTogether("每满",item['CONDITION_NUM'],"元减",item['SALE_CONTENT'],"元");
                                 middleArray.push(array);
                                 break;
                             case '2':
                                 array= putParaTogether("每满",item['CONDITION_NUM'],"元打",item['SALE_CONTENT'],"折");
                                 middleArray.push(array);
                                 break;
                             case '3':
                                 array= putParaTogether("每满",item['CONDITION_NUM'],"元送",saleJson['Num'],"件",name);
                                 middleArray.push(array);
                                 break;
                             case '4':
                                 array= putParaTogether("满",item['CONDITION_NUM'],"元送",saleJson['Num'],"张",name);
                                 middleArray.push(array);
                                 break;
                             default:
                         }
                         break;
                     default:
                 }
                 break;
              case '商品':
                switch (form['SALES.CONDITION_TYPE']){
                    case '1':
                        switch (form['SALES.SALE_TYPE']){
                            case '1':
                                array= putParaTogether("满",item['CONDITION_NUM'],"件减",item['SALE_CONTENT'],"元");
                                middleArray.push(array);
                                break;
                            case '2':
                                array= putParaTogether("满",item['CONDITION_NUM'],"件打",item['SALE_CONTENT'],"折");
                                middleArray.push(array);
                                break;
                            case '3':
                                array= putParaTogether("满",item['CONDITION_NUM'],"件送",saleJson['Num'],"件",name);
                                middleArray.push(array);
                                break;
                            case '4':
                                array= putParaTogether("满",item['CONDITION_NUM'],"件送",saleJson['Num'],"张",name);
                                middleArray.push(array);
                                break;
                            default:
                        }
                        break;
                    case '2':
                        switch (form['SALES.SALE_TYPE']){
                            case '1':
                                array= putParaTogether("每满",item['CONDITION_NUM'],"件减",item['SALE_CONTENT'],"元");
                                middleArray.push(array);
                                break;
                            case '2':
                                array= putParaTogether("每满",item['CONDITION_NUM'],"件打",item['SALE_CONTENT'],"折");
                                middleArray.push(array);
                                break;
                            case '3':
                                array= putParaTogether("满",item['CONDITION_NUM'],"件送",saleJson['Num'],"件",name);
                                middleArray.push(array);
                                break;
                            case '4':
                                array= putParaTogether("满",item['CONDITION_NUM'],"件送",saleJson['Num'],"张",name);
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
            $scope.salesDetialList = middleArray;
        };

    $scope.putTogether = function(para){

    }


    //根据ID修改优惠状态（停用or启用）
    $scope.changeState = function (form) {
        if(form['SALES.STATE']=='1'){
            form['SALES.STATE']=-1;
            modalFactory.showAlert("确定停用?", function () {
                salesFactory.ModifySalesState(form).get({}, function (response) {
                });
            });
        }
        else {
            form['SALES.STATE']=1;
                salesFactory.ModifySalesState(form).get({}, function (response) {
                });
                $scope.$broadcast('pageBar.reload');
        }
        $scope.$broadcast('pageBar.reload');
    };

    //根据ID删除优惠规则
    $scope.Delete = function (form) {
        form['SALES.IS_DEL'] = 1;
        modalFactory.showAlert("确定删除?", function (){
            salesFactory.ModifySalesState(form).get({}, function (response) {});
            $scope.$broadcast('pageBar.reload');
        })
    };
    function putParaTogether(){
        var array = new Array();
        for(var i =0; i<arguments.length; i++){
            array.push(arguments[i])
        }
        return array;
    }
});


