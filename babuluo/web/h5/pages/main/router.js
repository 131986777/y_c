$when('', '/pages/home');

$import('pages/home');
$import('pages/cart');

$import('pages/payment/check_out', {ORDER_ID: '1023'});
$import('pages/payment/check_out_success');

$import('pages/product/detail', {PRD_ID: '1242'});
$import('pages/product/list', {keyword: '', classId: undefined, tagId: ''});
$import('pages/product/tagPrdList', {tagId: '1023'});

$import('pages/order/add', {SKU_IDS: '1060'});
$import('pages/order/appointment', {SKU_IDS: '1060', COUNT: '0', COUPON_INFO: ''});
$import('pages/order/appointmentList', {state: 'all'});
$import('pages/order/list', {state: 'all'});
$import('pages/order/detail', {ORDER_ID: '1030', FROM: 'List', COUPON_INFO: ''});
$import('pages/order/addCoupon', {ORDER_ID: '1030', PRODUCTS: '{}', MONEY: '0'});
$import('pages/order/addAddress', {SKU_IDS: '1060', TYPE: 'NORMAL'}, true);
$import('pages/order/CashOnDeliveryOrder');
$import('pages/order/review', {ID: ''});

$import('pages/personal', {}, true);
$import('pages/personal/card');
$import('pages/personal/coupon');
$import('pages/personal/advice');
$import('pages/personal/advice/list');
$import('pages/personal/giveaway');

$import('pages/shop', {FROM: ''});

$import('pages/shopLbs', {}, true);

$import('pages/shopNavigation', {F_LNG: '', F_LAT: '', T_LNG: '', T_LAT: ''}, true);

$import('pages/coupon/list');

$import('pages/user/register');
$import('pages/user/accountLogin', {FROM: ''});
$import('pages/user/phoneLogin', {FROM: ''});
$import('pages/user/SetPassword', {LOGIN_ID: '0'});

$import('pages/account/balance');

//积分新增
$import('pages/account/recharge');
$import('pages/account/integral');
$import('pages/account/details',{SHOP_ID: ''});
$import('pages/account/detailReady',{SHOP_ID: ''});
$import('pages/account/list');
//账户余额修改页
$import('pages/account/amount');
//
$import('pages/account/lucky', {}, true);

$import('pages/security/resetPwd');

$import('pages/order/addSeckill');
$import('pages/order/addGroupBuy', {SKU_ID: '0', SUM_COUNT: '0', GBG_ID: '0'});
$import('pages/groupBuy/myGroup', {GBP_ID: '0', PRD_ID: '0'});
$import('pages/groupBuy/inviteGroup');
$import('pages/groupBuy/moreGroup', {GBP_ID: '0', PRD_ID: '0'});
$import('pages/groupBuy/ownGroup');
$import('pages/groupBuy/allGroup',{GBP_ID: '0',PRD_ID:'0'});
$import('pages/groupBuy/allGroupper', {GBG_IDS: "0"});
$import('pages/groupBuy/groupDetail', {GBP_ID: '0',GBG_ID: '0',PRD_ID:'0'});
$import('pages/product/rc');




// 后期临时活动  temporary
$import('pages/temporary/bonus');
$import('pages/temporary/list');
$import('pages/temporary/years');
$import('pages/temporary/wjdcqh');
$import('pages/temporary/sign');