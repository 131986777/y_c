/**
 * Created by liutao on 2016/12/8 18:0:0.
 */
//日报相关
$import('analysis/analysis/dailyAnalysis', undefined, true);
$import('analysis/analysis/offlineDailyAnalysis', undefined, true);
//会员分析相关
$import('analysis/analysis/cardAnalysis', undefined, true);
//订单相关
$import('analysis/analysis/orderAnalysis', undefined, true);
$import('analysis/analysis/offlineOrderAnalysis', undefined, true);
$import('analysis/analysis/onlineOrderAnalysis', undefined, true);
$import('analysis/analysis/orderInfoAnalysis', undefined, true);
$import('analysis/analysis/reserveAnalysis', undefined, true);
$import('analysis/analysis/rechargeAnalysis', undefined, true);
$import('analysis/analysis/appointmentOrder', undefined, true);
//资金明细列表
$import('analysis/analysis/rechargeInfo',{id: '',STARTDAY:'',ENDDAY:''},true);
//作战室相关
$import('analysis/analysis/compareAnalysis', undefined, true);
//直播相关
$import('analysis/analysis/liveAnalysis', undefined, true);

//
$import('analysis/analysis/offlineFormAnalysis', undefined, true);
$import('analysis/analysis/offlineProductAnalysis', undefined, true);
$import('analysis/analysis/offlineShopProductAnalysis', {PRD_NAME:'',FILTER:''}, true);
$import('analysis/analysis/appointmentOnlineShopOrder', {PRD_NAME:'',SKU:'',FILTER:''}, true);
$import('analysis/analysis/onlineShopOrderAnalysis', {PRD_NAME:'',SKU:'',FILTER:''}, true);
$import('analysis/analysis/formAnalysis', undefined, true);
//来客分析
$import('analysis/analysis/guestAnalysis', undefined, true);