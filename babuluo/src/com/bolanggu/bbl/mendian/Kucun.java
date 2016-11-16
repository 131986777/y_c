package com.bolanggu.bbl.mendian;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
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

    public static String run(String meidianID,String prdID){
        String url = httpPostJson.ERP_DOMAIN + "GetAvailableStock";

        Map map =new HashMap<>();
        map.put("Sign","F4EBA1DE727A41A91B5D10754BFBF657");
        map.put("nodecode",meidianID);
        map.put("goodsCode",prdID);

        System.err.println("MAP: " + map.toString());

        String returnStr = HttpClientUtil.doPost(url,map);


        System.out.println(returnStr);

        return returnStr;

    }

    public static void main(String[] args) throws IOException {
       tongbu();
    }


    public static void tongbu() {

//        run("ddd","333");


        API api = new API();

        try {
//            List<JSONObject> mendianObj = api.call("/shop/shop/queryAll").getData();
//            for(int i = 0;i<mendianObj.size();i++){

                //String mendianID = (String)mendianObj.get(i).get("SHOP.SHOP_ID");
                //String mendianID = "100012";
                //System.err.println("mendian: " + mendianID);

                List<JSONObject> skuDatal = api.call("/shop/product/sku/queryAll").getData();
                for(int j = 0;j<skuDatal.size();j++){

                    String prdID = (String)skuDatal.get(j).get("SHOP_PRODUCT_SKU.PRD_ID");
                    String mendianPRIID = (String)skuDatal.get(j).get("SHOP_PRODUCT_SKU.PRD_SKU");
                    String skuID = (String)skuDatal.get(j).get("SHOP_PRODUCT_SKU.SKU_ID");

                    List<String> list =new ArrayList<String >();
                    list.add("100008");
                    list.add("100015");
                    list.add("100012");
                    list.add("100026");
                    list.add("100002");
                    list.add("100036");

                    for (int i = 0; i < list.size(); i++) {
                        String mendianID= list.get(i);
                        String returnStr = run(mendianID,mendianPRIID);
                        JSONObject returnJSOn = JSONObject.parseObject(returnStr);

                        if(returnJSOn.get("errMsg").equals("")){

                            returnJSOn = (JSONObject)returnJSOn.getJSONArray("goodsInfos").get(0);

                            ///  更新库存与价格
                            HashMap map = new HashMap();
                            map.put("SHOP_ID",mendianID);
                            map.put("SKU_ID",mendianPRIID);
                            map.put("PRD_ID",prdID);
                            map.put("COUNT",returnJSOn.get("stockAmount"));
                            map.put("PRICE",returnJSOn.getDouble("salePrice"));
                            System.err.println("PPPP: " + returnJSOn.getDouble("salePrice"));
                            api.call("/stock/realtime/updateStockAndPrice",map);
                        }else{
                            System.err.println("百年接口错误: " + returnStr);
                        }
                    }
                }
//            }
        } catch (RuleException e) {
            e.printStackTrace();
        }


        //
    }


}
