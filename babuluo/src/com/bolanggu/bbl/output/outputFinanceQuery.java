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
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Created by 95155 on 2016/12/12.
 */
public class outputFinanceQuery {

    private static outputFinanceQuery bean;
    
    private Logger log = LoggerFactory.getLogger(outputCardQuery.class);


    public static outputFinanceQuery newInstance() {
        if (null == bean) {
            synchronized (outputFinanceQuery.class) {
                if (null == bean) {
                    bean = new outputFinanceQuery();
                }
            }
        }
        return bean;
    }

    public SXSSFSheet GenerateExcelSheet(SXSSFWorkbook analyseBook, String parameter)
        throws RuleException, DataAccessException {

        JSONObject paramJson = JSON.parseObject(parameter);

        Map<String, Object> map = new HashMap<>();
        for (Map.Entry<String, Object> entry : paramJson.entrySet()) {
            map.put(entry.getKey(), entry.getValue());
        }

        /*ReturnData outputDetail = new API().call("/member/balance/getAllBalanceList", map);
        //解析主要数据
        JSONArray jsonArray = JSONArray.parseArray(outputDetail.getData().toString());*/

        SXSSFSheet financeSheet = analyseBook.createSheet("资金明细表");
        financeSheet.setColumnWidth(0, 2000);
        financeSheet.setColumnWidth(1, 6000);
        financeSheet.setColumnWidth(2, 3000);
        financeSheet.setColumnWidth(3, 4000);
        financeSheet.setColumnWidth(4, 3000);
        financeSheet.setColumnWidth(5, 4000);
        financeSheet.setColumnWidth(6, 4000);
        financeSheet.setColumnWidth(7, 4000);
        financeSheet.setColumnWidth(8, 4000);
        financeSheet.setColumnWidth(9, 4000);
        financeSheet.setColumnWidth(10, 4000);
        financeSheet.setColumnWidth(11, 4000);
        financeSheet.setColumnWidth(12, 3000);
        financeSheet.setColumnWidth(13, 4000);
        financeSheet.setColumnWidth(14, 4000);
        financeSheet.setColumnWidth(15, 4000);
        financeSheet.setColumnWidth(16, 5000);
        financeSheet.setColumnWidth(17, 5000);

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
        font4.setColor(XSSFFont.COLOR_RED);


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
        NumberFormat NumFormat = NumberFormat.getCurrencyInstance(Locale.CHINA);

        int rowIndex = 0;//行数
        //地区分析开始

        SXSSFRow rowTitle = financeSheet.createRow(rowIndex++);
        rowTitle.setHeightInPoints(25);
        SXSSFCell cellNum = rowTitle.createCell(0);
        cellNum.setCellValue("序号");
        cellNum.setCellStyle(title2Style);
        SXSSFCell cellArea = rowTitle.createCell(1);
        cellArea.setCellValue("时间");
        cellArea.setCellStyle(title2Style);
        SXSSFCell cellName = rowTitle.createCell(2);
        cellName.setCellValue("客户姓名");
        cellName.setCellStyle(title2Style);
        SXSSFCell cellPhone = rowTitle.createCell(3);
        cellPhone.setCellValue("手机号");
        cellPhone.setCellStyle(title2Style);
        SXSSFCell cellSource = rowTitle.createCell(4);
        cellSource.setCellValue("订单号");
        cellSource.setCellStyle(title2Style);
        SXSSFCell cellReturn = rowTitle.createCell(5);
        cellReturn.setCellValue("变更事件");
        cellReturn.setCellStyle(title2Style);
        SXSSFCell cellOrderPrice = rowTitle.createCell(6);
        cellOrderPrice.setCellValue("交易卡号");
        cellOrderPrice.setCellStyle(title2Style);
        SXSSFCell cellBalBe = rowTitle.createCell(7);
        cellBalBe.setCellValue("交易前余额");
        cellBalBe.setCellStyle(title2Style);
        SXSSFCell cellBalAf = rowTitle.createCell(8);
        cellBalAf.setCellValue("交易后余额");
        cellBalAf.setCellStyle(title2Style);
        SXSSFCell cellCardType = rowTitle.createCell(9);
        cellCardType.setCellValue("交易卡类别");
        cellCardType.setCellStyle(title2Style);
        SXSSFCell cellCardShop = rowTitle.createCell(10);
        cellCardShop.setCellValue("交易卡开卡门店");
        cellCardShop.setCellStyle(title2Style);
        SXSSFCell cellReturnPrice = rowTitle.createCell(11);
        cellReturnPrice.setCellValue("交易操作门店");
        cellReturnPrice.setCellStyle(title2Style);
        SXSSFCell operator = rowTitle.createCell(12);
        operator.setCellValue("操作员");
        operator.setCellStyle(title2Style);
        SXSSFCell type = rowTitle.createCell(13);
        type.setCellValue("变更类型");
        type.setCellStyle(title2Style);
        SXSSFCell money = rowTitle.createCell(14);
        money.setCellValue("变更金额");
        money.setCellStyle(title2Style);
        SXSSFCell moneyaccount = rowTitle.createCell(15);
        moneyaccount.setCellValue("充值账户变更金额");
        moneyaccount.setCellStyle(title2Style);
        SXSSFCell moneygift = rowTitle.createCell(16);
        moneygift.setCellValue("赠送账户变更金额");
        moneygift.setCellStyle(title2Style);
        SXSSFCell balance = rowTitle.createCell(17);
        balance.setCellValue("账户余额");
        balance.setCellStyle(title2Style);
        SXSSFCell intro = rowTitle.createCell(18);
        intro.setCellValue("变更说明");
        intro.setCellStyle(title2Style);
        int analyseIndex = 1;//序号
        
        /**
         * 获取相关数据
         */
        Connection conn=null;
        Statement stmt=null;
        ResultSet rs=null;
        String sqlStr = "SELECT a.ADD_DATETIME AS `FINANCE_LIST.ADD_DATETIME`,"
			+" c.TRUE_NAME AS `FINANCE_LIST.TRUE_NAME`,"
			+" b.MOBILE AS `FINANCE_LIST.MEMBER_MOBILE`,"
			+" a.EVENT_SOURCE_ID AS `FINANCE_LIST.EVENT_SOURCE_ID`,"
			+" a.`EVENT` AS `FINANCE_LIST.EVENT`,"
			+" a.EVENT_CARD_NO AS `FINANCE_LIST.EVENT_CARD_NO`,"
			+" CASE WHEN a.CHANGE_TYPE='decrease' THEN FORMAT((a.EVENT_CARD_BALANCE+a.CHANGE_VALUE)/100,2) WHEN"
			+" a.CHANGE_TYPE='increase' THEN FORMAT((a.EVENT_CARD_BALANCE-a.CHANGE_VALUE)/100,2) END AS `FINANCE_LIST.BEFORE_CARD_BALANCE`,"
			+" FORMAT(a.EVENT_CARD_BALANCE/100,2) AS `FINANCE_LIST.EVENT_CARD_BALANCE`,"
			+" a.CHANGE_VALUE/100 AS `FINANCE_LIST.CHANGE_VALUE`,"
			+" a.CHANGE_TYPE AS `FINANCE_LIST.CHANGE_TYPE`,"
			+" FORMAT(a.BALANCE/100,2) AS `FINANCE_LIST.BALANCE`,"
			+" f.`NAME` AS `FINANCE_LIST.EVENT_CARD_TYPE`,"
			+" d.SHOP_NAME AS `FINANCE_LIST.SHOP`,"
			+" g.SHOP_NAME AS `FINANCE_LIST.CARD_SHOP`,"
			+" a.OPER_USER_ID AS `FINANCE_LIST.OPER_USER_ID`,"
			+" a.EVENT_INTRO AS `FINANCE_LIST.EVENT_INTRO`,"
			+" a.CHANGE_ACCOUNT_VALUE/100 AS `FINANCE_LIST.CHANGE_ACCOUNT_VALUE`,"
			+" a.CHANGE_GIFT_VALUE/100 AS `FINANCE_LIST.CHANGE_GIFT_VALUE`"
			+" FROM finance_list a "
			+" LEFT JOIN member b ON a.USER_ID=b.USER_ID"
			+" LEFT JOIN member_info c ON a.USER_ID=c.USER_ID "
			+" LEFT JOIN shop d ON a.SHOP_ID=d.SHOP_ID "
			+" LEFT JOIN member_card e ON a.EVENT_CARD_NO=e.CARD_NO "
			+" LEFT JOIN member_card_type f ON e.TYPE_ID=f.ID "
			+" LEFT JOIN (SELECT CARD_NO,h.SHOP_ID,SHOP_NAME FROM member_card h LEFT JOIN shop j ON h.SHOP_ID= j.SHOP_ID) g ON a.EVENT_CARD_NO=g.CARD_NO WHERE 1=1";
		if(map.containsKey("FINANCE_LIST.CHANGE_TYPE") && !"null".equals(map.get("FINANCE_LIST.CHANGE_TYPE"))){
			sqlStr +=" AND a.CHANGE_TYPE='"+ map.get("FINANCE_LIST.CHANGE_TYPE")+"'";
		}	        
		if(map.containsKey("FINANCE_LIST.USER_ID") && !"null".equals(map.get("FINANCE_LIST.USER_ID"))){
			sqlStr +=" AND a.USER_ID="+ map.get("FINANCE_LIST.USER_ID");
		}	        
		if(map.containsKey("FINANCE_LIST.CHANGE_VALUE") && !"null".equals(map.get("FINANCE_LIST.CHANGE_VALUE"))){
			sqlStr +=" AND a.CHANGE_VALUE="+ map.get("FINANCE_LIST.CHANGE_VALUE");
		}	        
		if(map.containsKey("FINANCE_LIST.EVENT_CARD_NO") && !"null".equals(map.get("FINANCE_LIST.EVENT_CARD_NO"))){
			sqlStr +=" AND a.EVENT_CARD_NO like '%"+ map.get("FINANCE_LIST.EVENT_CARD_NO") +"%'";
		}	        
		if(map.containsKey("FINANCE_LIST.EVENT_SOURCE_ID") && !"null".equals(map.get("FINANCE_LIST.EVENT_SOURCE_ID"))){
			sqlStr +=" AND a.EVENT_SOURCE_ID like '%"+ map.get("FINANCE_LIST.EVENT_SOURCE_ID") +"%'";
		}	        
		if(map.containsKey("FINANCE_LIST.SHOP_ID") && !"null".equals(map.get("FINANCE_LIST.SHOP_ID"))){
			sqlStr +=" AND a.SHOP_ID="+ map.get("FINANCE_LIST.SHOP_ID");
		}	        
		if(map.containsKey("FINANCE_LIST.EVENT") && !"null".equals(map.get("FINANCE_LIST.EVENT"))){
			sqlStr +=" AND a.EVENT in ('"+ map.get("FINANCE_LIST.EVENT") + "')";
		}	        
		if(map.containsKey("FINANCE_LIST.ADD_DATETIME_FROM") && !"null".equals(map.get("FINANCE_LIST.ADD_DATETIME_FROM"))){
			sqlStr +=" AND a.ADD_DATETIME >='"+ map.get("FINANCE_LIST.ADD_DATETIME_FROM") + "'";
		}	        
		if(map.containsKey("FINANCE_LIST.ADD_DATETIME_TO") && !"null".equals(map.get("FINANCE_LIST.ADD_DATETIME_TO"))){
			sqlStr +=" AND a.ADD_DATETIME <='"+ map.get("FINANCE_LIST.ADD_DATETIME_TO") + "'";
		}	        
		if(map.containsKey("FINANCE_LIST.MONEY_FROM") && !"null".equals(map.get("FINANCE_LIST.MONEY_FROM"))){
			sqlStr +=" AND a.CHANGE_VALUE >="+ Integer.parseInt(map.get("FINANCE_LIST.MONEY_FROM").toString())*100;
		}	        
		if(map.containsKey("FINANCE_LIST.MONEY_TO") && !"null".equals(map.get("FINANCE_LIST.MONEY_TO"))){
			sqlStr +=" AND a.CHANGE_VALUE <="+ Integer.parseInt(map.get("FINANCE_LIST.MONEY_TO").toString())*100;
		}
		
		sqlStr += " order by a.ADD_DATETIME desc";
		
		log.info("sql==========="+sqlStr);
		String changeType="";
		try{
			conn=ConnectionHelper.getConnection("andsell_read");
            stmt=conn.createStatement();
            rs=stmt.executeQuery(sqlStr);
            while(rs.next()){
            	if ("increase".equals(rs.getString("FINANCE_LIST.CHANGE_TYPE"))) {
                    changeType = "收入";
                } else {
                    changeType = "支出";
                }

                String cardBalance = StrUtil.getNotNullStringValue(
                rs.getString("FINANCE_LIST.EVENT_CARD_BALANCE"), "");
                String cardBalanceBefore = "";
                if (!"".equals(cardBalance)) {
                    cardBalance = "￥" + cardBalance;
                    cardBalanceBefore = StrUtil.getNotNullStringValue(
                        rs.getString("FINANCE_LIST.BEFORE_CARD_BALANCE"), "");
                    cardBalanceBefore = "￥" + cardBalanceBefore;
                }

                String Balance =
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.BALANCE"));
                if (!"".equals(Balance)) {
                    Balance = "￥" + Balance;
                }

                String cardNo =
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.EVENT_CARD_NO"),
                        "");
                System.out.println(" cardNo  :  " + cardNo);
                if (cardNo.length() == 12 || cardNo.length() == 14) {
                    cardNo = cardNo.substring(0, cardNo.length() - 4);
                }
                System.out.println(" cardNo  end  :  " + cardNo);
                SXSSFRow row = financeSheet.createRow(rowIndex++);
                row.setHeightInPoints(25);
                SXSSFCell cell0 = row.createCell(0);
                cell0.setCellValue(analyseIndex++);
                cell0.setCellStyle(cellStyle);
                SXSSFCell cell1 = row.createCell(1);
                cell1.setCellValue(rs.getString("FINANCE_LIST.ADD_DATETIME").replace(".0", ""));
                cell1.setCellStyle(cellStyle);
                SXSSFCell cell2 = row.createCell(2);
                cell2.setCellValue(
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.TRUE_NAME"), ""));
                cell2.setCellStyle(cellStyle);
                SXSSFCell cell3 = row.createCell(3);
                cell3.setCellValue(rs.getString("FINANCE_LIST.MEMBER_MOBILE"));
                cell3.setCellStyle(cellStyle);
                SXSSFCell cellsouce = row.createCell(4);
                cellsouce.setCellValue(rs.getString("FINANCE_LIST.EVENT_SOURCE_ID"));
                cellsouce.setCellStyle(cellStyle);
                SXSSFCell cell4 = row.createCell(5);
                cell4.setCellValue(rs.getString("FINANCE_LIST.EVENT"));
                cell4.setCellStyle(cellStyle);
                SXSSFCell cell5 = row.createCell(6);
                cell5.setCellValue(cardNo);
                cell5.setCellStyle(cellStyle);
                SXSSFCell cell6 = row.createCell(7);
                cell6.setCellValue(cardBalanceBefore);
                cell6.setCellStyle(cellStyle);
                SXSSFCell cell7 = row.createCell(8);
                cell7.setCellValue(cardBalance);
                cell7.setCellStyle(cellStyle);
                SXSSFCell cell8 = row.createCell(9);
                cell8.setCellValue(
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.EVENT_CARD_TYPE"),
                        ""));
                cell8.setCellStyle(cellStyle);
                SXSSFCell cell9 = row.createCell(10);
                cell9.setCellValue(
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.CARD_SHOP"), ""));
                cell9.setCellStyle(cellStyle);
                SXSSFCell cell10 = row.createCell(11);
                cell10.setCellValue(
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.SHOP"), ""));
                cell10.setCellStyle(cellStyle);
                SXSSFCell cell11 = row.createCell(12);
                cell11.setCellValue(
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.OPER_USER_ID"),
                        ""));
                cell11.setCellStyle(cellStyle);
                SXSSFCell cell12 = row.createCell(13);
                cell12.setCellValue(changeType);
                cell12.setCellStyle(cellStyle);
                SXSSFCell cell13 = row.createCell(14);
                cell13.setCellValue(
                    NumFormat.format(rs.getDouble("FINANCE_LIST.CHANGE_VALUE")));
                cell13.setCellStyle(cellStyle);
                SXSSFCell cell16 = row.createCell(15);
                cell16.setCellValue(
                		NumFormat.format(rs.getDouble("FINANCE_LIST.CHANGE_ACCOUNT_VALUE")));

                cell16.setCellStyle(cellStyle);
                SXSSFCell cell17 = row.createCell(16);
                cell17.setCellValue(
                		NumFormat.format(rs.getDouble("FINANCE_LIST.CHANGE_GIFT_VALUE")));

                cell17.setCellStyle(cellStyle);
                SXSSFCell cell14 = row.createCell(17);
                cell14.setCellValue(Balance);
                cell14.setCellStyle(cellStyle);
                SXSSFCell cell15 = row.createCell(18);
                cell15.setCellValue(
                    StrUtil.getNotNullStringValue(rs.getString("FINANCE_LIST.EVENT_INTRO"),""));
                cell15.setCellStyle(cellStyle);
            }
		}catch(SQLException e){
			throw new DataAccessException("[CommonDAO select 执行失败]", e);
		}finally{
			ConnectionHelper.close(rs);
            ConnectionHelper.close(stmt);
            ConnectionHelper.close(conn);
		}


        return financeSheet;
    }
}
