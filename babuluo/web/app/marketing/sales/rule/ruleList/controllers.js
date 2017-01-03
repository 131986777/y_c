angular.module('AndSell.Main').controller('marketing_sales_rule_ruleList_Controller', function ($scope, $http, $stateParams, promoFactory, salesFactory, modalFactory) {

    modalFactory.setTitle('促销规则管理');

    modalFactory.setBottom(false);

    $scope.filter = {};
    $scope.filter['type'] = '';
    $scope.filter['state'] = '';

    //请求所有数据
    $scope.bindData = function (response) {
        $scope.salesList = response.data;
        $scope.roundList = response.data;
        $scope.queryAdaptor();

        salesFactory.AddSkuInfo({}, function (response) {
            $scope.productMap = response.extraData.productMap;
            $scope.productList = response.extraData.productList;
            $scope.skuMap = response.extraData.skuMap;
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.queryAdaptor = function () {
        salesFactory.QueryPromoRoleAdaptor({}, function (response) {
            console.log(response);
            $scope.addAdaptor(response);
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }
    $scope.addAdaptor = function (response) {
        var adaptor = response.data;
        adaptor.forEach(function (ele) {
            $scope.salesList.forEach(function (sale) {
                if (ele["PROMO_ROLE_ANDSELL.PROMOTION_ROLE_ID"]
                    == sale["PROMOTION_ROLE.PROMOTION_ROLE_ID"]) {
                    sale["adaptor"] = ele;
                }
            })
        })
    }

    $scope.queryByGivenInfo = function (form) {
        var array = new Array();
        var middleArray = new Array();
        var json = form['PROMOTION_ROLE.PROMOTION_ROLE'];
        var roles = JSON.parse(json);
        if (form['PROMOTION_ROLE.PROMOTION_TYPE_CONDITION']
            == "price"
            || form['PROMOTION_ROLE.PROMOTION_TYPE_CONDITION']
            == "eachPrice") {
            if (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "cut") {
                for (var i = 0; i < roles.length; i++) {
                    var salesObj = new Object();
                    salesObj.CONDITION_NUM = roles[i]['price'];
                    salesObj.SALE_CONTENT = roles[i]['cut'];
                    array.push(salesObj);
                }
            } else if (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "discount") {
                for (var i = 0; i < roles.length; i++) {
                    var salesObj = new Object();
                    salesObj.CONDITION_NUM = roles[i]['price'];
                    salesObj.SALE_CONTENT = roles[i]['discount'];
                    array.push(salesObj);
                }
            } else if (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "present") {
                for (var i = 0; i < roles.length; i++) {
                    var salesObj = new Object();
                    salesObj.CONDITION_NUM = roles[i]['price'];
                    salesObj.SALE_CONTENT = roles[i]['presents'];
                    array.push(salesObj);
                }
            }
        }
        if (form['PROMOTION_ROLE.PROMOTION_TYPE_CONDITION']
            == "num"
            || form['PROMOTION_ROLE.PROMOTION_TYPE_CONDITION']
            == "eachNum") {
            if (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "cut") {
                for (var i = 0; i < roles.length; i++) {
                    var salesObj = new Object();
                    salesObj.CONDITION_NUM = roles[i]['num'];
                    salesObj.SALE_CONTENT = roles[i]['cut'];
                    array.push(salesObj);
                }
            } else if (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "discount") {
                for (var i = 0; i < roles.length; i++) {
                    var salesObj = new Object();
                    salesObj.CONDITION_NUM = roles[i]['num'];
                    salesObj.SALE_CONTENT = roles[i]['discount'];
                    array.push(salesObj);
                }
            } else if (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "present") {
                for (var i = 0; i < roles.length; i++) {
                    var salesObj = new Object();
                    salesObj.CONDITION_NUM = roles[i]['num'];
                    salesObj.SALE_CONTENT = roles[i]['presents'];
                    array.push(salesObj);
                }
            }
        }

        array.forEach(function (item) {
            var array = new Array();

            if (form ['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == "present") {
                var prdId = $scope.skuMap[item['SALE_CONTENT'][0]['skuId'] + ''];
                var name = $scope.productMap[prdId];
            }
            console.log(name);
            switch (form['PROMOTION_ROLE.PROMOTION_TYPE_CONDITION']) {
                case 'price':
                    switch (form ['PROMOTION_ROLE.PROMOTION_TYPE_ACTION']) {
                        case 'cut' :
                            array = putParaTogether("满", item['CONDITION_NUM'], "元减", item['SALE_CONTENT']
                                / 100, "元");
                            middleArray.push(array);
                            break;
                        case 'discount':
                            array = putParaTogether("满", item['CONDITION_NUM'], "元打", item['SALE_CONTENT']
                                / 10, "折");
                            middleArray.push(array);
                            break;
                        case 'present':
                            array = putParaTogether("满", item['CONDITION_NUM'], "元送", item['SALE_CONTENT'][0]['num'], "件", name);
                            middleArray.push(array);
                            break;
                        default:
                    }
                    break;
                case 'eachPrice':
                    switch (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION']) {
                        case 'cut':
                            array = putParaTogether("每满", item['CONDITION_NUM'], "元减", item['SALE_CONTENT']
                                / 100, "元");
                            middleArray.push(array);
                            break;
                        case 'discount':
                            array = putParaTogether("每满", item['CONDITION_NUM'], "元打", item['SALE_CONTENT']
                                / 10, "折");
                            middleArray.push(array);
                            break;
                        case 'present':
                            array = putParaTogether("每满", item['CONDITION_NUM'], "元送", item['SALE_CONTENT'][0]['num'], "件", name);
                            middleArray.push(array);
                            break;
                        default:
                    }
                    break;
                case 'num':
                    switch (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION']) {
                        case 'cut':
                            array = putParaTogether("满", item['CONDITION_NUM'], "件减", item['SALE_CONTENT']
                                / 100, "元");
                            middleArray.push(array);
                            break;
                        case 'discount':
                            array = putParaTogether("满", item['CONDITION_NUM'], "件打", item['SALE_CONTENT']
                                / 10, "折");
                            middleArray.push(array);
                            break;
                        case 'present':
                            array = putParaTogether("满", item['CONDITION_NUM'], "件送", item['SALE_CONTENT'][0]['num'], "件", name);
                            middleArray.push(array);
                            break;
                        default:
                    }
                    break;
                case 'eachNum':
                    switch (form['PROMOTION_ROLE.PROMOTION_TYPE_ACTION']) {
                        case 'cut':
                            array = putParaTogether("每满", item['CONDITION_NUM'], "件减", item['SALE_CONTENT']
                                / 100, "元");
                            middleArray.push(array);
                            break;
                        case 'discount':
                            array = putParaTogether("每满", item['CONDITION_NUM'], "件打", item['SALE_CONTENT']
                                / 10, "折");
                            middleArray.push(array);
                            break;
                        case 'present':
                            array = putParaTogether("每满", item['CONDITION_NUM'], "件送", item['SALE_CONTENT'][0]['num'], "件", name);
                            middleArray.push(array);
                            break;
                        default:
                    }
                    break;
                default:

            }
        });

        var jointList = {};
        $scope.detailSaleListInfo = middleArray;
        jointList['SALES.ID'] = form['SALES.ID'];
        jointList['SALES.SALE_TYPE'] = form['SALES.SALE_TYPE'];
        jointList['SALES.NAME'] = form['PROMOTION_ROLE.NAME'];
        jointList['SALES.INTRO'] = form['PROMOTION_ROLE.DESCRIBES'];
        jointList['SALES.SALE_TARGET'] = form['SALES.SALE_TARGET'];
        jointList['SALES.SALE_TYPE'] = form['SALES.SALE_TYPE'];
        $scope.detailSaleList = jointList;
    };

    //根据ID修改优惠状态（停用or启用）
    $scope.changeState = function (form) {
        if (form['PROMO_ROLE_ANDSELL.STATE'] == 'inUse') {
            modalFactory.showAlert("确定停用?", function () {
                form['PROMO_ROLE_ANDSELL.STATE'] = 'unUse';
                salesFactory.MosdifyAdaptor(form, function (response) {
                    modalFactory.showShortAlert("停用成功");
                    $scope.$broadcast('pageBar.reload');
                });
            });
        } else {
            form['PROMO_ROLE_ANDSELL.STATE'] = 'inUse';
            salesFactory.MosdifyAdaptor(form, function (response) {
                modalFactory.showShortAlert("启用成功");
                $scope.$broadcast('pageBar.reload');
            });
        }
    };

    //根据ID删除优惠规则
    $scope.Delete = function (form) {
        modalFactory.showAlert("确定删除?", function () {
            form['PROMOTION_ROLE.IS_DEL'] = 1;
            promoFactory.modPromoRole(form, function (response) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
                $scope.queryDate();
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        })
    };

    function putParaTogether() {
        var array = new Array();
        for (var i = 0; i < arguments.length; i++) {
            array.push(arguments[i])
        }
        return array;
    }

    $scope.queryByName = function (name) {
        if (name == null || name == '') {
            $scope.salesList = $scope.roundList;
        } else {
            $scope.salesList = [];
            $scope.roundList.forEach(function (ele) {
                if (ele['PROMOTION_ROLE.NAME'].indexOf(name)>-1) {
                    $scope.salesList.push(ele);
                }
            })
        }
        return $scope.salesList;
    }

    //$scope.queryBy2 = function () {
    //    $scope.salesList = [];
    //    if ($scope.filter['state'] == '' && $scope.filter['type'] == '') {
    //        $scope.roundList.forEach(function (ele) {
    //            $scope.salesList.push(ele);
    //        })
    //    }
    //    if ($scope.filter['state'] == null || $scope.filter['state'] == '') {
    //        $scope.roundList.forEach(function (ele) {
    //            if (ele['adaptor']['PROMO_ROLE_ANDSELL.PROMOTION_TYPE'] == $scope.filter['type']) {
    //                $scope.salesList.push(ele);
    //            }
    //        })
    //    }
    //    if ($scope.filter['type'] == null || $scope.filter['type'] == '') {
    //        $scope.roundList.forEach(function (ele) {
    //            if (ele['adaptor']['PROMO_ROLE_ANDSELL.STATE'] == $scope.filter['state']) {
    //                $scope.salesList.push(ele);
    //            }
    //        })
    //    }
    //    $scope.roundList.forEach(function (ele) {
    //        if (ele['adaptor']['PROMO_ROLE_ANDSELL.STATE']
    //            == $scope.filter['state']
    //            && ele['adaptor']['PROMO_ROLE_ANDSELL.PROMOTION_TYPE']
    //            == $scope.filter['type']) {
    //            $scope.salesList.push(ele);
    //        }
    //    })
    //    return $scope.salesList;
    //}

    $scope.saveSales = function () {
        for (var i = 0; i < $scope.detailSaleListInfo.length; i++) {
            var conditionStr = 'SALES.CONDITION_NUM' + (i + 1);
            var contentStr = 'SALES.SALE_CONTENT' + (i + 1);
            if ($scope.detailSaleList['SALES.SALE_TYPE']
                == 3
                || $scope.detailSaleList['SALES.SALE_TYPE']
                == 4) {
                var name = $scope.detailSaleListInfo[i][5];
                $scope.productList.forEach(function (ele) {
                    if (ele['SHOP_PRODUCT.PRD_NAME'] == name) {
                        proId = ele['SHOP_PRODUCT.PRD_ID']
                    }
                })
                var str = '{'
                    + '"ProId"'
                    + ':'
                    + proId
                    + ','
                    + '"Num"'
                    + ':'
                    + $scope.detailSaleListInfo[i][3]
                    + '}';
                $scope.detailSaleList[contentStr] = str;
                $scope.detailSaleList[conditionStr] = $scope.detailSaleListInfo[i][1];

            } else {
                $scope.detailSaleList[conditionStr] = $scope.detailSaleListInfo[i][1];
                $scope.detailSaleList[contentStr] = $scope.detailSaleListInfo[i][3];
            }
        }
        salesFactory.ModifySalesState($scope.detailSaleList, function (response) {
            if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("修改成功");
                $scope.$broadcast('pageBar.reload');
            }
        });
    };
});


