<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.alipay.util.AlipayCore" %>
<%@ page import="com.pabula.common.util.HttpClientUtil" %>
<%@ page import="com.alipay.util.AlipaySubmit" %><%--
 Created by sunsai on 2017/1/18 - 15:56.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    Map<String,String> sParaTemp = new HashMap<>();
    sParaTemp.put("_input_charset","utf-8");
    sParaTemp.put("service","create_direct_pay_by_user");
    sParaTemp.put("partner","2088121336481308");
    sParaTemp.put("seller_id","2088121336481308");

    sParaTemp.put("payment_type","1");
    sParaTemp.put("notify_url","http://admin.jiaorder.com/alipay");
    sParaTemp.put("anti_phishing_key","");
    sParaTemp.put("return_url","http://admin.jiaorder.com/ui/alipay/return_url.jsp");
    sParaTemp.put("exter_invoke_ip","49.77.178.83");
    sParaTemp.put("out_trade_no","501");
    sParaTemp.put("total_fee","0.01");
    sParaTemp.put("body","haha");
    sParaTemp.put("subject","501");
    String params=AlipaySubmit.getRequestParams(sParaTemp,"sy6zcif7m285u4htm311yytz6eyks7ce");
%>

<script>window.location.href='https://mapi.alipay.com/gateway.do?<%=params%>'</script>
</body>
</html>
