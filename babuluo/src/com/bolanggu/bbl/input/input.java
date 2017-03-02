package com.bolanggu.bbl.input;

import com.bolanggu.bbl.ENV;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.common.util.PathUtil;
import com.pabula.common.util.StrUtil;
import com.pabula.fw.exception.RuleException;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 95155 on 2017/2/13.
 */
public class input extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        PrintWriter pw = resp.getWriter();
        String fileUrl = getClass()
            .getClassLoader()
            .getResource("/")
            .getPath().replace("/WEB-INF/classes",
                ENV.UPLOAD_EXCEL_FILE + req.getParameter("fileUrl"));
        System.out.println(fileUrl);
        fileUrl = fileUrl.substring(1, fileUrl.length() - 1);

        importPluralExcel poi = new importPluralExcel();

        Map map = poi.readMore(fileUrl, false, 0, 0);
        List<List<String>> list = (List<List<String>>) map.get("储值卡导入");
        importValueCard(list);
        pw.write("success");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
        doPost(req, resp);
    }

    private void importValueCard(List<List<String>> list) throws RuleException {

        String card_no = null;
        double balance = 0;
        String shop_id = "0";

        for (int i = 1; i < list.size(); i++) {
            System.out.println(i);

            if (StrUtil.isNotNull(list.get(i).get(0))) {
                card_no = list.get(i).get(0);
            }

            if (StrUtil.isNotNull(list.get(i).get(1))) {
                balance = Double.parseDouble(list.get(i).get(1)) * 100;
            }

            if (StrUtil.isNotNull(list.get(i).get(2))) {
                shop_id = list.get(i).get(2);
            }
            System.out.println("卡号：" + card_no + " " + "金额：" + balance);
            Map<String, Object> map = new HashMap<>();
            map.put("CARD_NO", card_no);
            map.put("BALANCE", balance);
            map.put("SHOP_ID", shop_id);
            System.out.println(map);
            new API().call("/member/membercard/addValueCard", map);
        }
    }

    public static void main(String[] args) {
        String a = File.separator
            + "mnt"
            + File.separator
            + "bbl"
            + File.separator
            + "webapps"
            + File.separator
            + "h5"
            + File.separator
            + "file"
            + File.separator
            + "upload"
            + File.separator
            + "ValueCard.xlsx"
            + File.separator;
        //String a ="E:\\XIAOQI\\babuluo\\bbl\\babuluo\\web\\file\\upload\\ValueCard.xlsx";
        try {
            URL url = null;
            try {
                url = new URL("file:///" + a);
                //url = new URL("file","E:\\XIAOQI\\babuluo\\bbl\\babuluo\\web\\file\\upload\\","ValueCard.xlsx");
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
            URI uri = url.toURI();
            File file = new File(uri);
            System.out.println(file);
            //File  file1 = new File(new URI(a));
            //System.out.println(file1.getAbsolutePath());
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        //File file = new File(a );
        //System.out.println("111");
        //System.out.println(a );
        //System.out.println(file == null);
        //System.out.println(file.getAbsolutePath());
        //System.out.println(file.getAbsoluteFile());
        //File file = new File("E:\\XIAOQI\\babuluo\\bbl\\babuluo\\web\\file\\upload\\","ValueCard.xlsx");
        //System.out.println(file.getAbsolutePath());
        //System.out.println(file.exists());
        //while(file.getParentFile()!=null){
        //    file=file.getParentFile();
        //}
        //System.out.println(file.getAbsolutePath());
        //
        //
        System.out.println(a);
    }
}
