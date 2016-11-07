AndSellMainModule.controller('stockListController', function ($scope,  stockFactory, modalFactory, $q) {

    modalFactory.setTitle('实时库存');



    $scope.bindData = function (response) {

        console.log(response);
        $scope.stockList = response.data;
        $scope.storeQueryList= $scope.stockList;
        $scope.storeMap= response.extraData.storeMap;
        $scope.storeList= response.extraData.storeList;
        $scope.productMap=response.extraData.prdMap;
        // console.log( $scope.storeMap);
        // console.log($scope.storeList);
    };
    //根据商品id查询
    $scope.queryStockById = function(pName){
      //  alert(PId);
       // console.log($scope.storeQueryList);

        $scope.roundList = $scope.storeQueryList;
        if(pName==''||pName==null){
            $scope.stockList=$scope.roundList;
        }else {
            var PId=$scope.productMap[pName];
            $scope.stockList =[];
            for(var i=0;i< $scope.roundList.length;i++){
                if( $scope.roundList[i]['STOCK_REALTIME.PID']==PId){
                    $scope.stockList.push($scope.roundList[i]);

                }
            }
        }


    }






    $scope.modify={};
    $scope.modifyStockClick = function (item) {

        $scope.modify=clone(item);


    };

    $scope.modifyStock = function () {


        stockFactory.modStockOnLine ($scope.modify).get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyStock").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

 /*   $scope.deleteStore = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            stockFactory.delStoreById(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        });

    }*/
});

