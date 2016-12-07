package com.analysis.common;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import net.sf.json.JSONArray;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by liutao on 2016/12/6 17:50.
 */
public class YesterdayOnceMore {
    /**
     * 此方法包含以昨天为基准的新增会员，充值，消费，消费红冲，返点数据
     */
    public static void addYesterdayCardSource(){
        String ysd = getYesterDay();
        delYesterDaySource(ysd);
        Map<String,String> resMap = new HashMap<>();
        resMap.put("consume",getSource("消费"));
        resMap.put("rechargeOnline",getSource("会员卡充值"));
        resMap.put("recharge",getSource("会员充值"));
        resMap.put("consumeRed",getSource("消费冲红"));
        resMap.put("revert",getSource("返点"));
        resMap.put("addCard",getAddVipCard());
        String content = net.sf.json.JSONObject.fromObject(resMap).toString();
        Map<String,String> argsMap = new HashMap<>();
        argsMap.put("MANAGE_DATA_ANALYSIS.ANALYSIS_DATA",ysd);
        argsMap.put("MANAGE_DATA_ANALYSIS.CONTENT",content);
        argsMap.put("MANAGE_DATA_ANALYSIS.FLAG","ANALYSIS_CARD");
        try {
            ReturnData rd = new API().call("/stat/manage_data_analysis_add",argsMap);
            //TODO this.getCode(),this.getMsg() is "" 不能判断
            System.out.println("--------------------------Quartz yestarday card source insert success by YesterDayOnceMore addYesterdayCardSource----------------");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 获取无格式数据
     * @param arg
     * @return
     */
    public static String getSource(String arg){
        String str = null;
        try {
            Map<String ,String> map = new HashMap<>();
            map.put("EVENT",arg);
            ReturnData rd = new API().call("/stat/member_card_money_by_yesterday", map);
            List<JSONObject> data = rd.getData();
            JSONArray jsonArray = JSONArray.fromObject(data);
            JSONObject jb = JSONObject.parseObject(jsonArray.get(0).toString());
            str = (String) jb.get(".SOURCE");
        } catch (RuleException e) {
            System.out.println("-----------------Quartz Yestarday card source exception by YesterDayOnceMore.getSource--------------------------");
            e.printStackTrace();
        }
        if(str==null){
            str = "0";
        }
        return str;
    }
    /**
     * 获取新增的会员卡的个数
     * @return
     */
    public static String getAddVipCard(){
        String str = null;
        try {
            ReturnData rd = new API().call("/stat/member_card_by_yesterday");
            List<JSONObject> data = rd.getData();
            JSONArray jsonArray = JSONArray.fromObject(data);
            JSONObject jb = JSONObject.parseObject(jsonArray.get(0).toString());
            str = (String) jb.get(".SOURCE");
        } catch (RuleException e) {
            System.out.println("-----------------Quartz Yestarday card source exception by YesterDayOnceMore.getAddVipCard--------------------------");
            e.printStackTrace();
        }
        if(str==null){
            str = "0";
        }
        return str;
    }
    //获取昨天的日期
    public static String getYesterDay(){
        Date date = new Date();
        Calendar c = new GregorianCalendar();
        c.setTime(date);
        c.add(Calendar.DATE,-1);
        date = c.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }
    //删除已经存在的昨天的数据
    public static void delYesterDaySource(String arg){
        Map<String,String> map = new HashMap<>();
        map.put("ANALYSIS_DATA",arg);
        try {
            ReturnData rd = new API().call("/stat/member_card_money_del_yestarday",map);
        } catch (RuleException e) {
            System.out.println("-----------------Quartz Yestarday card source exception by YesterDayOnceMore.delYesterdaySource--------------------------");
            e.printStackTrace();
        }
    }
}
