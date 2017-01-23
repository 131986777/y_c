<%@ page import="com.pabula.api.API" %>
<%@ page import="com.pabula.common.util.HttpClientUtil" %>
<%@ page import="com.pabula.common.util.StrUtil" %>
<%@ page import="com.weixin.WXPay" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>

<%--
  Created by IntelliJ IDEA.
  User: sunsai
  Date: 2016/11/14
  Time: 下午11:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<%


    boolean result = false;
    String reqXml = WXPay.getPostStr(request);


    System.out.println("wxPayCallback.jsp 666");
    System.out.println(reqXml);

    Map<String, String> payResultMap = WXPay.parseXmlToMap(reqXml);

    if (null != payResultMap) {

        if ("SUCCESS".equals(payResultMap.get("return_code"))) {
            if ("SUCCESS".equals(payResultMap.get("result_code"))) {
                int orderId = StrUtil.getNotNullIntValue(payResultMap.get("out_trade_no"));


                if (orderId > 0) {
                    /**
                     * 支付成功, 调用接口通知订单更新
                     */
                    int fee = StrUtil.getNotNullIntValue(payResultMap.get("total_fee"));
                    Map<String, String> params = new HashMap<>();
                    params.put("OUT_TRADE_NO", orderId + "");
                    params.put("FEE", fee + "");
                    params.put("CALLBACK", "1");
                    String returnStr = HttpClientUtil.doGet("http://app.bblycyz.com/AndSell/wxCallBack",params);
                    result = true;
                }
            }
        }
    }


    StringBuffer sb = new StringBuffer();

    sb.append("<xml>");
    sb.append("<return_code>");
    String succStr = result ? "SUCCESS" : "FAIL";
    sb.append(succStr);
    sb.append("</return_code>");
    if (!result) {
        sb.append("<return_msg>");
        sb.append("error");
        sb.append("</return_msg>");
    }
    sb.append("</xml>");

    System.out.println(sb.toString());
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    PrintWriter out2 = null;
    try {
        out2 = response.getWriter();
        out2.print(sb.toString());

    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (null != out2) {
            out2.flush();
            out2.close();
        }
    }
%>
