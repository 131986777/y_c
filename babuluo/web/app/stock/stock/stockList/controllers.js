AndSellMainModule.controller('stockListController', function ($scope, shopFactory, stockFactory, modalFactory, $q) {

    modalFactory.setTitle('实时库存');


   /* $scope.initLoad = function () {

        stockFactory.getStockList().get({}, function (response) {
            console.log(response);
            $scope.stockList = response.data;
            $scope.storeMap= response.extraData.storeMap;

            $scope.storeList= response.extraData.storeArray;
            console.log( $scope.storeMap);
            console.log($scope.storeList);

        }, null);


      //  console.log($scope.storeMap.get('1'));
    };
*/
    $scope.bindData = function (response) {

        console.log(response);
        $scope.stockList = response.data;
        $scope.storeMap= response.extraData.storeMap;

        $scope.storeList= response.extraData.storeArray;
        console.log( $scope.storeMap);
        console.log($scope.storeList);
    };
    //根据商品id查询
    $scope.queryStockById = function(PId){
       // alert(PId);
        $scope.roundList =$scope.stockList;
        $scope.stockList =[];
        for(var i=0;i< $scope.roundList.length;i++){
            if( $scope.roundList[i]['STOCK_REALTIME.PID']==PId){
                $scope.stockList.push($scope.roundList[i]);

            }
        }

    }

    //$scope.initLoad();


    $scope.addStore = function () {
        if ($scope.IS_DEF){
            $scope.add['STORE.IS_DEF']=1;
        }else{
            $scope.add['STORE.IS_DEF']=-1;
        }
        $scope.add['STORE.IS_DEF']=1;
        $scope.add['STORE.ADD_DATETIME']=new Date();  //add['STORE.IS_DEF']
        console.log($scope.add);

        stockFactory.addStore($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add='';
                $("#addStore").modal('hide');
                $scope.initLoad();
            }
        });
    };

    $scope.modifyStoreClick = function (item) {

        $scope.modify=clone(item);
        $scope.modifyId=item['STORE.ID'];
        //console.log('删除ID为'+modifyId);

    };

    $scope.modifyStore = function () {
        $scope.modify['STORE.ID'] =  $scope.modifyId;

        if ($scope.modifyIsDef){
            $scope.modify['STORE.IS_DEF']=1;
        }else{
            $scope.modify['STORE.IS_DEF']=-1;
        }

        stockFactory.modifyStore ($scope.modify).get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyStore").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.initLoad();
            }
        });
    };

    $scope.deleteStore = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            stockFactory.delStoreById(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");

                    $scope.initLoad();
                }
            });
        });

    }
});

