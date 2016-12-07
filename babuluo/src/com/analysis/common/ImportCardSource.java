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
 * Created by liutao on 2016/12/6 13:20.
 */
public class ImportCardSource {
    /**
     *第一次导入数据时就执行此主函数
     */
    public static void main(String[] args){
        Utils.importSource(getImportSource(),"ANALYSIS_CARD");
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
            sourceMap.put("CONSUME","0");
            sourceMap.put("RECHARGEONLINE","0");
            sourceMap.put("CONSUMERED","0");
            sourceMap.put("REVERT","0");
            sourceMap.put("ADDCARD","0");
            sourceMap.put("RECHARGE","0");
            Utils.addMapSource(j_xiaofei,sourceMap,eqRiqi,"CONSUME");
            Utils.addMapSource(j_huiyuanchongzhi,sourceMap,eqRiqi,"RECHARGEONLINE");
            Utils.addMapSource(j_xiaofeichonghong,sourceMap,eqRiqi,"CONSUMERED");
            Utils.addMapSource(j_fandian,sourceMap,eqRiqi,"REVERT");
            Utils.addMapSource(j_tianjiaohuiyuan,sourceMap,eqRiqi,"ADDCARD");
            Utils.addMapSource(j_huiyuanchongzhixianxia,sourceMap,eqRiqi,"RECHARGE");
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
