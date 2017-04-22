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

    //将任务暂停
    public static void pauseJob(String gbpId) {
        SchedulerManager.pauseJob(gbpId, "START_JOB_GROUP:" + gbpId);
        SchedulerManager.pauseJob(gbpId, "END_JOB_GROUP:" + gbpId);
    }

    //将任务重启
    public static void resumeJob(String gbpId) {
        SchedulerManager.resumeJob(gbpId, "START_JOB_GROUP:" + gbpId);
        SchedulerManager.resumeJob(gbpId, "END_JOB_GROUP:" + gbpId);
    }

    //将任务删除
    public static void removeJob(String gbpId) {
        SchedulerManager.removeJob(gbpId,
                "START_JOB_GROUP:" + gbpId,
                "START_TRIGGER:" + gbpId,
                "START_TRIGGER_GROUP:" + gbpId);

        SchedulerManager.removeJob(gbpId,
                "STOP_JOB_GROUP:" + gbpId,
                "STOP_TRIGGER:" + gbpId,
                "STOP_TRIGGER_GROUP:" + gbpId);
    }

    //更新任务执行时间
    public static void updateJob(String gbpId, String start, String end) {
        JSONObject jo = new JSONObject();
        jo.put("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID", gbpId);
        jo.put("GROUP_BUY_PLAN.BEGIN_DATETIME", start);
        jo.put("GROUP_BUY_PLAN.END_DATETIME", end);
        try {
            InitGroupBuyTask.taskDetail(jo);
        } catch (RuleException e) {
            e.printStackTrace();
        }

    }
}
