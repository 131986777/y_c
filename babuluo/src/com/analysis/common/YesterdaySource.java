package com.analysis.common;

import com.alibaba.fastjson.JSONObject;
import net.sf.json.JSONArray;

import java.util.*;

/**
 * Created by liutao on 2016/12/6 17:50.
 */
public class YesterdaySource {
    public static void main(String args[]){
//        addYesterdayOfflineDailySource();
    }

    /**
     * 获取并导入昨天的线下店铺数据
     */
    public void addYesterdayOfflineDailySource(){
        SourceUtil.delYesterDaySource("ANALYSIS_DAILY_OFFLINE");
        JSONArray j_shopAbout = SourceUtil.getJSONArraySource("/stat/shop_list", null);
        JSONArray j_shopOrderAbout = SourceUtil.getJSONArraySource("/stat/shop_offline_money_about_by_range", new HashMap<String, String>() {{
            put("STARTDAY", SourceUtil.getYesterdayDate() + " 0:0:0");
            put("ENDDAY", SourceUtil.getYesterdayDate() + " 23:59:59");
        }});
        JSONArray j_shopCardAbout = SourceUtil.getJSONArraySource("/stat/member_offline_card_newcards_by_range", new HashMap<String, String>() {{
            put("STARTDAY", SourceUtil.getYesterdayDate() + " 0:0:0");
            put("ENDDAY", SourceUtil.getYesterdayDate() + " 23:59:59");
        }});
        Map<String, String> map = new HashMap<>();
        Map<String, Object> firstArgsMap = null;
        Map<String, String> secondArgsMap = null;
        List<Map<String, Object>> list = null;
        JSONObject joNumber = null;
        JSONObject joOther = null;
        String eqNum = null;
        String eqOtherNum = null;
        list = new ArrayList<>();
        for (int j = 0; j < j_shopAbout.size(); j++) {
            firstArgsMap = new HashMap<>();
            secondArgsMap = new HashMap<>();
            secondArgsMap.put("ORDER_COUNT", "0");
            secondArgsMap.put("MONEY_OVER", "0");
            secondArgsMap.put("MONEY_DISCOUNT", "0");
            secondArgsMap.put("MONEY_COUNT", "0");
            secondArgsMap.put("ADD_CARD", "0");
            secondArgsMap.put("ADD_CARD_MONEY", "0");
            joNumber = JSONObject.parseObject(j_shopAbout.get(j).toString());
            eqNum = joNumber.getString("SHOP.ID");
            secondArgsMap.put("SHOP_ID", eqNum);
            for(int l=0;l<j_shopCardAbout.size();l++){
                joOther = JSONObject.parseObject(j_shopCardAbout.get(l).toString());
                eqOtherNum = joOther.getString("FINANCE_LIST.SHOP_ID");
                if(eqNum.equals(eqOtherNum)){
                    secondArgsMap.put("ADD_CARD",joOther.getString(".ADDCARD"));
                    secondArgsMap.put("ADD_CARD_MONEY",joOther.getString("FINANCE_LIST.MONEY_COUNT"));
                    j_shopCardAbout.remove(l);
                    break;
                }
            }
            SourceUtil.addMapSourceByDaily(j_shopOrderAbout, secondArgsMap, eqNum,"SHOP_ORDER_OFFLINE.SOURCE_SHOP",null);
            firstArgsMap.put("SHOP_VALUE", secondArgsMap);
            firstArgsMap.put("SHOP_NAME", joNumber.getString("SHOP.NAME"));
            list.add(firstArgsMap);
        }
        map.put(SourceUtil.getYesterdayDate(), net.sf.json.JSONArray.fromObject(list).toString());
        SourceUtil.importSource(map, "ANALYSIS_DAILY_OFFLINE");
    }
    /**
     * 查询昨天的线下订单数据  并导入MANAGE_DATA_ANALYSIS表中
     */
    public void addYesterdayOfflineOrderSource(){
        SourceUtil.delYesterDaySource("ANALYSIS_ORDER_OFFLINE");
        JSONArray j_moneyAbout = SourceUtil.getJSONArraySource("/stat/member_offline_order_money_about_by_range",new HashMap<String,String>(){{put("STARTDAY",SourceUtil.getYesterdayDate()+" 0:0:0");put("ENDDAY",SourceUtil.getYesterdayDate()+" 23:59:59");}});
        Map<String, String> map = new HashMap<>();
        Map<String, String> resMap = new HashMap<>();
        JSONObject jo = null;
        if(j_moneyAbout.size()!=0){
            jo = JSONObject.parseObject(j_moneyAbout.get(0).toString());
            resMap.put("DEDUCTION",jo.getString(".DISCOUNT"));
            resMap.put("ORDER_QUANTITY",jo.getString(".NUMCOUNT"));
            resMap.put("REAL_INCOME",jo.getString(".MONEY_OVER"));
            resMap.put("TURNOVER",jo.getString(".MONEY_COUNT"));
        }else{
            resMap.put("DEDUCTION", "0");
            resMap.put("ORDER_QUANTITY", "0");
            resMap.put("REAL_INCOME", "0");
            resMap.put("TURNOVER",  "0");
        }

        resMap.put("CANCEL_ORDERS", "0");
        resMap.put("CANCEL_MONEY", "0");
        resMap.put("DEDUCTION_ORDERS",SourceUtil.getAboutSource("/stat/member_offline_discount_orders_by_range",new HashMap<String,String>(){{put("STARTDAY",SourceUtil.getYesterdayDate()+" 0:0:0");put("ENDDAY",SourceUtil.getYesterdayDate()+" 23:59:59");}},".SOURCE"));
        resMap.put("DISSUCCESS_ORDERS",SourceUtil.getAboutSource("/stat/member_offline_dissucess_orders_by_range",new HashMap<String,String>(){{put("STARTDAY",SourceUtil.getYesterdayDate()+" 0:0:0");put("ENDDAY",SourceUtil.getYesterdayDate()+" 23:59:59");}},".SOURCE"));
        resMap.put("SUCCESS_ORDERS", (Integer.parseInt(resMap.get("ORDER_QUANTITY"))-Integer.parseInt(resMap.get("DISSUCCESS_ORDERS")))+"");
        map.put(SourceUtil.getYesterdayDate(), net.sf.json.JSONObject.fromObject(resMap).toString());
        SourceUtil.importSource(map, "ANALYSIS_ORDER_OFFLINE");
    }
    /**
     * 获取昨天的作战室数据并保存到MANAGE_DATA_ANALYSIS表中
     */
    public void addYesterdayCompareSource(){
        SourceUtil.delYesterDaySource("ANALYSIS_COMPARE");
        JSONArray j_shopAbout = SourceUtil.getJSONArraySource("/stat/shop_list",null);
        JSONArray j_shopOrderCompare = SourceUtil.getJSONArraySource("/stat/shop_compare_by_range",new HashMap<String,String>(){{put("STARTDAY",SourceUtil.getYesterdayDate()+" 0:0:0");put("ENDDAY",SourceUtil.getYesterdayDate()+" 23:59:59");}});
        JSONArray j_addCardCompare = SourceUtil.getJSONArraySource("/stat/shop_compare_card_by_range",new HashMap<String,String>(){{put("STARTDAY",SourceUtil.getYesterdayDate()+" 0:0:0");put("ENDDAY",SourceUtil.getYesterdayDate()+" 23:59:59");put("EVENT","会员开卡");put("ORDERBY","count(*)");}});
        JSONArray j_cardMoneyCompare = SourceUtil.getJSONArraySource("/stat/shop_compare_card_by_range",new HashMap<String,String>(){{put("STARTDAY",SourceUtil.getYesterdayDate()+" 0:0:0");put("ENDDAY",SourceUtil.getYesterdayDate()+" 23:59:59");put("EVENT","会员充值");put("ORDERBY","sum(change_value)");}});
        Map<String,String> map = new HashMap<>();//2016-11-12:
        Map<String,Object> firstMap = null;  //status: .. value:...
//        Map<String,Object> secondMap = null; //shop_name:...shop_value:...
        List<Object> listMoney = null;
        List<Object> listCard = null;
        List<Object> listCardMoney = null;
        List<Object> allList = null;
//        JSONObject joOther = null;
//        JSONObject flag = null;
        allList = new ArrayList<>();
        listCard = new ArrayList<>();
        listMoney = new ArrayList<>();
        listCardMoney = new ArrayList<>();
        SourceUtil.addMapSourceByCompare(j_shopAbout,j_shopOrderCompare,listMoney,null, Arrays.asList("MONEY_COUNT",".MONEY_COUNT","SHOP_ORDER.SHOP_ID"));
//        for(int k=0;k<j_shopOrderCompare.size();k++){
//            joOther = JSONObject.parseObject(j_shopOrderCompare.get(k).toString());
//            secondMap = new HashMap<>();
//            firstMap =new HashMap<>();
//            secondMap.put("SHOP_SORT", listMoney.size() + 1);
//            secondMap.put("MONEY_COUNT", joOther.getString(".MONEY_COUNT"));
//            secondMap.put("SHOP_ID", joOther.getString("SHOP_ORDER.SHOP_ID"));
//            for(int l = 0;l<j_shopAbout.size();l++){
//                flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
//                if(flag.getString("SHOP.ID").equals(joOther.getString("SHOP_ORDER.SHOP_ID"))){
//                    firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
//                    firstMap.put("COMPARE_VALUE", secondMap);
//                    listMoney.add(firstMap);
//                    break;
//                }
//            }
//        }
        SourceUtil.addMapSourceByCompare(j_shopAbout,j_addCardCompare,listCard,null, Arrays.asList("ADD_NUMBER",".NUMBER","FINANCE_LIST.SHOP_ID"));
//        for(int k=0;k<j_addCardCompare.size();k++){
//            joOther = JSONObject.parseObject(j_addCardCompare.get(k).toString());
//            secondMap = new HashMap();
//            firstMap = new HashMap<>();
//            secondMap.put("SHOP_SORT", listCard.size() + 1);
//            secondMap.put("ADD_NUMBER",joOther.getString(".NUMBER"));
//            secondMap.put("SHOP_ID",joOther.getString("FINANCE_LIST.SHOP_ID"));
//            for(int l = 0;l<j_shopAbout.size();l++){
//                flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
//                if(flag.getString("SHOP.ID").equals(joOther.getString("FINANCE_LIST.SHOP_ID"))){
//                    firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
//                    firstMap.put("COMPARE_VALUE", secondMap);
//                    listCard.add(firstMap);
//                    break;
//                }
//            }
//        }
        SourceUtil.addMapSourceByCompare(j_shopAbout,j_cardMoneyCompare,listCardMoney,null, Arrays.asList("CARD_MONEY_COUNT",".MONEY_COUNT","FINANCE_LIST.SHOP_ID"));
//        for(int k=0;k<j_cardMoneyCompare.size();k++){
//            joOther = JSONObject.parseObject(j_cardMoneyCompare.get(k).toString());
//            secondMap = new HashMap();
//            firstMap = new HashMap<>();
//            secondMap.put("SHOP_SORT", listCardMoney.size()+1);
//            secondMap.put("CARD_MONEY_COUNT", joOther.getString(".MONEY_COUNT"));
//            secondMap.put("SHOP_ID", joOther.getString("FINANCE_LIST.SHOP_ID"));
//            for(int l = 0;l<j_shopAbout.size();l++){
//                flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
//                if(flag.getString("SHOP.ID").equals(joOther.getString("FINANCE_LIST.SHOP_ID"))){
//                    firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
//                    firstMap.put("COMPARE_VALUE", secondMap);
//                    listCardMoney.add(firstMap);
//                    break;
//                }
//            }
//        }
        firstMap = new HashMap();
        firstMap.put("STATUS","营业额" );
        firstMap.put("VALUE",listMoney);
        allList.add(firstMap);
        firstMap = new HashMap();
        firstMap.put("STATUS","销卡" );
        firstMap.put("VALUE", listCardMoney);
        allList.add(firstMap);
        firstMap = new HashMap();
        firstMap.put("STATUS","开卡" );
        firstMap.put("VALUE",listCard);
        allList.add(firstMap);
        map.put(SourceUtil.getYesterdayDate(),JSONObject.toJSONString(allList));
        SourceUtil.importSource(map,"ANALYSIS_COMPARE");
    }
    /**
     * 导入昨天的店铺数据到MANAGE_DATA_ANALYSIS表中
     */
    public void addYesterdayShopSource() {
        SourceUtil.delYesterDaySource("ANALYSIS_DAILY");
        JSONArray j_shopAbout = SourceUtil.getJSONArraySource("/stat/shop_list", null);
        JSONArray j_shopOrderAbout = SourceUtil.getJSONArraySource("/stat/shop_money_about_by_range", new HashMap<String, String>() {{
            put("STARTDAY", SourceUtil.getYesterdayDate() + " 0:0:0");
            put("ENDDAY", SourceUtil.getYesterdayDate() + " 23:59:59");
        }});
        JSONArray j_shopCardAbout = SourceUtil.getJSONArraySource("/stat/shop_newcard_by_range", new HashMap<String, String>() {{
            put("STARTDAY", SourceUtil.getYesterdayDate() + " 0:0:0");
            put("ENDDAY", SourceUtil.getYesterdayDate() + " 23:59:59");
        }});
        Map<String, String> map = new HashMap<>();
        Map<String, Object> firstArgsMap = null;
        Map<String, String> secondArgsMap = null;
        List<Map<String, Object>> list = null;
        JSONObject joNumber = null;
        JSONObject joOther = null;
        String eqNum = null;
        String eqOtherNum = null;
        list = new ArrayList<>();
        for (int j = 0; j < j_shopAbout.size(); j++) {
            firstArgsMap = new HashMap<>();
            secondArgsMap = new HashMap<>();
            secondArgsMap.put("ORDER_COUNT", "0");
            secondArgsMap.put("MONEY_OVER", "0");
            secondArgsMap.put("MONEY_DISCOUNT", "0");
            secondArgsMap.put("MONEY_COUNT", "0");
            secondArgsMap.put("ADD_CARD", "0");
            secondArgsMap.put("ADD_CARD_MONEY", "0");
            joNumber = JSONObject.parseObject(j_shopAbout.get(j).toString());
            eqNum = joNumber.getString("SHOP.ID");
            secondArgsMap.put("SHOP_ID", eqNum);
            for(int l=0;l<j_shopCardAbout.size();l++){
                joOther = JSONObject.parseObject(j_shopCardAbout.get(l).toString());
                eqOtherNum = joOther.getString("FINANCE_LIST.SHOP_ID");
                if(eqNum.equals(eqOtherNum)){
                    secondArgsMap.put("ADD_CARD",joOther.getString(".ADDCARD"));
                    secondArgsMap.put("ADD_CARD_MONEY",joOther.getString(".MONEY_CONUT"));
                    j_shopCardAbout.remove(l);
                    break;
                }
            }
            SourceUtil.addMapSourceByDaily(j_shopOrderAbout, secondArgsMap, eqNum,"SHOP_ORDER.SHOP_ID",null);
//            for(int k=0;k<j_shopOrderAbout.size();k++){
//                joOther = JSONObject.parseObject(j_shopOrderAbout.get(k).toString());
//                eqOtherNum = joOther.getString("SHOP_ORDER.SHOP_ID");
//                if(eqOtherNum.equals(eqNum)){
//                    secondArgsMap.put("ORDER_COUNT",joOther.getString(".NUMCOUNT"));
//                    secondArgsMap.put("MONEY_OVER",joOther.getString(".MONEY_OVER"));
//                    secondArgsMap.put("MONEY_DISCOUNT",joOther.getString(".DISCOUNT"));
//                    secondArgsMap.put("MONEY_COUNT",joOther.getString(".MONEY_COUNT"));
//                    j_shopOrderAbout.remove(k);
//                    break;
//                }
//            }
            firstArgsMap.put("SHOP_VALUE", secondArgsMap);
            firstArgsMap.put("SHOP_NAME", joNumber.getString("SHOP.NAME"));
            list.add(firstArgsMap);
        }
        map.put(SourceUtil.getYesterdayDate(), net.sf.json.JSONArray.fromObject(list).toString());
        SourceUtil.importSource(map, "ANALYSIS_DAILY");
    }
    /**
     * 查询昨天的订单数据  并导入MANAGE_DATA_ANALYSIS表中
     */
    public void addYesterdayOrderSource() {
        SourceUtil.delYesterDaySource("ANALYSIS_ORDER");
        Map<String, String> map = new HashMap<>();
        Map<String, String> resMap = new HashMap<>();
        JSONObject jo = null;
        JSONArray ja = SourceUtil.getJSONArraySource("/stat/member_order_money_about_by_yesterday", null);
        JSONArray j_backOrders = SourceUtil.getJSONArraySource("/stat/member_order_back_orders_by_range",new HashMap<String, String>() {{
            put("STARTDAY", SourceUtil.getYesterdayDate() + " 0:0:0");
            put("ENDDAY", SourceUtil.getYesterdayDate() + " 23:59:59");
        }});
        if(ja!=null&&ja.size()!=0){
            jo = JSONObject.parseObject(ja.get(0).toString());
            resMap.put("DEDUCTION", jo.getString(".DEDUCTION"));
            resMap.put("ORDER_QUANTITY", jo.getString(".ORDERQUANTITY"));
            resMap.put("REAL_INCOME",jo.getString(".REALINCOME"));
            resMap.put("TURNOVER",jo.getString(".TURNOVER"));
        }else{
            resMap.put("DEDUCTION", "0");
            resMap.put("ORDER_QUANTITY","0");
            resMap.put("REAL_INCOME","0");
            resMap.put("TURNOVER","0");
        }

        if(j_backOrders!=null&&j_backOrders.size()!=0){
            jo = JSONObject.parseObject(j_backOrders.get(0).toString());
            resMap.put("CANCEL_ORDERS",jo.getString(".ORDERQUANTITY"));
            resMap.put("CANCEL_MONEY",jo.getString(".REALINCOME"));
            resMap.put("DEDUCTION",(Integer.parseInt(resMap.get("DEDUCTION"))-jo.getIntValue(".DEDUCTION"))+"");
            resMap.put("ORDER_QUANTITY",(Integer.parseInt(resMap.get("ORDER_QUANTITY"))-jo.getIntValue(".ORDERQUANTITY"))+"");
            resMap.put("REAL_INCOME",(Integer.parseInt(resMap.get("REAL_INCOME"))-jo.getIntValue(".REALINCOME"))+"");
            resMap.put("TURNOVER",(Integer.parseInt(resMap.get("TURNOVER"))-jo.getIntValue(".TURNOVER"))+"");
        }else{
            resMap.put("CANCEL_ORDERS", "0");
            resMap.put("CANCEL_MONEY", "0");
        }
        resMap.put("DEDUCTION_ORDERS", SourceUtil.getAboutSource("/stat/member_order_discount_orders_by_yesterday", null, ".SOURCE"));
        resMap.put("DISSUCCESS_ORDERS", SourceUtil.getAboutSource("/stat/member_order_dissuccess_success_orders_by_yesterday", new HashMap<String, String>() {{
            put("FLAG", "DATETIME_CANCEL");
        }}, ".SOURCE"));
        resMap.put("SUCCESS_ORDERS", SourceUtil.getAboutSource("/stat/member_order_dissuccess_success_orders_by_yesterday", new HashMap<String, String>() {{
            put("FLAG", "DATETIME_DELIVERY");
        }}, ".SOURCE"));
        map.put(SourceUtil.getYesterdayDate(), net.sf.json.JSONObject.fromObject(resMap).toString());
        SourceUtil.importSource(map, "ANALYSIS_ORDER");
    }
    /**
     * 查询昨天的会员卡数据  并导入MANAGE_DATA_ANALYSIS表中
     */
    public void addYesterdayCardSource() {
        SourceUtil.delYesterDaySource("ANALYSIS_CARD");
        Map<String, String> map = new HashMap<>();
        Map<String, String> resMap = new HashMap<>();
        resMap.put("CONSUME", SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday", new HashMap<String, String>() {{
            put("EVENT", "消费");
        }}, ".SOURCE"));
        resMap.put("RECHARGEONLINE", SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday", new HashMap<String, String>() {{
            put("EVENT", "会员卡充值");
        }}, ".SOURCE"));
        resMap.put("RECHARGE", SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday", new HashMap<String, String>() {{
            put("EVENT", "会员充值");
        }}, ".SOURCE"));
        resMap.put("CONSUMERED", SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday", new HashMap<String, String>() {{
            put("EVENT", "消费冲红");
        }}, ".SOURCE"));
        resMap.put("REVERT", SourceUtil.getAboutSource("/stat/member_card_money_by_yesterday", new HashMap<String, String>() {{
            put("EVENT", "返点");
        }}, ".SOURCE"));
        resMap.put("ADDCARD", SourceUtil.getAboutSource("/stat/member_card_by_yesterday", null, ".SOURCE"));
        map.put(SourceUtil.getYesterdayDate(), net.sf.json.JSONObject.fromObject(resMap).toString());
        SourceUtil.importSource(map, "ANALYSIS_CARD");
    }
}
