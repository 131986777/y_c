AndSellMainModule.controller('classOrderController', function ($scope, $stateParams, classFactory, modalFactory) {

    modalFactory.setTitle('商品分类管理');
    console.log(123);

    // 多级菜单初始化
    $scope.multiMenuInit = function () {
        function setSubmenu(menu) {
            try {
                if (menu.childList) {
                    menu.showSubmenu = false; // 默认子菜单隐藏
                }
            } catch (err) {
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

    $scope.multimenuList = [];
    // 子菜单的展开和关闭功能
    $scope.toggleMenu = function (menu) {
        menu.showSubmenu = !menu.showSubmenu;

        // 点击展开按钮时，菜单不会关闭
        $(".dropdown-menu").on("click", "[data-stopPropagation]", function (menu) {
            menu.stopPropagation();
        });
    };

    $scope.changeBtn = function (Menu) {

        $scope.parentName = Menu['SHOP_PRODUCT_CLASS.CLASS_NAME'];
        $scope.add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'] = Menu['SHOP_PRODUCT_CLASS.CLASS_ID'];

    }

    $scope.initLoad = function () {

        classFactory.getPrdClassList().get({}, function (response) {
            if (response.code == 0) {
                console.log(response.data);
                $scope.bindData(response.data);

            } else {
                $scope.$broadcast("to-modal", {message: response.msg});
            }
        }, null);


    };



    $scope.classMap = {};


  /*  $scope.listToMap = function (productClassList) {
        var map = new Map;
        productClassList.forEach(function (element, index, arr) {
            var childList = map.get(element['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID']);
            if (childList == undefined) {
                childList = new Array;
                map.set(element['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'], childList);
            }
            childList.push(element);
        });

        return map;
    };

    $scope.mapToParentAndChildList = function (map, key, deep) {
        var childList = new Array;
        var elements = map.get(key);
        if (elements != undefined) {
            if (elements.length > 1) {
                elements.sort(function (a, b) {
                    return a.class_ORDER_NUM - b.class_ORDER_NUM;
                });
            }
            if (elements.length == undefined || elements.length < 1) {
                elements.deep = deep;
                childList.push(elements);
                if (map.get(elements['SHOP_PRODUCT_CLASS.CLASS_ID']) != undefined) {
                    $scope.mapToParentAndChildList(map, elements['SHOP_PRODUCT_CLASS.CLASS_ID'], deep
                        + 1).forEach(function (value, index, arr) {
                        childList.push(value);
                    });
                }
            } else {
                elements.forEach(function (value, index, arr) {
                    value.deep = deep;
                    childList.push(value);
                    if (map.get(value['SHOP_PRODUCT_CLASS.CLASS_ID']) != undefined) {
                        $scope.mapToParentAndChildList(map, value['SHOP_PRODUCT_CLASS.CLASS_ID'], deep + 1).forEach(function (a, index, arr) {
                            childList.push(a);
                        });
                    }
                });
            }
        }
        return childList;
    };*/

    $scope.bindData = function (items) {
        var map1 = new Map;
        var list = new Array;
        var root = {
            "SHOP_PRODUCT_CLASS.CLASS_ICON": null,
            'SHOP_PRODUCT_CLASS.CLASS_ID': 0,
            'SHOP_PRODUCT_CLASS.CLASS_NAME': '根分类',
            'SHOP_PRODUCT_CLASS.CASS_ORDER_NUM': 0,
            'SHOP_PRODUCT_CLASS.CLASS_PATH': 0,
            'deep': 0,
            'deep_CLASS_NAME': '根分类',
            'deep_PRINT': '',
            'SHOP_PRODUCT_CLASS.IS_DEL': -1,
            'SHOP_PRODUCT_CLASS.PARENT_CLASS_ID': 0
        };
        map1.set(root['SHOP_PRODUCT_CLASS.CLASS_ID'], root);
        list.push(root);
        items.forEach(function (element, index, arr) {
            map1.set(element['SHOP_PRODUCT_CLASS.CLASS_ID'], element);
            list.push(element);

        });

        $scope.classMap = map1;
        $scope.multimenuList = convertListWithParent(list,
            'SHOP_PRODUCT_CLASS.PARENT_CLASS_ID', 'SHOP_PRODUCT_CLASS.CLASS_ID', 0);
        $scope.multimenuList2 = [];
        angular.copy($scope.multimenuList, $scope.multimenuList2);
        console.log("%%%%%%%%%%%%%%%*****************************%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log($scope.multimenuList);
        $scope.productClassList = list;
        $scope.add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'] = 0;
        $scope.parentName = '根分类'

    };

    /**
     * parentColumn   这个是表示一个对象指向父类的那个id的属性名
     *
     *
     * parentKey  这是表示id 的属性名
     * */
    var convertListWithParent = function (list, parentColumn, parentKey, rootId) {


        if (rootId == undefined) {
            rootId = 0;
        }

        var map = new Map();

        var result = [];

        list.forEach(function (ele) {
            map.set(ele[parentKey], ele);
        });

        list.forEach(function (ele) {
            var parentId = ele[parentColumn];

            if (parentId == rootId) {
                result.push(ele);
            } else {
                var parent = map.get(parentId);

                if (parent != undefined) {
                    if (parent.childList == undefined) {
                        parent.childList = [];
                    }
                    parent.childList.push(ele);
                }
            }
        });


        return result;
    };


    $scope.initLoad();

    $scope.addProductClass = function () {
        console.log(741);
        //console.log($scope.classMap.get('1107'));
        //console.log($scope.classMap.get(''+$scope.add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID']/ 1));

        if (false) {
            modalFactory.showShortAlert('分类层级不能太大！');
        } else {
            var result = ifNull_String($scope.add['SHOP_PRODUCT_CLASS.CLASS_NAME'], "", false);
            if (result) {

                $scope.add['SHOP_PRODUCT_CLASS.SERVICE_ID'] = 1;
                classFactory.addPrdClass($scope.add).get({}, function (response) {
                    $("#addClass").modal('hide');
                    if (response.code == 400) {
                        modalFactory.showShortAlert(response.msg);
                    } else if (response.extraData.state == 'true') {
                        modalFactory.showShortAlert('新增成功');
                        $scope.initLoad();
                        $scope.add.key = 0;
                        $scope.add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'] = 0;
                        $scope.add['SHOP_PRODUCT_CLASS.CLASS_NAME'] = "";
                    }

                });

            } else {
                $scope.$broadcast("to-short-modal", {
                    message: "分类名不能为空"
                });
            }
        }

        /*console.log($scope.add);
         $scope.add['SHOP_PRODUCT_CLASS.SERVICE_ID'] = 1;
         */
    };

    $scope.pclass2change = function (name, pid, cid) {
        $scope.modify['SHOP_PRODUCT_CLASS.CLASS_NAME'] = name;
        $scope.modify['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'] = pid;
        $scope.modify['SHOP_PRODUCT_CLASS.CLASS_ID'] = cid;
    }

    $scope.modifyProductClass = function () {

        if ($scope.modify['SHOP_PRODUCT_CLASS.CLASS_ID'] == $scope.modify['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID']) {
            $scope.$broadcast("to-short-modal", {
                message: "父分类不能为自己"
            });
        } else {
            var result = ifNull_String($scope.modify['SHOP_PRODUCT_CLASS.CLASS_NAME'], "", false);
            if (result) {
                $scope.modify['SHOP_PRODUCT_CLASS.SERVICE_ID'] = 1;
                classFactory.modifyPrdClass().get($scope.modify, function (response) {
                    if (response.code == 400) {
                        modalFactory.showShortAlert(response.msg);
                    } else if (response.extraData.state == 'true') {
                        $("#modifyClass").modal('hide');
                        modalFactory.showShortAlert("修改成功");
                        $scope.initLoad();
                        $scope.modify['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'] = 0;
                        $scope.modify['SHOP_PRODUCT_CLASS.CLASS_NAME'] = "";
                        $scope.modify['SHOP_PRODUCT_CLASS.CLASS_ID'] = "";
                    }
                });

            } else {
                $scope.$broadcast("to-short-modal", {
                    message: "分类名不能为空"
                });
            }
        }
    };

    $scope.delProductClass = function (classID) {

        modalFactory.showAlert("确认删除吗?", function () {
            classFactory.delPrdClass(classID).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    $scope.initLoad();
                    modalFactory.showShortAlert("删除成功");

                }
            });
        });


    };
    // Popover 初始化
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    var ifNull_String = function (val, msg, ifshow) {
        if (val == null || val == undefined) {
            return false;
        } else if (("" + val).trim() == "") {
            if (ifshow) {
                alert(msg);
            }
            return false;
        }
        return true;
    };
});
