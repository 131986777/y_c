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


    public static void tongbu() {

        API api = new API();

        try {

            List<String> list =new ArrayList<String >();
            //list.add("100008");
            //list.add("100015");
            //list.add("100012");
            //list.add("100026");
            //list.add("100002");
            //list.add("100036");
            list.add("100003");

            for (int i = 0; i < list.size(); i++) {
                String mendianID= list.get(i);
                String returnStr = run(mendianID);
                JSONObject returnJSOn = JSONObject.parseObject(returnStr);

                if(returnJSOn.get("returnCode").equals("00")){

                    JSONArray returnJSON = (JSONArray)returnJSOn.getJSONArray("goodsInfos");
                    for (int j = 0; j < returnJSON.size(); j++) {
                        JSONObject skuStock = returnJSON.getJSONObject(j);
                        HashMap map_sku = new HashMap();
                        map_sku.put("SHOP_PRODUCT_SKU.PRD_SKU",skuStock.get("goodsCode"));
                        ReturnData response = api.call("/shop/product/sku/getByPrdSku", map_sku);
                        ///  更新库存与价格
                        HashMap map = new HashMap();
                        map.put("SHOP_ID",mendianID);
                        map.put("SKU_ID",response.getData().get(0).get("SHOP_PRODUCT_SKU.SKU_ID"));
                        map.put("PRD_ID",response.getData().get(0).get("SHOP_PRODUCT_SKU.PRD_ID"));
                        map.put("COUNT",skuStock.get("stockAmount"));
                        map.put("PRICE",skuStock.getDouble("salePrice"));
                        api.call("/stock/realtime/updateStockAndPrice",map);
                    }
                }else{
                    System.err.println("百年接口错误: " + returnStr);
                }
            }

        } catch (RuleException e) {
            e.printStackTrace();
        }

    }


    public static void main(String[] args) throws IOException {
       tongbu();
    }




}
