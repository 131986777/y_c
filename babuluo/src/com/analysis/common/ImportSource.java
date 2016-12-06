package com.analysis.common;


import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import net.sf.json.JSONArray;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by liutao on 2016/12/6 13:20.
 */
public class ImportSource {
    /**
     *第一次导入数据时就执行此主函数
     */
    public static void main(String[] args){
        importSource(getImportSource());
    }

    /**
     * 导入数据
     * @param map
     */
    public static void importSource(Map<String,Map<String,String>> map){
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
            argsMap.put("MANAGE_DATA_ANALYSIS.FLAG","ANALYSIS_CARD");
            try {
                rd = new API().call("/stat/manage_data_analysis_add",argsMap);
            }catch (Exception e){
                e.printStackTrace();
            }
        }

    }

    /**
     * 获得要导入的数据 并将数据格式化
     * @return
     */
    public static Map<String,Map<String,String>> getImportSource(){
        JSONArray j_riqi = getData();
        JSONArray j_xiaofei = getSource("消费");
        JSONArray j_huiyuanchongzhi = getSource("会员充值");
        JSONArray j_huiyuanchongzhixianxia = getSource("会员卡充值");
        JSONArray j_xiaofeichonghong = getSource("消费冲红");
        JSONArray j_fandian = getSource("返点");
        JSONArray j_tianjiaohuiyuan = getAddVipCard();
        JSONObject jo_riqi = null;
        JSONObject jo = null;
        Map<String,Map<String,String>> map = new HashMap<>();;
        Map<String,String> sourceMap = null;
        String eq = null;
        for(int i=0;i<j_riqi.size();i++){
            jo_riqi = JSONObject.parseObject(j_riqi.get(i).toString());
            String eqRiqi = (String) jo_riqi.get("._RANGE");
            sourceMap = new HashMap<>();
            sourceMap.put("consume","0");
            sourceMap.put("rechargeOnline","0");
            sourceMap.put("consumeRed","0");
            sourceMap.put("revert","0");
            sourceMap.put("addCard","0");
            sourceMap.put("recharge","0");
            for(int j=0;j<j_xiaofei.size();j++){
                jo = JSONObject.parseObject(j_xiaofei.get(j).toString());
                eq =(String)jo.get(".DAY");
                if(eqRiqi.equals(eq)){
                    sourceMap.put("consume", (String) jo.get(".SOURCE"));
                    j_xiaofei.remove(j);
                    break;
                }
            }
            for(int j=0;j<j_huiyuanchongzhi.size();j++){
                jo = JSONObject.parseObject(j_huiyuanchongzhi.get(j).toString());
                eq =(String)jo.get(".DAY");
                if(eqRiqi.equals(eq)){
                    sourceMap.put("rechargeOnline", (String) jo.get(".SOURCE"));
                    j_huiyuanchongzhi.remove(j);
                    break;
                }
            }
            for(int j=0;j<j_xiaofeichonghong.size();j++){
                jo = JSONObject.parseObject(j_xiaofeichonghong.get(j).toString());
                eq =(String)jo.get(".DAY");
                if(eqRiqi.equals(eq)){
                    sourceMap.put("consumeRed", (String) jo.get(".SOURCE"));
                    j_xiaofeichonghong.remove(j);
                    break;
                }
            }
            for(int j=0;j<j_fandian.size();j++){
                jo = JSONObject.parseObject(j_fandian.get(j).toString());
                eq =(String)jo.get(".DAY");
                if(eqRiqi.equals(eq)){
                    sourceMap.put("revert", (String) jo.get(".SOURCE"));
                    j_fandian.remove(j);
                    break;
                }
            }
            for(int j=0;j<j_tianjiaohuiyuan.size();j++){
                jo = JSONObject.parseObject(j_tianjiaohuiyuan.get(j).toString());
                eq =(String)jo.get(".DAY");
                if(eqRiqi.equals(eq)){
                    sourceMap.put("addCard", (String) jo.get(".SOURCE"));
                    j_tianjiaohuiyuan.remove(j);
                    break;
                }
            }
            for(int j=0;j<j_huiyuanchongzhixianxia.size();j++){
                jo = JSONObject.parseObject(j_huiyuanchongzhixianxia.get(j).toString());
                eq =(String)jo.get(".DAY");
                if(eqRiqi.equals(eq)){
                    sourceMap.put("recharge", (String) jo.get(".SOURCE"));
                    j_huiyuanchongzhixianxia.remove(j);
                    break;
                }
            }
            map.put("20"+eqRiqi,sourceMap);
        }
        return map;
    }

    /**
     * 获取无格式数据
     * @param arg
     * @return
     */
    public static JSONArray getSource(String arg){
        JSONArray jb = null;
        try {
            Map<String ,String> map = new HashMap<>();
            map.put("EVENT",arg);
            ReturnData rd = new API().call("/stat/member_card_money_group", map);
            List<JSONObject> data = rd.getData();
            jb = JSONArray.fromObject(data);
        } catch (RuleException e) {
            e.printStackTrace();
        }
        return jb;
    }

    /**
     * 获取时间范围
     * @return
     */
    public static JSONArray getData(){
        JSONArray jb = null;
        try {
            ReturnData rd = new API().call("/stat/member_card_money_change_range");
            List<JSONObject> data = rd.getData();
            jb = JSONArray.fromObject(data);
        } catch (RuleException e) {
            e.printStackTrace();
        }
        return jb;
    }

    /**
     * 获取新增的会员卡的个数
     * @return
     */
    public static JSONArray getAddVipCard(){
        JSONArray jb = null;
        try {
            ReturnData rd = new API().call("/stat/member_crad_count_group");
            List<JSONObject> data = rd.getData();
            jb = JSONArray.fromObject(data);
        } catch (RuleException e) {
            e.printStackTrace();
        }
        return jb;
    }
}
