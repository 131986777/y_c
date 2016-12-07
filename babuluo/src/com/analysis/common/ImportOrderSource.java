package com.analysis.common;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import net.sf.json.JSONArray;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by liutao on 2016/12/7 17:55.
 */
public class ImportOrderSource {

    public static void main(String[] args){
        Utils.importSource(getImportSource(),"ANALYSIS_ORDER");
    }

    //获取要导入的数据  REALINCOME 实际收入 TURNOVER 营业额 DEDUCTION 折让金额 ORDERQUANTITY 订单数
    public static Map<String,Map<String,String>> getImportSource(){
        JSONArray j_moneyAbout = getOrderAbout("/stat/member_order_money_about");
        JSONArray j_saleOrders = getOrderAbout("/stat/member_order_discount_orders");
        JSONArray j_disSuccessOrders = getOrderAbout("/stat/member_order_dissuccess_orders");
        JSONArray j_successOrders = getOrderAbout("/stat/member_order_success_orders");
        Map<String,Map<String,String>> map = new HashMap<>();
        Map<String,String> sourceMap = null;
        JSONObject jo = null;
        String j_day = null;
        String eq = null;
        for(int i=0;i<j_moneyAbout.size();i++){
            sourceMap = new HashMap<>();
            jo = JSONObject.parseObject(j_moneyAbout.get(i).toString());
            sourceMap.put("DEDUCTION", (String) jo.get(".DEDUCTION"));//折让金额
            sourceMap.put("ORDER_QUANTITY",(String)jo.get(".ORDERQUANTITY"));//订单数
            sourceMap.put("REAL_INCOME",(String)jo.get(".REALINCOME"));//实际收入
            sourceMap.put("TURNOVER",(String)jo.get(".TURNOVER"));//营业额
            sourceMap.put("CANCEL_ORDERS","0");//取消的订单
            sourceMap.put("CANCEL_MONEY","0");//取消订单的资金
            sourceMap.put("DEDUCTION_ORDERS", "0");//使用优惠的订单
            sourceMap.put("DISSUCCESS_ORDERS", "0");//未完成的订单
            sourceMap.put("SUCCESS_ORDERS", "0");//完成的订单
            j_day = (String) jo.get(".DAY");
            Utils.addMapSource(j_saleOrders,sourceMap,j_day,"DEDUCTION_ORDERS");
            Utils.addMapSource(j_disSuccessOrders, sourceMap, j_day,"DISSUCCESS_ORDERS");
            Utils.addMapSource(j_successOrders,sourceMap,j_day,"SUCCESS_ORDERS");
            map.put("20"+j_day,sourceMap);
        }

        return map;
    }


    //获取 营业额 折让金额 实际合收 交易数 参与优惠订单 正在处理的订单 已经完成的订单
    public static JSONArray getOrderAbout(String arg){
        JSONArray ja = null;
        try {
            ReturnData rd = new API().call(arg);
            List<JSONObject> data = rd.getData();
            ja = JSONArray.fromObject(data);
        } catch (RuleException e) {
            e.printStackTrace();
        }
        return ja;
    }
}
