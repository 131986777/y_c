package com.bolanggu.bbl.lottery;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.weixin.HttpUtil;

public class LotteryUtil {
	
	private static LotteryUtil instance;
	
	private static final String GENERATECODE_URL = "http://yx.bblycyz.com/lottery/rest/lottery/GenerateCode";

	
	public static LotteryUtil getInstance() {
	    if (instance == null) {  
	        instance = new LotteryUtil();  
	    }  
	    return instance;  
    }
	
	public String getLotteryCode(){
		String json = HttpClientUtil.sendGetRequest(GENERATECODE_URL);
		//String json = HttpUtil.sendHttpsGET(GENERATECODE_URL);
		JSONObject obj = JSON.parseObject(json);
		String code = obj.getString("data");
		return code;
		
	}
}
