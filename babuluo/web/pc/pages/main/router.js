$when('', '/pages/home');

$import('pages/home',{},true);
$import('pages/cart',{},true);
//
//$import('pages/payment/check_out', {ORDER_ID: '1023'});
//$import('pages/payment/check_out_success');
$import('pages/payment/pay',{},true);
//
//$import('pages/product/detail', {PRD_ID: '1242'});
$import('pages/product/list', {keyword: '', classId: undefined, tagId: ''},true);
//$import('pages/product/tagPrdList', {tagId: '1023'});
//
//$import('pages/order/add', {SKU_IDS: '1060', COUPON_INFO: ''});
$import('pages/order/list', {state: 'all'},true);
//$import('pages/order/detail', {ORDER_ID: '1030',FROM:'List'});
//$import('pages/order/addCoupon', {SKU_IDS: '1060', pickupPerson: '{}', PRODUCTS: '{}', MONEY: '0'});
//$import('pages/order/addAddress', {SKU_IDS: '1060'});
//$import('pages/order/CashOnDeliveryOrder');
$import('pages/order/review',{},true);
//
//$import('pages/personal', {}, true);
//$import('pages/personal/card');
//$import('pages/personal/coupon');
//
$import('pages/shop', {FROM: ''},true);
//
//$import('pages/coupon/list');
//
$import('pages/login/register',{},true);
$import('pages/login/accountLogin', {FROM: ''},true);
$import('pages/login/phoneLogin', {FROM: ''},true);
//$import('pages/login/SetPassword', {LOGIN_ID: '0'});
//
$import('pages/account/balance',{},true);
//$import('pages/account/recharge');
//
//$import('pages/security/resetPwd');
$import('pages/security/modifyPwd', {state: 'all'},true);
//
//$import('pages/order/review',{ID:''});
//

