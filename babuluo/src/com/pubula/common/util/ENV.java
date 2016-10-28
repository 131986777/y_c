package com.pubula.common.util;

/**
 * Created by sunsai on 2016/2/19.
 */
public class ENV {

    //短信相关参数（http://www.yuntongxun.com)
    public static final String SMS_TELPLET_ID = "72581";    //验证码模板ID
    public static final String SMS_TELPLET_ID_NEWPWD = "72824";    //验证码模板ID
    public static final String SMS_TELPLET_ID_RESETPWD = "72680";    //验证码模板ID
    public static final String SMS_APP_ID = "8a48b55150a898370150a9eb2b710512"; //应用ID
    public static final String SMS_ACCOUNT_SID = "aaf98f894e2360b4014e32ba8eba0d30";
    //ACCOUNT_SID
    public static final String SMS_AUTH_TOKEN = "40b12dfec56c4f1fa66eaa3ff0903a7c"; //AUTH_TOKEN
    public static final String SMS_SERVER = "app.cloopen.com"; //AUTH_TOKEN
    public static final String SMS_SERVER_PORT = "8883"; //AUTH_TOKEN

    public static final String JSON_FILTER_NAME = "jiaOrderFilterName";

    public static final String FILE_SERVER_DOMAIN = "../../";

    public static final String PRODUCT_DEFAULT_IMG = "/uploads/images/product.png";

    public static final String PROJECT_TITLE = "加加订货，货订天下";

    //URL domain
    public static String URL_DOMAIN = "http://admin.jiaorder.com/";



    public static String URL_PRODUCT = URL_DOMAIN + "mobile/product/product.jsp";
    public static String URL_CART = URL_DOMAIN + "mobile/cart/cart.jsp";
    public static String URL_ORDER = URL_DOMAIN + "mobile/order/orderList.jsp";
    public static String URL_MYINFO = URL_DOMAIN + "mobile/my/myAccount.jsp";
    public static String URL_NOEIFY = URL_DOMAIN + "mobile/my/index.jsp";
    public static String URL_GUEStBOOK = URL_DOMAIN + "mobile/my/guestbook.jsp";

    public static String GENERATED_EXCEL_FILE = "/download/file/GeneratedExcelFile/";

    public static String MODEL_EXCEL_FILE = "/download/file/ModelExcelFile/";

    public static String URL_MOBILE_TIYAN = URL_DOMAIN + "mobile/login.jsp";

    //重定向地址
    public static String REDIRECT_URL = URL_DOMAIN + "callWeiXinPay";

    //异步回调地址
    public static String NOTIFY_URL = URL_DOMAIN + "weixinPay_notify";

    //web回调地址
    public static String WEB_NOTIFY_URL = URL_DOMAIN + "weixinPay_notify";

    //微信支付相关接口
    public static String WX_PAY_UNIFIEDORDER = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    //统一下单
    public static String WX_PAY_QUERYORDER = "https://api.mch.weixin.qq.com/pay/orderquery";//查询结果
    public static String WX_PAY_CLOSERDER = "https://api.mch.weixin.qq.com/pay/closeorder";//关闭订单

    //微信相关配置
    public static String WX_APPID = "wxa9170241098faaea";
    public static String WX_TOKEN = "jiaorder1q2w3e4r";
    public static String WX_SECRET = "3df537dc5211aa26da9881eddd31dcd4";
    public static String WX_PAY_KEY = "7JMjq5Nu9ACbznzC3Cw3PV55e2Yd8evd";
    public static String WX_MCHID = "1358998902";

    //微信支付證書路徑
    public static String WX_PAY_ACCESS_PATH = "C:/apiclient_cert.p12";
    //微信二维码存放路径
    public static String WX_CODE_URL_PATH = "/uploads/wximages/";

    //支付宝即时到账合作伙伴PID
    public static String ALIPAY_PID = "2088121817954413";
    //支付宝即时到账合作伙伴密钥
    public static String ALIPAY_KEY = "9ybppnj0mfpv2h71secymxw3oets636g";
    //支付宝日志输出
    public static String ALIPAY_LOG = "C:\\";
    //支付宝异步通知接口
    public static String ALIPAY_NOTIFY_URL = "http://" + ENV.URL_DOMAIN + "alipay";
    //支付宝结果跳转页面
    public static String ALIPAY_RETURN_URL = "http://" + ENV.URL_DOMAIN + "ui/alipay/return_url.jsp";

    //微信模版消息ID
    public static String WX_TEMPLATE_MSG_TO_ADMIN_ID =
            "S0G6OgIsszzrjqZJagDRuyN92d4zomLzrqkFBC4T1iA";

    public static String WX_TEMPLATE_MSG_ORDER_NOTIFY =
            "KHWALt4bK1iOY5-oOyNT5E2fRddgDsiivtYPpiZ4c-4";
    public static String WX_TEMPLATE_MSG_ORDER_NOTIFY_FOR_AGENT =
            "ajcsH-FC3VR0qxup4hiS-80YGdWxxNq88IeQhApDldI";

    //获取公众号token的赋权类型
    public static String WX_TOKEN_GRANT_TYPE = "client_credential";

    public static String GZH = "jiaOrder";

    public static String WX_QRCODE_SAVE_PATH = "D:\\site\\app\\ROOT\\uploads\\qrcode\\";

    public static String WX_DEBUG_ACCESS_TOKEN =
            "3FSc8arSgIwWp6h1TnFQign4FRpFshawTfR4tnnsqaIlqK1G1dSoEeyVNjraHF9ZZJfRRZamX3x-uUSiZD-LMol8aC7imN4MJ-_NEk4eAZnSFpEWo_E9gBNRSr6ChZ3yVUWjAJAHGI";

    public static String WX_SUNSAI_OPENID = "oYWo6t2KlUQsCc4F-n1fZ585pvA4";
    public static String WX_DINGKUN_OPENID = "oYWo6t_FH7LRNu0d6QNkvAcud__8";

    //public static String WX_ADMIN_OPENID = "o61Cmv7pHv4NtRIY9Cc9B7yomXYc"; //赛

    public static String AUTH_IS_LOGIN_CAN_USED_RES = "has_login_can_use_res";//权限验证，登录就可以使用的资源

    public static String WX_ADMIN_OPENID =
            "o61Cmv7pHv4NtRIY9Cc9B7yomXYc,o61Cmv3BPxPjWh9bpiWWAMYPzmC0,o61Cmv898ytqeP3yDTMNtDOMtJDE,o61Cmv4R0rpNUdZ58NnhdFK-KwvI";

    public static String WX_NOTIFY_NEW_ORDER = "4|wx_notify_new_order";
    public static String WX_NOTIFY_ORDER_CW_CHECK = "4|wx_notify_order_cw_check";
    public static String WX_NOTIFY_ORDER_CK_CHECK = "4|wx_notify_order_ck_check";
    public static String WX_NOTIFY_ORDER_FH_CHECK = "4|wx_notify_order_fh_check";
    public static String WX_NOTIFY_ORDER_SH_CHECK = "4|wx_notify_order_sh_check";

    //public static String WX_ADMIN_OPENID = "o61Cmv7pHv4NtRIY9Cc9B7yomXYc"; //赛
    //public static String WX_ADMIN_OPENID = "o61CmvzE3BMmqbyXBxWq9ezNiCuI"; //奇
    //public static String WX_ADMIN_OPENID = "o61Cmv4R0rpNUdZ58NnhdFK-KwvI"; //琪

    public static int UI_SELECT_ITEM_MAX_SIZE = 400;//商品选择控件下来选择框最大的元素数量。大于这个数量则在modal里面选择商品

    public static int SYS_SERVICE_ID = 1;//系统默认角色
    public static int OTHER_SERVICE_ID = 2;//全局角色
    //public static String WX_ADMIN_OPENID = "o61Cmv7pHv4NtRIY9Cc9B7yomXYc"; //赛
}
