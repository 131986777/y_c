package com.task.job;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pabula.db.ConnectionHelper;

public class ShopOrderJob implements Job{
	
	private Logger log = LoggerFactory.getLogger(ShopOrderJob.class);

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		
		System.out.println("ShopOrderJob");
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String month = sdf.format(new Date());
		String sqlStr = "ALTER TABLE shop_order_offline RENAME shop_order_offline"+month;
		Connection conn=null;
        Statement stmt=null;
        ResultSet rs=null;
        try{
        	conn=ConnectionHelper.getConnection("andsell");
            stmt=conn.createStatement();
            stmt.execute(sqlStr.toString());
            StringBuffer sql = new StringBuffer();
            sql.append("CREATE TABLE `shop_order_offline` (");
			  sql.append("`ID` int(11) NOT NULL AUTO_INCREMENT,");
			  sql.append("`ORDER_NUM` varchar(255) NOT NULL,");
			  sql.append("`UID` int(11) DEFAULT NULL,");
			  sql.append("`SERVICE_ID` int(11) DEFAULT NULL,");
			  sql.append("`TYPE` int(11) DEFAULT NULL,");
			  sql.append("`STATE_ORDER` int(11) DEFAULT NULL,");
			  sql.append("`STATE_MONEY` int(11) DEFAULT NULL,");
			  sql.append("`STATE_OUT` int(11) DEFAULT NULL,");
			  sql.append("`STATE_SEND` int(11) DEFAULT NULL,");
			  sql.append("`REMARK` varchar(255) DEFAULT NULL,");
			  sql.append("`PAY_TYPE` varchar(255) DEFAULT NULL,");
			  sql.append("`REC_TYPE` int(11) DEFAULT NULL,");
			  sql.append("`REC_CONTACT` varchar(255) DEFAULT NULL,");
			  sql.append("`REC_PHONE` varchar(255) DEFAULT NULL,");
			  sql.append("`REC_ADDR` varchar(255) DEFAULT NULL,");
			  sql.append("`REC_CHECKCODE` varchar(255) DEFAULT NULL,");
			  sql.append("`REC_DATETIME` int(11) DEFAULT NULL,");
			  sql.append("`PRICE_PRD` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_FREIGHT` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_FAX` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_ORDER` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_DISCOUNT` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_POINT` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_MODIFY` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_OVER` bigint(11) DEFAULT NULL,");
			  sql.append("`PRICE_PAID` bigint(11) DEFAULT NULL,");
			  sql.append("`INVOICE_IS` int(11) DEFAULT NULL,");
			  sql.append("`INVOICE_TYPE` int(11) DEFAULT NULL,");
			  sql.append("`INVOICE_TITLE` varchar(255) DEFAULT NULL,");
			  sql.append("`INVOICE_BANK` varchar(255) DEFAULT NULL,");
			  sql.append("`INVOICE_GID` varchar(255) DEFAULT NULL,");
			  sql.append("`INVOICE_CONTENT` varchar(255) DEFAULT NULL,");
			  sql.append("`REPLACE_IS` int(11) DEFAULT NULL,");
			  sql.append("`REPLACE_UID` varchar(255) DEFAULT NULL,");
			  sql.append("`SOURCE` varchar(255) DEFAULT NULL,");
			  sql.append("`SOURCE_SHOP` varchar(255) DEFAULT NULL,");
			  sql.append("`SOURCE_SHOP_NAME` varchar(255) DEFAULT NULL,");
			  sql.append("`DATETIME_ADD` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_MODIFY` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_CONFIRM` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_PAY` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_DIST` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_OUT` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_SEND` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_ACCEPT` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_COMMENT` datetime DEFAULT NULL,");
			  sql.append("`ORDER_INFO` text,");
			  sql.append("`STATE_DELIVERY` int(11) DEFAULT NULL,");
			  sql.append("`DATETIME_CANCEL` datetime DEFAULT NULL,");
			  sql.append("`DATETIME_DELIVERY` datetime DEFAULT NULL,");
			  sql.append("`STATE_COMMENT` int(11) DEFAULT NULL,");
			  sql.append("`PAY_CODE` varchar(255) DEFAULT NULL,");
			  sql.append("`PAY_NAME` varchar(255) DEFAULT NULL,");
			  sql.append("`PAY_AMOUNT` bigint(11) DEFAULT NULL,");
			  sql.append("PRIMARY KEY (`ID`),");
			  sql.append("KEY `ss` (`ID`) USING HASH,");
			  sql.append("KEY `date` (`DATETIME_ADD`),");
			  sql.append("KEY `SOURCE_SHOP_INDEX` (`SOURCE_SHOP`),");
			  sql.append("KEY `ORDER_INDEX` (`SOURCE_SHOP, ORDER_NUM`),");
			  sql.append("KEY `SHOP_TIME_INDEX` (`SOURCE_SHOP`,`DATETIME_ADD`)");
			  sql.append(") ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;");
			log.info("sql======"+sql.toString());
            stmt.execute(sql.toString());
            
			sqlStr = "ALTER TABLE shop_order_info_offline RENAME shop_order_info_offline"+month;
			stmt.execute(sqlStr); 
			StringBuffer sqlinfo = new StringBuffer();
			sqlinfo.append("CREATE TABLE `shop_order_info_offline` (");
			sqlinfo.append("`ID` int(11) NOT NULL AUTO_INCREMENT,");
			  sqlinfo.append("`SERVICE_ID` int(11) DEFAULT NULL,");
			  sqlinfo.append("`ORDER_ID` varchar(55) DEFAULT NULL,");
			  sqlinfo.append("`PRD_ID` int(11) DEFAULT NULL,");
			  sqlinfo.append("`SPU` int(11) DEFAULT NULL,");
			  sqlinfo.append("`SKU` int(11) DEFAULT NULL,");
			  sqlinfo.append("`PRD_NAME` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`PRD_TYPE` int(11) DEFAULT NULL,");
			  sqlinfo.append("`SKU_1_NAME` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`SKU_1_VALUE` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`SKU_2_NAME` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`SKU_2_VALUE` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`SKU_3_NAME` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`SKU_3_VALUE` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`UNIT` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`IMG_URL` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`BAR_CODE` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`CLASS_ID` int(11) DEFAULT NULL,");
			  sqlinfo.append("`PRICE_OLD` double(11,2) DEFAULT NULL,");
			  sqlinfo.append("`PRICE_NOW` double(11,2) DEFAULT NULL,");
			  sqlinfo.append("`PRICE_SUM` double(11,2) DEFAULT NULL,");
			  sqlinfo.append("`COUNT` double(11,2) DEFAULT NULL,");
			  sqlinfo.append("`REMARK` varchar(255) DEFAULT NULL,");
			  sqlinfo.append("`REPOS_ID` int(11) DEFAULT NULL,");
			  sqlinfo.append("`OUT_COUNT` int(11) DEFAULT NULL,");
			  sqlinfo.append("PRIMARY KEY (`ID`),");
			  sqlinfo.append("KEY `s` (`ID`) USING HASH,");
			  sqlinfo.append("KEY `DATETIME_PRD_INDEX` (`PRD_NAME`)");
			  sqlinfo.append(") ENGINE=InnoDB AUTO_INCREMENT=10817152 DEFAULT CHARSET=utf8;");
			  
			log.info("sqlinfo======"+sqlinfo.toString());
	        stmt.execute(sqlinfo.toString());
			
        }catch(Exception e){
        	log.error(e.toString());
        }finally{
			ConnectionHelper.close(rs);
            ConnectionHelper.close(stmt);
            ConnectionHelper.close(conn);
		}
		
	}

}
