angular.module('AndSell.Main').controller('marketing_sales_sales_salesList_Controller', function ($q ,$scope, $stateParams,$http,http ,salesFactory, modalFactory) {

    modalFactory.setTitle('促销管理');
    modalFactory.setBottom(false);

    var salePlanMap = [{type: 'skuAlone', name: '单件商品促销'}, {type: 'classAlone', name: '按商品类别促销'}, {type: 'tagAlone', name: '按商品标签促销'}];

    $scope.salePlanMap = salePlanMap

    $scope.rangeId = 0 ;

    $scope.filterc = 'null' ;

    $scope.checkedList = [] ;

    $scope.ranFilter = function (){
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
        }else {
            $scope.salesPlan = $scope.clonePlan ;
        }
    }

    $scope.queryPlan = function (){
        http.post_ori("http://127.0.0.1:8080/bubu/promo/plan/queryAll",{}
            //console.log(response);
            , function (response) {
                $scope.salesPlan = response.data;
                $scope.queryRange() ;
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });
    }

    $scope.queryRange = function (){
        http.post_ori("http://127.0.0.1:8080/bubu/promo/range/myQueryAll",{}
            //console.log(response);
            , function (response) {
                $scope.salesRange = response.data;
                $scope.addRange() ;
                $scope.addRole();
                $scope.clonePlan = $scope.salesPlan ;
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });
    }

    $scope.addRange = function (){
        $scope.salesPlan.forEach(function(ele){
            $scope.salesRange.forEach(function (ran) {
                if (ele['PROMOTION_PLAN.PROMOTION_RANGE_ID'] == ran['promotion_range_id']){
                    ele['range'] = ran ;
                }
            })
        })
    }

    $scope.addRole = function () {
        $scope.salesPlan.forEach(function(ele){
            $scope.salesList.forEach(function(rol){
                if (ele['PROMOTION_PLAN.PROMOTION_ROLE_ID'] == rol['PROMOTION_ROLE.PROMOTION_ROLE_ID']){
                    ele['role'] = rol ;
                    var role = JSON.parse(rol['PROMOTION_ROLE.PROMOTION_ROLE']) ;
                    rol['role'] = role ;
                }
            })
        })
    }

          //请求促销规则
    $scope.queryDate = function (){
        http.post_ori("http://127.0.0.1:8080/bubu/promo/role/queryAll",{}
            //console.log(response);
            , function (response) {
                $scope.bindData2(response) ;
                $scope.queryPlan();
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });

    }
    $scope.queryAdaptor = function (){
        salesFactory.QueryPromoRoleAdaptor({}
            , function (response) {
                console.log(response);
                $scope.addAdaptor(response);
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });
    }
    $scope.addAdaptor = function (response){
        var adaptor = response.data ;
        adaptor.forEach(function(ele){
            $scope.salesList.forEach(function(sale){
                if (ele["PROMO_ROLE_ANDSELL.PROMOTION_ROLE_ID"] == sale["PROMOTION_ROLE.PROMOTION_ROLE_ID"]){
                    sale["adaptor"] = ele ;
                }
            })
        })
    }

    $scope.bindData2 = function (response){
        $scope.salesList = response.data;
        $scope.queryAdaptor();
    }


    $scope.getCurrentPro = function (item) {
        $scope.updatePlanForm = clone(item);
        if (item['SALES_PLAN.TARGET_OBJ_ID'] == null) {
            $scope.currentPro = null;
        } else {
            $scope.currentPro = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    }



    $scope.getCurrentClass = function (item) {
        $scope.updatePlanForm = clone(item);
        if (item['SALES_PLAN.TARGET_OBJ_ID'] == null) {
            $scope.currentClass = null;
        } else {
            $scope.currentClass = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    }

    $scope.bindRangeId = function(item){
        $scope.rangeId = item['PROMOTION_PLAN.PROMOTION_RANGE_ID'] ;
        $scope.checkedList = item['range']['rangeDetailVOs'] ;
    }

    $scope.prdSwitch = function (data) {
        $scope.delSkuRangeDetail( $scope.rangeId , data)
    }

    $scope.delSkuRangeDetail = function ( id , data) {
        http.post_ori("http://127.0.0.1:8080/bubu/promo/rangeDetail/delByRangeId",{"PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID" : id}
            //console.log(response);
            , function (response) {
                $scope.addSkuRangeDetails(data)
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });
    }
    $scope.addSkuRangeDetails = function (data) {
        var p = []
        data.forEach(function(ele){
            var c = $q.defer();
            p.push(c.promise)
            var rangeDetail = {};
            rangeDetail['PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID'] = $scope.rangeId;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET_TYPE'] = "sku" ;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET'] = ele['SHOP_PRODUCT_SKU.SKU_ID'] ;
            $scope.addRangeDetail( rangeDetail , c) ;
        }) ;
        $q.all(p).then(function(){
            $scope.$broadcast('pageBar.reload');
        })
    }
    $scope.classSwitch = function (data) {
        $scope.delClassRangeDetail($scope.rangeId , data) ;

    }

    $scope.tagSwitch = function (data) {
        $scope.delTagRangeDetail( $scope.rangeId , data)
    }

    $scope.delTagRangeDetail = function (id , data) {
        http.post_ori("http://127.0.0.1:8080/bubu/promo/rangeDetail/delByRangeId",{"PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID" : id}
            //console.log(response);
            , function (response) {
                $scope.addTagRangeDetails(data)
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });
    }
    $scope.addTagRangeDetails = function(data){
        var p = []
        data.forEach(function(ele){
            var c = $q.defer();
            p.push(c.promise)
            var rangeDetail = {};
            rangeDetail['PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID'] = $scope.rangeId;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET_TYPE'] = "tag" ;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET'] = ele['SHOP_TAG.TAG_ID'] ;
            $scope.addRangeDetail( rangeDetail , c) ;
        }) ;
        $q.all(p).then(function(){
            $scope.$broadcast('pageBar.reload');
        })
    }
    $scope.addClassRangeDetails = function (data){
        var p = []
        data.forEach(function(ele){
            var c = $q.defer();
            p.push(c.promise)
            var rangeDetail = {};
            rangeDetail['PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID'] = $scope.rangeId;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET_TYPE'] = "class" ;
            rangeDetail['PROMOTION_RANGE_DETAIL.TARGET'] = ele['SHOP_PRODUCT_CLASS.CLASS_ID'] ;
            $scope.addRangeDetail( rangeDetail , c) ;
        }) ;
        $q.all(p).then(function(){
                $scope.$broadcast('pageBar.reload');
            })
    }
    $scope.addRangeDetail = function ( rangeDetail , c){
        http.post_ori("http://127.0.0.1:8080/bubu/promo/rangeDetail/add",rangeDetail
            //console.log(response);
            , function (response) {
                modalFactory.showShortAlert("添加成功");
                c.resolve();
                //$scope.$broadcast('pageBar.reload');
                //$scope.queryRange() ;
            }
            , function (response) {
                modalFactory.showShortAlert(response.msg);
            });
    }
    $scope.delClassRangeDetail = function ( id , data) {
        http.post_ori("http://127.0.0.1:8080/bubu/promo/rangeDetail/delByRangeId",{"PROMOTION_RANGE_DETAIL.PROMOTION_RANGE_ID" : id}
            //console.log(response);
            , function (response) {
                $scope.addClassRangeDetails(data)
            }
            , function (response) {
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
        $scope.queryRange() ;
    }

    $scope.bindData = function (response) {
        $scope.queryDate() ;
        console.log(response);
        //$scope.salesPlan = response.data;
        //商品类别的ID和名称的Map
        $scope.proClassInfo = response.extraData.proClassMap;
        //商品的ID和名称的Map
        $scope.productMap = response.extraData.productMap;
        //得到促销规则的ID和类型的Map
        $scope.salesTypeMap = response.extraData.salesTypeMap;
        //获得促销规则的ID和详细信息的Map
        $scope.salesMap = response.extraData.salesMap;
        //获得促销规则详情
        //$scope.salesList = response.extraData.salesList;
        //获得商品标签的ID和名称的Map
        $scope.tagMap = response.extraData.tagMap;
        //获得商品标签的ID和促销针对的Map
        $scope.salesTarget = response.extraData.salesTarget;

        //获得优惠券信息
        $scope.couponMap = response.extraData.couponMap;
        //获得sku列表
        $scope.skuList = response.extraData.skuList;
        $scope.skuMap = response.extraData.skuMap;
        $scope.urlMap = response.extraData.urlMap;
        $scope.proAndSkuInfoMap = response.extraData.proAndSkuInfoMap;

        //$scope.salesPlan.forEach(function (ele) {
        //    $scope.salesList.forEach(function (item) {
        //        if (ele['SALES_PLAN.SALE_ID'] == item['SALES.ID']) {
        //            var totalArray = new Array();
        //            if (item['SALES.SALE_TYPE'] == 3) {
        //                for (var i = 1; i <= 6; i++) {
        //                    if (item['SALES.CONDITION_NUM' + i] != null) {
        //                        var jsonInfo = item['SALES.SALE_CONTENT' + i].toString();
        //                        var info = JSON.parse(jsonInfo);
        //                        var array = new Array();
        //                        array.push(item['SALES.CONDITION_NUM' + i]);
        //                        array.push($scope.proAndSkuInfoMap[info['ProId']]);
        //                        array.push(info['Num']);
        //                        array.push($scope.skuMap[info['ProId']]);
        //                        array.push($scope.urlMap[info['ProId']]);
        //                        totalArray.push(array);
        //                        $scope.salesDetailInfo = totalArray;
        //                    }
        //                    ele['salesInfo'] = $scope.salesDetailInfo;
        //                    ele['salesClass'] = item['SALES.SALE_TYPE'];
        //                }
        //            } else if (item['SALES.SALE_TYPE'] == 4) {
        //                for (var i = 1; i <= 6; i++) {
        //                    if (item['SALES.CONDITION_NUM' + i] != null) {
        //                        var jsonInfo = item['SALES.SALE_CONTENT' + i].toString();
        //                        var info = JSON.parse(jsonInfo);
        //                        var array = new Array();
        //                        array.push(item['SALES.CONDITION_NUM' + i]);
        //                        array.push($scope.couponMap[info['ProId']]);
        //                        array.push(info['Num']);
        //                        totalArray.push(array);
        //                        $scope.salesDetailInfo = totalArray;
        //                    }
        //                    ele['salesInfo'] = $scope.salesDetailInfo;
        //                    ele['salesClass'] = item['SALES.SALE_TYPE'];
        //                }
        //            } else if (item['SALES.SALE_TYPE'] == 1 || item['SALES.SALE_TYPE'] == 2) {
        //                for (var i = 1; i <= 6; i++) {
        //                    if (item['SALES.CONDITION_NUM' + i] != null) {
        //                        var array = new Array();
        //                        array.push(item['SALES.CONDITION_NUM' + i]);
        //                        array.push(item['SALES.SALE_CONTENT' + i]);
        //                        totalArray.push(array);
        //                        $scope.salesDetailInfo = totalArray;
        //                    }
        //                    ele['salesInfo'] = $scope.salesDetailInfo;
        //                    ele['salesClass'] = item['SALES.SALE_TYPE'];
        //                }
        //            }
        //        }
        //    })
        //})
    };

    $scope.bindId = function ( response){
        $scope.add['PROMOTION_PLAN.PROMOTION_RANGE_ID'] = response.extraData['PROMOTION_RANGE_ID'];
        http.post_ori("http://127.0.0.1:8080/bubu/promo/plan/add",$scope.add
            //console.log(response);
            , function (response) {
                modalFactory.showShortAlert("创建plan成功");
                $scope.$broadcast('pageBar.reload');
                $scope.queryDate() ;
            }
            , function (response) {
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

            if ($scope.showCont == false){
                http.post_ori("http://127.0.0.1:8080/bubu/promo/plan/add",$scope.add
                    //console.log(response);
                    , function (response) {
                        modalFactory.showShortAlert("创建plan成功") ;
                    }
                    , function (response) {
                        modalFactory.showShortAlert(response.msg);
                    });
            }else if ($scope.showCont == true) {
                $scope.add['PROMOTION_RANGE.IS_DEL'] = -1 ;
                http.post_ori("http://127.0.0.1:8080/bubu/promo/range/add", $scope.add
                    //console.log(response);
                    , function (response) {
                        $scope.bindId(response);
                    }
                    , function (response) {
                        modalFactory.showShortAlert(response.msg);
                    });

            }
            //var id = $scope.add['SALES_PLAN.SALE_ID'];
            //if ($scope.salesTarget[id] == 1) {
            //    $scope.add['SALES_PLAN.TARGET_OBJ_TYPE'] = -1;
            //    console.log($scope.add);
            //}
            //salesFactory.AddSalesPlan($scope.add, function (response) {
            //    modalFactory.showShortAlert('新增成功');
            //    $scope.empty();
            //    $("#addSalePlan").modal('hide');
            //    $scope.$broadcast('pageBar.reload');
            //}, function (response) {
            //    modalFactory.showShortAlert(response.msg);
            //});
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
                http.post_ori("http://127.0.0.1:8080/bubu/promo/plan/modifyById",item
                    //console.log(response);
                    , function (response) {
                        modalFactory.showShortAlert("禁用成功") ;
                        $scope.$broadcast('pageBar.reload');
                    }
                    , function (response) {
                        modalFactory.showShortAlert(response.msg);
                    });
                //salesFactory.stopSalePlanById(item, function (res) {
                //    modalFactory.showShortAlert("停用成功");
                //    $scope.$broadcast('pageBar.reload');
                //});
            });
        } else if (item['PROMOTION_PLAN.STATE'] == 'cancel'){
            item['PROMOTION_PLAN.STATE'] = 'disCancel';
            http.post_ori("http://127.0.0.1:8080/bubu/promo/plan/modifyById",item
                //console.log(response);
                , function (response) {
                    modalFactory.showShortAlert("启用成功") ;
                    $scope.$broadcast('pageBar.reload');
                }
                , function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
        }
    };

    $scope.delSalesPlan = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            item['PROMOTION_PLAN.IS_DEL'] = 1;
            http.post_ori("http://127.0.0.1:8080/bubu/promo/plan/modifyById",item
                //console.log(response);
                , function (response) {
                    modalFactory.showShortAlert("删除成功") ;
                    $scope.$broadcast('pageBar.reload');
                }
                , function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
        });
    };

    $scope.show = function () {
        var id = $scope.add['PROMOTION_PLAN.PROMOTION_ROLE_ID'];
        $scope.salesList.forEach(function(ele){
            if ( ele['PROMOTION_ROLE.PROMOTION_ROLE_ID'] == id){
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

