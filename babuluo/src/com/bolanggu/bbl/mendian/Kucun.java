package com.bolanggu.bbl.mendian;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.common.util.HttpClientUtil;
import com.pabula.fw.exception.RuleException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by pabula on 2016/11/14.
 */
public class Kucun {

    public static String run(String meidianID,String prdID){
        String url = httpPostJson.ERP_DOMAIN + "GetAvailableStock";

        Map map =new HashMap<>();
        map.put("Sign","F4EBA1DE727A41A91B5D10754BFBF657");
        map.put("nodecode",meidianID);
        map.put("goodsCode",prdID);

        String returnStr = HttpClientUtil.doPost(url,map);


        System.out.println(returnStr);

        return returnStr;

    }


    public static void tongbu() {

//        run("ddd","333");


        API api = new API();

        try {
            List<JSONObject> mendianObj = api.call("/shop/shop/queryAll").getData();
            for(int i = 0;i<10;i++){

                String mendianID = (String)mendianObj.get(i).get("SHOP.SHOP_ID");
                System.err.println("mendian: " + mendianID);

                List<JSONObject> skuDatal = api.call("/shop/product/sku/queryAll").getData();

                for(int j = 0;j<10;j++){

                    String prdID = (String)skuDatal.get(j).get("SHOP_PRODUCT_SKU.PRD_ID");
                    String mendianPRIID = (String)skuDatal.get(j).get("SHOP_PRODUCT_SKU.PRD_SKU");
                    String skuID = (String)skuDatal.get(j).get("SHOP_PRODUCT_SKU.SKU_ID");

                    String returnStr = run(mendianID,mendianPRIID);
                    JSONObject returnJSOn = JSONObject.parseObject(returnStr);

                    ///  更新库存与价格
                    HashMap map = new HashMap();
                    map.put("SHOP_ID",mendianID);
                    map.put("SKU_ID",skuID);
                    map.put("PRD_ID",prdID);
                    map.put("COUNT",returnJSOn.get("stockAmount"));
                    map.put("PRICE",returnJSOn.getDouble("salePice")*100);
                    api.call("/stock/realtime/updateStockAndPrice",map);


                }
            }
        } catch (RuleException e) {
            e.printStackTrace();
        }


        //
    }


}
