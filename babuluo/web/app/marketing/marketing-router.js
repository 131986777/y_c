
//促销规则列表
$import('marketing/sales/rule/ruleList');
//促销计划列表
$import('marketing/sales/sales/salesList',undefined,true);
//新增促销计划
$import('marketing/sales/rule/ruleAdd',{id: '0',serviceId: '1'},true);
$import('marketing/sales/sales/salesCoupon',undefined,true);

$import('marketing/coupon/rule/ruleList');
$import('marketing/banner/bannerPosition');
$import('marketing/banner/banner');
$import('marketing/coupon/coupon/couponList',undefined,true);

$import('marketing/sales/event');
