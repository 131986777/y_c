angular.module('AndSell.Main').controller('product_product_productAdd_Controller', function ($http, $scope, $state, productFactory, classFactory, unitFactory, tagFactory, modalFactory, $q) {

    modalFactory.setTitle('商品新增');

    modalFactory.setBottom(true, function () {
        $scope.addProductSubmit();
    }, function () {
        $state.go('product/product/productList');
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
    $scope.uploadImageFiles = [];
    $scope.uploadFiles = [];
    $scope.uploadImageFilesIndex = 0;
    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    // UE 实例化
    var ue;

    /**
     * defer数据加载区
     */
    var initDefer_class = $q.defer();
    var initDefer_tag = $q.defer();
    var initDefer_unit = $q.defer();
    var initDefer_spuCode = $q.defer();
    var initDefer_total = $q.all([initDefer_class.promise, initDefer_tag.promise, initDefer_unit.promise, initDefer_spuCode.promise]);

    initDefer_total.then(function () {
        //开始监听规格变化
        $scope.addWatch();
    });

    /**
     * 初始加载，和数据的准备
     **/
    $scope.initLoad = function () {

        UE.delEditor('container');
        ue = UE.getEditor('container', {
            initialFrameHeight: 500, initialFrameWidth: 900
        });

        //加载商品分类数据
        classFactory.getPrdClassList({}, function (response) {
            $scope.prdClssList = response.data;
            if ($scope.prdClssList.length > 0) {
                $scope.add['SHOP_PRODUCT_CLASS.CLASS_ID'] = $scope.prdClssList[0]['SHOP_PRODUCT_CLASS.CLASS_ID'];
            }
            initDefer_class.resolve();
        });

        //加载商品标签数据
        tagFactory.getPrdTagList({}, function (response) {
            $scope.prdTagList = response.data;
            initDefer_tag.resolve();
        });

        //加载商品单位数据
        unitFactory.getPrdUnitList({}, function (response) {
            $scope.prdUnitList = response.data;
            if ($scope.prdUnitList.length > 0) {
                $scope.add['SHOP_UNIT.UNIT_ID'] = $scope.prdUnitList[0]['SHOP_UNIT.UNIT_ID'];
            }
            initDefer_unit.resolve();
        });

        //加载商品编码
        productFactory.getSpuCode({}, function (response) {
            $scope.spuCode = response.extraData.spuCode;
            $scope.product.tags.push(new Tag());
            $scope.product.tags[0]['SHOP_PRODUCT_SKU.PRD_SKU'] = $scope.spuCode + '010101';
            initDefer_spuCode.resolve();
        });

        connALiYun();
    };
    $scope.initLoad();

    $scope.addProductSubmit = function () {
        if ($scope.add['SHOP_PRODUCT.PRD_NAME'] == undefined) {
            modalFactory.showShortAlert("请填写商品名称");
            return;
        }
        if ($scope.tags1.length < 1) {
            modalFactory.showShortAlert("至少包含一种规格");
            return;
        }
        $scope.add['SHOP_PRODUCT.KEYWORD'] = getTabInputText($scope.keyword);
        $scope.add['SHOP_PRODUCT.CLASS_ID'] = $scope.add['SHOP_PRODUCT_CLASS.CLASS_ID'];
        $scope.add['SHOP_PRODUCT.UNIT_ID'] = $scope.add['SHOP_UNIT.UNIT_ID'];
        $scope.add['SHOP_PRODUCT.REMARK'] = "onLine";
        var form = $scope.add;
        form['SHOP_PRODUCT.SERVICE_ID'] = 1;
        form['SHOP_PRODUCT.PRD_SPU'] = $scope.spuCode;
        form['SHOP_PRODUCT.SHOP_DES'] = ue.getContent();
        form['SHOP_PRODUCT.TAG_ID'] = $scope.selectTagIds.toString();
        form['SkuListData'] = JSON.stringify($scope.product.tags);

        var uploadImageArray = new Array();
        for (var i = 0; i < $scope.uploadImageFiles.length; i++) {
            if (i == $scope.uploadImageFilesIndex) {
                form['SHOP_PRODUCT.CMP'] = $scope.uploadImageFiles[i];
            } else {
                uploadImageArray.push($scope.uploadImageFiles[i]);
            }

        }
        form['SHOP_PRODUCT.P1'] = uploadImageArray[0];
        form['SHOP_PRODUCT.P2'] = uploadImageArray[1];
        form['SHOP_PRODUCT.P3'] = uploadImageArray[2];
        form['SHOP_PRODUCT.P4'] = uploadImageArray[3];
        form['SHOP_PRODUCT.P5'] = uploadImageArray[4];

        productFactory.addProduct(form, function (response) {
            modalFactory.showShortAlert("保存成功");
            $state.go("product/product/productList");
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.changeSettingSku = function () {

        $scope.hasSkuAttrCount = 0;
        $scope.product.skuName1 = '商品规格';
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
                        tagg['SHOP_PRODUCT_SKU.SKU_CONTENT1'] = '';
                    } else {
                        tagg['SHOP_PRODUCT_SKU.SKU_NAME1'] = $scope.product.skuName1;
                        tagg['SHOP_PRODUCT_SKU.SKU_CONTENT1'] = $scope.tags1[i1].text;
                    }
                    if (i2 >= $scope.tags2.length) {
                        tagg['SHOP_PRODUCT_SKU.SKU_CONTENT2'] = '';
                    } else {
                        tagg['SHOP_PRODUCT_SKU.SKU_NAME2'] = $scope.product.skuName2;
                        tagg['SHOP_PRODUCT_SKU.SKU_CONTENT2'] = $scope.tags2[i2].text;
                    }
                    if (i3 >= $scope.tags3.length) {
                        tagg['SHOP_PRODUCT_SKU.SKU_CONTENT3'] = '';
                    } else {
                        tagg['SHOP_PRODUCT_SKU.SKU_NAME3'] = $scope.product.skuName3;
                        tagg['SHOP_PRODUCT_SKU.SKU_CONTENT3'] = $scope.tags3[i3].text;
                    }

                    var a = skuTmpCode + i1 < 10 ? '0' + (skuTmpCode + i1) : (skuTmpCode + i1);
                    var b = skuTmpCode + i2 < 10 ? '0' + (skuTmpCode + i2) : (skuTmpCode + i2);
                    var c = skuTmpCode + i3 < 10 ? '0' + (skuTmpCode + i3) : (skuTmpCode + i3);

                    tagg['SHOP_PRODUCT_SKU.PRD_SKU'] = $scope.spuCode + a + b + c;

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
        object['SHOP_PRODUCT_SKU.PRD_SKU'] = '';
        object['SHOP_PRODUCT_SKU.SKU_NAME1'] = '';
        object['SHOP_PRODUCT_SKU.SKU_CONTENT1'] = '';
        object['SHOP_PRODUCT_SKU.SKU_NAME2'] = '';
        object['SHOP_PRODUCT_SKU.SKU_CONTENT2'] = '';
        object['SHOP_PRODUCT_SKU.SKU_NAME3'] = '';
        object['SHOP_PRODUCT_SKU.SKU_CONTENT3'] = '';
        object['SHOP_PRODUCT_SKU.PRICE'] = 0;
        object['SHOP_PRODUCT_SKU.REAL_PRICES'] = 0;
        object.isDel = false;

        object.hashCode = function () {
            return "#"
                + object['SHOP_PRODUCT_SKU.SKU_CONTENT1']
                + "#"
                + object['SHOP_PRODUCT_SKU.SKU_CONTENT2']
                + "#"
                + object['SHOP_PRODUCT_SKU.SKU_CONTENT3'];
        };
        return object;
    }

    //阿里云连接
    function connALiYun() {
        var actionUrl = "../../aliYun";
        $http.post(actionUrl).success(function (response) {
            $scope.filePath = response.split(',')[0];
            $scope.policy = response.split(',')[1];
            $scope.signature = response.split(',')[2];
        });
    }

    /**
     * 设置商品封面
     * 16.08.29
     * ZHJ
     */
    $scope.setFirstImg = function (imageFileUrl) {

        for (var i = 0; i < $scope.uploadImageFiles.length; i++) {

            if ($scope.uploadImageFiles[i] == imageFileUrl) {
                $scope.uploadImageFilesIndex = i;
                console.log($scope.uploadImageFilesIndex);
                break;
            }
        }

    };
    /**
     * 删除商品图片
     */
    $scope.delImageFile = function (key) {
        $scope.uploadImageFiles.splice(key, 1);
    }

    /**
     *  上传商品的图片， 最多上传6个
     **/
    $scope.uploadImage = function (element) {
        _uploadFiles(element.files, $scope.uploadImageFiles, 'image', 6, function () {
            alert("商品图册最多只能添加6张！");
        }, function (successResponse) {
            $scope.uploadImageFiles.push(successResponse.url);
            console.log(successResponse);
            console.log($scope.uploadImageFiles);
        });
    };

    /**
     * 上传商品的附件， 最多上传20个
     * */
    $scope.uploadFile = function (element) {
        _uploadFiles(element.files, $scope.uploadFiles, 'file', 20, function () {
            alert("商品附件最多只能添加20个！");
        }, function (successResponse) {
            $scope.uploadFiles.push(successResponse);
        });
    };

    //上传文件
    var _uploadFiles = function (files, bindToList, type, maxSize, errCall, successCall) {

        var maxLength = maxSize - bindToList.length;
        for (index = 0; index < files.length; index++) {
            if (index >= maxLength) {
                errCall();
                return;
            }
            //发送请求
            _postFile(files[index], type).success(function (response) {
                console.log(response);
                var state = '"state\":\"SUCCESS",';
                var title = '"title":' + '"' + fileName + '",';
                var original = '"original":' + '"' + file.name + '",';
                var type = '"type":' + '".' + fileSuffix + '",';

                var index1 = response.indexOf('<Key>');
                var index2 = response.indexOf('</Key>');
                fileurl = response.substring(index1 + 5, index2);
                var url = '"url":"' + fileurl + '",';
                var size = '"size":"' + file.size + '"';
                var json = '{' + state + title + original + type + url + size + '}';
                console.log('要返回的json字符串为' + json);
                var jsonObj = JSON.parse(json);   //将字符串装换为json对象;
                successCall(jsonObj);
            }).error(function (response) {
                console.log(response);
            });
        }

    };

    var _postFile = function (file1, filetype) {
        file = file1;
        var fd = new FormData();
        var date = new Date();
        var tempArray = file.name.split('.');
        fileSuffix = tempArray[tempArray.length - 1];     //文件后缀名
        fileName = date.getTime()
            + (Math.round(Math.random() * 1000)).toString()
            + '.'
            + fileSuffix;    //文件名
        fd.append('OSSAccessKeyId', 'LTAIEHpVQat6f83C');
        fd.append('policy', $scope.policy);
        fd.append('Signature', $scope.signature);
        if (filetype == 'image') {
            fd.append('key', $scope.filePath + '/image/' + fileName);  //filePath为用户的ServiceId
        } else {
            fd.append('key', $scope.filePath + '/file/' + fileName);
        }
        fd.append('success_action_status', '201');
        fd.append('file', file);              //'file'必须为表单的最后一个字段
        var url2 = 'http://bbl-upload.oss-cn-shanghai.aliyuncs.com';    //阿里云存储的地址

        return $http.post(url2, fd, {
            transformRequest: angular.identity, headers: {'Content-Type': undefined}
        });
    };

});
