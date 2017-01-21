package com.alipay.web.command;

import com.alipay.util.AlipayNotify;
import com.bolanggu.bbl.ENV;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.DataAccessException;
import com.pabula.fw.exception.RuleException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * 订单支付回调 Created by sunsai on 2016/5/12 - 10:19.
 */
public class ALIPayResultInvokeServlet extends HttpServlet {

    public void doPost(javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response) {

        System.out.println("come in  to  alipay");
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

            if (AlipayNotify.verify(params, ENV.ALIPAY_KEY)) {//验证成功
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

                    doCallBack(request, response);
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
    }

    public void doGet(javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response) {
        doPost(request, response);
    }

    public void init(ServletConfig arg0) throws ServletException {
        super.init(arg0);
    }

    public synchronized static String doCallBack(javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response) {
        try {
            System.out.println("开始调到结果");
            Map<String, String> map = new HashMap<>();
            try {
                if (null != request.getParameter("out_trade_no")) {
                    map.put("OUT_TRADE_NO",
                        new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),
                            "UTF-8"));
                }
                if (null != request.getParameter("trade_status")) {
                    map.put("TRADE_STATUS",
                        new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),
                            "UTF-8"));
                }
                if (null != request.getParameter("total_fee")) {
                    map.put("TOTAL_FEE",
                        new String(request.getParameter("total_fee").getBytes("ISO-8859-1"),
                            "UTF-8"));
                }
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            ReturnData returnData = new API().call("/ali/pay/aliPayCallback", map);
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
            return ENV.DO_MAIN+returnData.getExtraData().get("url");
        } catch (RuleException e) {
            e.printStackTrace();
        }
        return "";
    }



}
