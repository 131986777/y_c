package com.bolanggu.bbl;

import com.bolanggu.bbl.sms.BBLSMSUtil;
import com.weixin.WXPay;

/**
 * Created by pabula on 2016/11/13.
 */
public class ENV {

    //主域名
    //public static String DO_MAIN = "http://app.bblycyz.com/AndSell/";
    public static String DO_MAIN = "http://139.224.60.144/AndSell/";

    //模式
    //public static String STATE = "TEST";//测试模式  不向百年传订单数据
    public static String STATE = "NORMAL";//正常模式  向百年传订单

    //门店接口
    //public static String API_MENDIAN = "http://221.226.190.86:98/BBL/";//线上服
    public static String API_MENDIAN = "http://221.226.190.86:99/BBL/"; //测试服
    //public static String API_MENDIAN = "http://192.168.1.68:99/BBL/"; //BBL内网

    //阿里云KEY
    public static String ALIYUN_KEY = "LTAIEHpVQat6f83C";

    //阿里云授权
    public static String ALIYUN_SERCT = "uZy8ypZNyiGBYT0RqcWbmb6L1bOGNn";

    //阿里云节点
    public static String ALIYUN_POINT = "http://oss-cn-shanghai.aliyuncs.com";

    //OSS BUCKET
    public static String ALIYUN_BUCKET = "bbl-upload";

    //内容编辑器中，上传文件的存放目录
    public static String ALIYUN_UPLOAD_MAIN_DIR = "content";

    //阿里云上传后URL
    public static String ALIYUN_UPLOAD_URL =
        "http://bbl-upload.oss-cn-shanghai.aliyuncs.com/" + ALIYUN_UPLOAD_MAIN_DIR + "/";
    //BBL客户的

    //阿里云上传在内容编辑器中，缩略图尺寸
    public static String ALIYUN_UPLOAD_IMG_SIZE = "?x-oss-process=image/resize,w_750";

    //门店接口KEY（百年用）
    public static String API_MENDIAN_CERT = "F4EBA1DE727A41A91B5D10754BFBF657";

    /**
     * 微信公众号配置信息
     */

    public static String WX_APPID = "wx7c4d78e05a44115e";
    public static String WX_APPSECRET = "166b4fe401feca5d175bc57463f646b3";

    /**
     * 微信支付配置信息
     */
    public static String WX_MCHID = "1298356201";
    public static String WX_KEY = "fdbnhlsh6gs79ro4lhr6vutmgnx0flfc";

    public static String WX_PAY_RESULT_CALLBACK_URL =
        "http://app.bblycyz.com/AndSell/h5/pages/main/wxPayCallback.jsp";

    public static String WX_TOKEN_GRANT_TYPE = "client_credential";

    public static String GENERATED_EXCEL_FILE = "/file/download/GeneratedExcelFile/";

    public static String UPLOAD_EXCEL_FILE = "/file/upload/";

    public static String TEMP_FILE = "/file/temp/";

    /**
     * 支付宝配置信息
     */
    //支付宝即时到账合作伙伴PID
    public static String ALIPAY_PID = "2088121336481308";
    //支付宝即时到账合作伙伴密钥
    public static String ALIPAY_KEY = "sy6zcif7m285u4htm311yytz6eyks7ce";
    //支付宝日志输出
    public static String ALIPAY_LOG = "/";
    //支付宝异步通知接口
    public static String ALIPAY_NOTIFY_URL = DO_MAIN + "alipay";
    //支付宝结果跳转页面
    public static String ALIPAY_RETURN_URL = DO_MAIN + "pc/pages/aliPay/return_url.jsp";
    //http://app.bblycyz.com

    //054
    public static void main(String[] args) {
        System.out.println(WXPay.queryOrder("10004039"));
    }
}
