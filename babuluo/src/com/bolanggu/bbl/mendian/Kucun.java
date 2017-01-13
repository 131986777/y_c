package com.bolanggu.bbl.mendian;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.common.util.HttpClientUtil;
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

    public static String run(String meidianID){
        String url = httpPostJson.ERP_DOMAIN + "GetAvailableStock";

        Map map =new HashMap<>();
        map.put("Sign","F4EBA1DE727A41A91B5D10754BFBF657");
        map.put("nodecode",meidianID);

        String returnStr = HttpClientUtil.doPost(url,map);

        return returnStr;

    }


    public static void tongbu(String id) {

        System.err.println("run: "+ id);

        API api = new API();

        try {

//            List<String> list =new ArrayList<String >();
//            //list.add("100008");
//            //list.add("100015");
//            //list.add("100012");
//            //list.add("100026");
//            //list.add("100002");
//            //list.add("100036");
//            list.add("100003");

//            for (int i = 0; i < list.size(); i++) {
                String mendianID= id;
                String returnStr = run(mendianID);
                JSONObject returnJSOn = JSONObject.parseObject(returnStr);

                if(returnJSOn.get("returnCode").equals("00")){

                    JSONArray returnJSON = (JSONArray)returnJSOn.getJSONArray("goodsInfos");
                    for (int j = 0; j < returnJSON.size(); j++) {
                        JSONObject skuStock = returnJSON.getJSONObject(j);
//                        HashMap map_sku = new HashMap();
//                        map_sku.put("SHOP_PRODUCT_SKU.PRD_SKU",skuStock.get("goodsCode"));
//                        ReturnData response = api.call("/shop/product/sku/getByPrdSku", map_sku);
                        ///  更新库存与价格
                        HashMap map = new HashMap();
                        map.put("SHOP_ID",mendianID);
                        map.put("GOODSCODE",skuStock.get("goodsCode"));
//                        map.put("PRD_ID",response.getData().get(0).get("SHOP_PRODUCT_SKU.PRD_ID"));
                        map.put("COUNT",skuStock.get("stockAmount"));
                        map.put("PRICE",skuStock.getDouble("salePrice"));
                        ReturnData response2 = api.call("/stock/realtime/updateStockAndPriceFast",map);

                        System.err.println("call: " + map.toString() + response2.getReturnJSONStr());
                    }
                }else{
                    System.err.println("百年接口错误: " + returnStr);
                }
//            }

        } catch (RuleException e) {
            e.printStackTrace();
        }

    }


    public static void main(String[] args) throws IOException {

        List<String> list =new ArrayList<>();
 /*       list.add("100001");
        list.add("100002");
        list.add("100003");
        list.add("100004");
        list.add("100005");
        list.add("100006");
        list.add("100007");
        list.add("100008");
        list.add("100009");
        list.add("100010");
        list.add("100011");
        list.add("100012");
        list.add("100013");
        list.add("100014");
        list.add("100015");
        list.add("100016");
        list.add("100017");
        list.add("100018");
        list.add("100019");
        list.add("100020");
        list.add("100021");
        list.add("100022");
        list.add("100023");
        list.add("100024");
        list.add("100025");
        list.add("100026");
        list.add("100027");
        list.add("100028");
        list.add("100029");
        list.add("100030");
        list.add("100031");
        list.add("100032");
        list.add("100033");
        list.add("100034");
        list.add("100035");
        list.add("100036");
        list.add("100037");
        list.add("100038");
        list.add("100039");
        list.add("100040");
        list.add("100041");
        list.add("100042");
        list.add("100043");
        list.add("100044");
        list.add("100045");
        list.add("100046");
        list.add("100047");
        list.add("100048");
        list.add("100049");
        list.add("100050");
        list.add("100051");
        list.add("100052");
        list.add("100053");
        list.add("100054");
        list.add("100055");
        list.add("100056");
        list.add("100057");
        list.add("100058");
        list.add("100059");
        list.add("100060");
        list.add("100061");
        list.add("100062");
        list.add("100063");
        list.add("100064");
        list.add("100065");
        list.add("100066");
        list.add("100067");
        list.add("100068");
        list.add("100069");
        list.add("100070");
        list.add("100071");
        list.add("100072");
        list.add("100073");
        list.add("100074");
        list.add("100075");
        list.add("100076");
        list.add("100077");*/
        //list.add("100078");
     /*   list.add("100079");
        list.add("100080");
        list.add("100081");
        list.add("100082");*/
        list.add("100083");
        list.add("100084");
        //list.add("111111");
        for (int i = 0; i < list.size(); i++) {
            String arg = list.get(i);

            Thread t = new Thread(new Runnable(){
                public void run(){
                    tongbu(arg);
                }});
            t.start();

        }



        //System.out.println(MD5.MD5Encode("ycyzyy2016"));

        //Map<String,String> map =new HashMap<>();
        //map.put("ORDER_NUM","009990033222");
        //map.put("ORDER_INFO","[{\"PRD_ID\":\"800277\",\"PRD_NAME\":\"莲花味精99%\",\"UNIT\":\"袋\",\"BAR_CODE\":\"6901377001000\",\"PRICE_OLD\":1.5,\"PRICE_NOW\":1.5,\"COUNT\":1.0,\"PRICE_SUM\":1.5}]");
        //String returnStr = HttpClientUtil.doGet("http://app.bblycyz.com/AndSell/bubu/shop/.orderOffline/addOrderForOffline",map);
        //System.out.println(returnStr);
        //try {
            //ReturnData response = new API().call("/shop/product/unit/add", map);
            //System.out.println(response.toString());
        //} catch (RuleException e) {
        //    e.printStackTrace();
        //}

        //System.out.println(MD5.MD5Encode("appid=wx7c4d78e05a44115e&body=订单4219&mch_id=1298356201&nonce_str=4ylbnn1xaza9fo6ir915upslmk9fycnm&notify_url=http://app.bblycyz.com/AndSell/h5/pages/main/wxPayCallback.jsp&out_trade_no=10003463&product_id=4219&spbill_create_ip=null&total_fee=880&trade_type=NATIVE&key=fdbnhlsh6gs79ro4lhr6vutmgnx0flfc"));
        //System.out.println(com.tencent.common.MD5.MD5Encode("appid=wx7c4d78e05a44115e&body=订单4219&mch_id=1298356201&nonce_str=4ylbnn1xaza9fo6ir915upslmk9fycnm&notify_url=http://app.bblycyz.com/AndSell/h5/pages/main/wxPayCallback.jsp&out_trade_no=10003463&product_id=4219&spbill_create_ip=null&total_fee=880&trade_type=NATIVE&key=fdbnhlsh6gs79ro4lhr6vutmgnx0flfc"));

    }




}
