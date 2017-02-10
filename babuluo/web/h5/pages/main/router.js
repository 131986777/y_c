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
$import('pages/order/addAddress', {SKU_IDS: '1060',TYPE:'NORMAL'});
$import('pages/order/CashOnDeliveryOrder');
$import('pages/order/review', {ID: ''});

$import('pages/personal', {}, true);
$import('pages/personal/card');
$import('pages/personal/coupon');
$import('pages/personal/advice');
$import('pages/personal/advice/list');

$import('pages/shop', {FROM: ''});

$import('pages/shopLbs', {}, true);

$import('pages/shopNavigation', {F_LNG: '', F_LAT: '', T_LNG: '', T_LAT: ''}, true);

$import('pages/coupon/list');

$import('pages/user/register');
$import('pages/user/accountLogin', {FROM: ''});
$import('pages/user/phoneLogin', {FROM: ''});
$import('pages/user/SetPassword', {LOGIN_ID: '0'});

$import('pages/account/balance');
$import('pages/account/recharge');
$import('pages/account/lucky', {}, true);

$import('pages/security/resetPwd');




