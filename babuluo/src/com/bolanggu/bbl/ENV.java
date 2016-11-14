package com.bolanggu.bbl;

/**
 * Created by pabula on 2016/11/13.
 */
public class ENV {

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

    //门店接口
    public static String API_MENDIAN = "http://58.240.110.186:98/BBL/";

    //门店接口KEY
    public static String API_MENDIAN_CERT = "F4EBA1DE727A41A91B5D10754BFBF657";


    /**
     * 微信公众号配置信息
     */

    public static String WX_APPID = "wxece1674ea8bbdc0d";

    public static String WX_MCHID = "1294154401";
    public static String WX_KEY = "sy6zcif7m285u4htm311yytz6eyks7ce";
    public static String WX_APPSECRET = "772467ba84f9fb91f579c2855725ddba";


}
