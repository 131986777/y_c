package com.bolanggu.bbl.output;


import com.bolanggu.bbl.ENV;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by 95155 on 2016/12/12.
 */
public class outputQuery extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("UTF-8");

        String type = req.getParameter("type");
        String parameter = req.getParameter("param");

        PrintWriter pw = resp.getWriter();

        try {
            SXSSFWorkbook analyseBook = new SXSSFWorkbook(10000);

            switch (type) {
                case "finance":
                    outputFinanceQuery.newInstance().GenerateExcelSheet(analyseBook, parameter);
                    break;
                case "point":
                    outputPointQuery.newInstance().GenerateExcelSheet(analyseBook, parameter);
                    break;
                case "card":
                    outputCardQuery.newInstance().GenerateExcelSheet(analyseBook, parameter);
                    break;
                case "member":
                    outputMemberQuery.newInstance().GenerateExcelSheet(analyseBook, parameter);
                    break;
            }

            FileOutputStream os = null;
            DateFormat format = new SimpleDateFormat("yyyyMMddhhMMss");
            Date date = new Date();
            String filename = type + format.format(date) + ".xlsx";
            System.out.println("filename====="+filename);
            File filePath = null;
            File filePathDir = null;
            filePath = new File(getClass()
                    .getClassLoader()
                    .getResource("/")
                    .getPath()
                    .replace("/WEB-INF/classes",
                            ENV.GENERATED_EXCEL_FILE + filename));
            filePathDir = new File(getClass()
                    .getClassLoader()
                    .getResource("/")
                    .getPath()
                    .replace("/WEB-INF/classes",
                            ENV.GENERATED_EXCEL_FILE));
            if (filePath.exists()) {
                os = new FileOutputStream(filePath);
            } else {
                filePathDir.mkdirs();
                os = new FileOutputStream(filePath);
            }
            analyseBook.write(os);
            os.flush();
            os.close();
            pw.print(ENV.GENERATED_EXCEL_FILE + filename);
            pw.close();
        } catch (Exception e) {
            e.printStackTrace();
            pw.print("failure");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
