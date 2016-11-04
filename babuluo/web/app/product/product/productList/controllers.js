AndSellMainModule.controller('productListController', function ($scope, $stateParams,productFactory, modalFactory) {

    modalFactory.setTitle('商品列表');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN=FILE_SERVER_DOMAIN;

    $scope.queryKeyUp = function (e) {
        if(window.event?e.keyCode:e.which==13){
            $scope.queryPrdName();
        }
    };

    $scope.queryPrdName = function () {

        $scope.filter['SHOP_PRODUCT.PRD_NAME'] = $scope.query['SHOP_PRODUCT.PRD_NAME'];
    };

    $scope.initData=function () {
        $scope.query={
            'SHOP_PRODUCT.PRD_NAME':$stateParams.keyword
        }
        $scope.filter={};
        if($stateParams.keyword!=''){
            $scope.queryPrdName();
        }
    }

    $scope.bindData = function (response) {
        $scope.productList = response.data;
        $scope.tagList = response.extraData.tagList;
        console.log(response);
    };

    //改变商品上下架状态
    $scope.changeProductSaleState = function (item) {
        var info = '下架';
        if(item['SHOP_PRODUCT.IS_SALE']!=1){
            info = '上架';
        }
        var params=clone(item);
        params['SHOP_PRODUCT.IS_SALE']=params['SHOP_PRODUCT.IS_SALE']*-1;
        modalFactory.showAlert("确定"+info+"该商品吗?",function(){
            productFactory.setProductState(params).get({}, function () {
                item['SHOP_PRODUCT.IS_SALE']=item['SHOP_PRODUCT.IS_SALE']*-1;
            });
        })

    }

    //改变sku上下架状态
    $scope.changeSkuSaleState = function (item) {
        var info = '下架';
        if(item['SHOP_PRODUCT_SKU.IS_SALE']!=1){
            info = '上架';
        }
        var params=clone(item);
        params['SHOP_PRODUCT_SKU.IS_SALE']=params['SHOP_PRODUCT_SKU.IS_SALE']*-1;
        modalFactory.showAlert("确定"+info+"该规格吗?",function(){
            productFactory.setSkuState(params).get({}, function () {
                item['SHOP_PRODUCT_SKU.IS_SALE']=item['SHOP_PRODUCT_SKU.IS_SALE']*-1;
            });
        })
    }

    //删除商品
    $scope.delProduct = function (item) {
        item['SHOP_PRODUCT.IS_DEL'] = 1;
        modalFactory.showAlert("确定删除该商品吗?(不可恢复)",function() {
            productFactory.delProduct(item).get({}, function () {
                $scope.$broadcast('pageBar.reload');
            });
        });
    }

    //删除sku
    $scope.delSku = function (item) {
        item['SHOP_PRODUCT_SKU.IS_DEL'] = 1;
        productFactory.delSku(item).get({}, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    //改价
    $scope.showModifySkuPrice = function (item) {
        console.log(item);
        $scope.modifyProduct = item;
    }

    var changeList=new Array;

    //记录修改的item
    $scope.addToChangeList = function (item) {
        console.log(item);
        item.isChange = true;
        changeList.push(item);
    }

    //修改sku的价格
    $scope.submitModifySkuPrice = function (){
        console.log(changeList);
        var param = {};
        param.skuList=JSON.stringify(changeList);
        productFactory.modifySkuListPrice(param).get({}, function (response) {
            modalFactory.showShortAlert("改价成功");
            $('#modifySkuPrice').modal('hide');
            modalFactory.reload();
        });
    }

});
