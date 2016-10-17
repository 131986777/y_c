AndSellMainModule.controller('productModifyController', function ($scope, $state, $stateParams,productFactory, classFactory, unitFactory, tagFactory, modalFactory, $q) {

    modalFactory.setTitle('商品修改');

    modalFactory.setBottom(true, function () {
        $scope.modifyProductSubmit();
    }, function () {
        $state.go('productList');
    });

    /**
     * 初始变量
     */
    $scope.modify = {};
    $scope.selectTagIds = [];
    $scope.selectTagNames = [];
    $scope.tag = {};
    $scope.tags1 = [];
    $scope.tags2 = [];
    $scope.tags3 = [];
    $scope.product = {};
    $scope.product.tags = [];
    $scope.tempSaveSkuMap = new Map();
    $scope.prdTagMap=new Map;

    var ue;//editor
    insertHtml = function(html) {
        ue.execCommand('inserthtml', html);
    };

    /**
     * defer数据加载区
     */
    var initDefer_prd = $q.defer();
    var initDefer_class = $q.defer();
    var initDefer_tag = $q.defer();
    var initDefer_unit = $q.defer();
    var initDefer_total = $q.all([initDefer_prd.promise,initDefer_class.promise, initDefer_tag.promise, initDefer_unit.promise]);

    initDefer_total.then(function () {
        console.log('数据加载完毕');
        console.log($scope.prdClssList);
        console.log($scope.prdUnitList);
        console.log($scope.prdTagList);

        //然后开始适配数据
        $scope.keyword=$scope.modify['SHOP_PRODUCT.KEYWORD']!=undefined?$scope.modify['SHOP_PRODUCT.KEYWORD'].split(','):new Array;
        $scope.tags=$scope.modify['SHOP_PRODUCT.TAG_ID']!=undefined?$scope.modify['SHOP_PRODUCT.TAG_ID'].split(','):new Array;
        $scope.tags.forEach(function (ele) {
            $scope.selectTagButton(ele);
        });
        insertHtml($scope.modify['SHOP_PRODUCT.SHOP_DES']);

    });

    /**
     * 初始加载，和数据的准备
     **/
    $scope.initLoad = function () {

        UE.delEditor('container');
        // UE 实例化
        ue = UE.getEditor('container', {
            initialFrameHeight: 300, initialFrameWidth: 900
        });

        //加载商品数据
        productFactory.getProductById($stateParams.productId).get({}, function (response) {
            $scope.modify=response.data[0];
            $scope.skuList=response.extraData.SKU_LIST;
            initDefer_prd.resolve();
        });


        //加载商品分类数据
        classFactory.getPrdClassList().get({}, function (response) {
            $scope.prdClssList = response.data;
            initDefer_class.resolve();
        });

        //加载商品标签数据
        tagFactory.getPrdTagList().get({}, function (response) {
            $scope.prdTagList = response.data;
            $scope.prdTagList.forEach(function (ele) {
                $scope.prdTagMap.set(ele['SHOP_TAG.TAG_ID'],ele['SHOP_TAG.TAG']);
            });
            initDefer_tag.resolve();
        });

        //加载商品单位数据
        unitFactory.getPrdUnitList().get({}, function (response) {
            $scope.prdUnitList = response.data;
            initDefer_unit.resolve();
        });

    };
    $scope.initLoad();

    $scope.modifyProductSubmit = function () {
        $scope.modify['SHOP_PRODUCT.KEYWORD'] = getTabInputText($scope.keyword);
        $scope.modify['SHOP_PRODUCT.CLASS_ID'] = $scope.modify['SHOP_PRODUCT_CLASS.CLASS_ID'];
        $scope.modify['SHOP_PRODUCT.UNIT_ID'] = $scope.modify['SHOP_UNIT.UNIT_ID'];
        var form = $scope.modify;
        form['SHOP_PRODUCT.SERVICE_ID'] = 1;
        form['SHOP_PRODUCT.SHOP_DES'] = ue.getContent();
        form['SHOP_PRODUCT.TAG_ID'] = $scope.selectTagIds.toString();
        productFactory.modifyProduct(form).get({}, function (response) {
            if(response.code==0){
                modalFactory.showShortAlert("保存成功");
                $state.go("productList");
            }else{
                modalFactory.showShortAlert(response.msg);
            }
        });
    };

    /**
     * 选择tag按钮
     * @param tagId
     * @param tagName
     */
    $scope.selectTagButton = function (tagId) {
        var index = $scope.selectTagIds.indexOf(tagId);
        var tagName=   $scope.prdTagMap.get(tagId);
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

});
