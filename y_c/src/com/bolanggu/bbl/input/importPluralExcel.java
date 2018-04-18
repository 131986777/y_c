package com.bolanggu.bbl.input;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhj on 16/9/21.
 */
public class importPluralExcel {

    private int totalRows = 0;


    private int totalCells = 0;


    private String errorInfo;

    public importPluralExcel() {

    }


    public int getTotalRows() {

        return totalRows;

    }


    public int getTotalCells() {

        return totalCells;

    }


    public String getErrorInfo() {

        return errorInfo;

    }


    public boolean validateExcel(String filePath) {

        /** 检查文件名是否为空或者是否是Excel格式的文件 */

        if (filePath == null
                || !(WDWUtil.isExcel2003(filePath) || WDWUtil
                .isExcel2007(filePath))) {

            errorInfo = "文件名不是excel格式";

            return false;

        }

        /** 检查文件是否存在 */

        //File file = new File(filePath);
        //
        //System.out.println("111");
        //System.out.println(filePath);
        //System.out.println(file == null);
        //System.out.println(file.exists());
        //System.out.println(file.getAbsolutePath());

        URL url = null;
        try {
            url = new URL("file:///"+filePath);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        URI uri = null;
        try {
            uri = url.toURI();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        File file = new File(uri);

        System.out.println("222");
        System.out.println(file == null);
        System.out.println(file.exists());
        System.out.println(file.getAbsolutePath());

        if (file == null || !file.exists()) {

            errorInfo = "文件不存在";

            return false;

        }

        return true;

    }

//入口  filePath 地址  flag: 是否读多sheet number :读几个 (0)读全部 cellNum:读几列
     public Map readMore(String filePath, boolean flag , int number ,int cellNum) {

        Map dataMap = new HashMap();


        InputStream is = null;

        try {

            /** 验证文件是否合法 */

            if (!validateExcel(filePath)) {

                System.out.println(errorInfo);

                return null;

            }

            /** 判断文件的类型，是2003还是2007 */

            boolean isExcel2003 = true;

            if (WDWUtil.isExcel2007(filePath)) {

                isExcel2003 = false;

            }

            /** 调用本类提供的根据流读取的方法 */
            URL url = null;
            try {
                url = new URL("file:///"+filePath);
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
            URI uri = null;
            try {
                uri = url.toURI();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
            File file = new File(uri);

            is = new FileInputStream(file);

            dataMap = readMoreFirst(is, isExcel2003, flag, number , cellNum);

            is.close();

        } catch (Exception ex) {

            ex.printStackTrace();

        } finally {

            if (is != null) {

                try {

                    is.close();

                } catch (IOException e) {

                    is = null;

                    e.printStackTrace();

                }

            }

        }

        /** 返回最后读取的结果 */

        return dataMap;

    }


    public Map readMoreFirst(InputStream inputStream, boolean isExcel2003 ,boolean flag , int number , int cellNum) {

        Map dataMap = new HashMap();

        try {

            /** 根据版本选择创建Workbook的方式 */

            Workbook wb = null;

            if (isExcel2003) {
                wb = new HSSFWorkbook(inputStream);
            } else {
                wb = new XSSFWorkbook(inputStream);
            }
            dataMap = readMoreSecond (wb, flag, number , cellNum);

        } catch (IOException e) {

            e.printStackTrace();

        }

        return dataMap;

    }

    private Map readMoreSecond (Workbook wb,boolean flag , int number , int cellNum) {

        Map dataMap = new HashMap<> ();

        List<List<String>> dataLst = new ArrayList<List<String>>();

        int num = wb.getNumberOfSheets();
        int limtNum = number;

        if(limtNum <0 ) {
            limtNum = 0;
        }

        int temp = num;

        if(flag == true) {

            if(limtNum != 0) {
                temp = limtNum;

            }

        }else {
            temp = 1;
        }
        for (int i = 0; i < temp; i++) {
            Sheet sheet = wb.getSheetAt(i);

            /** 得到Excel的行数 */

            this.totalRows = sheet.getLastRowNum()+1;



            /** 得到Excel的列数 */

            if (this.totalRows >= 1 && sheet.getRow(0) != null) {

                this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();

            }

            if(cellNum != 0) {
                this.totalCells = cellNum;
            }

            dataLst = readMoreLast(sheet, this.totalRows ,  this.totalCells);
            String name = sheet.getSheetName();
            dataMap.put(name,dataLst);


        }

     return dataMap;

    }



    private  List<List<String>> readMoreLast(Sheet sheet, int totalRows , int totalCells){

        List<List<String>> dataLst = new ArrayList<List<String>>();

        /** 循环Excel的行 */

        for (int r = 0; r < totalRows; r++) {

            Row row = sheet.getRow(r);

            if (row == null) {

                continue;

            }

            List<String> rowLst = new ArrayList<String>();

            /** 循环Excel的列 */

            for (int c = 0; c < totalCells; c++) {

                Cell cell = row.getCell(c);

                String cellValue = "";

                if (null != cell) {
                    // 以下是判断数据的类型
                    switch (cell.getCellType()) {
                        case HSSFCell.CELL_TYPE_NUMERIC: // 数字
                            if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                                cellValue = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue())).toString() + "";
                            } else {
                                cellValue = cell.getNumericCellValue() +"";
                            }
                            break;

                        case HSSFCell.CELL_TYPE_STRING: // 字符串
                            cellValue = cell.getStringCellValue();
                            /*System.out.println(cellValue);*/
                            break;

                        case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
                            cellValue = cell.getBooleanCellValue() + "";
                            break;

                        case HSSFCell.CELL_TYPE_FORMULA: // 公式
                            cellValue = cell.getCellFormula() + "";
                            break;

                        case HSSFCell.CELL_TYPE_BLANK: // 空值
                            cellValue = "";
                            break;

                        case HSSFCell.CELL_TYPE_ERROR: // 故障
                            cellValue = "非法字符";
                            break;

                        default:
                            cellValue = "未知类型";
                            break;
                    }
                }

                rowLst.add(cellValue);

            }

            /** 保存第r行的第c列 */

            dataLst.add(rowLst);

        }

        return dataLst;
    }

}
