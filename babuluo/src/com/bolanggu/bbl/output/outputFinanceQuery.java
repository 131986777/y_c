package com.bolanggu.bbl.output;

import com.pabula.common.util.DateUtil;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.util.CellRangeAddress;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

/**
 * Created by 95155 on 2016/12/12.
 */
public class outputFinanceQuery {

    private static outputFinanceQuery bean;

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

    public HSSFSheet GenerateExcelSheet(HSSFWorkbook analyseBook, String outputDetail) {


        //解析主要数据
        JSONArray jsonArray = new JSONArray(outputDetail);

        HSSFSheet financeSheet = analyseBook.createSheet("资金明细表");
        financeSheet.setColumnWidth(0, 2500);
        financeSheet.setColumnWidth(1, 6000);
        financeSheet.setColumnWidth(2, 4000);
        financeSheet.setColumnWidth(3, 4000);
        financeSheet.setColumnWidth(4, 5000);
        financeSheet.setColumnWidth(5, 4000);
        financeSheet.setColumnWidth(6, 4000);
        financeSheet.setColumnWidth(7, 2500);
        financeSheet.setColumnWidth(8, 4000);
        financeSheet.setColumnWidth(9, 5000);
        financeSheet.autoSizeColumn(1, true);

        //字体预设置
        HSSFFont font = analyseBook.createFont();
        font.setFontName("微软雅黑");
        font.setFontHeightInPoints((short) 14);

        HSSFFont font2 = analyseBook.createFont();
        font2.setFontName("微软雅黑");
        font2.setFontHeightInPoints((short) 12);

        HSSFFont font3 = analyseBook.createFont();
        font3.setFontName("微软雅黑");
        font3.setFontHeightInPoints((short) 11);

        HSSFFont font4 = analyseBook.createFont();
        font4.setFontName("微软雅黑");
        font4.setFontHeightInPoints((short) 11);
        font4.setColor(Font.COLOR_RED);
        //合并大标题的单元格
        financeSheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 9));

        //大标题样式
        HSSFCellStyle titleStyle = analyseBook.createCellStyle();

        titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        titleStyle.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);
        titleStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        titleStyle.setFont(font);

        //第二行样式
        HSSFCellStyle title2Style = analyseBook.createCellStyle();
        title2Style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        title2Style.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
        title2Style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        title2Style.setFont(font2);

        //内容的样式
        HSSFCellStyle cellStyle = analyseBook.createCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
        cellStyle.setFont(font3);

        //总计的样式
        HSSFCellStyle totalStyle = analyseBook.createCellStyle();
        totalStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
        totalStyle.setFont(font4);


        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        NumberFormat NumFormat = NumberFormat.getCurrencyInstance(Locale.CHINA);

        int rowIndex = 0;//行数
        //地区分析开始
        HSSFRow analyseTitle = financeSheet.createRow(rowIndex++);
        analyseTitle.setHeightInPoints(25);
        Cell cellTitle1 = analyseTitle.createCell(0);
        cellTitle1.setCellStyle(titleStyle);
        cellTitle1.setCellValue("资金明细记录");

        HSSFRow rowTitle = financeSheet.createRow(rowIndex++);
        rowTitle.setHeightInPoints(25);
        Cell cellNum = rowTitle.createCell(0);
        cellNum.setCellValue("序号");
        cellNum.setCellStyle(title2Style);
        Cell cellArea = rowTitle.createCell(1);
        cellArea.setCellValue("时间");
        cellArea.setCellStyle(title2Style);
        Cell cellOrder = rowTitle.createCell(2);
        cellOrder.setCellValue("手机号");
        cellOrder.setCellStyle(title2Style);
        Cell cellReturn = rowTitle.createCell(3);
        cellReturn.setCellValue("变更事件");
        cellReturn.setCellStyle(title2Style);
        Cell cellOrderPrice = rowTitle.createCell(4);
        cellOrderPrice.setCellValue("变更卡号");
        cellOrderPrice.setCellStyle(title2Style);
        Cell cellReturnPrice = rowTitle.createCell(5);
        cellReturnPrice.setCellValue("操作门店");
        cellReturnPrice.setCellStyle(title2Style);
        Cell operator = rowTitle.createCell(6);
        operator.setCellValue("操作员");
        operator.setCellStyle(title2Style);
        Cell type = rowTitle.createCell(7);
        type.setCellValue("变更类型");
        type.setCellStyle(title2Style);
        Cell money = rowTitle.createCell(8);
        money.setCellValue("变更金额");
        money.setCellStyle(title2Style);
        Cell balance = rowTitle.createCell(9);
        balance.setCellValue("账户余额");
        balance.setCellStyle(title2Style);
        int analyseIndex = 1;//序号

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = (JSONObject) jsonArray.get(i);

            String changeType = "increase".equals(jsonObject.getString("FINANCE_LIST.CHANGE_TYPE")) ? "收入" : "支出";

            HSSFRow row = financeSheet.createRow(rowIndex++);
            row.setHeightInPoints(25);
            Cell cell0 = row.createCell(0);
            cell0.setCellValue(analyseIndex++);
            cell0.setCellStyle(cellStyle);
            Cell cell1 = row.createCell(1);
            cell1.setCellValue(jsonObject.getString("FINANCE_LIST.ADD_DATETIME"));
            cell1.setCellStyle(cellStyle);
            Cell cell2 = row.createCell(2);
            cell2.setCellValue(jsonObject.getString("FINANCE_LIST.LOGIN_ID"));
            cell2.setCellStyle(cellStyle);
            Cell cell3 = row.createCell(3);
            cell3.setCellValue(jsonObject.getString("FINANCE_LIST.EVENT"));
            cell3.setCellStyle(cellStyle);
            Cell cell4 = row.createCell(4);
            cell4.setCellValue(jsonObject.getString("FINANCE_LIST.EVENT_CARD_NO"));
            cell4.setCellStyle(cellStyle);
            Cell cell5 = row.createCell(5);
            cell5.setCellValue(jsonObject.getString("FINANCE_LIST.SHOP"));
            cell5.setCellStyle(cellStyle);
            Cell cell6 = row.createCell(6);
            cell6.setCellValue(jsonObject.getString("FINANCE_LIST.OPER_USER_ID"));
            cell6.setCellStyle(cellStyle);
            Cell cell7 = row.createCell(8);
            cell7.setCellValue(changeType);
            cell7.setCellStyle(cellStyle);
            Cell cell8 = row.createCell(8);
            cell8.setCellValue(NumFormat.format(jsonObject.getDouble("FINANCE_LIST.CHANGE_VALUE")));
            cell8.setCellStyle(cellStyle);
            Cell cell9 = row.createCell(9);
            cell9.setCellValue(NumFormat.format(jsonObject.getDouble("FINANCE_LIST.BALANCE")));
            cell9.setCellStyle(cellStyle);
        }

        HSSFRow rowM = financeSheet.createRow(rowIndex);
        rowM.setHeightInPoints(25);
        Cell cellMan = rowM.createCell(0);
        cellMan.setCellValue("操作人：");
        cellMan.setCellStyle(cellStyle);
        Cell cellManValue = rowM.createCell(1);
        cellManValue.setCellValue("");
        cellManValue.setCellStyle(cellStyle);
        rowM.createCell(2).setCellValue("");
        rowM.createCell(3).setCellValue("");
        rowM.createCell(4).setCellValue("");
        rowM.createCell(5).setCellValue("");
        rowM.createCell(6).setCellValue("");
        rowM.createCell(7).setCellValue("");
        Cell cellTime = rowM.createCell(8);
        cellTime.setCellValue("导出时间：");
        cellTime.setCellStyle(cellStyle);
        Cell cellTimeValue = rowM.createCell(9);
        cellTimeValue.setCellValue(dateFormat.format(DateUtil.getCurrTime()));
        cellTimeValue.setCellStyle(cellStyle);

        //总计结束
        return financeSheet;

    }

}
