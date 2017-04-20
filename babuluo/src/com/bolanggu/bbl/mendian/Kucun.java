package com.bolanggu.bbl.mendian;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.util.AlipayNotify;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.common.util.DateUtil;
import com.pabula.common.util.HttpClientUtil;
import com.pabula.common.util.MD5;
import com.pabula.fw.exception.RuleException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by pabula on 2016/11/14.
 */
public class Kucun {

    //从百年获取数据
    public static String run(String meidianID) {
        String url = httpPostJson.ERP_DOMAIN + "GetAvailableStock";

        Map map = new HashMap<>();
        map.put("Sign", httpPostJson.ERP_SIGN);
        map.put("nodecode", meidianID);

        String returnStr = HttpClientUtil.doPost(url, map);

        return returnStr;
    }

    //库存同步
    public static void tongbu(String id) {

        System.err.println("run: " + id);

        API api = new API();

        //try {
            String mendianID = id;
            String returnStr = run(mendianID);
            JSONObject returnJSOn = JSONObject.parseObject(returnStr);

            if (returnJSOn.get("returnCode").equals("00")) {

                JSONArray returnJSON = returnJSOn.getJSONArray("goodsInfos");
                System.out.println("getData "+ returnJSON.size());
                for (int j = 0; j < returnJSON.size(); j++) {
                    //JSONObject skuStock = returnJSON.getJSONObject(j);
                    /////  更新库存与价格
                    //HashMap map = new HashMap();
                    //map.put("SHOP_ID", mendianID);
                    //map.put("SKU_ID", skuStock.get("goodsCode") + "");
                    //map.put("COUNT", skuStock.getDouble("stockAmount") + "");
                    //map.put("PRICE", skuStock.getDouble("salePrice") + "");
                    //ReturnData response2 = api.call("/stock/realtime/updateStockAndPriceFast", map);

                    //System.err.println("call: " + map.toString() + response2);
                }
            } else {
                System.err.println("百年接口错误: " + returnStr);
            }
        //} catch (RuleException e) {
        //    e.printStackTrace();
        //}
    }

    public static void main(String[] args) throws IOException {

        List<String> list = new ArrayList<>();
        list.add("100001");
        //list.add("100002");
        //list.add("100003");
        //list.add("100004");
        //list.add("100005");
        //list.add("100006");
        //list.add("100007");
        //list.add("100008");
        //list.add("100009");
        //list.add("100010");
        //list.add("100011");
        //list.add("100012");
        //list.add("100013");
        //list.add("100014");
        //list.add("100015");
        //list.add("100016");
        //list.add("100017");
        //list.add("100018");
        //list.add("100019");
        //list.add("100020");
        //list.add("100021");
        //list.add("100022");
        //list.add("100023");
        //list.add("100024");
        //list.add("100025");
        //list.add("100026");
        //list.add("100027");
        //list.add("100028");
        //list.add("100029");
        //list.add("100030");
        //list.add("100031");
        //list.add("100032");
        //list.add("100033");
        //list.add("100034");
        //list.add("100035");
        //list.add("100036");
        //list.add("100037");
        //list.add("100038");
        //list.add("100039");
        //list.add("100040");
        //list.add("100041");
        //list.add("100042");
        //list.add("100043");
        //list.add("100044");
        //list.add("100045");
        //list.add("100046");
        //list.add("100047");
        //list.add("100048");
        //list.add("100049");
        //list.add("100050");
        //list.add("100051");
        //list.add("100052");
        //list.add("100053");
        //list.add("100054");
        //list.add("100055");
        //list.add("100056");
        //list.add("100057");
        //list.add("100058");
        //list.add("100059");
        //list.add("100060");
        //list.add("100061");
        //list.add("100062");
        //list.add("100063");
        //list.add("100064");
        //list.add("100065");
        //list.add("100066");
        //list.add("100067");
        //list.add("100068");
        //list.add("100069");
        //list.add("100070");
        //list.add("100071");
        //list.add("100072");
        //list.add("100073");
        //list.add("100074");
        //list.add("100075");
        //list.add("100076");
        //list.add("100077");
        //list.add("100078");
        //list.add("100079");
        //list.add("100080");
        //list.add("100081");
        //list.add("100082");
        //list.add("100083");
        //list.add("100084");
        //list.add("111111");
        for (int i = 0; i < list.size(); i++) {
            String arg = list.get(i);

            Thread t = new Thread(new Runnable() {
                public void run() {
                    tongbu(arg);
                }
            });
            t.start();
        }
        //System.out.println(getConfig.get("call_back_url"));
        //System.out.println(getConfig.get("partner"));
        //try {
        //    ReturnData returnData = new API().call(getConfig.get("call_back_url"), new HashMap<>());
        //    System.out.println(returnData);
        //} catch (RuleException e) {
        //    e.printStackTrace();
        //}
    }
}
