package com.task.job;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bolanggu.bbl.sms.BBLSMSUtil;
import com.pabula.api.API;
import com.pabula.common.util.StrUtil;
import com.pabula.db.ConnectionHelper;

public class WeekCouponJob implements Job{
	
	private Logger log = LoggerFactory.getLogger(WeekCouponJob.class);
	
	private static String CONTENT_1 = "【云厨1站】恭喜您购物满100元，并获得8元电子通用无敌券，进店消费可享折上折，请登录云厨微商城查看。详询400 000 9185";
	private static String CONTENT_2 = "【云厨1站】恭喜您购物满200元，并获得18元电子通用无敌券(8/10元各一张)，进店消费可享折上折，请登录云厨微商城查看。详询400 000 9185";
	private static String CONTENT_3 = "【云厨1站】恭喜您购物满300元，并获得28元电子通用无敌券(8/10/10元各一张)，进店消费可享折上折，请登录云厨微商城查看。详询400 000 9185";
	
	
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		Connection conn=null;
        Statement stmt=null;
        ResultSet rs=null;
        try{
        	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        	Date today = new Date();
        	if(sdf.parse("2018-02-04 00:00:00").before(today)){
        		return;
        	}
        	Calendar cal = Calendar.getInstance();
    		cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY); 
    		cal.set(Calendar.HOUR_OF_DAY, 0);
    		cal.set(Calendar.MINUTE, 0);
    		cal.set(Calendar.SECOND, 0);
    		Date monday = cal.getTime();
    		String strMonday = sdf.format(monday);
    		
    		cal.setTime(new Date());
    		cal.set(Calendar.HOUR_OF_DAY, 0);
    		cal.set(Calendar.MINUTE, 0);
    		cal.set(Calendar.SECOND, 0);
            Date zero = cal.getTime();
    		
    		
    		String strtoday = sdf.format(zero);
    		System.out.println("strMonday:::"+strMonday);
    		System.out.println("strtoday:::"+strtoday);
    		
        	
        	List<Map> list = new  ArrayList<Map>();
        	conn=ConnectionHelper.getConnection("andsell");
            stmt=conn.createStatement();
            StringBuffer return_sql = new StringBuffer();
            return_sql.append("SELECT SUM(a.CHANGE_VALUE) AS `SPEND`,a.USER_ID AS `USER_ID`");
            return_sql.append(" FROM finance_list a");
            return_sql.append(" WHERE (a.`EVENT`='线下退款' or a.`EVENT`='线上退款')");
            return_sql.append(" AND a.ADD_DATETIME > '"+strMonday+"' AND a.ADD_DATETIME < '"+strtoday+"'");
            //sql.append(" AND a.USER_ID NOT IN");
            //sql.append(" (SELECT b.USER_ID FROM member_coupon b WHERE b.COUPON_ID=3025 GROUP BY b.USER_ID HAVING COUNT(1) >= 1)");
            return_sql.append(" GROUP BY a.USER_ID");
            rs=stmt.executeQuery(return_sql.toString());
            
            log.info(return_sql.toString());
            
            Map return_map = new HashMap();
            while(rs.next()){
            	int userId = rs.getInt("USER_ID");
            	int spend = rs.getInt("SPEND");
            	if(userId > 0){
            		return_map.put(userId, spend);
            	}
            }
            
            StringBuffer sql = new StringBuffer();
            sql.append("SELECT SUM(a.CHANGE_VALUE) AS `SPEND`,a.USER_ID AS `USER_ID`,c.MOBILE AS `MOBILE`");
            sql.append(" FROM finance_list a LEFT JOIN member c ON a.USER_ID=c.USER_ID");
            sql.append(" WHERE (a.`EVENT`='线下消费' OR a.`EVENT`='线上消费')");
            sql.append(" AND a.ADD_DATETIME > '"+strMonday+"' AND a.ADD_DATETIME < '"+strtoday+"'");
            //sql.append(" AND a.USER_ID NOT IN");
            //sql.append(" (SELECT b.USER_ID FROM member_coupon b WHERE b.COUPON_ID=3025 GROUP BY b.USER_ID HAVING COUNT(1) >= 1)");
            sql.append(" GROUP BY a.USER_ID HAVING `SPEND` >= 10000");
            
            log.info(sql.toString());
            
            rs=stmt.executeQuery(sql.toString());
            while(rs.next()){
            	int userId = rs.getInt("USER_ID");
            	String mobile = rs.getString("MOBILE");
            	if(userId >0){
                	int spend = rs.getInt("SPEND") - (return_map.get(userId) == null?0:Integer.valueOf(return_map.get(userId).toString()));
                	System.out.println("spend:::"+spend);
                	if(spend >= 10000){
                		Map map1 = new HashMap();
                		map1.put("USER_ID", userId);
                		map1.put("MOBILE", mobile);
                		map1.put("SPEND", spend);
                		list.add(map1);
                	}
            		
            	}
            }
            
            List<Map> userList = new ArrayList<Map>();
            API api = new API();
            Map paramsMap = new HashMap();
            paramsMap.put("MEMBER_COUPON.EXPIRED_TIME", "2018-02-10 00:00:00");
            paramsMap.put("MEMBER_COUPON.SERVICE_ID", 1000);
            BBLSMSUtil sms=new BBLSMSUtil();
            Map map = new HashMap();
            String CONTENT = "";
            for(int i=0;i<list.size();i++){
            	map = list.get(i);
            	int spend = Integer.parseInt(map.get("SPEND").toString());
            	int userId =  Integer.parseInt(map.get("USER_ID").toString());
            	paramsMap.put("MEMBER_COUPON.USER_ID", map.get("USER_ID"));
            	if(spend >= 10000 && spend < 20000){
            		paramsMap.put("MEMBER_COUPON.COUPON_ID", 3040);
            		api.call("/member/coupon/add", paramsMap);
            		sms.SendMessage(map.get("MOBILE").toString(), CONTENT_1);
            	}else if(spend >= 20000 && spend < 30000) {
            		paramsMap.put("MEMBER_COUPON.COUPON_ID", 3040);
            		api.call("/member/coupon/add", paramsMap);
            		paramsMap.put("MEMBER_COUPON.COUPON_ID", 3041);
            		api.call("/member/coupon/add", paramsMap);
            		sms.SendMessage(map.get("MOBILE").toString(), CONTENT_2);
            	}else if ( spend >= 30000){
            		paramsMap.put("MEMBER_COUPON.COUPON_ID", 3040);
            		api.call("/member/coupon/add", paramsMap);
            		paramsMap.put("MEMBER_COUPON.COUPON_ID", 3041);
            		api.call("/member/coupon/add", paramsMap);
            		api.call("/member/coupon/add", paramsMap);
            		sms.SendMessage(map.get("MOBILE").toString(), CONTENT_3);
            	}
            	
            }
           
            
        }catch(Exception e){
        	log.error(e.toString());
        }finally{
			ConnectionHelper.close(rs);
            ConnectionHelper.close(stmt);
            ConnectionHelper.close(conn);
		}
		
	}

}
