angular.module('AndSell.Main').controller('marketing_sales_sales_salesList_Controller', function ($q, $scope, $stateParams, $http, productFactory, tagFactory, unitFactory, classFactory, promoFactory, salesFactory, modalFactory) {

    modalFactory.setTitle('促销管理');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    var salePlanMap = [{type: 'skuAlone', name: '单件商品促销'}, {
        type: 'classAlone', name: '按商品类别促销'
    }, {type: 'tagAlone', name: '按商品标签促销'}];

    $scope.salePlanMap = salePlanMap;

    $scope.rangeId = 0;

    $scope.filterc = 'null';

    $scope.checkedList = [];

    $scope.skuList = new Array;

    $scope.ranFilter = function () {
        if ($scope.filterc != 'null') {
            $scope.salesPlan = [];
            $scope.clonePlan.forEach(function (ele) {
                if (ele['role']['adaptor']['PROMO_ROLE_ANDSELL.PROMOTION_TYPE'] == 'order') {
                    if ($scope.filterc == "order") {
                        $scope.salesPlan.push(ele);
                    }
                } else {
                    if ($scope.filterc == ele['range']['type_role']) {
                        $scope.salesPlan.push(ele);
                    }
                }
            })
        } else {
            $scope.salesPlan = $scope.clonePlan;
        }
    }

    $scope.queryPlan = function () {
        promoFactory.getPromoPlan({}, function (response) {
            $scope.salesPlan = response.data;

            $scope.queryRange();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.queryRange = function () {
        promoFactory.getPromoRange({}, function (response) {
            $scope.salesRange = response.data;
            var getPrdSkuIdsForAddRange = $q.defer();
            var getPrdSkuIdsForAddRole = $q.defer();
            $scope.addRange(getPrdSkuIdsForAddRange);
            $scope.addRole(getPrdSkuIdsForAddRole);
            $scope.clonePlan = $scope.salesPlan;
            $q.all([getPrdSkuIdsForAddRange.promise, getPrdSkuIdsForAddRole.promise]).then(function (result) {
                $scope.getPrdSkuData();
            });
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.addRange = function (defer) {

        $scope.salesPlan.forEach(function (ele) {
            $scope.salesRange.forEach(function (ran) {
                if (ele['PROMOTION_PLAN.PROMOTION_RANGE_ID'] == ran['promotion_range_id']) {
                    ele['range'] = ran;
                    if (ele['range']['type_role'] == 'skuAlone') {
                        ele['range']['rangeDetailVOs'].forEach(function (sku) {
                            $scope.skuList.push(sku['target']);
                        });
                    }
                }
            })
            defer.resolve();
        })
    }

    $scope.addRole = function (defer) {
        $scope.salesPlan.forEach(function (ele) {
            $scope.salesList.forEach(function (rol) {
                if (ele['PROMOTION_PLAN.PROMOTION_ROLE_ID']
                    == rol['PROMOTION_ROLE.PROMOTION_ROLE_ID']) {
                    ele['role'] = rol;
                    var role = JSON.parse(rol['PROMOTION_ROLE.PROMOTION_ROLE']);
                    rol['role'] = role;

                    if (ele['role']['PROMOTION_ROLE.PROMOTION_TYPE_ACTION'] == 'present') {
                        ele['role']['role'].forEach(function (sku) {
                            sku['presents'].forEach(function (e) {
                                $scope.skuList.push(e['skuId']);
                            });
                        });
                    }

                }
            })
            defer.resolve();
        })
    }

    $scope.getPrdSkuData = function () {
        console.log($scope.skuList);
        productFactory.getBySkuIdWithAllInfo({'SHOP_PRODUCT_SKU.SKU_IDS': $scope.skuList.toString()}, function (response) {
            $scope.skuMap = listToMap(response.data, "SHOP_PRODUCT_SKU.SKU_ID");
        })
    }

    $scope.queryAdaptor = function () {
        salesFactory.QueryPromoRoleAdaptor({}, function (response) {
            console.log(response);
            $scope.addAdaptor(response);
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

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
    };

    $scope.getCurrentPro = function (item) {
        $scope.updatePlanForm = clone(item);
        if (item['SALES_PLAN.TARGET_OBJ_ID'] == null) {
            $scope.currentPro = null;
        } else {
            $scope.currentPro = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    };

    $scope.getCurrentClass = function (item) {
        $scope.updatePlanForm = clone(item);
        if (item['SALES_PLAN.TARGET_OBJ_ID'] == null) {
            $scope.currentClass = null;
        } else {
            $scope.currentClass = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    };

    $scope.bindRangeId = function (item) {
        $scope.rangeId = item['PROMOTION_PLAN.PROMOTION_RANGE_ID'];
        $scope.checkedList = item['range']['rangeDetailVOs'];
    };

    $scope.prdSwitch = function (data) {
        $scope.delSkuRangeDetail($scope.rangeId, data)
    };

    $scope.delSkuRangeDetail = function (id, data) {
        promoFactory.delPromoRangeDetail({"PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID": id}, function (response) {
            $scope.addSkuRangeDetails(data)
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });

    };

    $scope.addSkuRangeDetails = function (data) {
        var p = [];
        data.forEach(function (ele) {
            var c = $q.defer();
            p.push(c.promise);
            var rangeDetail = {};
            rangeDetail['PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID'] = $scope.rangeId;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET_TYPE'] = "sku";
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET'] = ele['SHOP_PRODUCT_SKU.SKU_ID'];
            $scope.addRangeDetail(rangeDetail, c);
        });
        $q.all(p).then(function () {
            $scope.$broadcast('pageBar.reload');
        })
    };

    $scope.classSwitch = function (data) {
        $scope.delClassRangeDetail($scope.rangeId, data);

    };

    $scope.tagSwitch = function (data) {
        $scope.delTagRangeDetail($scope.rangeId, data)
    };

    $scope.delTagRangeDetail = function (id, data) {
        promoFactory.delPromoRangeDetail({"PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID": id}, function (response) {
            $scope.addTagRangeDetails(data);
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.addTagRangeDetails = function (data) {
        var p = [];
        data.forEach(function (ele) {
            var c = $q.defer();
            p.push(c.promise);
            var rangeDetail = {};
            rangeDetail['PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID'] = $scope.rangeId;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET_TYPE'] = "tag";
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET'] = ele['SHOP_TAG.TAG_ID'];
            $scope.addRangeDetail(rangeDetail, c);
        });
        $q.all(p).then(function () {
            $scope.$broadcast('pageBar.reload');
        })
    };

    $scope.addClassRangeDetails = function (data) {
        var p = [];
        data.forEach(function (ele) {
            var c = $q.defer();
            p.push(c.promise);
            var rangeDetail = {};
            rangeDetail['PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID'] = $scope.rangeId;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET_TYPE'] = "class";
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET'] = ele['SHOP_PRODUCT_CLASS.CLASS_ID'];
            $scope.addRangeDetail(rangeDetail, c);
        });
        $q.all(p).then(function () {
            $scope.$broadcast('pageBar.reload');
        })
    };

    $scope.addRangeDetail = function (rangeDetail, c) {
        promoFactory.addPromoRangeDetail(rangeDetail, function (response) {
            modalFactory.showShortAlert("添加成功");
            c.resolve();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delClassRangeDetail = function (id, data) {
        promoFactory.delPromoRangeDetail({"PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID": id}, function (response) {
            $scope.addClassRangeDetails(data)
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });

    }

    $scope.getCurrentTag = function (item) {
        $scope.updatePlanForm = clone(item);
        if (item['SALES_PLAN.TARGET_OBJ_ID'] == null) {
            $scope.currentTag = null;
        } else {
            $scope.currentTag = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    }

    $scope.save = function (form) {
        salesFactory.ModifySalesProduct(form, function (response) {
            modalFactory.showShortAlert('修改成功');
            $("#addSalePlan").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
        $scope.queryRange();
    }

    $scope.getPrdExtraData = function () {
        tagFactory.getPrdTagList({}, function (response) {
            $scope.tagMap = listToMap(response.data, "SHOP_TAG.TAG_ID");
            console.log($scope.tagMap);
        });
        classFactory.getPrdClassList({}, function (response) {
            $scope.classMap = listToMap(response.data, "SHOP_PRODUCT_CLASS.CLASS_ID");
            console.log($scope.classMap);
        });
    }

    $scope.bindData = function (response) {
        $scope.salesList = response.data;
        $scope.queryAdaptor();
        $scope.queryPlan();
        $scope.getPrdExtraData();
        //$scope.queryDate();
        //
        ////商品类别的ID和名称的Map
        //$scope.proClassInfo = response.extraData.proClassMap;
        ////商品的ID和名称的Map
        //$scope.productMap = response.extraData.productMap;
        ////得到促销规则的ID和类型的Map
        //$scope.salesTypeMap = response.extraData.salesTypeMap;
        ////获得促销规则的ID和详细信息的Map
        //$scope.salesMap = response.extraData.salesMap;
        ////获得促销规则详情
        ////$scope.salesList = response.extraData.salesList;
        ////获得商品标签的ID和名称的Map
        //$scope.tagMap = response.extraData.tagMap;
        ////获得商品标签的ID和促销针对的Map
        //$scope.salesTarget = response.extraData.salesTarget;
        //
        ////获得优惠券信息
        //$scope.couponMap = response.extraData.couponMap;
        ////获得sku列表
        //$scope.skuList = response.extraData.skuList;
        //$scope.skuMap = response.extraData.skuMap;
        //$scope.urlMap = response.extraData.urlMap;
        //$scope.proAndSkuInfoMap = response.extraData.proAndSkuInfoMap;

    };

    $scope.bindId = function (response) {
        $scope.add['PROMOTION_PLAN.PROMOTION_RANGE_ID'] = response.extraData['PROMOTION_RANGE_ID'];
        promoFactory.addPromoPlan($scope.add, function (response) {
            modalFactory.showShortAlert("创建plan成功");
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.addSalePlan = function () {
        $scope.add['PROMOTION_PLAN.BEGIN_DATETIME'] = $scope.from;
        $scope.add['PROMOTION_PLAN.END_DATETIME'] = $scope.to;

        if ($scope.add['PROMOTION_PLAN.NAME']
            == ''
            || $scope.add['PROMOTION_PLAN.PROMOTION_DESCRIBE']
            == ''
            || $scope.add['PROMOTION_PLAN.PROMOTION_ROLE_ID']
            == '') {
            alert('请输入完整信息');
        } else {

            if ($scope.showCont == false) {
                promoFactory.addPromoPlan($scope.add, function (response) {
                    modalFactory.showShortAlert("创建成功");
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            } else if ($scope.showCont == true) {
                $scope.add['PROMOTION_RANGE.IS_DEL'] = -1;
                promoFactory.addPromoRange($scope.add, function (response) {
                    $scope.bindId(response);
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            }
        }
    };

    $scope.detailClick = function (item) {
        $scope.detaileInfo = clone(item);
    }

    $scope.modSalePlan = function (form) {
        salesFactory.ModifySalesProduct(form, function (res) {
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
        })
    };

    $scope.stopSalesPlan = function (item) {
        if (item['PROMOTION_PLAN.STATE'] != 'cancel') {
            modalFactory.showAlert("确认停用吗?", function () {
                item['PROMOTION_PLAN.STATE'] = 'cancel';
                promoFactory.modPromoPlan(item, function (response) {
                    modalFactory.showShortAlert("禁用成功");
                    $scope.$broadcast('pageBar.reload');
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });

            });
        } else if (item['PROMOTION_PLAN.STATE'] == 'cancel') {
            item['PROMOTION_PLAN.STATE'] = 'disCancel';
            promoFactory.modPromoPlan(item, function (response) {
                modalFactory.showShortAlert("启用成功");
                $scope.$broadcast('pageBar.reload');
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    };

    $scope.delSalesPlan = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            item['PROMOTION_PLAN.IS_DEL'] = 1;
            promoFactory.modPromoPlan(item, function (response) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });
    };

    $scope.show = function () {
        var id = $scope.add['PROMOTION_PLAN.PROMOTION_ROLE_ID'];
        $scope.salesList.forEach(function (ele) {
            if (ele['PROMOTION_ROLE.PROMOTION_ROLE_ID'] == id) {
                if (ele['adaptor']['PROMO_ROLE_ANDSELL.PROMOTION_TYPE'] == "prd") {
                    $scope.showCont = true;
                } else {
                    $scope.showCont = false;
                }
            }
        })
    }

    $scope.empty = function () {
        $scope.add = null;
        $scope.from = null;
        $scope.to = null;
    }

    $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $('#end_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $(document).ready(function () {
        $('#birthday').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
        $('#birthdayDate').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

});

