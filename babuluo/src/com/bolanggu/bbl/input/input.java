package com.bolanggu.bbl.input;

import com.bolanggu.bbl.ENV;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.common.util.StrUtil;
import com.pabula.fw.exception.RuleException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String fileUrl = getClass()
                .getClassLoader()
                .getResource("/")
                .getPath().replace("/WEB-INF/classes",
                        ENV.UPLOAD_EXCEL_FILE + req.getParameter("fileUrl"));
        fileUrl = fileUrl.substring(1, fileUrl.length() - 1);

        importPluralExcel poi = new importPluralExcel();

        Map map = poi.readMore(fileUrl, false, 0, 0);
        List<List<String>> list = (List<List<String>>) map.get("储值卡导入");
        importValueCard(list);

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    private void importValueCard(List<List<String>> list) throws RuleException {

        String card_no = null;
        String balance = null;
        String shop_id = "0";

        for (int i = 1; i < list.size(); i++) {
            System.out.println(i);

            if (StrUtil.isNotNull(list.get(i).get(0))) {
                card_no = list.get(i).get(0);
            }

            if (StrUtil.isNotNull(list.get(i).get(1))) {
                balance = list.get(i).get(1);
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
}
