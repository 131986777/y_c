package com.bubu.wx.pay;

/**
 * Created by xq on 2016.8.15 17 50.
 */
public class WxPayConfig {

    //微信支付回调地址
    public static String WX_PAY_REBACK = "";

    //微信支付相关接口
    public static String WX_PAY_UNIFIEDORDER = "https://api.mch.weixin.qq.com/pay/unifiedorder";//统一下单
    public static String WX_PAY_QUERYORDER = "https://api.mch.weixin.qq.com/pay/orderquery";//查询结果
    public static String WX_PAY_CLOSERDER = "https://api.mch.weixin.qq.com/pay/closeorder";//关闭订单

    //微信二维码存放路径
    public static String WX_CODE_URL_PATH = "/uploads/wxImages/";
}
