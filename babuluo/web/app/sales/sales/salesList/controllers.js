AndSellMainModule.controller('salesListController', function ($scope, $stateParams, salesFactory, modalFactory) {

    modalFactory.setTitle('促销管理');
    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        //console.log(response);
        $scope.salesList = response.data;
       /* var jsonObj = JSON.parse($scope.salesList[6]['SALES.SALE_CONTENT1'].toString());//把字符串转成JSON对象
        var jsonObj1 = JSON.parse($scope.salesList[6]['SALES.SALE_CONTENT2'].toString());//把字符串转成JSON对象
        $scope.salesList[6]['SALES.SALE_CONTENT1'] = jsonObj;
        $scope.salesList[6]['SALES.SALE_CONTENT2'] = jsonObj1;*/
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


        array.forEach(function(item){
            var array = new Array();
                switch (form['SALES.ID']) {
                    case '1':
                        array.push("满" + item['CONDITION_NUM'] + "元减" + item['SALE_CONTENT'] + "元");
                        break;
                    case '2':
                        array.push("满" + item['CONDITION_NUM'] + "元打" + item['SALE_CONTENT'] + "折");
                        break;
                    case '3':
                        array.push ("满" + item['CONDITION_NUM'] + "件减" + item['SALE_CONTENT'] + "元");
                        break;
                    case '4':
                        array.push("满" + item['CONDITION_NUM'] + "件打" + item['SALE_CONTENT'] + "折");
                        break;
                    case '5':
                        array.push("每满" + item['CONDITION_NUM'] + "元减" + item['SALE_CONTENT'] + "元");
                        break;
                    case '8':
                        var num = item['SALE_CONTENT'];
                        console.log(num);

                        //var saleJson = JSON.parse(item['SALE_CONTENT'].toString());
                        //console.log("+++++"+saleJson);
                        //console.log(saleJson['Num']);
                        array.push("1");
                        //array.push("满" + item['CONDITION_NUM'] + "元减" + saleJson['Num'] + "个"+saleJson['ProId']+"商品");
                        break;
                    default:
                }
                middleArray.push(array);
            })
            $scope.salesDetialList = middleArray;
        };




    $scope.changeState = function (form) {
        salesFactory.ModifySalesState(form).get({}, function (response) {});
        window.location.reload();
    };
});


