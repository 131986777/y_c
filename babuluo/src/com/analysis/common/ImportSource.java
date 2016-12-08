package com.analysis.common;


import com.alibaba.fastjson.JSONObject;
import net.sf.json.JSONArray;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by liutao on 2016/12/6 13:20.
 */
public class ImportSource {
    /**
     * TODO 取消的订单和取消的订单的金额留空
     * 获取以前的订单数据  并将其 格式化  导入方式：SourceUtil.importSource(getOrderImportSource(),"ANALYSIS_ORDER");
     * DEDUCTION：折让金额
     * ORDERQUANTITY：订单数
     * REALINCOME：实际收入
     * TURNOVER：营业额
     * CANCEL_ORDERS：取消的订单
     * CANCEL_MONEY：取消订单的资金
     * DEDUCTION_ORDERS：使用优惠的订单
     * DISSUCCESS_ORDERS：未完成的订单
     * SUCCESS_ORDERS：完成的订单
     * @return
     */
    public static Map<String,Map<String,String>> getOrderImportSource(){
        JSONArray j_moneyAbout = SourceUtil.getJSONArraySource("/stat/member_order_money_about",null);
        JSONArray j_saleOrders = SourceUtil.getJSONArraySource("/stat/member_order_discount_orders",null);
        JSONArray j_disSuccessOrders = SourceUtil.getJSONArraySource("/stat/member_order_dissuccess_orders",null);
        JSONArray j_successOrders = SourceUtil.getJSONArraySource("/stat/member_order_success_orders",null);
        Map<String,Map<String,String>> map = new HashMap<>();
        Map<String,String> sourceMap = null;
        JSONObject jo = null;
        String j_day = null;
        String eq = null;
        for(int i=0;i<j_moneyAbout.size();i++){
            sourceMap = new HashMap<>();
            jo = JSONObject.parseObject(j_moneyAbout.get(i).toString());
            sourceMap.put("DEDUCTION", (String) jo.get(".DEDUCTION"));
            sourceMap.put("ORDER_QUANTITY",(String)jo.get(".ORDERQUANTITY"));
            sourceMap.put("REAL_INCOME",(String)jo.get(".REALINCOME"));
            sourceMap.put("TURNOVER",(String)jo.get(".TURNOVER"));
            sourceMap.put("CANCEL_ORDERS","0");
            sourceMap.put("CANCEL_MONEY","0");
            sourceMap.put("DEDUCTION_ORDERS", "0");
            sourceMap.put("DISSUCCESS_ORDERS", "0");
            sourceMap.put("SUCCESS_ORDERS", "0");
            j_day = (String) jo.get(".DAY");
            SourceUtil.addMapSource(j_saleOrders,sourceMap,j_day,"DEDUCTION_ORDERS");
            SourceUtil.addMapSource(j_disSuccessOrders, sourceMap, j_day,"DISSUCCESS_ORDERS");
            SourceUtil.addMapSource(j_successOrders,sourceMap,j_day,"SUCCESS_ORDERS");
            map.put("20"+j_day,sourceMap);
        }

        return map;
    }
    /**
     * 获取以前的会员卡数据  并格式化 导入方式:SourceUtil.importSource(getCardImportSource(),"ANALYSIS_CARD");
     * CONSUME:消费
     * RECHARGEONLINE：在线充值
     * CONSUMERED：消费红冲
     * REVERT：返点
     * ADDCARD：添加的会员卡
     * RECHARGE：线下充值
     * @return 添加好数据的 map
     */
    public static Map<String,Map<String,String>> getCardImportSource(){
        JSONArray j_riqi = SourceUtil.getJSONArraySource("/stat/member_card_money_change_range",null);
        JSONArray j_xiaofei = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "消费");}});
        JSONArray j_huiyuanchongzhi = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "会员充值");}});
        JSONArray j_huiyuanchongzhixianxia = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "会员卡充值");}});
        JSONArray j_xiaofeichonghong = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "消费冲红");}});
        JSONArray j_fandian = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "返点");}});
        JSONArray j_tianjiaohuiyuan = SourceUtil.getJSONArraySource("/stat/member_crad_count_group",null);
        JSONObject jo_riqi = null;
        JSONObject jo = null;
        Map<String,Map<String,String>> map = new HashMap<>();;
        Map<String,String> sourceMap = null;
        String eq = null;
        for(int i=0;i<j_riqi.size();i++){
            jo_riqi = JSONObject.parseObject(j_riqi.get(i).toString());
            String eqRiqi = (String) jo_riqi.get("._RANGE");
            sourceMap = new HashMap<>();
            sourceMap.put("CONSUME","0");
            sourceMap.put("RECHARGEONLINE","0");
            sourceMap.put("CONSUMERED","0");
            sourceMap.put("REVERT","0");
            sourceMap.put("ADDCARD","0");
            sourceMap.put("RECHARGE","0");
            SourceUtil.addMapSource(j_xiaofei,sourceMap,eqRiqi,"CONSUME");
            SourceUtil.addMapSource(j_huiyuanchongzhi,sourceMap,eqRiqi,"RECHARGEONLINE");
            SourceUtil.addMapSource(j_xiaofeichonghong,sourceMap,eqRiqi,"CONSUMERED");
            SourceUtil.addMapSource(j_fandian,sourceMap,eqRiqi,"REVERT");
            SourceUtil.addMapSource(j_tianjiaohuiyuan,sourceMap,eqRiqi,"ADDCARD");
            SourceUtil.addMapSource(j_huiyuanchongzhixianxia,sourceMap,eqRiqi,"RECHARGE");
            map.put("20"+eqRiqi,sourceMap);
        }
        return map;
    }

}
