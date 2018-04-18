package com.bolanggu.bbl.output;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.pabula.common.util.StrUtil;
import com.pabula.db.ConnectionHelper;
import com.pabula.fw.exception.DataAccessException;
import com.pabula.fw.exception.RuleException;

public enum outputListQuery {

	INSTANCE;
	
	public SXSSFSheet GenerateExcelSheet(SXSSFWorkbook analyseBook, String parameter,String type) throws RuleException,DataAccessException {
		
		String sqlStr = GetSQL.INSTANCE.getSql(type, parameter);
		
		if("".equals(sqlStr)){
			return null;
		}

        JSONObject paramJson = JSON.parseObject(parameter);
        Map<String, Object> map = new HashMap<>();
        for (Map.Entry<String, Object> entry : paramJson.entrySet()) {
            map.put(entry.getKey(), entry.getValue());
        }
        
      //解析主要数据
        SXSSFSheet sheet = analyseBook.createSheet(map.get("SHEET_NAME").toString());
        List list = (List)map.get("COLUMN_WIDTH");
        for(int i=0;i<list.size();i++){
        	sheet.setColumnWidth(i, Integer.parseInt(list.get(i).toString()));
        }
        
        
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

        int rowIndex = 0;//行数


        //表头开始

        SXSSFRow rowTitle = sheet.createRow(rowIndex++);
        rowTitle.setHeightInPoints(25);
        
        /*List columnName = (List)map.get("TITLE");
        for(int i=0;i<columnName.size();i++){
        	SXSSFCell cellNum = rowTitle.createCell(i);
            cellNum.setCellValue(columnName.get(i).toString());
            cellNum.setCellStyle(title2Style);
        }*/
       
        Connection conn=null;
        Statement stmt=null;
        ResultSet rs=null;
        
        try{
        	conn=ConnectionHelper.getConnection("andsell_read");
            stmt=conn.createStatement();
            rs=stmt.executeQuery(sqlStr);
            int columnCount = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columnCount;i++){
            	SXSSFCell cellNum = rowTitle.createCell(i-1);
                cellNum.setCellValue(rs.getMetaData().getColumnName(i));
                cellNum.setCellStyle(title2Style);
            }
            while(rs.next()){
                // 遍历每一行
                SXSSFRow row = sheet.createRow(rowIndex++);
                for(int i=1;i<=columnCount;i++){
                	SXSSFCell cell = row.createCell(i-1);
                	cell.setCellValue(StrUtil.getNotNullStringValue(rs.getString(i),""));
                	cell.setCellStyle(cellStyle);
                }
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
        return sheet;
    }
}
