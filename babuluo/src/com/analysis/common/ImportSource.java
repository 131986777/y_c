package com.analysis.common;


import com.alibaba.fastjson.JSONObject;
import net.sf.json.JSONArray;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by liutao on 2016/12/6 13:20.
 */
public class ImportSource {

    public static void main(String[] args){
//        getDaliyImportSource();
//        SourceUtil.importSource(getDaliyImportSource(),"ANALYSIS_DAILY");
//        long l = System.currentTimeMillis();
//        SourceUtil.importSource(getCompareSource(),"ANALYSIS_COMPARE");
////        getDaliyImportSource();
//        System.out.println(System.currentTimeMillis()-l);
        SourceUtil.importSource(ImportSource.getDaliyImportSource(),"ANALYSIS_DAILY");
//
    }

    /**
     *获取之前的店铺比对数据
     * @return
     */
    public static Map<String,String> getCompareSource(){
        JSONArray j_shopAbout = SourceUtil.getJSONArraySource("/stat/shop_list",null);
        JSONArray j_shopOrderCompare = SourceUtil.getJSONArraySource("/stat/shop_compare_by_range",new HashMap<String,String>(){{put("STARTDAY","1970-1-1");put("ENDDAY",new SimpleDateFormat("yyyy-MM-dd").format(new Date()));}});
        JSONArray j_addCardCompare = SourceUtil.getJSONArraySource("/stat/shop_compare_card_by_range",new HashMap<String,String>(){{put("STARTDAY","1970-1-1");put("ENDDAY",new SimpleDateFormat("yyyy-MM-dd").format(new Date()));put("EVENT","会员开卡");put("ORDERBY","count(*)");}});
        JSONArray j_cardMoneyCompare = SourceUtil.getJSONArraySource("/stat/shop_compare_card_by_range",new HashMap<String,String>(){{put("STARTDAY","1970-1-1");put("ENDDAY",new SimpleDateFormat("yyyy-MM-dd").format(new Date()));put("EVENT","会员充值");put("ORDERBY","sum(change_value)");}});
        Map<String,String> map = new HashMap<>();//2016-11-12:
        Map<String,Object> firstMap = null;  //status: .. value:...
        Map<String,Object> secondMap = null; //shop_name:...shop_value:...
        List<Object> listMoney = null;
        List<Object> listCard = null;
        List<Object> listCardMoney = null;
        List<Object> allList = null;
        JSONObject joOther = null;
        JSONObject flag = null;
        String eqDay = null;
        List<String> dayList = new LinkedList<>();
        for(int i=0;i<j_shopOrderCompare.size();i++){
            joOther = JSONObject.parseObject(j_shopOrderCompare.get(i).toString());
            if(!dayList.contains(joOther.getString(".DAY"))){
                dayList.add(joOther.getString(".DAY"));
            }

        }
        for(int i=0;i<j_cardMoneyCompare.size();i++){
            joOther = JSONObject.parseObject(j_cardMoneyCompare.get(i).toString());
            if(!dayList.contains(joOther.getString(".DAY"))){
                dayList.add(joOther.getString(".DAY"));
            }
        }
        for(int i=0;i<j_addCardCompare.size();i++){
            joOther = JSONObject.parseObject(j_addCardCompare.get(i).toString());
            if(!dayList.contains(joOther.getString(".DAY"))){
                dayList.add(joOther.getString(".DAY"));
            }
        }
        for(int i=0;i<dayList.size();i++){
            allList = new ArrayList<>();
            listCard = new ArrayList<>();
            listMoney = new ArrayList<>();
            listCardMoney = new ArrayList<>();
            eqDay = dayList.get(i);
            for(int k=0;k<j_shopOrderCompare.size();k++){
                joOther = JSONObject.parseObject(j_shopOrderCompare.get(k).toString());
                if(joOther.getString(".DAY").equals(eqDay)){
                    secondMap = new HashMap<>();
                    firstMap =new HashMap<>();
                    secondMap.put("SHOP_SORT", listMoney.size() + 1);
                    secondMap.put("MONEY_COUNT", joOther.getString(".MONEY_COUNT"));
                    secondMap.put("SHOP_ID", joOther.getString("SHOP_ORDER.SHOP_ID"));
                    for(int l = 0;l<j_shopAbout.size();l++){
                        flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
                        if(flag.getString("SHOP.ID").equals(joOther.getString("SHOP_ORDER.SHOP_ID"))){
                            firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
                            firstMap.put("COMPARE_VALUE", secondMap);
                            listMoney.add(firstMap);
                            break;
                        }
                    }
                }
            }
            for(int k=0;k<j_addCardCompare.size();k++){
                joOther = joOther = JSONObject.parseObject(j_addCardCompare.get(k).toString());
                if(eqDay.equals(joOther.getString(".DAY"))){
                    secondMap = new HashMap();
                    firstMap = new HashMap<>();
                    secondMap.put("SHOP_SORT", listCard.size() + 1);
                    secondMap.put("ADD_NUMBER",joOther.getString(".NUMBER"));
                    secondMap.put("SHOP_ID",joOther.getString("FINANCE_LIST.SHOP_ID"));
                    for(int l = 0;l<j_shopAbout.size();l++){
                        flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
                        if(flag.getString("SHOP.ID").equals(joOther.getString("FINANCE_LIST.SHOP_ID"))){
                            firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
                            firstMap.put("COMPARE_VALUE", secondMap);
                            listCard.add(firstMap);
                            break;
                        }
                    }
                }
            }
            for(int k=0;k<j_cardMoneyCompare.size();k++){
                joOther = JSONObject.parseObject(j_cardMoneyCompare.get(k).toString());
                if(eqDay.equals(joOther.getString(".DAY"))){
                    secondMap = new HashMap();
                    firstMap = new HashMap<>();
                    secondMap.put("SHOP_SORT", listCardMoney.size()+1);
                    secondMap.put("CARD_MONEY_COUNT", joOther.getString(".MONEY_COUNT"));
                    secondMap.put("SHOP_ID", joOther.getString("FINANCE_LIST.SHOP_ID"));
                    for(int l = 0;l<j_shopAbout.size();l++){
                        flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
                        if(flag.getString("SHOP.ID").equals(joOther.getString("FINANCE_LIST.SHOP_ID"))){
                            firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
                            firstMap.put("COMPARE_VALUE", secondMap);
                            listCardMoney.add(firstMap);
                            break;
                        }
                    }
                }
            }
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
            map.put("20"+eqDay,JSONObject.toJSONString(allList));
        }
        return map;
    }
    /**
     * 获取之前的店铺数据
     * ORDER_COUNT：订单数量
     * MONEY_OVER：销售金额
     * MONEY_DISCOUNT：折让金额
     * MONEY_COUNT：客单价
     * ADD_CARD：添加到卡
     * ADD_CARD_MONEY：添加卡的金额
     * @return
     */
    public static Map<String,String> getDaliyImportSource(){
        JSONArray j_shopAbout = SourceUtil.getJSONArraySource("/stat/shop_list",null);
        JSONArray j_shopOrderAbout = SourceUtil.getJSONArraySource("/stat/shop_money_about_by_range",new HashMap<String,String>(){{put("STARTDAY","1970-1-1");put("ENDDAY",new SimpleDateFormat("yyyy-MM-dd").format(new Date())+" 23:59:59");}});
        JSONArray j_shopCardAbout = SourceUtil.getJSONArraySource("/stat/shop_newcard_by_range",new HashMap<String,String>(){{put("STARTDAY","1970-1-1");put("ENDDAY",new SimpleDateFormat("yyyy-MM-dd").format(new Date())+" 23:59:59");}});
        Map<String,String> map = new HashMap<>();
        Map<String,Object> firstArgsMap = null;
        Map<String,String> secondArgsMap = null;
        List<Map<String,Object>> list = null;
        JSONObject joNumber= null;
        JSONObject joOther = null;
        String eqDate = null;
        String eqNum= null;
        String eqOtherNum = null;
        String eqDateByCard = null;
        List<String> dayList = new ArrayList<>();
        for(int i=0;i<j_shopOrderAbout.size();i++){
            joOther = JSONObject.parseObject(j_shopOrderAbout.get(i).toString());
            if(!dayList.contains(joOther.getString(".DAY"))){
                dayList.add(joOther.getString(".DAY"));
            }
        }
        for(int i=0;i<dayList.size();i++){
            list = new ArrayList<>();
            for(int j=0;j<j_shopAbout.size();j++){
                joNumber =  JSONObject.parseObject(j_shopAbout.get(j).toString());
                eqNum = joNumber.getString("SHOP.ID");
                firstArgsMap = new HashMap<>();
                secondArgsMap = new HashMap<>();
                secondArgsMap.put("ORDER_COUNT","0");
                secondArgsMap.put("MONEY_OVER","0");
                secondArgsMap.put("MONEY_DISCOUNT","0");
                secondArgsMap.put("MONEY_COUNT","0");
                secondArgsMap.put("ADD_CARD","0");
                secondArgsMap.put("ADD_CARD_MONEY","0");
                secondArgsMap.put("SHOP_ID",eqNum);
                for(int l=0;l<j_shopCardAbout.size();l++){
                    joOther = JSONObject.parseObject(j_shopCardAbout.get(l).toString());
                    eqDate = joOther.getString(".DAY");
                    eqOtherNum = joOther.getString("FINANCE_LIST.SHOP_ID");
                    if(eqDate.equals(dayList.get(i))&&eqNum.equals(eqOtherNum)){
                        secondArgsMap.put("ADD_CARD",joOther.getString(".ADDCARD"));
                        secondArgsMap.put("ADD_CARD_MONEY",joOther.getString(".MONEY_CONUT"));
                    }
                }
                for(int k=0;k<j_shopOrderAbout.size();k++){
                    joOther = JSONObject.parseObject(j_shopOrderAbout.get(k).toString());
                    eqOtherNum = joOther.getString("SHOP_ORDER.SHOP_ID");
                    eqDate = joOther.getString(".DAY");
                    if(eqDate.equals(dayList.get(i))&&eqOtherNum.equals(eqNum)){
                        secondArgsMap.put("ORDER_COUNT",joOther.getString(".NUMCOUNT"));
                        secondArgsMap.put("MONEY_OVER",joOther.getString(".MONEY_OVER"));
                        secondArgsMap.put("MONEY_DISCOUNT",joOther.getString(".DISCOUNT"));
                        secondArgsMap.put("MONEY_COUNT",joOther.getString(".MONEY_COUNT"));
                        firstArgsMap.put("SHOP_VALUE",secondArgsMap);
                        firstArgsMap.put("SHOP_NAME",joNumber.getString("SHOP.NAME"));
                        list.add(firstArgsMap);
                    }
                }
            }
            map.put(dayList.get(i), JSONArray.fromObject(list).toString());
        }
        return map;
    }
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
    public static Map<String,String> getOrderImportSource(){
        JSONArray j_moneyAbout = SourceUtil.getJSONArraySource("/stat/member_order_money_about",null);
        JSONArray j_saleOrders = SourceUtil.getJSONArraySource("/stat/member_order_discount_orders",null);
        JSONArray j_disSuccessOrders = SourceUtil.getJSONArraySource("/stat/member_order_dissuccess_orders",null);
        JSONArray j_successOrders = SourceUtil.getJSONArraySource("/stat/member_order_success_orders",null);
        Map<String,String> map = new HashMap<>();
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
            SourceUtil.addMapSource(j_saleOrders,sourceMap,j_day,"DEDUCTION_ORDERS",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_disSuccessOrders, sourceMap, j_day,"DISSUCCESS_ORDERS",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_successOrders,sourceMap,j_day,"SUCCESS_ORDERS",".DAY",".SOURCE");
            map.put("20"+j_day, net.sf.json.JSONObject.fromObject(sourceMap).toString());
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
    public static Map<String,String> getCardImportSource(){
        JSONArray j_riqi = SourceUtil.getJSONArraySource("/stat/member_card_money_change_range",null);
        JSONArray j_xiaofei = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "消费");}});
        JSONArray j_huiyuanchongzhi = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "会员充值");}});
        JSONArray j_huiyuanchongzhixianxia = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "会员卡充值");}});
        JSONArray j_xiaofeichonghong = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "消费冲红");}});
        JSONArray j_fandian = SourceUtil.getJSONArraySource("/stat/member_card_money_group",new HashMap<String,String>(){{put("EVENT", "返点");}});
        JSONArray j_tianjiaohuiyuan = SourceUtil.getJSONArraySource("/stat/member_crad_count_group",null);
        JSONObject jo_riqi = null;
        JSONObject jo = null;
        Map<String,String> map = new HashMap<>();;
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
            SourceUtil.addMapSource(j_xiaofei,sourceMap,eqRiqi,"CONSUME",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_huiyuanchongzhi,sourceMap,eqRiqi,"RECHARGEONLINE",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_xiaofeichonghong,sourceMap,eqRiqi,"CONSUMERED",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_fandian,sourceMap,eqRiqi,"REVERT",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_tianjiaohuiyuan,sourceMap,eqRiqi,"ADDCARD",".DAY",".SOURCE");
            SourceUtil.addMapSource(j_huiyuanchongzhixianxia,sourceMap,eqRiqi,"RECHARGE",".DAY",".SOURCE");
            map.put("20"+eqRiqi, net.sf.json.JSONObject.fromObject(sourceMap).toString());
        }
        return map;
    }
}
