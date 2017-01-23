package com.alipay.util;

import com.bolanggu.bbl.ENV;
import com.pabula.common.util.SeqNumHelper;
import com.pabula.fw.exception.DataAccessException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created  on 2017/1/20 - 16:56.
 */
public class AliPay {

    public static Map<String, String> undefinedOrder(String ip, String total_fee,
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
        try {
            sParaTemp.put("out_trade_no", "1000" + SeqNumHelper.getNewSeqNum("andsell",
                "ali_pay_flow_num")); //每次统一下单生成唯一流水号
        } catch (DataAccessException e) {
            sParaTemp.put("out_trade_no", System.currentTimeMillis() + ""); //报错就用时间戳（唯一性） 防止这个参数没有值
            e.printStackTrace();
        }
        sParaTemp.put("total_fee", total_fee);
        sParaTemp.put("body", body);
        sParaTemp.put("subject", body);
        String params =
            AlipaySubmit.getRequestParams(sParaTemp, ENV.ALIPAY_KEY);
        sParaTemp.put("params",params);
        return sParaTemp;
    }
}


