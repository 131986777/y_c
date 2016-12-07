package com.analysis.common;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import net.sf.json.JSONArray;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by liutao on 2016/12/7 18:49.
 */
public class Utils {

    /**
     * @param map  要传入的数据
     * @param flag 标识
     */
    public static void importSource(Map<String,Map<String,String>> map,String flag){
        Iterator it = map.entrySet().iterator();
        String key = null;
        Map<String,String> argsMap = null;
        ReturnData rd = null;
        while(it.hasNext()){
            argsMap = new HashMap<>();
            Map.Entry entry = (Map.Entry) it.next();
            key = entry.getKey().toString();
            String content =  net.sf.json.JSONObject.fromObject(map.get(key)).toString();
            argsMap.put("MANAGE_DATA_ANALYSIS.ANALYSIS_DATA",key);
            argsMap.put("MANAGE_DATA_ANALYSIS.CONTENT",content);
            argsMap.put("MANAGE_DATA_ANALYSIS.FLAG",flag);
            try {
                rd = new API().call("/stat/manage_data_analysis_add",argsMap);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
    //往map中添加数据 必须要是.DAY 为标识 .SOURCE为键值
    public static void addMapSource(JSONArray jsonArray, Map<String, String> sourceMap, String day, String field) {
        JSONObject jo;
        String eq;
        for(int j = 0; j<jsonArray.size(); j++){
            jo = JSONObject.parseObject(jsonArray.get(j).toString());
            eq = (String) jo.get(".DAY");
            if(day.equals(eq)){
                sourceMap.put(field, (String) jo.get(".SOURCE"));
                jsonArray.remove(j);
                break;
            }
        }
    }
}
