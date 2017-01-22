<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="com.alipay.util.AlipayNotify" %>
<%@ page import="com.bolanggu.bbl.ENV" %>
<%@ page import="java.io.UnsupportedEncodingException" %>
<%@ page import="com.alipay.web.command.ALIPayResultInvokeServlet" %><%--
 Created by sunsai on 2017/1/20 - 17:10.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    String url="";

    //获取支付宝POST过来反馈信息
    Map<String, String> params = new HashMap<String, String>();
    Map requestParams = request.getParameterMap();
    for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
        String name = (String) iter.next();
        String[] values = (String[]) requestParams.get(name);
        String valueStr = "";
        for (int i = 0; i < values.length; i++) {
            valueStr = (i == values.length - 1) ? valueStr + values[i]
                    : valueStr + values[i] + ",";
        }
        //乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
        //valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
        params.put(name, valueStr);
    }

    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
    //商户订单号

    try {
        //交易状态
        String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8");

        //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)

        // TODO: 2016.8.18 因为未存支付宝下订单的相关数据 用的一个不好的办法得到相关数据 二期要改

        if (AlipayNotify.verify(params, ENV.ALIPAY_PID)) {//验证成功
            //////////////////////////////////////////////////////////////////////////////////////////
            //请在这里加上商户的业务逻辑程序代码


            //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

            if (trade_status.equals("TRADE_FINISHED")) {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
            } else if (trade_status.equals("TRADE_SUCCESS")) {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序

                url=ALIPayResultInvokeServlet.doCallBack(request);
                //注意：
                //付款完成后，支付宝系统发送该交易状态通知
            }

            //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——

            System.out.print("success");    //请不要修改或删除

            //////////////////////////////////////////////////////////////////////////////////////////
        } else {//验证失败
            System.out.print("fail");
        }
    } catch (UnsupportedEncodingException e) {
        e.printStackTrace();
    }
%>
</body>
<script>
    <%--window.location.href=<%=url%>;--%>
    window.location.href='http://139.224.60.144/AndSell/pc/pages/main/index.html?#/order/detail/4352/';
</script>
</html>
