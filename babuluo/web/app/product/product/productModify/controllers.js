angular.module('AndSell.Main').controller('product_product_productModify_Controller', function ($http,$scope, $state, $stateParams,productFactory, classFactory, unitFactory, tagFactory, modalFactory, $q) {

    $scope.FILE_SERVER_DOMAIN=FILE_SERVER_DOMAIN;

    modalFactory.setTitle('商品修改');

    modalFactory.setBottom(true, function () {
        $scope.modifyProductSubmit();
    }, function () {
        $state.go('product/product/productList');
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

    $scope.uploadImageFiles = [];
    $scope.uploadImageFilesIndex=0;
    //$scope.FILE_SERVER_DOMAIN = "http://babuluo-file.oss-cn-hangzhou.aliyuncs.com//";

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
            initialFrameHeight: 500, initialFrameWidth: 900
        });

        //加载商品数据
        productFactory.getProductById($stateParams.productId).get({}, function (response) {
            $scope.modify=response.data[0];
            console.log($scope.modify);
            if($scope.modify['SHOP_PRODUCT.CMP']!=null){
                $scope.uploadImageFiles.push($scope.modify['SHOP_PRODUCT.CMP']);
            }
            if($scope.modify['SHOP_PRODUCT.P1']!=null){
                $scope.uploadImageFiles.push($scope.modify['SHOP_PRODUCT.P1']);
            }
            if($scope.modify['SHOP_PRODUCT.P2']!=null){
                $scope.uploadImageFiles.push($scope.modify['SHOP_PRODUCT.P2']);
            }
            if($scope.modify['SHOP_PRODUCT.P3']!=null){
                $scope.uploadImageFiles.push($scope.modify['SHOP_PRODUCT.P3']);
            }
            if($scope.modify['SHOP_PRODUCT.P4']!=null){
                $scope.uploadImageFiles.push($scope.modify['SHOP_PRODUCT.P4']);
            }
            if($scope.modify['SHOP_PRODUCT.P5']!=null){
                $scope.uploadImageFiles.push($scope.modify['SHOP_PRODUCT.P5']);
            }

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

        connALiYun();

    };
    $scope.initLoad();

    $scope.modifyProductSubmit = function () {
        $scope.modify['SHOP_PRODUCT.KEYWORD'] = getTabInputText($scope.keyword);
        $scope.modify['SHOP_PRODUCT.CLASS_ID'] = $scope.modify['SHOP_PRODUCT.CLASS_ID'];
        $scope.modify['SHOP_PRODUCT.UNIT_ID'] = $scope.modify['SHOP_PRODUCT.UNIT_ID'];
        var form = $scope.modify;
        form['SHOP_PRODUCT.SERVICE_ID'] = 1;
        form['SHOP_PRODUCT.SHOP_DES'] = ue.getContent();
        form['SHOP_PRODUCT.TAG_ID'] = $scope.selectTagIds.toString();

        var uploadImageArray=new Array();

        for(var i = 0;i<$scope.uploadImageFiles.length;i++) {
            if(i== $scope.uploadImageFilesIndex ){
                console.log("封面图片为"+i);
                form['SHOP_PRODUCT.CMP']=$scope.uploadImageFiles[i];
            }else {
                uploadImageArray.push($scope.uploadImageFiles[i]);
            }
        }
        form['SHOP_PRODUCT.P1']='{$null}';
        form['SHOP_PRODUCT.P2']='{$null}';
        form['SHOP_PRODUCT.P3']='{$null}';
        form['SHOP_PRODUCT.P4']='{$null}';
        form['SHOP_PRODUCT.P5']='{$null}';
        //先将所有的置为空，再重新赋值
        console.log("长度2为"+uploadImageArray.length);
        for (var i = 0; i < uploadImageArray.length; i++) {
            if (i == 0)
                form['SHOP_PRODUCT.P1'] = uploadImageArray[0];
            if (i == 1) {
                console.log(2);
                form['SHOP_PRODUCT.P2'] = uploadImageArray[1];
            }
            if (i == 2)
                form['SHOP_PRODUCT.P3'] = uploadImageArray[2];
            if (i == 3)
                form['SHOP_PRODUCT.P4'] = uploadImageArray[3];
            if (i == 4)
                form['SHOP_PRODUCT.P5'] = uploadImageArray[4];
        }
       /* form['SHOP_PRODUCT.P1']=uploadImageArray[0];
        form['SHOP_PRODUCT.P2']=uploadImageArray[1];
        form['SHOP_PRODUCT.P3']=uploadImageArray[2];
        form['SHOP_PRODUCT.P4']=uploadImageArray[3];
        form['SHOP_PRODUCT.P5']=uploadImageArray[4];*/
        console.log('wenfd'+form['SHOP_PRODUCT.P5']);
        productFactory.modifyProduct(form).get({}, function (response) {
            if(response.code==0){
                modalFactory.showShortAlert("保存成功");
                $state.go("product/product/productList");
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

    //阿里云连接
    function connALiYun() {
        var actionUrl = "../../aliYun";
        $http.post(actionUrl).success(function (response) {
            $scope.filePath=response.split(',')[0];
            $scope. policy=response.split(',')[1];
            $scope.signature=response.split(',')[2];
        });
    }
    /**
     * 设置商品封面
     * 16.08.29
     * ZHJ
     */
    $scope.setFirstImg = function (imageFileUrl){

        for(var i = 0;i<$scope.uploadImageFiles.length;i++) {

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
    $scope.delImageFile=function (key) {
        $scope.uploadImageFiles.splice(key,1);
        console.log("长度为"+$scope.uploadImageFiles.length);
    }

    /**
     *  上传商品的图片， 最多上传6个
     **/
    $scope.uploadImage = function (element) {
        _uploadFiles(element.files, $scope.uploadImageFiles,'image', 6, function () {
            alert("商品图册最多只能添加6张！");
        },function(successResponse){
            $scope.uploadImageFiles.push(successResponse.url);
            console.log(successResponse);
            console.log($scope.uploadImageFiles);
        });
    };

    /**
     * 上传商品的附件， 最多上传20个
     * */
    $scope.uploadFile = function (element) {
        _uploadFiles(element.files, $scope.uploadFiles,'file', 20, function () {
            alert("商品附件最多只能添加20个！");
        },function (successResponse) {
            $scope.uploadFiles.push(successResponse);
        });
    };

    //上传文件
    var _uploadFiles = function (files, bindToList, type, maxSize, errCall,successCall) {

        var maxLength = maxSize - bindToList.length;
        for(index=0;index<files.length;index++){
            if (index >= maxLength) {
                errCall();
                return;
            }
            //发送请求
            _postFile( files[index],type).success(function (response) {
                console.log(response);
                var  state='"state\":\"SUCCESS",';
                var  title='"title":'+'"'+fileName+'",';
                var  original='"original":'+'"'+file.name+'",';
                var  type='"type":'+'".'+fileSuffix+'",';

                var index1=response.indexOf('<Key>');
                var index2=response.indexOf('</Key>');
                fileurl=response.substring(index1+5,index2);
                var  url='"url":"'+fileurl+'",';
                var  size='"size":"'+file.size+'"';
                var json='{'+state+title+original+type+url+size+'}';
                console.log('要返回的json字符串为'+json);
                var jsonObj = JSON.parse(json);   //将字符串装换为json对象;
                successCall(jsonObj);
            } ).error(function(response){
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
        fileName = date.getTime() + (Math.round(Math.random() * 1000)).toString() + '.' + fileSuffix;    //文件名
        fd.append('OSSAccessKeyId', 'LTAImVQlWKQXIQcD');
        fd.append('policy', $scope.policy);
        fd.append('Signature', $scope.signature);
        if (filetype == 'image') {
            fd.append('key', $scope.filePath + '/image/' + fileName);  //filePath为用户的ServiceId
        } else {
            fd.append('key', $scope.filePath + '/file/' + fileName);
        }
        fd.append('success_action_status', '201');
        fd.append('file', file);              //'file'必须为表单的最后一个字段
        var url2 = 'http://babuluo-file.oss-cn-hangzhou.aliyuncs.com';    //阿里云存储的地址

        return $http.post(url2, fd, {
            transformRequest: angular.identity, headers: {'Content-Type': undefined}
        });
    };

});
