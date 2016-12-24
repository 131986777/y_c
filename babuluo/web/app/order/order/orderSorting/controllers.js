angular.module('AndSell.Main').controller('order_order_orderSorting_Controller', function ($scope, $state, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle('分拣看板');
    modalFactory.setBottom(false);
    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;
    $scope.PRD_SKU=[];
    $scope.stockweight=[];
    $scope.stockprice=[];
    $scope.sortedDetailList = [];
    $scope.stockdetail = [];
    $scope.cancelstockdetail = [];
    $scope.cancelsortstockdetail = [];
    $scope.initstockprice=0;

    var bodyKeyDownObverse = (function (){
        var $str = '';
        function init(callback){
            document.body.addEventListener("keydown",function(e){
                var $key = String.fromCharCode(e.keyCode);
                $str += $key;
                callback($str);
            },false);
        }
        function reset(){
            $str = '';
        }
        return {
            init:init,
            reset:reset,
        }
    })();

    bodyKeyDownObverse.init(function (a) {

        console.log(a);//输入的值

        console.log($scope.orderDetailList)

        //遍历订单下的sku二维码去进行比对

        $scope.orderDetailList.forEach(function (ele,index) {


            var BAR_CODE = ele['SHOP_ORDER_INFO.BAR_CODE'];

            if(a == BAR_CODE){
                //做自己的分拣逻辑
                //$scope.modifyStockClick(ele);
                document.querySelectorAll("table>tbody>tr")[index+1].children[2].children[0].click();
                bodyKeyDownObverse.reset();
            }


        });

    });


    $scope.initData = function () {

        $scope.modify = {};
        $scope.getOrder($stateParams.ORDER_ID);
    }
    //获取预订单详情
    $scope.getOrder = function (id) {
        orderFactory.getById({'SHOP_ORDER.ID': id}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            response.data[0]['SHOP_ORDER.DATETIME_PAY'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_PAY']);
            response.data[0]['SHOP_ORDER.DATETIME_OUT'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_OUT']);
            response.data[0]['SHOP_ORDER.DATETIME_SEND'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_SEND']);
            response.data[0]['SHOP_ORDER.DATETIME_DELIVERY'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_DELIVERY']);
            response.data[0]['SHOP_ORDER.DATETIME_COMMENT'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_COMMENT']);
            response.data[0]['SHOP_ORDER.DATETIME_ACCEPT'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ACCEPT']);
            $scope.orderDetailList = JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            console.log("原订单商品详情")
            console.log($scope.orderDetailList)
            $scope.order = response.data[0];
            if ($scope.order['SHOP_ORDER.ERP_REMARK']
                != undefined
                && $scope.order['SHOP_ORDER.ERP_REMARK']
                != '') {
                $scope.order['SHOP_ORDER.ERP_NUM'] = JSON.parse($scope.order['SHOP_ORDER.ERP_REMARK']).orderCode;
            }
            $scope.orderType = $scope.order['SHOP_ORDER.TYPE'];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
        });
    }
    //点击录入按钮
    $scope.modifyStockClick = function (item) {
        //$('#sort').removeAttr('data-target');
        $scope.stockdetail = item;
        $scope.stockweight = [];
        $scope.stockprice = [];


        console.log("点击录入的详情")

        console.log($scope.stockdetail)

        if( $scope.stockdetail['SHOP_ORDER_INFO.UNIT']==undefined)
            $scope.stockdetail['SHOP_ORDER_INFO.UNIT'] =[];


        if( $scope.stockdetail['SHOP_ORDER_INFO.UNIT']!='kg'||$scope.stockdetail['SHOP_ORDER_INFO.UNIT']!='千克'){

            $('#sort').removeAttr('data-target');

            $scope.stockweight = $scope.stockdetail['SHOP_ORDER_INFO.SKU_1_VALUE'];

            $scope.stockprice = $scope.stockdetail['SHOP_ORDER_INFO.PRICE_NOW'];

            $scope.addStockProduct();

        }
    };
    //点击录入的确定按钮
    $scope.addStockProduct = function () {

        if( $scope.stockdetail['SHOP_ORDER_INFO.STOCKWEIGHT']==undefined)
            $scope.stockdetail['SHOP_ORDER_INFO.STOCKWEIGHT'] =[];

        if( $scope.stockdetail['SHOP_ORDER_INFO.STOCKPRICE']==undefined)
            $scope.stockdetail['SHOP_ORDER_INFO.STOCKPRICE'] =[];

        var ifNew = true;



        $scope.stockdetail['SHOP_ORDER_INFO.STOCKPRICE'].push({
            price:$scope.stockprice
        });
        $scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMPRICE'] = 0;
        //计算实际金额
        $scope.stockdetail['SHOP_ORDER_INFO.STOCKPRICE'].forEach(function (ele) {

            $scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMPRICE'] += parseFloat(ele.price);


        });

        $scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMPRICE'] = $scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMPRICE'].toFixed(2);

        $scope.stockdetail['SHOP_ORDER_INFO.STOCKWEIGHT'].forEach(function (ele) {
            //ele.price = $scope.price;
            if(ele.weight == $scope.stockweight ){
                ele.count+=1;
                ele.price = ele.count * ele.price;
                ifNew=false;
            }
        });
        if(ifNew)
        $scope.stockdetail['SHOP_ORDER_INFO.STOCKWEIGHT'].push({
            weight:$scope.stockweight,
            count:1,
            price:$scope.stockprice
        });

        //计算总件数
        $scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMCOUNT'] = 0;

        $scope.stockdetail['SHOP_ORDER_INFO.STOCKWEIGHT'].forEach(function (ele) {

            $scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMCOUNT'] += parseInt(ele.count)

        });


        //已录入变成灰色

        if($scope.stockdetail['SHOP_ORDER_INFO.STOCKSUMCOUNT'] >= $scope.stockdetail['SHOP_ORDER_INFO.COUNT'] ){

        var comparecount = 0;

        var compare = 0;

        $scope.orderDetailList.forEach(function (ele) {

            comparecount++;

            if(ele['SHOP_ORDER_INFO.SKU_ID'] == $scope.stockdetail['SHOP_ORDER_INFO.SKU_ID']){

                compare = comparecount-1;

                $scope.sortedDetailList.push($scope.stockdetail)

            }

        });


        $scope.orderDetailList.splice(compare,1);

        }


        $scope.calculatePrdPrice();


        console.log($scope.sortedDetailList)

        console.log($scope.orderDetailList)


    }

    //已分拣点击撤销
    $scope.cancelSortStockClick = function (item) {

    $scope.cancelsortstockdetail = item;
        //已录入变成原来的颜色
        var comparecount2 = 0;

        var compare2 = 0;

        $scope.sortedDetailList.forEach(function (ele) {

            comparecount2++;

            if(ele['SHOP_ORDER_INFO.SKU_ID'] == $scope.cancelsortstockdetail['SHOP_ORDER_INFO.SKU_ID']){

                compare2 = comparecount2;

                $scope.orderDetailList.push($scope.cancelsortstockdetail);

                delete $scope.cancelsortstockdetail['SHOP_ORDER_INFO.STOCKPRICE'];

                delete $scope.cancelsortstockdetail['SHOP_ORDER_INFO.STOCKWEIGHT'];

                delete $scope.cancelsortstockdetail['SHOP_ORDER_INFO.STOCKSUMCOUNT'];

                delete $scope.cancelsortstockdetail['SHOP_ORDER_INFO.STOCKSUMPRICE']

            }


        });


        $scope.sortedDetailList.splice(compare2-1,1);

        $scope.calculatePrdPrice();




    };
   //计算初始总金额
    $scope.stockprdprice = 0;

    $scope.calculatePrdPrice = function () {

        $scope.stockprdprice = 0;

        $scope.sortedDetailList.forEach(function (ele) {

            $scope.stockprdprice += parseFloat(ele['SHOP_ORDER_INFO.STOCKSUMPRICE'])

        });



};

    //计算商品分拣金额
    $scope.calculatestockprice = function () {

        var weight1 = $scope.stockdetail['SHOP_ORDER_INFO.SKU_CONTENT_INFO'].replace(/[^0-9]/g,'');

        var weight2 = $scope.stockweight.replace(/[^0-9]/g,'');



        var price = weight2/weight1*$scope.stockdetail['SHOP_ORDER_INFO.PRICE_NOW'];

        $scope.initstockprice = price.toFixed(2);

        $scope.initStockprice();

    }


    $scope.initStockprice= function () {


        $scope.stockprice = $scope.initstockprice;

    }

    $scope.stockdiscountprice = 0;

    //分拣完毕，更新状态
    $scope.completesort = function () {

        console.log("分拣完毕")

        // $scope.order['SHOP_ORDER.PRICE_DISCOUNT'] = $scope.stockdiscountprice*100;

        $scope.order['SHOP_ORDER.PRICE_ORDER'] = $scope.stockprdprice*100;

        $scope.order['SHOP_ORDER.PRICE_OVER'] = $scope.stockprdprice*100;

        $scope.order['SHOP_ORDER.DETAILS'] = JSON.stringify($scope.sortedDetailList);

        //更新状态
        $scope.order['SHOP_ORDER.STATE_OUT'] = 1;

        console.log($scope.sortedDetailList);

        delete $scope.order['SHOP_ORDER.ORDER_INFO'];

        console.log($scope.order);

        orderFactory.modifyBySortComplete($scope.order, function (response) {

            modalFactory.showShortAlert('分拣成功');

            $state.go('order/order/orderDetail', {ORDER_ID: $scope.order['SHOP_ORDER.ID']});

        }, function (response) {

            modalFactory.showShortAlert('分拣失败');

        });



    };


});
