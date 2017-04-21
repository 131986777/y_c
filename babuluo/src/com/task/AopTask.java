package com.task;

import com.alibaba.fastjson.JSONObject;
import com.pabula.fw.exception.RuleException;

/**
 * -------------------------------------
 * 团购 添加修改规则时触发
 * -------------------------------------
 * Created by liutao on 2017/4/21 下午4:15.
 */
public class AopTask {

    //添加规则时在后切面中调用  将整个gbp实体都要传递过来
    public static void addJob(String gbp) {
        JSONObject gbpJO = JSONObject.parseObject(gbp);
        try {
            InitGroupBuyTask.taskDetail(gbpJO);
        } catch (RuleException e) {
            e.printStackTrace();
        }
    }
}
