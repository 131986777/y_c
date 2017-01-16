package com.weixin;

import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class WXPayResultCallBackServlet extends HttpServlet {

    public void doPost(javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response) {
        doCallBack(request, response);
    }

    public void doGet(javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response) {
        doPost(request, response);
    }

    public void init(ServletConfig arg0) throws ServletException {
        super.init(arg0);
    }

    public synchronized void doCallBack(javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response) {
        try {
            System.out.println("开始调到结果");
            Map<String, String> map = new HashMap<>();
            if (null != request.getParameter("OUT_TRADE_NO")) {
                map.put("OUT_TRADE_NO", request.getParameter("OUT_TRADE_NO"));
            }
            if (null != request.getParameter("ORDER_ID")) {
                map.put("ORDER_ID", request.getParameter("ORDER_ID"));
            }
            if (null != request.getParameter("TYPE")) {
                map.put("TYPE", request.getParameter("TYPE"));
            }
            if (null != request.getParameter("CALLBACK")) {
                map.put("CALLBACK", request.getParameter("CALLBACK"));
            }
            if (null != request.getParameter("FEE")) {
                map.put("FEE", request.getParameter("FEE"));
            }
            if (null != request.getParameter("UID")) {
                map.put("UID", request.getParameter("UID"));
            }
            if (null != request.getParameter("NOW_BALANCE")) {
                map.put("NOW_BALANCE", request.getParameter("NOW_BALANCE"));
            }
            ReturnData returnData = new API().call("/wx/pay/wxpayCallback", map);
            System.out.println("成功调到结果");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.setContentType("application/json");
            try {
                response.getWriter().print(returnData.getReturnJSONStr());
                response.getWriter().flush();
                response.getWriter().close();
            } catch (IOException e) {
                e.printStackTrace();
            }
    } catch (RuleException e) {
            e.printStackTrace();
        }
    }
}
