package com.bubu.wx.pay;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bolanggu.bbl.ENV;
import com.weixin.exception.WeixinException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 微信token单例类
 * @author pabula 2015-5-9上午09:17:16
 *
 */
public class TokenUtil {

	private static TokenUtil instance;
	
	// 获取access_token的时间
	private Map<String, Long> getTimeMap = new ConcurrentHashMap<String, Long>();
	
	// 当前获取的access_token(不用每次获取)
	private Map<String, String> accessTokenMap = new ConcurrentHashMap<String, String>();
	
	// 获取tokenURL
	private  final String URL_ACCESSTOKEN = "https://api.weixin.qq.com/cgi-bin/token";
	
	private TokenUtil(){}
   
	public static synchronized TokenUtil getInstance() {
	    if (instance == null) {  
	        instance = new TokenUtil();
	    }  
	    return instance;  
    }
	
	
	/**
	 * 获取access_token
	 * @return
	 * @throws WeixinException
	 */
	public String getAccessToken(String gzh) throws WeixinException {

		long getTime = 0;
		if(accessTokenMap.containsKey(gzh)){	// 已经获取了access_token
			long currentTime = System.currentTimeMillis();
			if(getTimeMap.containsKey(gzh)){
				getTime = getTimeMap.get(gzh);
			}
			if(getTime > 0 && (currentTime - getTime) < 6000000 ){// 过期了  | access_token有效期为7200秒
				return accessTokenMap.get(gzh);
			}
		}
		
		// 从服务端从新获取access_token
		String url = URL_ACCESSTOKEN + "?" + "grant_type="+ ENV.WX_TOKEN_GRANT_TYPE+"&appid="+ENV.WX_APPID+"&secret="+ENV.WX_APPSECRET;
		//System.err.println(gzh + "=============");
		//System.err.println(url);
		String json = HttpUtil.sendHttpsGET(url);
		
		getTime = System.currentTimeMillis();
		
		JSONObject obj = JSON.parseObject(json);
		String access_token = obj.getString("access_token");
		
		if(null == access_token){// 错误
			throw new WeixinException(json); 
		}
		
		//记录下已经得到的token
		accessTokenMap.put(gzh,access_token);
		getTimeMap.put(gzh,getTime);

		return access_token;
	}




}
