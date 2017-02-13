package com.bolanggu.bbl.delivery;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by 95155 on 2017/2/10.
 */
public class queryDelivery extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html,charset=utf-8");
        resp.setCharacterEncoding("utf-8");

        PrintWriter pw = resp.getWriter();

        //物流单号
        String logisticsNum = req.getParameter("logisticsNum");
        //请求地址
        String httpUrl = "http://apis.baidu.com/netpopo/express/express1";
        //请求参数
        String httpArg = "type=auto&number=" + logisticsNum;
        //json格式的结果
        String deliveryJsonResult = request(httpUrl, httpArg);
        //输出
        pw.print(deliveryJsonResult);
    }

    /**
     * 请求查询快递
     *
     * @param httpUrl :请求接口
     * @param httpArg :参数
     * @return 返回结果
     */
    public static String request(String httpUrl, String httpArg) {
        BufferedReader reader = null;
        String result = null;
        StringBuffer sbf = new StringBuffer();
        //进行字符串拼接，拼接成完整的请求地址
        httpUrl = httpUrl + "?" + httpArg;

        try {
            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            //以GET的方式请求数据
            connection.setRequestMethod("GET");
            //填入apikey到HTTP header
            connection.setRequestProperty("apikey", "1d2171718ec5296990a33d26796d5bd3");
            connection.connect();
            InputStream is = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead = null;
            while ((strRead = reader.readLine()) != null) {
                sbf.append(strRead);
                sbf.append("\r\n");
            }
            reader.close();
            result = sbf.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
