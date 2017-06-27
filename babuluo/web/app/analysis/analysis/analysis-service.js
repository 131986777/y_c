/**
 * Created by liutao on 2016/12/8 18:0:0.
 */
AndSellMainModule.service('analysisFactory', function ($resource, baseURL) {
    //获取分段来客数
    this.getIntervalGuestByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_GUEST", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据实际范围查询线上商品销售报表
    this.getFormChangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_FORM", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    // 根据时间范围查询线下报表 。。。
    this.getOfflineFormChangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_FORM_OFFLINE", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据日期范围查询线下日报
    this.getOfflineDailyChangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_DAILY_OFFLINE", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据日期范围查询线下订单
    this.getOfflineOrderChangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_ORDER_OFFLINE", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据日期范围查询店铺比对数据
    this.getCompareChangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_COMPARE", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据日期范围查询会员相关数据
    this.getCardMoneyChangeRangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_CARD", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据日期范围查询预定相关数据
    this.getReserve = function (startDay, endDay) {
									
        return $resource(baseURL + "/stat/appoinment_data_analysis_by_add_datetime?", {
            'datetime_start': startDay,
            'datetime_end': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //根据日期范围查询线上店铺动态
    this.getshopDailyChangeByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_DAILY", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //获取一定日期内的订单分析数据
    this.getOrderAnalysisByRange = function (startDay, endDay) {
        return $resource(baseURL + "/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_ORDER", {
            'STARTDAY': startDay,
            'ENDDAY': endDay
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //获取一定日期内的充值数据
    this.getOrderAnalysisByRechange = function (startDay, endDay,id) {
        return $resource("http://app.bblycyz.com/AndSell/bubu/stat/recharge_data_analysis_by_shop_datetime", {
            'DATETIME_START': startDay,
            'DATETIME_END': endDay,
            'SHOP_ID':id
        }, {
            'update': {
                method: 'PUT'
            }
        });
    };
    //查询无效会员总数
    this.getInvalidTotalCard = function () {
        return $resource(baseURL + "/stat/member_card__invalid_total", {}, {
            'update': {
                method: "PUT"
            }
        });
    };
    //查询会员总数
    this.getTotalCard = function () {
        return $resource(baseURL + "/stat/member_card_total", {}, {
            'update': {
                method: "PUT"
            }
        });
    };
    //查询门店列表
    this.getList = function () {
        return $resource("http://app.bblycyz.com/AndSell/bubu/shop/shop/queryAll", {}, {
            'update': {
                method: "PUT"
            }
        });
    }
});