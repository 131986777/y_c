package com.alipay.util;

import com.bolanggu.bbl.ENV;
import java.util.HashMap;
import java.util.Map;

/**
 * Created  on 2017/1/20 - 16:56.
 */
public class AliPay {

    public static String undefinedOrder(String ip, String out_trade_no, String total_fee,
        String body) {
        Map<String, String> sParaTemp = new HashMap<>();
        sParaTemp.put("_input_charset", "utf-8");
        sParaTemp.put("service", "create_direct_pay_by_user");
        sParaTemp.put("partner", ENV.ALIPAY_PID);
        sParaTemp.put("seller_id", ENV.ALIPAY_PID);

        sParaTemp.put("payment_type", "1");
        sParaTemp.put("notify_url", ENV.ALIPAY_NOTIFY_URL);
        sParaTemp.put("anti_phishing_key", "");
        sParaTemp.put("return_url", ENV.ALIPAY_RETURN_URL);
        sParaTemp.put("exter_invoke_ip", ip);
        sParaTemp.put("out_trade_no", out_trade_no);
        sParaTemp.put("total_fee", total_fee);
        sParaTemp.put("body", body);
        sParaTemp.put("subject", body);
        String params =
            AlipaySubmit.getRequestParams(sParaTemp, "sy6zcif7m285u4htm311yytz6eyks7ce");
        return params;
    }
}
