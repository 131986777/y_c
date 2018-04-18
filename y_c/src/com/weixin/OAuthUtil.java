package com.weixin;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bolanggu.bbl.ENV;


/**
 * OAuth工具类
 * @author pabula 2015-08-06上午18:20:11
 */
public class OAuthUtil {
	
	
	public static final String IF_URL = "https://api.weixin.qq.com/sns/oauth2/access_token";

	public static final String IF_URL_OAUTH = "https://open.weixin.qq.com/connect/oauth2/authorize";




    /**
     * 取得参获得用户OPEN_ID的OAuth格式的URL
     * @param url
     * @return
     */
    public static String getURLByOAuth(String url){
        String overurl = IF_URL_OAUTH + "?appid="+ ENV.WX_APPID + "&redirect_uri="+url+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
        return overurl;
    }


	/**
	 * 根据OAuth获得CODE后，获得OPEN_ID
	 * @param code
	 * @return
	 */
	public static String getOpenID(String code){
		return getOpenID(ENV.WX_APPID, ENV.WX_APPSECRET, code);
	}






	/**
	 * 获取微信openId
	 * @param appid
	 * @param secret
	 * @param code
	 * @return
	 */
	private static String getOpenID(String appid, String secret, String code) {


		String url = IF_URL+ "?appid="+ appid + "&secret="+secret+"&code="+code+"&grant_type=authorization_code";
		String result = HttpUtil.sendHttpsGET(url);


		System.err.println(url + "OAuth获得CODE对应的OPEN_ID: " + result);
		System.out.println(url + "OAuth获得CODE对应的OPEN_ID: " + result);

		JSONObject obj = JSON.parseObject(result);
		int errcode = obj.getIntValue("errcode");
		if(errcode > 0){
			return "";
		}else{
			result = obj.getString("openid");
		}

		return result;
	}

}
