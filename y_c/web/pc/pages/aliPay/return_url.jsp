<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="com.alipay.util.AlipayNotify" %>
<%@ page import="java.io.UnsupportedEncodingException" %>
<%@ page import="com.alipay.web.command.ALIPayResultInvokeServlet" %>
<%@ page import="com.alibaba.fastjson.JSONObject" %>
<%@ page import="com.pabula.api.data.ReturnData" %>
<%@ page import="com.pabula.api.API" %>
<%@ page import="com.pabula.fw.exception.RuleException" %>
<%@ page import="com.alipay.util.getConfig" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    String url = getConfig.get("domain") + "pc/pages/main/index.html#/pages/personal/center";

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
        String trade_status =
                new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8");

        String serviceId =
                new String(request.getParameter("extra_common_param").getBytes("ISO-8859-1"),
                        "UTF-8");

        //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)

        String url_config = "/pay/config/getById";
        Map map = new HashMap<>();
        map.put("PAY_CONFIG.SERVICE_ID", serviceId);
        JSONObject config_item = new JSONObject();
        try {
            ReturnData data = new API().call(url_config, map);
            if (data.getData().size() > 0) {
                config_item = data.getData().get(0);
            }
        } catch (RuleException e) {
            e.printStackTrace();
        }
        System.out.println(1111);
        System.out.println(config_item.getString("PAY_CONFIG.ALI_PARTNER"));
        System.out.println(config_item.getString("PAY_CONFIG.ALI_KEY"));
        //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)
        if (AlipayNotify.verify(params, config_item.getString("PAY_CONFIG.ALI_PARTNER"),
                config_item.getString("PAY_CONFIG.ALI_KEY"))) {//验证成功
            //////////////////////////////////////////////////////////////////////////////////////////
            //请在这里加上商户的业务逻辑程序代码
            System.out.println(222222222);
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
                System.out.println(2222);
                url = ALIPayResultInvokeServlet.doCallBack(request);
                System.out.println(url);
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
<h5><%=url%>
</h5>
<%--<h5><%=url1%></h5>--%>
<%--<h5><%=url2%></h5>--%>
<%--<h5><%=url3%></h5>--%>
<%--<h5><%=url4%></h5>--%>
<%--<h5><%=url5%></h5>--%>
</body>
<script>
    window.location.href = '<%=url%>';
</script>
</html>
