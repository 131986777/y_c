package com.bolanggu.bbl.output;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.common.util.DateUtil;
import com.pabula.common.util.StrUtil;
import com.pabula.fw.exception.RuleException;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.*;

import java.awt.*;
import java.awt.Color;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by 95155 on 2016/12/12.
 */
public class outputMemberQuery {

    private static outputMemberQuery bean;

    public static outputMemberQuery newInstance() {
        if (null == bean) {
            synchronized (outputMemberQuery.class) {
                if (null == bean) {
                    bean = new outputMemberQuery();
                }
            }
        }
        return bean;
    }

    public SXSSFSheet GenerateExcelSheet(SXSSFWorkbook analyseBook, String parameter) throws RuleException {

        JSONObject paramJson = JSON.parseObject(parameter);

        Map<String, Object> map = new HashMap<>();
        for (Map.Entry<String, Object> entry : paramJson.entrySet()) {
            map.put(entry.getKey(), entry.getValue());
        }

        ReturnData outputDetail = new API().call("/member/member/queryAll", map);
        //解析主要数据
        JSONArray jsonArray = JSONArray.parseArray(outputDetail.getData().toString());

        SXSSFSheet cardSheet = analyseBook.createSheet("会员表");
        cardSheet.setColumnWidth(0, 2500);
        cardSheet.setColumnWidth(1, 6000);
        cardSheet.setColumnWidth(2, 5000);
        cardSheet.setColumnWidth(3, 4000);
        cardSheet.setColumnWidth(4, 4000);
        cardSheet.setColumnWidth(5, 4000);
        cardSheet.setColumnWidth(6, 4000);
        cardSheet.setColumnWidth(7, 4000);
        cardSheet.setColumnWidth(8, 4000);
        cardSheet.setColumnWidth(9, 6000);

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
        //合并大标题的单元格
        cardSheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 9));

        //大标题样式
        CellStyle titleStyle = analyseBook.createCellStyle();

        titleStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
        titleStyle.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);
        titleStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
        titleStyle.setFont(font);

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
        //地区分析开始
        SXSSFRow analyseTitle = cardSheet.createRow(rowIndex++);
        analyseTitle.setHeightInPoints(25);
        SXSSFCell cellTitle1 = analyseTitle.createCell(0);
        cellTitle1.setCellStyle(titleStyle);
        cellTitle1.setCellValue("资金明细记录");

        SXSSFRow rowTitle = cardSheet.createRow(rowIndex++);
        rowTitle.setHeightInPoints(25);
        SXSSFCell cellNum = rowTitle.createCell(0);
        cellNum.setCellValue("序号");
        cellNum.setCellStyle(title2Style);
        SXSSFCell cellArea = rowTitle.createCell(1);
        cellArea.setCellValue("登陆账号");
        cellArea.setCellStyle(title2Style);
        SXSSFCell cellOrder = rowTitle.createCell(2);
        cellOrder.setCellValue("会员姓名");
        cellOrder.setCellStyle(title2Style);
        SXSSFCell cellReturn = rowTitle.createCell(3);
        cellReturn.setCellValue("手机号");
        cellReturn.setCellStyle(title2Style);
        SXSSFCell cellOrderPrice = rowTitle.createCell(4);
        cellOrderPrice.setCellValue("来源");
        cellOrderPrice.setCellStyle(title2Style);
        SXSSFCell shop = rowTitle.createCell(5);
        shop.setCellValue("所属门店");
        shop.setCellStyle(title2Style);
        SXSSFCell cellCardNo = rowTitle.createCell(6);
        cellCardNo.setCellValue("身份证");
        cellCardNo.setCellStyle(title2Style);
        SXSSFCell cellReturnPrice = rowTitle.createCell(7);
        cellReturnPrice.setCellValue("生日");
        cellReturnPrice.setCellStyle(title2Style);
        SXSSFCell operator = rowTitle.createCell(8);
        operator.setCellValue("性别");
        operator.setCellStyle(title2Style);
        SXSSFCell type = rowTitle.createCell(9);
        type.setCellValue("推荐人");
        type.setCellStyle(title2Style);
        SXSSFCell money = rowTitle.createCell(10);
        money.setCellValue("注册时间");
        money.setCellStyle(title2Style);
        int analyseIndex = 1;//序号

        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);

            SXSSFRow row = cardSheet.createRow(rowIndex++);
            row.setHeightInPoints(25);
            SXSSFCell cell0 = row.createCell(0);
            cell0.setCellValue(analyseIndex++);
            cell0.setCellStyle(cellStyle);
            SXSSFCell cell1 = row.createCell(1);
            cell1.setCellValue(jsonObject.getString("MEMBER.LOGIN_ID"));
            cell1.setCellStyle(cellStyle);
            SXSSFCell cell2 = row.createCell(2);
            cell2.setCellValue(StrUtil.getNotNullStringValue(jsonObject.getString("MEMBER.TRUE_NAME"), ""));
            cell2.setCellStyle(cellStyle);
            SXSSFCell cell3 = row.createCell(3);
            cell3.setCellValue(jsonObject.getString("MEMBER.MOBILE"));
            cell3.setCellStyle(cellStyle);
            SXSSFCell cell4 = row.createCell(4);
            cell4.setCellValue(jsonObject.getString("MEMBER.CODE_NAME"));
            cell4.setCellStyle(cellStyle);
            SXSSFCell cell5 = row.createCell(5);
            cell5.setCellValue(jsonObject.getString("MEMBER.SHOP"));
            cell5.setCellStyle(cellStyle);
            SXSSFCell cell6 = row.createCell(5);
            cell6.setCellValue(StrUtil.getNotNullStringValue(jsonObject.getString("MEMBER.ID_NUMBER"), ""));
            cell6.setCellStyle(cellStyle);
            SXSSFCell cell7 = row.createCell(7);
            cell7.setCellValue(StrUtil.getNotNullStringValue(jsonObject.getString("MEMBER.BIRTHDAY"), ""));
            cell7.setCellStyle(cellStyle);
            SXSSFCell cell8 = row.createCell(8);
            cell8.setCellValue(StrUtil.getNotNullStringValue(jsonObject.getString("MEMBER.SEX"), ""));
            cell8.setCellStyle(cellStyle);
            SXSSFCell cell9 = row.createCell(9);
            cell9.setCellValue(StrUtil.getNotNullStringValue(jsonObject.getString("MEMBER.REFERENCE"), ""));
            cell9.setCellStyle(cellStyle);
            SXSSFCell cell10 = row.createCell(10);
            cell10.setCellValue(jsonObject.getString("MEMBER.REG_DATETIME").replace(".0", ""));
            cell10.setCellStyle(cellStyle);
        }

        SXSSFRow rowM = cardSheet.createRow(rowIndex);
        rowM.setHeightInPoints(25);
//        Cell cellMan = rowM.createCell(0);
//        cellMan.setCellValue("操作人：");
//        cellMan.setCellStyle(cellStyle);
//        Cell cellManValue = rowM.createCell(1);
//        cellManValue.setCellValue("");
//        cellManValue.setCellStyle(cellStyle);
        rowM.createCell(0).setCellValue("");
        rowM.createCell(1).setCellValue("");
        rowM.createCell(2).setCellValue("");
        rowM.createCell(3).setCellValue("");
        rowM.createCell(4).setCellValue("");
        rowM.createCell(5).setCellValue("");
        rowM.createCell(6).setCellValue("");
        rowM.createCell(7).setCellValue("");
        SXSSFCell cellTime = rowM.createCell(8);
        cellTime.setCellValue("导出时间：");
        cellTime.setCellStyle(cellStyle);
        SXSSFCell cellTimeValue = rowM.createCell(9);
        cellTimeValue.setCellValue(dateFormat.format(DateUtil.getCurrTime()));
        cellTimeValue.setCellStyle(cellStyle);

        //总计结束
        return (SXSSFSheet) cardSheet;

    }

}
