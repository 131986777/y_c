package com.analysis.common;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import net.sf.json.JSONArray;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by liutao on 2016/12/7 18:49.
 */
public class SourceUtil {
    /**
     * 添加日报相关共用方法 TODO 只有日报相关
     * @param j_shopOrderAbout 日报订单记录不分线上和线下
     * @param secondArgsMap 要添加到map
     * @param eqNum 比对的数据
     * @param key 不同场景下 SHOP.ID不同  用这个区别
     */
    public static void addMapSourceByDaily(JSONArray j_shopOrderAbout, Map<String, String> secondArgsMap, String eqNum,String key,String dayListToday) {
        JSONObject joOther;
        String eqOtherNum;
        for(int k = 0; k<j_shopOrderAbout.size(); k++){
            joOther = JSONObject.parseObject(j_shopOrderAbout.get(k).toString());
            eqOtherNum = joOther.getString(key);
            if(dayListToday!=null){
                String eqDate = joOther.getString(".DAY");
                if(eqDate.equals(dayListToday)&&eqOtherNum.equals(eqNum)){
                    secondArgsMap.put("ORDER_COUNT",joOther.getString(".NUMCOUNT"));
                    secondArgsMap.put("MONEY_OVER",joOther.getString(".MONEY_OVER"));
                    secondArgsMap.put("MONEY_DISCOUNT",joOther.getString(".DISCOUNT"));
                    secondArgsMap.put("MONEY_COUNT",joOther.getString(".MONEY_COUNT"));
                    j_shopOrderAbout.remove(k);
                    break;
                }
            }else{
                if(eqOtherNum.equals(eqNum)){
                    secondArgsMap.put("ORDER_COUNT",joOther.getString(".NUMCOUNT"));
                    secondArgsMap.put("MONEY_OVER",joOther.getString(".MONEY_OVER"));
                    secondArgsMap.put("MONEY_DISCOUNT",joOther.getString(".DISCOUNT"));
                    secondArgsMap.put("MONEY_COUNT",joOther.getString(".MONEY_COUNT"));
                    j_shopOrderAbout.remove(k);
                    break;
                }
            }
        }
    }
    /**
     * 通用添加店铺比对数据 TODO 只有店铺比对这里能用  别的都不行
     * @param j_shopAbout 店铺相关源数据
     * @param j_other     要比较多数据
     * @param otherList   保存要添加数据的list
     * @param eqDay       比对的日期
     * @param argsList    参数  一般是三个  要添加到字段 此字段在json中的值的key  此类记录JSON中Shop.对应的key
     */
    public static void addMapSourceByCompare(JSONArray j_shopAbout, JSONArray j_other, List<Object> otherList, String eqDay,List<String> argsList) {
        JSONObject joOther;
        Map<String, Object> secondMap;
        Map<String, Object> firstMap;
        JSONObject flag;
        for(int k = 0; k<j_other.size(); k++){
            joOther = JSONObject.parseObject(j_other.get(k).toString());
            secondMap = new HashMap<>();
            firstMap =new HashMap<>();
            secondMap.put("SHOP_SORT", otherList.size() + 1);
            secondMap.put(argsList.get(0), joOther.getString(argsList.get(1)));
            secondMap.put("SHOP_ID", joOther.getString(argsList.get(2)));
            if(eqDay!=null&&joOther.getString(".DAY").equals(eqDay)){
                for(int l = 0;l<j_shopAbout.size();l++){
                    flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
                    if(flag.getString("SHOP.ID").equals(joOther.getString(argsList.get(2)))){
                        firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
                        firstMap.put("COMPARE_VALUE", secondMap);
                        otherList.add(firstMap);
                        break;
                    }
                }
            }else{
                for(int l = 0;l<j_shopAbout.size();l++){
                    flag = JSONObject.parseObject(j_shopAbout.get(l).toString());
                    if(flag.getString("SHOP.ID").equals(joOther.getString(argsList.get(2)))){
                        firstMap.put("COMPARE_NAME", flag.getString("SHOP.NAME"));
                        firstMap.put("COMPARE_VALUE", secondMap);
                        otherList.add(firstMap);
                        break;
                    }
                }
            }
        }
    }
    /**
     * 删除已经存在的昨天的数据
     *
     * @param flag 数据标识  ANALYSIS_CARD & ANALYSIS_ORDER
     */
    public static void delYesterDaySource(String flag) {
        Map<String, String> map = new HashMap<>();
        map.put("ANALYSIS_DATA", getYesterdayDate());
        map.put("FLAG", flag);
        try {
            ReturnData rd = new API().call("/stat/member_card_money_del_yestarday", map);
        } catch (RuleException e) {
            e.printStackTrace();
        }
    }
    /**
     * 获取昨天的日期
     *
     * @return
     */
    public static String getYesterdayDate() {
        Date date = new Date();
        Calendar c = new GregorianCalendar();
        c.setTime(date);
        c.add(Calendar.DATE, -1);
        date = c.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }
    /**
     * 获取昨天的相关数据
     *
     * @param api     要访问的接口
     * @param argsMap 参数 可以为空
     * @param flag    从map中要取出的数据标识
     * @return 取出来的数据
     */
    public static String getAboutSource(String api, Map<String, String> argsMap, String flag) {
        String str = null;
        ReturnData rd = null;
        List<JSONObject> data = null;
        JSONArray jsonArray = null;
        JSONObject jb = null;
        if (argsMap == null) {
            try {
                rd = new API().call(api);
                data = rd.getData();
                jsonArray = JSONArray.fromObject(data);
                jb = JSONObject.parseObject(jsonArray.get(0).toString());
                str = (String) jb.get(flag);
            } catch (RuleException e) {
                e.printStackTrace();
            }
        } else {
            try {
                rd = new API().call(api, argsMap);
                data = rd.getData();
                jsonArray = JSONArray.fromObject(data);
                if(jsonArray.size()==0){
                    return "0";
                }
                jb = JSONObject.parseObject(jsonArray.get(0).toString());
                str = (String) jb.get(flag);
            } catch (RuleException e) {
                e.printStackTrace();
            }
        }
        if (str == null) {
            str = "0";
        }
        return str;
    }

    /**
     * 根据api和参数map来获取jsonArray数据  argsMap  可以为空
     * TODO 当JSON数据的某个字段值为null时 可能会出现未知错误
     *
     * @param api     要访问的api
     * @param argsMap 参数
     * @return jsonArray
     */
    public static JSONArray getJSONArraySource(String api, Map<String, String> argsMap) {
        JSONArray ja = null;
        ReturnData rd = null;
        List<JSONObject> data = null;
        if (argsMap == null) {
            try {
                rd = new API().call(api);
                data = rd.getData();
                ja = JSONArray.fromObject(data);
            } catch (RuleException e) {
                e.printStackTrace();
            }
        } else {
            try {
                rd = new API().call(api, argsMap);
                data = rd.getData();
                ja = JSONArray.fromObject(data);
            } catch (RuleException e) {
                e.printStackTrace();
            }
        }
        return ja;
    }
    /**
     * 将准备好的数据存入数据库  manage_data_analysis
     *
     * @param map  要传入的数据
     * @param flag 标识
     */
    public static void importSource(Map<String, String> map, String flag) {
        Iterator it = map.entrySet().iterator();
        String key = null;
        Map<String, String> argsMap = null;
        ReturnData rd = null;
        while (it.hasNext()) {
            argsMap = new HashMap<>();
            Map.Entry entry = (Map.Entry) it.next();
            key = entry.getKey().toString();
            argsMap.put("MANAGE_DATA_ANALYSIS.ANALYSIS_DATA", key);
            argsMap.put("MANAGE_DATA_ANALYSIS.CONTENT", map.get(key));
            argsMap.put("MANAGE_DATA_ANALYSIS.FLAG", flag);
            try {
                rd = new API().call("/stat/manage_data_analysis_add", argsMap);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * 往map中添加数据
     *
     * @param jsonArray 要循环读取的json数组
     * @param sourceMap 源map  为 Map<>
     * @param day       要比对的值
     * @param field     要存入数据库中的字段名
     */
    public static void addMapSource(JSONArray jsonArray, Map<String, String> sourceMap, String day, String field, String eqFlag, String value) {
        JSONObject jo;
        String eq;
        for (int j = 0; j < jsonArray.size(); j++) {
            jo = JSONObject.parseObject(jsonArray.get(j).toString());
            eq = (String) jo.get(eqFlag);
            if (day.equals(eq)) {
                sourceMap.put(field, (String) jo.get(value));
                jsonArray.remove(j);
                break;
            }
        }
    }
}
