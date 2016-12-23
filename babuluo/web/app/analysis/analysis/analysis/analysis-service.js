/**
 * Created by liutao on 2016/12/8 18:0:0.
 */
AndSellMainModule.service('analysisFactory', function ($resource, baseURL) {
    //根据日期范围查询线下日报
    this.getOfflineDailyChangeByRange=function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_DAILY_OFFLINE",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };
    //根据日期范围查询线下订单
    this.getOfflineOrderChangeByRange=function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_ORDER_OFFLINE",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };
    //根据日期范围查询店铺比对数据
    this.getCompareChangeByRange=function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_COMPARE",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };
    //根据日期范围查询会员相关数据
    this.getCardMoneyChangeRangeByRange=function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_CARD",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };
    //根据日期范围查询线上店铺动态
    this.getshopDailyChangeByRange=function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_DAILY",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };
    //获取一定日期内的订单分析数据
    this.getOrderAnalysisByRange = function (startDay,endDay) {
        return $resource(baseURL+"/stat/manage_data_analysis_by_range?STARTDAY=:STARTDAY&ENDDAY=:ENDDAY&FLAG=ANALYSIS_ORDER",{'STARTDAY':startDay,'ENDDAY':endDay},{
            'update':{
                method:'PUT'
            }
        });
    };
    //查询无效会员总数
    this.getInvalidTotalCard = function () {
        return $resource(baseURL+"/stat/member_card__invalid_total",{},{
            'update':{
                method:"PUT"
            }
        });
    }
    //查询会员总数
    this.getTotalCard = function () {
        return $resource(baseURL+"/stat/member_card_total",{},{
            'update':{
                method:"PUT"
            }
        });
    }
});