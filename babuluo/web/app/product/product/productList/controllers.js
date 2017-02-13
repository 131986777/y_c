angular.module('AndSell.Main').controller('product_product_productList_Controller', function ($scope, $stateParams, productFactory, modalFactory) {

    modalFactory.setTitle('商品列表');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.queryKeyUp = function (e) {
        if (window.event ? e.keyCode : e.which == 13) {
            $scope.queryPrdName();
        }
    };

    $scope.queryPrdName = function () {
        $scope.filter['SHOP_PRODUCT.PRD_NAME'] = $scope.query['SHOP_PRODUCT.PRD_NAME'];
    };

    $scope.initData = function () {
        $scope.query = {
            'SHOP_PRODUCT.PRD_NAME': $stateParams.keyword
        }
        $scope.filter = {};
        if ($stateParams.keyword != '') {
            $scope.queryPrdName();
        }
        $scope.checkedList = new Array;
        $scope.changeList = new Array;
    }

    $scope.bindData = function (response) {
        $scope.productList = response.data;
        $scope.productMap = listToMap($scope.productList, 'SHOP_PRODUCT.PRD_ID');
        $scope.tagList = response.extraData.tagList;
        $scope.classList = response.extraData.classList;
        $scope.classMap = response.extraData.classMap;

        ////获取数据
        //var data = {
        //    keyName: 'SHOP_PRODUCT_CLASS.CLASS_NAME',
        //    keyId: 'SHOP_PRODUCT_CLASS.CLASS_ID',
        //    keyPId: 'SHOP_PRODUCT_CLASS.PARENT_CLASS_ID',
        //    rootId: 0,
        //    lists: $scope.classList
        //}
        //$scope.tree = data;

    };

    //改变商品上下架状态
    $scope.changeProductSaleState = function (ids, state) {
        var info = '下架';
        var SALE_STATE = -1;
        if (!state) {
            info = '上架';
            SALE_STATE = 1;
        }
        var params = {};
        params['SHOP_PRODUCT.PRD_ID'] = ids;
        params['SHOP_PRODUCT.IS_SALE'] = SALE_STATE;
        modalFactory.showAlert("确定" + info + "这 " + ids.split(",").length + " 条商品吗?", function () {
            productFactory.setProductState(params, function () {
                ids.split(',').forEach(function (ele) {
                    $scope.productMap[ele]['SHOP_PRODUCT.IS_SALE'] = SALE_STATE;
                })
                modalFactory.showShortAlert(info + '成功!');
            });
        })
    }

    //改变sku上下架状态
    $scope.changeSkuSaleState = function (item) {
        var info = '下架';
        if (item['SHOP_PRODUCT_SKU.IS_SALE'] != 1) {
            info = '上架';
        }
        var params = clone(item);
        params['SHOP_PRODUCT_SKU.IS_SALE'] = params['SHOP_PRODUCT_SKU.IS_SALE'] * -1;
        modalFactory.showAlert("确定" + info + "该规格吗?", function () {
            productFactory.setSkuState(params, function () {
                item['SHOP_PRODUCT_SKU.IS_SALE'] = item['SHOP_PRODUCT_SKU.IS_SALE'] * -1;
            });
        })
    }

    //删除商品
    $scope.delProduct = function (ids) {
        var params = {};
        params['SHOP_PRODUCT.PRD_ID'] = ids;
        params['SHOP_PRODUCT.IS_DEL'] = 1;
        modalFactory.showAlert("确定删除这 " + ids.split(",").length + " 条商品吗?(不可恢复)", function () {
            productFactory.delProduct(params, function () {
                $scope.$broadcast('pageBar.reload');
                modalFactory.showShortAlert('删除成功!');
            });
        });
    }

    //删除sku
    $scope.delSku = function (item) {
        item['SHOP_PRODUCT_SKU.IS_DEL'] = 1;
        productFactory.delSku(item, function () {
            $scope.$broadcast('pageBar.reload');
        });
    }

    //改价
    $scope.showModifySkuPrice = function (item) {
        $scope.modifyProduct = item;
    }

    //记录修改的item
    $scope.addToChangeList = function (item) {
        item.isChange = true;
        $scope.changeList.push(item);
    }

    //修改sku的价格
    $scope.submitModifySkuPrice = function () {
        var param = {};
        param.skuList = JSON.stringify($scope.changeList);
        productFactory.modifySkuListPrice(param, function (response) {
            modalFactory.showShortAlert("改价成功");
            $('#modifySkuPrice').modal('hide');
            modalFactory.reload();
        });
    }

    $scope.setPrdClass = function (data) {
        if ($scope.getCheckIdList().length == 0) {
            modalFactory.showShortAlert('至少勾选一个！');
            return;
        }
        modalFactory.showAlert("确定移动这些商品至分类 ： "
            + data['SHOP_PRODUCT_CLASS.CLASS_NAME']
            + " 吗?", function () {
            var param = {};
            param['SHOP_PRODUCT.CLASS_ID'] = data['SHOP_PRODUCT_CLASS.CLASS_ID'];
            param['SHOP_PRODUCT.PRD_ID'] = $scope.getCheckIdList().toString();
            productFactory.modifyPrdsClass(param, function (response) {
                $('#setPrdClassModal').modal('hide');
                $scope.checkedList.forEach(function (ele) {
                    ele['SHOP_PRODUCT.CLASS_ID'] = data['SHOP_PRODUCT_CLASS.CLASS_ID'];
                    ele['SHOP_PRODUCT.CLASS_NAME'] = $scope.classMap[data['SHOP_PRODUCT_CLASS.CLASS_ID']];
                })
                modalFactory.showShortAlert('分类设置成功');

            });
        });
    }

    /**
     * 多选处理
     **/

        //批量设置标签
    $scope.setPrdsTag = function (data) {
        if ($scope.getCheckIdList().length == 0) {
            modalFactory.showShortAlert('至少勾选一个！');
            return;
        }
        var tagIdList = new Array;
        var tagList = new Array;
        data.forEach(function (ele) {
            tagIdList.push(ele['SHOP_TAG.TAG_ID']);
            tagList.push(ele['SHOP_TAG.TAG']);
        });
        var params = {};

        params['SHOP_PRODUCT.TAG_ID'] = tagIdList.toString();
        if (params['SHOP_PRODUCT.TAG_ID'] == '') {
            params['SHOP_PRODUCT.TAG_ID'] = '{$null}';
        }
        params['SHOP_PRODUCT.PRD_ID'] = $scope.getCheckIdList().toString();
        productFactory.modifyPrdsTag(params, function (response) {
            $scope.checkedList.forEach(function (ele) {
                ele['SHOP_PRODUCT.TAG'] = tagList;
            })
            modalFactory.showShortAlert('标签设置成功');
        });
    }

    //批量上下架
    $scope.changeProductsSaleState = function (state) {
        if ($scope.getCheckIdList().length == 0) {
            modalFactory.showShortAlert('至少勾选一个！');
            return;
        }
        $scope.changeProductSaleState($scope.getCheckIdList().toString(), state);
    }

    //批量删除
    $scope.delProducts = function () {
        if ($scope.getCheckIdList().length == 0) {
            modalFactory.showShortAlert('至少勾选一个！');
            return;
        }
        $scope.delProduct($scope.getCheckIdList().toString());
    }

    //获取选中的商品的id集合
    $scope.getCheckIdList = function () {
        var list = new Array;
        $scope.checkedList.forEach(function (ele) {
            list.push(ele['SHOP_PRODUCT.PRD_ID']);
        })
        return list;
    }

    //选中列表 prd
    $scope.pushItem = function (item, state) {
        if (state) {
            if ($scope.checkedList.indexOf(item) < 0) {
                $scope.checkedList.push(item);
            }
        } else {
            if ($scope.checkedList.indexOf(item) >= 0) {
                $scope.checkedList.remove(item);
            }
        }
        item.checked = state;
    }

    //商品选中
    $scope.checkProduct = function (product, state) {
        $scope.pushItem(product, state);
    }

    //选中所有
    $scope.checkedAll = function (state) {
        $scope.productList.forEach(function (ele) {
            ele.checked = state;
            $scope.pushItem(ele, state);
        });
    }

});
