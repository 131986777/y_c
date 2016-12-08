package com.analysis.common;

import com.alibaba.fastjson.JSONObject;
import net.sf.json.JSONArray;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by liutao on 2016/12/6 17:50.
 */
public class YesterdaySource {

    /**
     *查询昨天的订单数据  并导入MANAGE_DATA_ANALYSIS表中
     */
    public static void addYesterdayOrderSource(){
        SourceUtil.delYesterDaySource("ANALYSIS_ORDER");
        Map<String,Map<String,String>> map = new HashMap<>();
        Map<String,String> resMap = new HashMap<>();
        JSONArray ja = SourceUtil.getJSONArraySource("/stat/member_order_money_about_by_yesterday",null);
        JSONObject jo =  JSONObject.parseObject(ja.get(0).toString());
        resMap.put("DEDUCTION", ((String) jo.get(".DEDUCTION"))==null?"0":(String) jo.get(".DEDUCTION"));
        resMap.put("ORDER_QUANTITY",((String)jo.get(".ORDERQUANTITY"))==null?"0":(String)jo.get(".ORDERQUANTITY"));
        resMap.put("REAL_INCOME",((String)jo.get(".REALINCOME"))==null?"0":(String)jo.get(".REALINCOME"));
        resMap.put("TURNOVER",((String)jo.get(".TURNOVER"))==null?"0":(String)jo.get(".TURNOVER"));
        resMap.put("CANCEL_ORDERS","0");
        resMap.put("CANCEL_MONEY","0");
        resMap.put("DEDUCTION_ORDERS", SourceUtil.getAboutSource("/stat/member_order_discount_orders_by_yesterday",null,".SOURCE"));
        resMap.put("DISSUCCESS_ORDERS",SourceUtil.getAboutSource("/stat/member_order_dissuccess_success_orders_by_yesterday",new HashMap<String,String>(){{put("FLAG","DATETIME_CANCEL");}},".SOURCE"));
        resMap.put("SUCCESS_ORDERS",SourceUtil.getAboutSource("/stat/member_order_dissuccess_success_orders_by_yesterday",new HashMap<String,String>(){{put("FLAG","DATETIME_DELIVERY");}},".SOURCE"));
        map.put(SourceUtil.getYesterdayDate(),resMap);
        SourceUtil.importSource(map,"ANALYSIS_ORDER");
    }
    /**
     * 查询昨天的会员卡数据  并导入MANAGE_DATA_ANALYSIS表中
     */
    public static void addYesterdayCardSource(){
        SourceUtil.delYesterDaySource("ANALYSIS_CARD");
        Map<String,Map<String,String>> map = new HashMap<>();
        Map<String,String> resMap = new HashMap<>();
        resMap.put("CONSUME",SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday",new HashMap<String,String>(){{put("EVENT","消费");}},".SOURCE"));
        resMap.put("RECHARGEONLINE",SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday",new HashMap<String,String>(){{put("EVENT","会员卡充值");}},".SOURCE"));
        resMap.put("RECHARGE",SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday",new HashMap<String,String>(){{put("EVENT","会员充值");}},".SOURCE"));
        resMap.put("CONSUMERED",SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday",new HashMap<String,String>(){{put("EVENT","消费冲红");}},".SOURCE"));
        resMap.put("REVERT",SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday",new HashMap<String,String>(){{put("EVENT","返点");}},".SOURCE"));
        resMap.put("ADDCARD",SourceUtil.getAboutSource("/stat/member_card_by_yesterday",null,".SOURCE"));
        map.put(SourceUtil.getYesterdayDate(),resMap);
        SourceUtil.importSource(map,"ANALYSIS_CARD");
    }
}
