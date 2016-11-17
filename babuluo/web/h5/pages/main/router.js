
$when('','/pages/home');

$import('pages/home');
$import('pages/cart');

$import('pages/payment/check_out',{ORDER_ID: '1023'});
$import('pages/payment/check_out_success');

$import('pages/product/detail',{PRD_ID: '1242'});
$import('pages/product/list',{keyword:'',classId: undefined});
$import('pages/product/tagPrdList',{tagId:'1023'});

$import('pages/order/add',{SKU_IDS: '1060',COUPON_INFO:''});
$import('pages/order/list',{state:'all'});
$import('pages/order/detail',{ORDER_ID: '1030'});
$import('pages/order/addCoupon',{SKU_IDS: '1060',pickupPerson:'{}',PRODUCTS:'{}',MONEY:'0'});
$import('pages/order/addAddress',{SKU_IDS: '1060'});

$import('pages/personal');
$import('pages/personal/card');
$import('pages/personal/coupon');

$import('pages/shop',{FROM:''});

$import('pages/coupon/list');

$import('pages/user/register');
$import('pages/user/accountLogin');
$import('pages/user/SetPassword',{LOGIN_ID:'0'});

$import('pages/account/balance');
$import('pages/account/recharge');

$import('pages/security/resetPwd');



