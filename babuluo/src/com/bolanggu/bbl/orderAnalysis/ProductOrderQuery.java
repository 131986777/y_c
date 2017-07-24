package com.bolanggu.bbl.orderAnalysis;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.pabula.db.ConnectionHelper;

public enum ProductOrderQuery {
	
	INSTANCE;
	
	private Logger log = LoggerFactory.getLogger(ProductOrderQuery.class);
	
	private static String strMonth = ""; 
	
	public List getProductOrderList(String parameter){
		
		Map<String, Object> map = jsonStringToMap(parameter);
        
		getStrMonth();
        String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT b.PRD_NAME AS `PRD_NAME`,SUM(b.PRICE_SUM) AS `PRICE_SUM`,");
		sql.append("COUNT(b.ID) AS `ORDER_COUNT`,SUM(b.COUNT) AS `PRD_COUNT`,b.UNIT AS `SKU_UNIT`");
		sql.append(" FROM shop_order_offline"+month+" a INNER JOIN shop_order_info_offline"+month+" b ON a.ID = b.ORDER_ID");
		/*if(map.containsKey("SHOP_NAME") && !"null".equals(map.get("SHOP_NAME"))){
			sql.append(" INNER JOIN shop c ON a.SOURCE_SHOP = c.SHOP_ID");
		}*/
		sql.append(" WHERE 1=1");
		//sql.append(whereStr);
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND a.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND a.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map,"PRD_NAME")){
			sql.append(" AND b.PRD_NAME LIKE '%"+map.get("PRD_NAME")+"%'");
        }
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.SOURCE_SHOP = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" GROUP BY b.SKU");
		List list = executeQuery(sql.toString());
		return list;
	}
	/**
	 * 按门店分类，取相应商品订单详情
	 * @param parameter
	 * @return
	 */
	public List getShopProductList(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		
		String month = getMonth(map);
        StringBuffer sql = new StringBuffer();
        sql.append("SELECT c.SHOP_NAME AS `SHOP_NAME`,COUNT(b.ID) AS `ORDER_COUNT`,");
        sql.append("SUM(b.COUNT) AS `PRD_COUNT`,SUM(b.PRICE_SUM) AS `PRICE_SUM`,");
        sql.append("b.UNIT AS `SKU_UNIT` FROM shop_order_offline"+month+" a INNER JOIN shop_order_info_offline"+month+" b ON a.ID = b.ORDER_ID");
        sql.append(" INNER JOIN shop c ON a.SOURCE_SHOP=c.SHOP_ID");
        sql.append(" WHERE 1=1");
		//sql.append(whereStr);
        if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND a.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND a.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map,"PRD_NAME")){
			sql.append(" AND b.PRD_NAME = '"+map.get("PRD_NAME")+"'");
		}
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.SOURCE_SHOP = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" GROUP BY c.SHOP_ID ORDER BY PRD_COUNT DESC");
		List list = executeQuery(sql.toString());
		return list;
	}
	/**
	 * 获取线下某商品一段时间内的订单详情
	 * @param parameter
	 * @return
	 */
	public List getOrderInDate(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT COUNT(b.ID) AS `ORDER_COUNT`,");
		sql.append("SUM(b.COUNT) AS `PRD_COUNT`,SUM(b.PRICE_SUM) AS `PRICE_SUM`,");
		sql.append("b.UNIT AS `SKU_UNIT`,DATE_FORMAT(a.DATETIME_ADD,'%Y-%m-%d') AS `ADDTIME`");
		sql.append(" FROM shop_order_offline"+month+" a INNER JOIN shop_order_info_offline"+month+" b ON a.ID = b.ORDER_ID");
		sql.append(" WHERE 1=1");
		if(isNull(map,"PRD_NAME")){
			sql.append(" AND b.PRD_NAME = '"+map.get("PRD_NAME")+"'");
		}
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND a.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND a.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND a.SOURCE_SHOP = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" GROUP BY ADDTIME");
		List list = executeQuery(sql.toString());
		return list;
	}
	
	/**
	 * 获取线上商品订单列表
	 * @param parameter
	 * @return
	 */
	public List getOnlineOrder(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT a.PRD_NAME AS `PRD_NAME`,COUNT(a.ID) AS `ORDER_COUNT`,");
		sql.append("SUM(a.COUNT) AS `PRD_COUNT`,a.SKU_1_VALUE AS `SKU_UNIT`,");
		sql.append("CAST(SUM(a.PRICE_SUM) AS DECIMAL(10,2))  AS `PRICE_SUM`,a.SKU AS `SKU`");
		sql.append(" FROM shop_order_info"+month+" a INNER JOIN shop_order"+month+" b ON b.ID = a.ORDER_ID");
		sql.append(" WHERE b.STATE_ORDER=1 AND b.STATE_MONEY=1");
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND b.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND b.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(isNull(map,"PRD_NAME")){
			sql.append(" AND a.PRD_NAME LIKE '%"+map.get("PRD_NAME")+"%'");
        }
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND b.SHOP_ID = '"+map.get("SHOP_ID")+"'");
		}
		
		sql.append(" GROUP BY a.PRD_ID,a.SKU");
		List list = executeQuery(sql.toString());
		return list;
	}
	
	/**
	 * 线上门店商品订单详情
	 * @param parameter
	 * @return
	 */
	public List getOnlineShopOrder(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT c.SHOP_NAME AS `SHOP_NAME`,COUNT(a.ID) AS `ORDER_COUNT`,SUM(a.COUNT) AS `PRD_COUNT`,");
		sql.append("a.SKU_1_VALUE AS `SKU_UNIT`,CAST(SUM(a.PRICE_SUM) AS DECIMAL(10,2)) AS `PRICE_SUM`");
		sql.append(" FROM shop_order_info"+month+" a");
		sql.append(" INNER JOIN shop_order"+month+" b ON a.ORDER_ID=b.ID");
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
		sql.append(" GROUP BY b.SHOP_ID");
		List list = executeQuery(sql.toString());
		return list;
	}
	
	/**
	 * 线下门店订单折线图
	 * @param parameter
	 * @return
	 */
	public List getOnlineShopOrderInDate(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT CAST(SUM(a.PRICE_SUM) AS DECIMAL(10,2)) AS `PRICE_SUM`,DATE_FORMAT(b.DATETIME_ADD,'%Y-%m-%d') AS `ADDTIME`");
		sql.append(" from shop_order_info"+month+" a");
		sql.append(" INNER JOIN shop_order"+month+" b ON a.ORDER_ID=b.ID");
		sql.append(" WHERE b.STATE_ORDER=1 AND b.STATE_MONEY=1");
		if(map.containsKey("DATETIME_ADD_FROM") && !"null".equals(map.get("DATETIME_ADD_FROM"))){
			sql.append(" AND b.DATETIME_ADD >='"+map.get("DATETIME_ADD_FROM")+" 00:00:00'");
		}
		if(map.containsKey("DATETIME_ADD_TO") && !"null".equals(map.get("DATETIME_ADD_TO"))){
			sql.append(" AND b.DATETIME_ADD <='"+map.get("DATETIME_ADD_TO")+" 23:59:59'");
		}
		if(map.containsKey("SKU") && !"null".equals(map.get("SKU"))){
			sql.append(" AND a.SKU ='"+map.get("SKU")+"'");
		}
		if(map.containsKey("SHOP_ID") && !"null".equals(map.get("SHOP_ID"))){
			sql.append(" AND b.SHOP_ID = '"+map.get("SHOP_ID")+"'");
		}
		sql.append(" GROUP BY ADDTIME");
		List list = executeQuery(sql.toString());
		return list;
	}
	
	public List getOrderInfo(String parameter){
		Map<String, Object> map = jsonStringToMap(parameter);
		getStrMonth();
		String month = getMonth(map);
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT a.SHOP_NAME,a.ORDER_NUM,c.TRUE_NAME,a.REC_PHONE,b.PRD_NAME,b.SKU_1_VALUE,");
		sql.append("b.COUNT,a.PAY_TYPE,FORMAT(b.PRICE_SUM*b.COUNT,2) AS `PRICE_SUM`,a.DATETIME_ADD");
		sql.append(" FROM shop_order"+month+" a");
		sql.append(" INNER JOIN shop_order_info"+month+" b ON a.ID=b.ORDER_ID ");
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
		System.out.println(sql.toString());
		List list = executeQuery(sql.toString());
		return list;
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
	
	/**
	 * 执行sql
	 * @param sqlStr
	 * @return
	 */
	private List executeQuery(String sqlStr){
		Connection conn=null;
        Statement stmt=null;
        ResultSet rs=null;
        List list = new ArrayList();
        try {
        	conn=ConnectionHelper.getConnection("andsell_read");
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sqlStr);
			int columnCount = rs.getMetaData().getColumnCount();
			while(rs.next()){
				Map rowData = new HashMap(columnCount);
				for (int i = 1; i <= columnCount; i++) {   
                    rowData.put(rs.getMetaData().getColumnName(i), rs.getObject(i));
				}
				list.add(rowData);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			ConnectionHelper.close(rs);
            ConnectionHelper.close(stmt);
            ConnectionHelper.close(conn);
		}
		return list;
	}
	
	private void getStrMonth(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		strMonth = sdf.format(new Date());
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
	
	private boolean isNull(Map map,String str){
		return map.containsKey(str) && !"null".equals(map.get(str)) && !"".equals(map.get(str));
	}
	
}
