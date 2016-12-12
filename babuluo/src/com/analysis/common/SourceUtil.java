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
    //

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
