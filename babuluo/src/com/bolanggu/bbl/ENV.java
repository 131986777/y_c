package com.bolanggu.bbl;

/**
 * Created by pabula on 2016/11/13.
 */
public class ENV {


    //模式
    public static String STATE = "TEST";//测试模式  不向百年传订单数据
    //public static String STATE = "NORMAL";//正常模式  向百年传订单

    //门店接口
    //public static String API_MENDIAN = "http://58.240.110.186:98/BBL/";//线上服
    public static String API_MENDIAN = "http://58.240.110.186:99/BBL/"; //测试服
    //public static String API_MENDIAN = "http://192.168.1.69:99/BBL/"; //BBL内网


    //库存阀值
    public static Double STOCK_OFF = 0.75;

    //阿里云KEY
    //public static String ALIYUN_KEY = "LTAImVQlWKQXIQcD";   //jiaorder测试的
    public static String ALIYUN_KEY = "LTAIEHpVQat6f83C";   //BBL客户的

    //阿里云授权
    //public static String ALIYUN_SERCT = "kYSyEoB00SZje6GCaS8yqhZzNt6Mkd";     //jiaorder测试的
    public static String ALIYUN_SERCT = "uZy8ypZNyiGBYT0RqcWbmb6L1bOGNn";       //BBL客户的

    //阿里云节点
    //public static String ALIYUN_POINT = "http://oss-cn-hangzhou.aliyuncs.com";        //jiaorder测试的
    public static String ALIYUN_POINT = "http://oss-cn-shanghai.aliyuncs.com";      //BBL客户的

    //OSS BUCKET
    //public static String ALIYUN_BUCKET = "babuluo-file";        //jiaorder测试的
    public static String ALIYUN_BUCKET = "bbl-upload";        //BBL客户的

    //内容编辑器中，上传文件的存放目录
    public static String ALIYUN_UPLOAD_MAIN_DIR = "content";

    //阿里云上传后URL
    //public  static String ALIYUN_UPLOAD_URL = "http://babuluo-file.oss-cn-hangzhou.aliyuncs.com/" + ALIYUN_UPLOAD_MAIN_DIR + "/"; //jiaorder测试的
    public  static String ALIYUN_UPLOAD_URL = "http://bbl-upload.oss-cn-shanghai.aliyuncs.com/" + ALIYUN_UPLOAD_MAIN_DIR + "/";     //BBL客户的

    //阿里云上传在内容编辑器中，缩略图尺寸
    public static String ALIYUN_UPLOAD_IMG_SIZE = "?x-oss-process=image/resize,w_750";

    //门店接口KEY
    public static String API_MENDIAN_CERT = "F4EBA1DE727A41A91B5D10754BFBF657";


    //public static String ORDER_TYPE = "YYD";//预约单
    public static String ORDER_TYPE = "NORMAL";//正常单



    /**
     * 微信公众号配置信息
     */

    public static String WX_APPID = "wx7c4d78e05a44115e";
    //public static String WX_APPSECRET = "4e204b8f9cf5a5c11457ffa40d891ffc";
    public static String WX_APPSECRET = "166b4fe401feca5d175bc57463f646b3";


    /**
     * 微信支付配置信息
     */
    public static String WX_MCHID = "1298356201";
    public static String WX_KEY = "fdbnhlsh6gs79ro4lhr6vutmgnx0flfc";

    public static String WX_PAY_RESULT_CALLBACK_URL = "http://app.bblycyz.com/AndSell/h5/pages/main/wxPayCallback.jsp";


    public static String WX_TOKEN_GRANT_TYPE = "client_credential";


    public static String GENERATED_EXCEL_FILE = "/download/file/GeneratedExcelFile/";



    /**
     * 支付宝配置信息
     */
    //支付宝即时到账合作伙伴PID
    public static String ALIPAY_PID = "2088121817954413";
    //支付宝即时到账合作伙伴密钥
    public static String ALIPAY_KEY = "9ybppnj0mfpv2h71secymxw3oets636g";
    //支付宝日志输出
    public static String ALIPAY_LOG = "C:\\";
    //支付宝异步通知接口
    public static String ALIPAY_NOTIFY_URL = "http://app.bblycyz.com/AndSell/alipay";
    //支付宝结果跳转页面
    public static String ALIPAY_RETURN_URL = "http://app.bblycyz.com/AndSell/ui/alipay/return_url.jsp";

}
