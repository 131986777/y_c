angular.module('product').controller('AddProductController', function ($scope, http, uploadManage, utils, loadData) {
        // UE 实例化
        var ue = UE.getEditor('container', {
            initialFrameHeight: 300,
            initialFrameWidth: 900
        });

        //  test
        $scope.productClass = [{
            name: 'parent',
            childList: [{
                name: 'child1'
            }]
        }];

        $scope.tags1 = [];
        $scope.tags2 = [];
        $scope.tags3 = [];
        $scope.product = {};
        $scope.product.tags = [];

        $scope.uploadFiles = [];
        $scope.uploadImageFiles = [];
        $scope.vm = [];


        $scope.testFocus = function () {
            alert(123);
        }

        /**
         *
         * 初始加载，和数据的准备
         * **/
        $scope.initLoad = function () {
            $scope.selectTagIds = [];
            $scope.selectTagNames = [];
            $scope.tag = {};
            $scope.tempSaveSkuMap = new Map();
            $scope.uploadImageFilesIndex = 0;
            $scope.vm = [];
            $scope.loadSpuCode();

            $scope.addWatch();

            /**
             * 延迟加载各种数据
             * */
            $scope.loadProductClassList(100);
            $scope.loadTagList(100);
            $scope.loadProductUnitList(200);
            $scope.loadProductBrandList(200);
            $scope.loadMemberLevelList(1000);

            $scope.enableExtend = -1;
            var url = "../../do?action=appstore.product.extend!CAjaxCheckProductExtend";
            http.post(url, {}, function (response) {
                if (response.code == 0) {
                    if (response.msg == 1) {
                        $scope.productExtend = response.data;
                        $scope.enableExtend = 1;
                    } else if (response.msg == -1) {
                        $scope.enableExtend = -1;
                    }
                } else {
                    $scope.enableExtend = -1;
                }
            });

        };

        /**
         *
         * 加载商品规格模板
         */
        $scope.loadSkuTemplet = function (response) {

//            var url = "../../do?action=shop.sku!CAjaxGetSkuTempletColl";
//            http.post(url, '', function (response) {
            console.log(response);
            $scope.skuTempletList = response.data.items;
            $scope.skuTempletList.forEach(function (item, index, arr) {

                try {
                    item.CONTENT1 = "";
                    angular.fromJson(item.sku_CONTENT1).forEach(function (t) {
                        console.log(t.text);
                        item.CONTENT1 += t.text + "  ";
                    });
                    item.CONTENT2 = "";
                    angular.fromJson(item.sku_CONTENT2).forEach(function (t) {
                        console.log(t.text);
                        item.CONTENT2 += t.text + "  ";
                    });
                    item.CONTENT3 = "";
                    angular.fromJson(item.sku_CONTENT3).forEach(function (t) {
                        console.log(t.text);
                        item.CONTENT3 += t.text + "  ";
                    });
                } catch (e) {
                }
            });
//            });

        };

        /**
         *多级菜单
         *2016.08.22
         * ZHJ
         */
        // 多级菜单初始化
        $scope.multiMenuInit = function(){
            function setSubmenu(menu) {
                try {
                    if(menu.childList) {
                        menu.showSubmenu = false; // 默认子菜单隐藏
                    }
                } catch(err){
                    // debug可输出error
                }
            }

            setSubmenu($scope.firstMenu);
            setSubmenu($scope.secondMenu);
            setSubmenu($scope.thirdMenu);
            setSubmenu($scope.fourthMenu);
            setSubmenu($scope.fifthMenu);

            console.log("**************************************");

        };

        $scope.changeBtn = function(Menu)
        {
            $scope.product.classId = Menu.class_ID;
            $scope.parentName = Menu.class_NAME;
        }

        $scope.changeAddBtn=function(item){
            $scope.add.parentClassId=item.class_ID;
            $scope.parentName = item.class_NAME;
        }
        //阻止冒泡事件
        function stopPropagation(e) {
            e = e || window.event;
            if(e.stopPropagation) { //W3C阻止冒泡方法
                e.stopPropagation();
            } else {
                e.cancelBubble = true; //IE阻止冒泡方法
            }
        }
        $scope.multimenuList = [];
        // 子菜单的展开和关闭功能
        $scope.toggleMenu = function(menu,$event) {
            menu.showSubmenu = !menu.showSubmenu;
            stopPropagation($event);
            // 点击展开按钮时，菜单不会关闭
            $(".dropdown-menu").on("click", "[data-stopPropagation]", function(
                menu) {
                menu.stopPropagation();
            });
            /*  $("#addSup").hide();
             */
            $("#addSup").addClass("addcla");

            $("#addSup").focus();
        };
        /**
         *
         *
         */
        $scope.updateSetSku = function () {

//            alert(123);
//            $scope.product.setSku = !$scope.product.setSku;
//            $scope.hasSkuAttrCount = 0;

        };




        //选择商品规格模板
        $scope.chooseTemplet = function () {
            if ($scope.tmpSelectTempletId == undefined) {
                $scope.alert("请选择一个商品规格模板");
                return;
            }

            var formData = {};
            var chooseId = {};

            chooseId.modTempId = $scope.tmpSelectTempletId;
            formData.getTempletID = JSON.stringify(chooseId);

            var url = "../../do?action=shop.sku!CAjaxGetSkuTempletByID";
            http.post(url, formData, function (response) {
                console.log(response);
                $scope.detailList = response.data[0];
                if ($scope.detailList.sku_NAME1 != undefined) {
                    $scope.hasSkuAttrCount = 0;
                    $scope.product.skuName1 = $scope.detailList.sku_NAME1;
                    $scope.tags1 = angular.fromJson($scope.detailList.sku_CONTENT1);
                    $scope.product.skuName2 = "规格2";
                    $scope.tags2.length = 0;
                    $scope.product.skuName3 = "规格3";
                    $scope.tags3.length = 0;
                    if ($scope.detailList.sku_NAME2 != undefined) {
                        $scope.hasSkuAttrCount = 1;
                        $scope.product.skuName2 = $scope.detailList.sku_NAME2;
                        $scope.tags2 = angular.fromJson($scope.detailList.sku_CONTENT2);
                        $scope.product.skuName3 = "规格3";
                        $scope.tags3.length = 0;
                        if ($scope.detailList.sku_NAME3 != undefined) {
                            $scope.hasSkuAttrCount = 2;
                            $scope.product.skuName3 = $scope.detailList.sku_NAME3;
                            $scope.tags3 = angular.fromJson($scope.detailList.sku_CONTENT3);
                        }
                    }
                }
            });
            $("#chooseSkuModel").modal('hide');
            $scope.tmpSelectTempletId = undefined;
        };

        $scope.saveAsTemplet = function () {

            if ($scope.skuTempletName == "" || $scope.skuTempletName == undefined) {
                $scope.shortAlert("请填写规格模板名称");
                return;
            }
            if($scope.product.skuName1== "" || $scope.product.skuName1 == undefined || $scope.tags1=="" || $scope.tags1 == undefined){
                $scope.shortAlert("请至少填写第一项");
                return;
            }

            var formData = {};
            var tempLetListInfo = {};

            tempLetListInfo.templet_NAME = $scope.skuTempletName;
            if ($scope.tags1.length != 0) {
                tempLetListInfo.sku_NAME1 = $scope.product.skuName1;
                tempLetListInfo.sku_CONTENT1 = $scope.tags1;
                tempLetListInfo.sku_NAME2 = "";
                tempLetListInfo.sku_CONTENT2 = "";
                tempLetListInfo.sku_NAME3 = "";
                tempLetListInfo.sku_CONTENT3 = "";
                if ($scope.tags2.length != 0) {
                    tempLetListInfo.sku_NAME2 = $scope.product.skuName2;
                    tempLetListInfo.sku_CONTENT2 = $scope.tags2;
                    tempLetListInfo.sku_NAME3 = "";
                    tempLetListInfo.sku_CONTENT3 = "";
                    if ($scope.tags3.length != 0) {
                        tempLetListInfo.sku_NAME3 = $scope.product.skuName3;
                        tempLetListInfo.sku_CONTENT3 = $scope.tags3;
                    }
                }
            }
            formData.skuTempletInfoList = JSON.stringify(tempLetListInfo);
            var url = "../../do?action=shop.sku!CAjaxAddSkuTemplet";
            http.post(url, formData, function (response) {
                console.log(response);
            });
            $scope.shortAlert("商品规格模板保存成功");
            $("#inputSkuModelName").modal('hide');
            $scope.skuTempletName = undefined;
        };



        $scope.changeSettingSku = function() {

            $scope.hasSkuAttrCount = 0;
            $scope.product.skuName1 = '规格1';
            $scope.product.skuName2 = '规格2';
            $scope.product.skuName3 = '规格3';
        }

        /**
         * 提交表单之前的检查工作
         *
         * true : 通过检查，可以提交，false : 不能提交
         * */
        $scope.checkForm = function (formData) {

            console.log(formData);

//              表单是否填写完整
            if (formData.classId == 0) {
                $scope.alert("请选择商品分类");
                return false;
            }

            if (formData.unitId == 0) {
                $scope.alert("请选择商品单位");
                return false;
            }

            if (formData.prdName == null || formData.prdName == '') {
                $scope.alert("请选择商品名称", function () {
                    $("#prdName").focus()
                });
                return false;
            }

//            检查如果一个sku没有属性，是不能提交的
//            商品规格名称与规格值数量不统一
            if (formData.setSku) {
                var notSetAllSkuAttr = false;
                if ($scope.hasSkuAttrCount >= 0) {
                    if ($scope.tags1.length == 0) {
                        notSetAllSkuAttr = true;
                    }
                }
                if ($scope.hasSkuAttrCount >= 1) {
                    if ($scope.tags2.length == 0) {
                        notSetAllSkuAttr = true;
                    }
                }
                if ($scope.hasSkuAttrCount >= 2) {
                    if ($scope.tags3.length == 0) {
                        notSetAllSkuAttr = true;
                    }
                }

                if (notSetAllSkuAttr) {
                    $scope.alert("商品规格名称与规格值数量不统一");
                    return false;
                }

            }

            function isTrueSkuCode(s) {
                var patrn = /^[a-zA-Z0-9]{1}([a-zA-Z0-9]|[-_]){4,15}$/;
                if (!patrn.exec(s)) return false;
                return true;
            }


            var checkCode = false;

            formData.tags.forEach(function (tag) {
                if (!isTrueSkuCode(tag.skuCode)) {
                    $scope.alert("编码：" + tag.skuCode + " 不符合规范！包含字母数字减号（-）和下划线");
                    checkCode = true;
                    return false;
                }
            });

            if (checkCode) {
                return false;
            }


            return true;
        };


        /**
         * 提交表单前过滤掉没有的信息不提交到后台
         * */
        $scope.convertToProductMemberLevelPriceList = function (memLevelList) {
            var resultList = [];

            memLevelList.forEach(function (e) {
                var obj = new Object;
                obj.canBuy = e.canBuy ? 1 : -1;
                obj.memberLevelId = e.member_LEVEL_ID;
                obj.minNum = e.minNum;
                obj.price = e.price;
                resultList.push(obj);
            });

            console.log(resultList);

            return resultList;
        };


        $scope.changeMemberlevelPrice = function () {
            $scope.memberLevels.forEach(function (ele, index, arr) {
                ele.price = utils.calculatePrice($scope.product.price, ele.price_OFF);
            });
        };

        $scope.delOrRebackSkuTag = function (tag) {
            if (!tag.isDel) {
                var notDelSkuCount = $scope.getProductTagsNotDelCount();
                if (notDelSkuCount == 1) {
                    $scope.alert("至少保留一条商品数据!");
                    return;
                }
            }

            tag.isDel = !tag.isDel;

        };

        $scope.getProductTagsNotDelCount = function () {
            var notDelSkuCount = 0;
            $scope.product.tags.forEach(function (ele, index, arr) {
                if (!ele.isDel) {
                    notDelSkuCount++;
                }
            });
            return notDelSkuCount;
        };

        /**
         *
         * 提交表单
         */
        $scope.submitForm = function () {
            var url = "../../do?action=shop.product!CAjaxAddProduct";

            $scope.product.skuLength = $scope.product.tags.length;

            $scope.product.fileUrls = $scope.uploadFiles;
            /**
             * 判断图片上传封面
             * 16.08.29
             * zhj
             */

            $scope.upImg = [];
            angular.copy($scope.uploadImageFiles,$scope.upImg);
            if($scope.uploadImageFilesIndex != 0){
                var temp = $scope.upImg[$scope.uploadImageFilesIndex];
                $scope.upImg.splice($scope.uploadImageFilesIndex, 1);
                $scope.upImg.splice(0,0,temp);

            }
            $scope.product.imageUrls = $scope.upImg;
            $scope.product.tagNames = $scope.selectTagNames;
            $scope.product.spuCode = $scope.spuCode;
            $scope.product.imageUrlLength = $scope.upImg.length;
            $scope.product.fileUrlLength = $scope.uploadFiles.length;
            $scope.product.skuAttrCount = $scope.hasSkuAttrCount + 1;
            // $scope.product.weight=$scope.product.weight;
            if ($scope.productExtend != undefined) {
                $scope.product.weightUnit = $scope.productExtend.remark;
            }

            $scope.product.productIntro = ue.getContent();
            $scope.product.memberLevelPriceList = $scope.convertToProductMemberLevelPriceList($scope.memberLevels);
            $scope.product.memberLevelPriceListLength = $scope.memberLevels.length;


            if ($scope.checkForm($scope.product)) {


                $scope.isSubmit = true;
                $scope.submitDisabled = true;
                http.post(url, $scope.product, function (response) {
                    $scope.isSubmit = false;
                    console.log(response);
                    if (response.code == 0) {

                        window.onbeforeunload = function() {

                        }

                        $scope.shortAlert("添加成功!", function () {
                            window.location = "product.jsp";
                        });
                    } else {
                        $scope.alert(response.msg);
                    }
                });
            }
        };


        /**
         * 把一个sku图片设置到所有的sku上面去（不包含已经单独设置了图片的）
         * */
        $scope.setSkuImageToOthers = function (imgUrl) {
            $scope.product.tags.forEach(function (ele) {
                console.log(ele.imageUrl == '');
//                if (ele.imageUrl == '') {
                ele.imageUrl = imgUrl;
//                }
            });
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
         * 加载商品编码
         */
        $scope.loadSpuCode = function () {
            loadData.getProductSpuCode(function (spuCode) {
                $scope.spuCode = spuCode;
                $scope.product.tags[0].skuCode = spuCode + '010101';
            });
        };


        /* *
         * 删除已经上传的附件
         * */
        $scope.delUploadFile = function (file) {
            var index = $scope.uploadFiles.indexOf(file);
            if (index > -1) {
                $scope.uploadFiles.splice(index, 1);
            }
        };

        /*
         * 删除已经上传的图片
         * */
        $scope.delImageFile = function (file) {
            var index = $scope.uploadImageFiles.indexOf(file);
            if($scope.uploadImageFilesIndex == index){
                $scope.uploadImageFilesIndex = 0;
            }
            if (index > -1) {
                $scope.uploadImageFiles.splice(index, 1);
            }
        };

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



        /*
         *
         * 上传商品的附件， 最多上传20个
         * */
        $scope.uploadFile = function (files) {
            uploadManage.uploadFile(files, $scope.uploadFiles, 20, function () {
                $scope.alert("商品附件最多只能添加20个！");
            });
        };

        /*
         *
         * 上传商品的图片， 最多上传10个
         * */
        $scope.uploadImages = function (files) {
            uploadManage.uploadImage(files, $scope.uploadImageFiles, 10, function () {
                $scope.alert("商品图册最多只能添加10张！");
            });
        };

        /*
         *
         * 上传sku的图片
         * */
        $scope.uploadSkuImageFile = function (skuImage, tag) {
            uploadManage.uploadOneImage(skuImage, function (url) {
                tag.imageUrl = url;
                $scope.alert("是否将此图片应用于其他新建商品？", function () {
                    $scope.setSkuImageToOthers(url);
                });
            });
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
            console.log('value1 = ' + value1);
            console.log('value2 = ' + value2);
            console.log('value3 = ' + value3);

            var skuTmpCode = 1;
            for (var i1 = 0; i1 < value1; i1++) {
                for (var i2 = 0; i2 < value2; i2++) {
                    for (var i3 = 0; i3 < value3; i3++) {
                        var tagg = Tag();

                        if (i1 >= $scope.tags1.length) {
                            tagg.tag1 = '';
                        } else {
                            tagg.tag1 = $scope.tags1[i1].text;
                        }
                        if (i2 >= $scope.tags2.length) {
                            tagg.tag2 = '';
                        } else {
                            tagg.tag2 = $scope.tags2[i2].text;
                        }
                        if (i3 >= $scope.tags3.length) {
                            tagg.tag3 = '';
                        } else {
                            tagg.tag3 = $scope.tags3[i3].text;
                        }

                        var a = skuTmpCode + i1 < 10 ? '0' + (skuTmpCode + i1) : (skuTmpCode + i1);
                        var b = skuTmpCode + i2 < 10 ? '0' + (skuTmpCode + i2) : (skuTmpCode + i2);
                        var c = skuTmpCode + i3 < 10 ? '0' + (skuTmpCode + i3) : (skuTmpCode + i3);

                        tagg.skuCode = $scope.spuCode + a + b + c;

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
        //在弹出的对话框中新增商品分类
        $scope.selectClass=function(data){
            if(data==-1000){
                $scope.add.className="";
                $scope.add.parentClassId=0;
                $scope.parentName="根分类";
                $scope.product.classId=0;
                $("#addClass").modal("show");
            }
        }


        //在弹出的对话框中新增品牌
        $scope.selectBrand = function (data) {
            if (data == -1000) {
                $scope.product.brandId=0;
                //新增品牌弹框
                $("#addbrand").modal('show');
                //在接口有返回值之后 在这里改变delect绑定的值 回到初始值之类的 省的select选择的项是+这一项
            }
        };


        //在弹出的对话框中新增计量单位
        $scope.selectUnit = function (data) {
            if (data == -1000) {
                $scope.product.unitId=0;
                //新增计量单位弹框
                $("#addunit").modal('show');
                //在接口有返回值之后 在这里改变delect绑定的值 回到初始值之类的 省的select选择的项是+这一项
            }
        };

        /**
         * 加载商品类别表
         * */
        $scope.loadProductClassList = function (timeout) {
            $scope.productClassList = [];
//            loadData.loadProductClassList(timeout, $scope.productClassList);

            loadData.loadProductClassList(timeout, function(LIST){
                $scope.productClassList = LIST;
                var list = [];
                $scope.productClassList.forEach(function (element, index, arr) {

                    list.push(element);
                });
                $scope.multimenuList = utils.convertListWithParent(list,
                    'parent_CLASS_ID', 'class_ID', 0);

            });


        };


        /**
         * 加载 该服务的所有tag
         * */
        $scope.loadTagList = function (timeout) {
            $scope.productTagList = [];
            loadData.loadTagList(timeout, $scope.productTagList);
        };


        /**
         * 加载商品单位列表
         * */
        $scope.loadProductUnitList = function (timeout) {
            $scope.productUnitList = [];
            loadData.loadProductUnitList(timeout, $scope.productUnitList);
        };

        /**
         * 加载商品品牌列表
         * */
        $scope.loadProductBrandList = function (timeout) {
            $scope.productBrandList = [];
            loadData.loadProductBrandList(timeout, $scope.productBrandList);
        };

        /**
         * 加载客户级别
         */
        $scope.loadMemberLevelList = function (timeout) {
            $scope.memberLevels = [];
            loadData.loadMemberLevelList(timeout, $scope.memberLevels);

        };
        //增加商品分类
        $scope.addProductClass = function () {


            var mapTemp=new Map();
            $scope.productClassList.forEach(function(data){
                mapTemp.set(data.class_ID,data);
            });
            $scope.classMap=mapTemp;


            if ($scope.add.parentClassId != 0 && $scope.classMap.get($scope.add.parentClassId / 1).deep > 4) {
                $scope.$broadcast("to-short-modal", {
                    message: "分类层级不能太大"
                });
            } else {
                var result = ifNull_String($scope.add.className, "", false);
                if (result) {
                    var url = "../../do?action=shop.productclass!CAjaxAddProductClass";
                    http.post(url, $scope.add, function (response) {
                        if (response.code == 0) {
                            $scope.product.classId=response.data.class_ID
                            $("#addClass").modal('hide');
                            $scope.$broadcast("to-short-modal", {
                                message: "新增成功"
                            });
                            $scope.loadProductClassList(100);
                            $scope.add.key = 0;
                            $scope.add.parentClassId = 0;
                            $scope.add.className = "";
                            $scope.product.classId = response.data.class_ID;
                            $scope.parentName = response.data.class_NAME;
                        } else {
                            $scope.$broadcast("to-short-modal", {
                                message: "存在同名分类或分类名异常"
                            });
                        }
                    });
                } else {
                    $scope.$broadcast("to-short-modal", {
                        message: "分类名不能为空"
                    });
                }
            }
        };

        $scope.addbrand = function () {
            var result = ifNull_String($scope.add.brand, "", false);
            if (result) {
                var url = "../../do?action=shop.brand!CAjaxAddBrand";
                http.post(url, $scope.add, function (response) {
                    if (response.code == 0) {
                        $scope.product.brandId=response.data.brand_ID;
                        $("#addbrand").modal('hide');
                        $scope.$broadcast("to-short-modal", {
                            message: "新增成功"
                        });
                        $scope.initLoad();
                        $scope.add.brand = "";
                    } else {
                        $scope.$broadcast("to-short-modal", {
                            message: "存在相同的品牌"
                        });
                    }




                });
            } else {
                $scope.$broadcast("to-short-modal", {
                    message: "品牌不能为空"
                });
            }
        };

        $scope.addunit = function () {
            var result = ifNull_String($scope.add.unit, "", false);
            if (result) {
                var url = "../../do?action=shop.unit!CAjaxAddUnit";
                http.post(url, $scope.add, function (response) {
                    if (response.code == 0) {
                        $("#addunit").modal('hide');
                        $scope.$broadcast("to-short-modal", {message: "添加成功"});
                        $scope.initLoad();
                        $scope.add.unit = "";
                        $scope.product.unitId =response.data.unit_ID;
                    } else {
                        $scope.$broadcast("to-short-modal", {message: "存在相同的单位"});
                    }




                });
            }
            else {
                $scope.$broadcast("to-short-modal", {
                    message: "单位不能为空"
                });
            }
        };

    });
