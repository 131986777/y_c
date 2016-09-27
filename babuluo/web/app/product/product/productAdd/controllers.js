AndSellMainModule.controller('productAddController', function ($scope, $state, productFactory, classFactory, unitFactory, tagFactory, modalFactory, $q) {

    modalFactory.setTitle('商品新增');

    modalFactory.setBottom(true, function () {
        $scope.addProductSubmit();
    }, function () {
        $state.go('productList');
    });

    /**
     * 初始变量
     */
    $scope.add = {};
    $scope.selectTagIds = [];
    $scope.selectTagNames = [];
    $scope.tag = {};
    $scope.tags1 = [];
    $scope.tags2 = [];
    $scope.tags3 = [];
    $scope.product = {};
    $scope.product.tags = [];
    $scope.tempSaveSkuMap = new Map();

    // UE 实例化
    var ue = UE.getEditor('container', {
        initialFrameHeight: 300, initialFrameWidth: 900
    });

    /**
     * defer数据加载区
     */
    var initDefer_class = $q.defer();
    var initDefer_tag = $q.defer();
    var initDefer_unit = $q.defer();
    var initDefer_spuCode = $q.defer();
    var initDefer_total = $q.all([initDefer_class.promise, initDefer_tag.promise, initDefer_unit.promise, initDefer_spuCode.promise]);

    initDefer_total.then(function () {
        console.log('数据加载完毕');
        console.log($scope.prdClssList);
        console.log($scope.prdUnitList);
        console.log($scope.prdTagList);
        console.log($scope.spuCode);
        //开始监听规格变化
        $scope.addWatch();
    });

    /**
     * 初始加载，和数据的准备
     **/
    $scope.initLoad = function () {

        //加载商品分类数据
        classFactory.getPrdClassList().get({}, function (response) {
            $scope.prdClssList = response.data;
            if ($scope.prdClssList.length > 1) {
                $scope.add['shop_product_class.CLASS_ID'] = $scope.prdClssList[0]['shop_product_class.CLASS_ID'];
            }
            initDefer_class.resolve();
        });

        //加载商品标签数据
        tagFactory.getPrdTagList().get({}, function (response) {
            $scope.prdTagList = response.data;
            initDefer_tag.resolve();
        });

        //加载商品单位数据
        unitFactory.getPrdUnitList().get({}, function (response) {
            $scope.prdUnitList = response.data;
            if ($scope.prdUnitList.length > 1) {
                $scope.add['shop_unit.UNIT_ID'] = $scope.prdUnitList[0]['shop_unit.UNIT_ID'];
            }
            initDefer_unit.resolve();
        });

        //加载商品编码
        productFactory.getSpuCode().get({}, function (response) {
            $scope.spuCode = response.extraData.spuCode;
            $scope.product.tags.push(new Tag());
            $scope.product.tags[0]['shop_product_sku.PRD_SKU'] = $scope.spuCode + '010101';
            initDefer_spuCode.resolve();
        });

    };
    $scope.initLoad();

    $scope.addProductSubmit = function () {
        $scope.add['shop_product.KEYWORD'] = getTabInputText($scope.keyword);
        var form = $scope.add;
        form['shop_product.SERVICE_ID'] = 1;
        form['shop_product.PRD_SPU'] = $scope.spuCode;
        form['shop_product.SHOP_DES'] = ue.getContent();
        form['shop_product.TAG_ID'] = $scope.selectTagIds.toString();
        form['SkuListData'] = JSON.stringify($scope.product.tags);
        productFactory.addProduct(form).get({}, function () {
            modalFactory.showShortAlert("保存成功");
        });
    };

    $scope.changeSettingSku = function () {

        $scope.hasSkuAttrCount = 0;
        $scope.product.skuName1 = '重量';
        $scope.product.skuName2 = '';
        $scope.product.skuName3 = '';
    };

    /**
     * 选择tag按钮
     * @param tagId
     * @param tagName
     */
    $scope.selectTagButton = function (tagId, tagName) {
        var index = $scope.selectTagIds.indexOf(tagId);
        if (index > -1) {
            $scope.selectTagIds.splice(index, 1);
            var ind = $scope.selectTagNames.indexOf(tagName);
            if (ind > -1) {
                $scope.selectTagNames.splice(ind, 1);
            }
            $scope.tag[tagId] = false;
        } else {
            $scope.selectTagIds.push(tagId);
            $scope.selectTagNames.push(tagName);
            $scope.tag[tagId] = true;
        }
    };

    /**
     * 删除sku属性层数
     */
    $scope.subHasSkuAttrCount = function () {
        if ($scope.hasSkuAttrCount == 2) {
            $scope.tags3.length = 0;
            $scope.product.skuName3 = "";
        } else if ($scope.hasSkuAttrCount == 1) {
            $scope.tags2.length = 0;
            $scope.product.skuName2 = "";
        }
        $scope.hasSkuAttrCount = $scope.hasSkuAttrCount - 1;
    };

    /**
     * 添加一个属性层
     */
    $scope.addHasSkuAttrCount = function () {
        $scope.hasSkuAttrCount = $scope.hasSkuAttrCount + 1;
    };

    /**
     * 添加监听事件
     */
    $scope.addWatch = function () {

        $scope.$watch('tags1.length', function (value1) {
            var value2 = $scope.tags2.length;
            var value3 = $scope.tags3.length;
            $scope.executeSku(value1, value2, value3);
        });

        $scope.$watch('tags2.length', function (value2) {
            var value1 = $scope.tags1.length;
            var value3 = $scope.tags3.length;
            $scope.executeSku(value1, value2, value3);
        });

        $scope.$watch('tags3.length', function (value3) {
            var value1 = $scope.tags1.length;
            var value2 = $scope.tags2.length;
            $scope.executeSku(value1, value2, value3);
        });

        $scope.$watch('product.setSku', function (value) {
            console.log("product.setSku:" + value);
            if (undefined != value && !value) {
                $scope.tags1.length = 0;
                $scope.tags2.length = 0;
                $scope.tags3.length = 0;
            }
        });

    };

    /**
     * 计算sku属性， 包括sku编码等等
     * @param value1
     * @param value2
     * @param value3
     */
    $scope.executeSku = function (value1, value2, value3) {
        $scope.product.tags.length = 0;

        if (value1 < 1) {
            value1 = 1;
        }
        if (value2 < 1) {
            value2 = 1;
        }
        if (value3 < 1) {
            value3 = 1;
        }

        var skuTmpCode = 1;
        for (var i1 = 0; i1 < value1; i1++) {
            for (var i2 = 0; i2 < value2; i2++) {
                for (var i3 = 0; i3 < value3; i3++) {
                    var tagg = Tag();

                    if (i1 >= $scope.tags1.length) {
                        tagg['shop_product_sku.SKU_CONTENT1'] = '';
                    } else {
                        tagg['shop_product_sku.SKU_NAME1'] = $scope.product.skuName1;
                        tagg['shop_product_sku.SKU_CONTENT1'] = $scope.tags1[i1].text;
                    }
                    if (i2 >= $scope.tags2.length) {
                        tagg['shop_product_sku.SKU_CONTENT2'] = '';
                    } else {
                        tagg['shop_product_sku.SKU_NAME2'] = $scope.product.skuName2;
                        tagg['shop_product_sku.SKU_CONTENT2'] = $scope.tags2[i2].text;
                    }
                    if (i3 >= $scope.tags3.length) {
                        tagg['shop_product_sku.SKU_CONTENT3'] = '';
                    } else {
                        tagg['shop_product_sku.SKU_NAME3'] = $scope.product.skuName3;
                        tagg['shop_product_sku.SKU_CONTENT3'] = $scope.tags3[i3].text;
                    }

                    var a = skuTmpCode + i1 < 10 ? '0' + (skuTmpCode + i1) : (skuTmpCode + i1);
                    var b = skuTmpCode + i2 < 10 ? '0' + (skuTmpCode + i2) : (skuTmpCode + i2);
                    var c = skuTmpCode + i3 < 10 ? '0' + (skuTmpCode + i3) : (skuTmpCode + i3);

                    tagg['shop_product_sku.PRD_SKU'] = $scope.spuCode + a + b + c;

                    var saved = $scope.tempSaveSkuMap.get(tagg.hashCode());

                    if (undefined == saved) {
                        $scope.tempSaveSkuMap.set(tagg.hashCode(), tagg);
                        $scope.product.tags.push(tagg);
                    } else {
                        saved.isDel = false;
                        $scope.product.tags.push(saved);
                    }

                }
            }

        }
    };

    /**
     * 临时保存的sku对象
     * */
    function Tag() {
        var object = {};
        object['shop_product_sku.PRD_SKU'] = '';
        object['shop_product_sku.SKU_NAME1'] = '';
        object['shop_product_sku.SKU_CONTENT1'] = '';
        object['shop_product_sku.SKU_NAME2'] = '';
        object['shop_product_sku.SKU_CONTENT2'] = '';
        object['shop_product_sku.SKU_NAME3'] = '';
        object['shop_product_sku.SKU_CONTENT3'] = '';
        object['shop_product_sku.PRICE'] = '';
        object['shop_product_sku.REAL_PRICES'] = '';
        object.isDel = false;

        object.hashCode = function () {
            return "#"
                + object['shop_product_sku.SKU_CONTENT1']
                + "#"
                + object['shop_product_sku.SKU_CONTENT2']
                + "#"
                + object['shop_product_sku.SKU_CONTENT3'];
        };
        return object;
    }

});
