package com.bolanggu.bbl.dist;

import java.util.List;
import java.util.Map;

import com.bolanggu.bbl.ENV;
import com.pabula.common.util.HttpClientUtil;

public class DistIncome {

	public static void addIncome(List<Map> list){
		if(list.isEmpty()){
			return;
		}
		String url = ENV.DIST_DOMAIN + "/bubu/dist/income/addIncome";
		System.out.println("list===="+list.toString());
		String param = "";
		for(Map map : list){
			/*param = "CODE="+map.get("CODE")+"&INCOME="+map.get("INCODE")+"&QUANTITY="+map.get("QUANTITY")+
					"&ACTITY_ID="+map.get("ACTITY_ID")+"&REF_ORDER_ID="+map.get("REF_ORDER_ID");*/
			System.out.println("map===="+map.toString());
			HttpClientUtil.doPost(url,map);
		}
	}
}
