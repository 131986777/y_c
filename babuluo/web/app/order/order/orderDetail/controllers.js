angular.module('AndSell.Main').controller('order_order_orderDetail_Controller', function (http, $scope, $stateParams, orderFactory, modalFactory,groupBuyPlanFactory,groupBuyGroupFactory,groupBuyMemberFactory) {

    modalFactory.setTitle('订单详情');
    modalFactory.setBottom(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.initData = function () {
        $scope.modify = {};
        $scope.getOrder($stateParams.ORDER_ID);
    }

    $scope.bindPresent = function () {
        $scope.presentMap = {};
        $scope.orderDetailList.forEach(function (detail) {
            if (detail['isPresent'] == null) {
                return
            }
            if (detail['orderOrPrd'] == "prd") {
                $scope.presentMap[detail['blongToSkuId']] = detail;
            } else if (detail['orderOrPrd'] == "order") {
                $scope.presentMap['order'] = detail;
            }
        });
    };

    /**
     * 查看物流
     * */
    $scope.queryLogistics = function (logistics_NUM) {
        if (logistics_NUM == undefined) {
            $scope.alert("无物流单号，请填写物流单号后查看物流跟踪信息！");
            return;
        }
        var url = "../../queryLogistics";
        modalFactory.showShortAlert("正在查询，请稍候...");
        http.post_ori(url, {logisticsNum: logistics_NUM}, function (response) {
            if (response.status == 0) {
                $scope.logisticsResult = response.result.list;
                $('#queryLogistics').modal('show');
            } else {
                modalFactory.showShortAlert("暂无物流信息");
            }
        });
    };


    $scope.getOrder = function (id) {
        orderFactory.getById({'SHOP_ORDER.ID': id}, function (response) {
            response.data[0]['SHOP_ORDER.DATETIME_ADD'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ADD']);
            response.data[0]['SHOP_ORDER.DATETIME_PAY'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_PAY']);
            response.data[0]['SHOP_ORDER.DATETIME_OUT'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_OUT']);
            response.data[0]['SHOP_ORDER.DATETIME_SEND'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_SEND']);
            response.data[0]['SHOP_ORDER.DATETIME_DELIVERY'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_DELIVERY']);
            response.data[0]['SHOP_ORDER.DATETIME_COMMENT'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_COMMENT']);
            response.data[0]['SHOP_ORDER.DATETIME_ACCEPT'] = getDate(response.data[0]['SHOP_ORDER.DATETIME_ACCEPT']);
            $scope.orderDetailList = JSON.parse(response.data[0]['SHOP_ORDER.ORDER_INFO']);
            $scope.order = response.data[0];
            if ($scope.order['SHOP_ORDER.ERP_REMARK']
                != undefined
                && $scope.order['SHOP_ORDER.ERP_REMARK']
                != '') {
                $scope.order['SHOP_ORDER.ERP_NUM'] = JSON.parse($scope.order['SHOP_ORDER.ERP_REMARK']).orderCode;
            }
            if ($scope.order['SHOP_ORDER.LOGISTICS_INFO']
                != undefined
                && $scope.order['SHOP_ORDER.LOGISTICS_INFO']
                != '') {
                $scope.order['SHOP_ORDER.LOGISTICS_INFO'] = JSON.parse($scope.order['SHOP_ORDER.LOGISTICS_INFO']);
            }
            $scope.orderType = $scope.order['SHOP_ORDER.TYPE'];
            $scope.orderDetailList.forEach(function (ele) {
                setContentsInfoForOrder(ele);
            });
            $scope.bindPresent()
            $scope.getPayNumber();
        });
    }

    //获取支付流水号
    $scope.getPayNumber = function () {
        if ($scope.order['SHOP_ORDER.STATE_MONEY'] == 1) {
            if ($scope.order['SHOP_ORDER.PAY_TYPE'] == 'WEIXIN') {
                orderFactory.getWXPayItemByOrderId({'ORDER_WX_PAY_LIST.ORDER_ID': $scope.order['SHOP_ORDER.ID']}, function (resposne) {
                    $scope.order['SHOP_ORDER.WX_NO'] = resposne.data[0]['ORDER_WX_PAY_LIST.OUT_TRADE_NO'];
                });
            }
            if ($scope.order['SHOP_ORDER.PAY_TYPE'] == 'ACCOUNT') {
                orderFactory.getFinanceItemByOrderId({
                    'FINANCE_LIST.EVENT_SOURCE_ID': $scope.order['SHOP_ORDER.ORDER_NUM'],
                    'FINANCE_LIST.CHANGE_TYPE': 'decrease'
                }, function (resposne) {
                    $scope.order['SHOP_ORDER.CARD_NO'] = resposne.data[0]['FINANCE_LIST.EVENT_CARD_NO'];
                });
            }
        }
    }

    //取消订单
    $scope.cancelOrder = function () {
        modalFactory.showAlert("确定取消该订单嘛？", function () {
            orderFactory.cancelOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('取消订单成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    //出库订单
    $scope.outOrder = function () {
        modalFactory.showAlert("所有商品均已经出库？", function () {
            orderFactory.outOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('订单出库成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    //发货订单
    $scope.sendOrder = function (logistics) {
        modalFactory.showAlert("商品均已发货？", function () {
            orderFactory.sendOrder({
                'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID'],
                'SHOP_ORDER.LOGISTICS_INFO': JSON.stringify(logistics)
            }, function () {
                $('#sendOrder').modal('hide');
                modalFactory.showShortAlert('订单发货成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);

            });
        });
    }

    //确认提货
    $scope.deliveryOrder = function () {
        modalFactory.showAlert("确定客户已经拿走所有商品嘛？", function () {
            orderFactory.deliveryOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('提货成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
            if($scope.order['SHOP_ORDER.TYPE'] == 6){
                orderFactory.modifyOrderById({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID'],'SHOP_ORDER.SPECIAL_MODEL':'GROUPBUY_SUCCESS'},function (response) {
                    console.log(response);
                });
            }

        });
    }

    //立即支付
    $scope.payNow = function () {
        modalFactory.showAlert("确定支付该订单嘛？", function () {
            orderFactory.payOrder({'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID']}, function () {
                modalFactory.showShortAlert('支付成功');
                $scope.getOrder($scope.order['SHOP_ORDER.ID']);
            });
        });
    }

    $scope.remarkModifyClick = function () {
        $scope.modify['SHOP_ORDER.ID'] = $scope.order['SHOP_ORDER.ID'];
        $scope.modify['SHOP_ORDER.REMARK'] = $scope.order['SHOP_ORDER.REMARK'];
    }

    //备注修改
    $scope.modifyOrderRemark = function () {
        orderFactory.modifyOrderRemark($scope.modify, function (response) {
            $scope.order['SHOP_ORDER.REMARK'] = $scope.modify['SHOP_ORDER.REMARK'];
            $('#modifyRemark').modal('hide');
        });
    }

    $scope.logisticsModifyClick = function () {
        $scope.logistics = {
            'COMPANY': $scope.order['SHOP_ORDER.LOGISTICS_INFO']['COMPANY'],
            'NUM': $scope.order['SHOP_ORDER.LOGISTICS_INFO']['NUM']
        }
    }

    //备注修改
    $scope.modifyOrderLogistics = function () {
        orderFactory.modifyOrderLogistics({
            'SHOP_ORDER.ID': $scope.order['SHOP_ORDER.ID'],
            'SHOP_ORDER.LOGISTICS_INFO': JSON.stringify($scope.logistics)
        }, function (response) {
            $scope.order['SHOP_ORDER.LOGISTICS_INFO'] = $scope.logistics;
            $('#modifyLogistics').modal('hide');
        });
    }
    //取消团购单
    $scope.cancelOrderByGroupBuy = function () {
        $scope.cancelOrder();
        cancelGpm($scope.order['SHOP_ORDER.ID'], $scope.order['SHOP_ORDER.STATE_MONEY']);

    }
    //取消团购相关操作
    function cancelGpm(orderId, moneyState) {
        //获得团购客户记录
        groupBuyMemberFactory.getByOrderId({'GROUP_BUY_MEMBER.ORDER_IDS': orderId}, function (response) {
            if (response.data.length == 1) {
                $scope.gbm = response.data[0];
                //获得该团购记录的主团
                groupBuyGroupFactory.getByGbgIds({'GROUP_BUY_GROUP.GROUP_BUY_GROUP_IDS': $scope.gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']}, function (response) {
                    if (response.data.length == 1) {
                        $scope.gbg = response.data[0];
                        //获得主团下的团规则
                        groupBuyPlanFactory.getByGbpIds({'GROUP_BUY_PLAN.GROUP_BUY_PLAN_IDS': $scope.gbg['GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID']}, function (response) {
                            if (response.data.length == 1) {
                                $scope.gbp = response.data[0];
                                //如果该团委商家开团
                                //这只要将这个团客户记录标记为删除
                                var param = {};
                                param['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID'] = $scope.gbm['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID'];
                                if (moneyState == 1) {
                                    param['GROUP_BUY_MEMBER.MONEY_STATE'] = 'HAVE_REFUND';
                                } else {
                                    param['GROUP_BUY_MEMBER.MONEY_STATE'] = 'IS_CANCEL';
                                }
                                // param['GROUP_BUY_MEMBER.IS_DEL'] = 1;
                                groupBuyMemberFactory.modifyById(param);
                                if ($scope.gbm['GROUP_BUY_MEMBER.IS_LEADER'] == 1) {
                                    groupBuyMemberFactory.getAllMemberInGbgIds({'GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS': $scope.gbg['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID']}, function (response) {
                                        if (response.data.length > 1) {
                                            for (var i = 0; i < response.data.length; i++) {
                                                if (response.data[i]['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID'] != $scope.gbm['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID']) {
                                                    param = {};
                                                    param['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID'] = response.data[0]['GROUP_BUY_MEMBER.GROUP_BUY_MEMBER_ID'];
                                                    param['GROUP_BUY_MEMBER.IS_LEADER'] = 1;
                                                    groupBuyMemberFactory.modifyById(param);
                                                    break;
                                                }
                                            }
                                        } else {
                                            //将团删除；
                                            param = {};
                                            param['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID'] = $scope.gbg['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID'];
                                            param['GROUP_BUY_GROUP.STATE'] = 'FAIL';
                                            groupBuyGroupFactory.modifyById(param);
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        });
    }
});
