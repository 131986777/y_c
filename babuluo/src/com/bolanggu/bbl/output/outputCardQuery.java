package com.bolanggu.bbl.output;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.common.util.DateUtil;
import com.pabula.common.util.StrUtil;
import com.pabula.db.ConnectionHelper;
import com.pabula.fw.exception.DataAccessException;
import com.pabula.fw.exception.RuleException;
import com.task.job.GroupBuyPlanStopTask;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by 95155 on 2016/12/12.
 */
public class outputCardQuery {

    private static outputCardQuery bean;
    
    private Logger log = LoggerFactory.getLogger(outputCardQuery.class);

    public static outputCardQuery newInstance() {
        if (null == bean) {
            synchronized (outputCardQuery.class) {
                if (null == bean) {
                    bean = new outputCardQuery();
                }
            }
        }
        return bean;
    }

    public SXSSFSheet GenerateExcelSheet(SXSSFWorkbook analyseBook, String parameter) throws RuleException,DataAccessException {

        JSONObject paramJson = JSON.parseObject(parameter);

        Map<String, Object> map = new HashMap<>();
        for (Map.Entry<String, Object> entry : paramJson.entrySet()) {
            map.put(entry.getKey(), entry.getValue());
        }
        
      //解析主要数据
        SXSSFSheet cardSheet = analyseBook.createSheet("会员卡表");
        cardSheet.setColumnWidth(0, 2500);
        cardSheet.setColumnWidth(1, 6000);
        cardSheet.setColumnWidth(2, 5000);
        cardSheet.setColumnWidth(3, 4000);
        cardSheet.setColumnWidth(4, 4000);
        cardSheet.setColumnWidth(5, 4000);
        cardSheet.setColumnWidth(6, 4000);
        cardSheet.setColumnWidth(7, 4000);
        cardSheet.setColumnWidth(8, 6000);
        cardSheet.setColumnWidth(9, 3000);
        
      //字体预设置
        XSSFFont font = (XSSFFont) analyseBook.createFont();
        font.setFontName("微软雅黑");
        font.setFontHeightInPoints((short) 14);

        XSSFFont font2 = (XSSFFont) analyseBook.createFont();
        font2.setFontName("微软雅黑");
        font2.setFontHeightInPoints((short) 12);

        XSSFFont font3 = (XSSFFont) analyseBook.createFont();
        font3.setFontName("微软雅黑");
        font3.setFontHeightInPoints((short) 11);

        XSSFFont font4 = (XSSFFont) analyseBook.createFont();
        font4.setFontName("微软雅黑");
        font4.setFontHeightInPoints((short) 11);
        font4.setColor(Font.COLOR_RED);


        //第二行样式
        CellStyle title2Style = analyseBook.createCellStyle();
        title2Style.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        title2Style.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
        title2Style.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
        title2Style.setFont(font2);

        //内容的样式
        CellStyle cellStyle = analyseBook.createCellStyle();
        cellStyle.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
        cellStyle.setFont(font3);

        //总计的样式
        CellStyle totalStyle = analyseBook.createCellStyle();
        totalStyle.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
        totalStyle.setFont(font4);


        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        int rowIndex = 0;//行数


        //表头开始

        SXSSFRow rowTitle = cardSheet.createRow(rowIndex++);
        rowTitle.setHeightInPoints(25);
        SXSSFCell cellNum = rowTitle.createCell(0);
        cellNum.setCellValue("序号");
        cellNum.setCellStyle(title2Style);
        SXSSFCell cellArea = rowTitle.createCell(1);
        cellArea.setCellValue("卡号");
        cellArea.setCellStyle(title2Style);
        SXSSFCell cellOrder = rowTitle.createCell(2);
        cellOrder.setCellValue("会员姓名");
        cellOrder.setCellStyle(title2Style);
        SXSSFCell cellReturn = rowTitle.createCell(3);
        cellReturn.setCellValue("手机号");
        cellReturn.setCellStyle(title2Style);
        SXSSFCell cellOrderPrice = rowTitle.createCell(4);
        cellOrderPrice.setCellValue("余额");
        cellOrderPrice.setCellStyle(title2Style);
        SXSSFCell cellCardNo = rowTitle.createCell(5);
        cellCardNo.setCellValue("会员卡来源");
        cellCardNo.setCellStyle(title2Style);
        SXSSFCell cellReturnPrice = rowTitle.createCell(6);
        cellReturnPrice.setCellValue("会员卡类型");
        cellReturnPrice.setCellStyle(title2Style);
        SXSSFCell operator = rowTitle.createCell(7);
        operator.setCellValue("开卡门店");
        operator.setCellStyle(title2Style);
        SXSSFCell type = rowTitle.createCell(8);
        type.setCellValue("开卡时间");
        type.setCellStyle(title2Style);
        SXSSFCell money = rowTitle.createCell(9);
        money.setCellValue("状态");
        money.setCellStyle(title2Style);
        
        Connection conn=null;
        Statement stmt=null;
        ResultSet rs=null;
        String sqlStr = "select a.CARD_NO as `MEMBER_CARD.CARD_NO`,"+
                "b.TRUE_NAME as `MEMBER_CARD.MEMBER_NAME`,"+
                "me.MOBILE as `MEMBER_CARD.MEMBER_PHONE`,"+
                "FORMAT(c.BALANCE/100,2) as `MEMBER_CARD.BALANCE`,"+
                "mcs.`NAME` as `MEMBER_CARD.SOURCE_NAME`,"+
                "e.`NAME` as `MEMBER_CARD.TYPE_NAME`,"+
                "d.SHOP_NAME as `MEMBER_CARD.SHOP`,"+
                "a.ADD_DATETIME as `MEMBER_CARD.ADD_DATETIME`,"+
                "a.STATE as `MEMBER_CARD.STATE` from member_card a "+
                "left join member_info b ON a.USER_ID = b.USER_ID "+
                "left join member_account c ON a.USER_ID = c.USER_ID "+
                "left join shop d ON a.SHOP_ID = d.SHOP_ID "+
                "left join member_card_type e ON a.TYPE_ID = e.ID "+
                "left join member me ON a.USER_ID=me.USER_ID "+
                "left join member_card_source mcs ON a.SOURCE_ID=mcs.ID where IS_DEL=-1";
        if(map.containsKey("MEMBER_CARD.SOURCE_ID") && !"null".equals(map.get("MEMBER_CARD.SOURCE_ID"))){
        	sqlStr += " and a.SOURCE_ID="+map.get("MEMBER_CARD.SOURCE_ID");
        }
        if(map.containsKey("MEMBER_CARD.TYPE_ID") && !"null".equals(map.get("MEMBER_CARD.TYPE_ID"))){
        	sqlStr += " and a.TYPE_ID="+map.get("MEMBER_CARD.TYPE_ID");
        }
        if(map.containsKey("MEMBER_CARD.SHOP_ID") && !"null".equals(map.get("MEMBER_CARD.SHOP_ID"))){
        	sqlStr += " and a.SHOP_ID=" + map.get("MEMBER_CARD.SHOP_ID");
        }
        if(map.containsKey("MEMBER_CARD.USER_ID") && !"null".equals(map.get("MEMBER_CARD.USER_ID"))){
        	sqlStr += " and a.USER_ID=" + map.get("MEMBER_CARD.USER_ID");
        }
        if(map.containsKey("MEMBER_CARD.CARD_NO") && !"null".equals(map.get("MEMBER_CARD.CARD_NO"))){
        	sqlStr += " and a.CARD_NO like '%" + map.get("MEMBER_CARD.USER_ID")+"%'";
        }
        if(map.containsKey("MEMBER_CARD.STATE") && !"null".equals(map.get("MEMBER_CARD.STATE"))){
        	sqlStr += " and a.STATE in ("+map.get("MEMBER_CARD.STATE") + ")";
        }
        if(map.containsKey("MEMBER_CARD.ADD_DATETIME_FROM") && !"null".equals(map.get("MEMBER_CARD.ADD_DATETIME_FROM"))){
        	sqlStr += " and TO_DAYS(a.ADD_DATETIME) > TO_DAYS('" + map.get("MEMBER_CARD.ADD_DATETIME_FROM") + "')";
        }
        if(map.containsKey("MEMBER_CARD.ADD_DATETIME_TO") && !"null".equals(map.get("MEMBER_CARD.ADD_DATETIME_TO"))){
        	sqlStr += " and TO_DAYS(a.ADD_DATETIME) > TO_DAYS('" + map.get("MEMBER_CARD.ADD_DATETIME_TO") + "')";
        }
        if(map.containsKey("MEMBER_CARD.ADD_DATETIME") && !"null".equals(map.get("MEMBER_CARD.ADD_DATETIME"))){
        	sqlStr += " order by a."+map.get("MEMBER_CARD.ADD_DATETIME");
        }
        
        try{
        	log.info("sql==========="+sqlStr);
        	conn=ConnectionHelper.getConnection("andsell_read");
            stmt=conn.createStatement();
            rs=stmt.executeQuery(sqlStr);
            int serial_num = 1;
            String state = "";
            while(rs.next()){
                // 遍历每一行

                if (rs.getInt("MEMBER_CARD.STATE") == 1) {
                    state = "正常";
                } else {
                    state = "冻结";
                }

                String cardNo = rs.getString("MEMBER_CARD.CARD_NO");
                if (cardNo.length()==12||cardNo.length()==14){
                    cardNo = cardNo.substring(0,cardNo.length()-4);
                }

                SXSSFRow row = cardSheet.createRow(rowIndex++);
                row.setHeightInPoints(25);
                SXSSFCell cell0 = row.createCell(0);
                cell0.setCellValue(serial_num++);
                cell0.setCellStyle(cellStyle);
                SXSSFCell cell1 = row.createCell(1);
                cell1.setCellValue(cardNo);
                cell1.setCellStyle(cellStyle);
                SXSSFCell cell2 = row.createCell(2);
                cell2.setCellValue(StrUtil.getNotNullStringValue(rs.getString("MEMBER_CARD.MEMBER_NAME")));
                cell2.setCellStyle(cellStyle);
                SXSSFCell cell3 = row.createCell(3);
                cell3.setCellValue(rs.getString("MEMBER_CARD.MEMBER_PHONE"));
                cell3.setCellStyle(cellStyle);
                SXSSFCell cell4 = row.createCell(4);
                cell4.setCellValue("￥" + rs.getString("MEMBER_CARD.BALANCE"));
                cell4.setCellStyle(cellStyle);
                SXSSFCell cell5 = row.createCell(5);
                cell5.setCellValue(rs.getString("MEMBER_CARD.SOURCE_NAME"));
                cell5.setCellStyle(cellStyle);
                SXSSFCell cell6 = row.createCell(6);
                cell6.setCellValue(rs.getString("MEMBER_CARD.TYPE_NAME"));
                cell6.setCellStyle(cellStyle);
                SXSSFCell cell7 = row.createCell(7);
                cell7.setCellValue(StrUtil.getNotNullStringValue(rs.getString("MEMBER_CARD.SHOP"), ""));
                cell7.setCellStyle(cellStyle);
                SXSSFCell cell8 = row.createCell(8);
                cell8.setCellValue(rs.getString("MEMBER_CARD.ADD_DATETIME").replace(".0",""));
                cell8.setCellStyle(cellStyle);
                SXSSFCell cell9 = row.createCell(9);
                cell9.setCellValue(state);
                cell9.setCellStyle(cellStyle);
            }
        }catch(SQLException e){
        	e.printStackTrace();
            throw new DataAccessException("[CommonDAO select 执行失败]", e);
        }finally{
        	 ConnectionHelper.close(rs);
             ConnectionHelper.close(stmt);
             ConnectionHelper.close(conn);
        }
        
        
      //总计结束
        return cardSheet;
    }

}
