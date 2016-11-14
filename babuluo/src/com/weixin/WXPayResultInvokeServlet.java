//package com.weixin;
//
//import java.io.BufferedInputStream;
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Map;
//import javax.servlet.ServletConfig;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//
///**
// * Created by sunsai on 2015/9/24.
// */
//public class WXPayResultInvokeServlet extends HttpServlet {
//
//    public String getPostStr(javax.servlet.http.HttpServletRequest request) {
//
//        BufferedInputStream bis = null;
//        StringBuffer reqXml = new StringBuffer();
//
//        try {
//            bis = new BufferedInputStream(request.getInputStream());
//            byte[] buff = new byte[1024];
//            int readSize = 0;
//            try {
//                while ((readSize = bis.read(buff, 0, 1)) != -1) {
//                    reqXml.append(new String(buff, 0, readSize, "UTF-8"));
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            } finally {
//                bis.close();
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return reqXml.toString();
//    }
//
//    public void doPost(javax.servlet.http.HttpServletRequest request,
//                       javax.servlet.http.HttpServletResponse response) {
//
//        boolean result = false;
//        String reqXml = getPostStr(request);
//
//        System.out.println("WXPayResultInvokeServlet    come  in ");
//        System.out.println(reqXml);
//        Map<String, String> payResultMap = WXPay.parseXmlToMap(reqXml);
//
//        if (null != payResultMap) {
//            if ("SUCCESS".equals(payResultMap.get("return_code"))) {
//                if ("SUCCESS".equals(payResultMap.get("result_code"))) {
//                    System.out.println("start插入");
//
//                    //result = ShopOrderBean.newInstance().WXPaySuccess(payResultMap);
//                }
//            }
//        }
//
//        StringBuffer sb = new StringBuffer();
//
//        sb.append("<xml>");
//        sb.append("<return_code>");
//        String succStr = result ? "SUCCESS" : "FAIL";
//        sb.append(succStr);
//        sb.append("</return_code>");
//        if (!result) {
//            sb.append("<return_msg>");
//            sb.append("error");
//            sb.append("</return_msg>");
//        }
//        sb.append("</xml>");
//
//        System.out.println(sb.toString());
//        response.setHeader("Cache-Control", "no-cache");
//        response.setDateHeader("Expires", 0);
//        PrintWriter out = null;
//        try {
//            out = response.getWriter();
//            out.print(sb.toString());
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.out.println("WXPayResultInvokeServlet ioexception");
//        } finally {
//
//            if (null != out) {
//                out.flush();
//                out.close();
//            }
//        }
//    }
//
//    public void doGet(javax.servlet.http.HttpServletRequest request,
//                      javax.servlet.http.HttpServletResponse response) {
//        doPost(request, response);
//    }
//
//
//    public void init(ServletConfig arg0) throws ServletException {
//        super.init(arg0);
//    }
//
//}
