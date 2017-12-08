package com.bolanggu.bbl.output;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public enum GetSQL {
	
	INSTANCE;
	private static String strMonth = "";
	
	public String getSql(String type,String parameter){
		String sql = "";
		switch(type){
			case "offlineProduct":
				sql = getProductOrder(parameter);
				break;
			case "offlineShopProduct":
				sql = getShopProductSql(parameter);
				break;
			case "onlineProductOrder":
				sql = getOnlineOrder(parameter);
				break;
			case "onlineShopProductOrder":
				sql = getOnlineShopOrder(parameter);
				break;
			case "orderInfo":
				sql = getOrderInfoSql(parameter);
				break;
		}
		return sql;
	}
	
	/**
	 * 商品订单列表
	 * @param paramer
	 * @return
	 */
	private String getProductOrder(String parameter){
		
		Map<String, Object> map = jsonStringToMap(parameter);
		getStrMonth();
        String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT b.PRD_NAME AS `商品名称`,COUNT(b.ID) AS `订单数量`,");
		sql.append("SUM(b.COUNT) AS `商品销量`,b.UNIT AS `商品规格`,SUM(b.PRICE_SUM) AS `销售金额`");
		sql.append(" FROM shop_order_offline"+month+" a INNER JOIN shop_order_info_offline"+month+" b ON a.ID = b.ORDER_ID");
		sql.append(" WHERE 1=1");
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND a.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND a.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map, "PRD_NAME")){
			sql.append(" AND b.PRD_NAME LIKE '%"+map.get("PRD_NAME")+"%'");
        }
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.SOURCE_SHOP = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" GROUP BY b.SKU");
		return sql.toString();
	}
	/**
	 * 线下商品
	 * @param parameter
	 * @return
	 */
	private String getShopProductSql(String parameter){
		
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
        StringBuffer sql = new StringBuffer();
        sql.append("SELECT c.SHOP_NAME AS `门店`,COUNT(b.ID) AS `订单量`,");
        sql.append("SUM(b.COUNT) AS `商品销售量`,b.UNIT AS `规格`,");
        sql.append(" SUM(b.PRICE_SUM) AS `销售额` FROM shop_order_offline"+month+" a INNER JOIN shop_order_info_offline"+month+" b ON a.ID = b.ORDER_ID");
        sql.append(" INNER JOIN shop c ON a.SOURCE_SHOP=c.SHOP_ID");
        sql.append(" WHERE 1=1");
        if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND a.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND a.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map, "PRD_NAME")){
			sql.append(" AND b.PRD_NAME = '"+map.get("PRD_NAME")+"'");
		}
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.SOURCE_SHOP = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" GROUP BY c.SHOP_ID ORDER BY `商品销售量` DESC");
		return sql.toString();
	} 
	
	/**
	 * 线上订单
	 * @param parameter
	 * @return
	 */
	private String getOnlineOrder(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT a.PRD_NAME AS `商品名称`,COUNT(a.ID) AS `订单量`,");
		sql.append("SUM(a.COUNT) AS `商品销售量`,a.SKU_1_VALUE AS `规格`,");
		sql.append("a.SKU AS `商品编码`,a.PRD_ID AS `商品货号`,");
		sql.append("CAST(SUM(a.PRICE_SUM*a.COUNT) AS DECIMAL(10,2))  AS `销售总额`");
		sql.append(" FROM shop_order_info a INNER JOIN shop_order b ON b.ID = a.ORDER_ID");
		sql.append(" WHERE b.STATE_ORDER=1 AND b.STATE_MONEY=1");
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND b.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND b.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map, "PRD_NAME")){
			sql.append(" AND a.PRD_NAME LIKE '%"+map.get("PRD_NAME")+"%'");
        }
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND b.SOURCE_SHOP = '"+map.get("SHOP_ID")+"'");
		}
		if(map.containsKey("PRD_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.PRD_ID = '"+map.get("PRD_ID")+"'");
		}
		if(map.containsKey("GET_PRD_DATETIME") && !"null".equals(map.get("GET_PRD_DATETIME"))){
			sql.append(" AND DATE_FORMAT(b.GET_PRD_DATETIME,'%Y-%m-%d') = '"+map.get("GET_PRD_DATETIME")+"'");
		}
		sql.append(" GROUP BY a.PRD_ID,a.SKU");
		return sql.toString();
	}
	/**
	 * 线上门店订单详情
	 * @param parameter
	 * @return
	 */
	private String getOnlineShopOrder(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT c.SHOP_ID AS `门店ID`,c.SHOP_NAME AS `门店名称`,COUNT(a.ID) AS `订单数量`,SUM(a.COUNT) AS `商品销售量`,");
		sql.append("a.SKU_1_VALUE AS `规格`,CAST(SUM(a.PRICE_SUM) AS DECIMAL(10,2)) AS `销售总额`");
		sql.append(" FROM shop_order_info a");
		sql.append(" INNER JOIN shop_order b ON a.ORDER_ID=b.ID");
		sql.append(" INNER JOIN shop c ON b.SHOP_ID = c.SHOP_ID");
		sql.append(" WHERE b.STATE_ORDER=1 AND b.STATE_MONEY=1");
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND b.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND b.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		/*if(map.containsKey("PRD_ID") && !"null".equals(map.get("PRD_ID"))){
			sql.append(" AND a.PRD_ID ='"+map.get("PRD_ID")+"'");
        }*/
		if(map.containsKey("SKU") && !"null".equals(map.get("SKU"))){
			sql.append(" AND a.SKU ='"+map.get("SKU")+"'");
		}
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND b.SHOP_ID = '"+map.get("SHOP_ID")+"'");
		}
		if(map.containsKey("PRD_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.PRD_ID = '"+map.get("PRD_ID")+"'");
		}
		if(map.containsKey("GET_PRD_DATETIME") && !"null".equals(map.get("GET_PRD_DATETIME"))){
			sql.append(" AND DATE_FORMAT(b.GET_PRD_DATETIME,'%Y-%m-%d') = '"+map.get("GET_PRD_DATETIME")+"'");
		}
		sql.append(" GROUP BY b.SHOP_ID");
		return sql.toString();
	}
	
	/**
	 * 线上订单详情
	 * @param parameter
	 * @return
	 */
	private String getOrderInfoSql(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		getStrMonth();
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT a.SHOP_NAME AS `门店`,a.ORDER_NUM AS `订单号`,c.TRUE_NAME AS `购买人`,");
		sql.append("a.REC_PHONE AS `手机号`,b.PRD_NAME AS `商品`,b.SKU_1_VALUE AS `规格`,");
		sql.append("b.PRD_ID as `货号`,b.SKU AS `商品编码`,");
		sql.append("b.COUNT AS `数量`,a.PAY_TYPE AS 	`支付类型`,FORMAT(b.PRICE_SUM*b.COUNT,2) AS `金额`,a.DATETIME_ADD AS `购买时间`,");
		sql.append("CASE a.STATE_OUT WHEN 1 THEN '已提货' WHEN -1 THEN '未提货' END AS `提货状态`");
		sql.append(" FROM shop_order a");
		sql.append(" INNER JOIN shop_order_info b ON a.ID=b.ORDER_ID ");
		sql.append(" INNER JOIN member_info c ON a.UID=c.USER_ID");
		sql.append(" WHERE a.STATE_ORDER = 1 AND a.STATE_MONEY=1");
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND a.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND a.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map,"PRD_NAME")){
			sql.append(" AND b.PRD_NAME LIKE'%"+map.get("PRD_NAME")+"%'");
		}
		if(isNull(map,"ORDER_NUM")){
			sql.append(" AND a.ORDER_NUM ='"+map.get("ORDER_NUM")+"'");
		}
		if(isNull(map,"REC_PHONE")){
			sql.append(" AND a.REC_PHONE ='"+map.get("REC_PHONE")+"'");
		}
		if(isNull(map,"SHOP_ID")){
			sql.append(" AND a.SHOP_ID = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" ORDER BY a.DATETIME_ADD DESC");
		return sql.toString();
	}
	
	/**
	 * 将json字符串转换成map
	 * @param parameter
	 * @return
	 */
	private Map<String, Object> jsonStringToMap(String parameter){
		JSONObject paramJson = JSON.parseObject(parameter);
		Map<String, Object> map = new HashMap<>();
		if(paramJson != null){
			for (Map.Entry<String, Object> entry : paramJson.entrySet()) {
	            map.put(entry.getKey(), entry.getValue());
	        }
		}
		return map;
	}
	
	private String getMonth(Map map){
		String month = "";
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			month = map.get("DATETIME_ADD_FROM").toString().substring(0, 7).replace("-", "");
		}
		if(month.equals(strMonth)){
        	month = "";
        }
		return month;
	}
	
	private void getStrMonth(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		strMonth = sdf.format(new Date());
	}
	
	private boolean isNull(Map map,String str){
		return map.containsKey(str) && !"null".equals(map.get(str)) && !"".equals(map.get(str));
	}

}
