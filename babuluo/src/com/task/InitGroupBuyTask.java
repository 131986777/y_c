package com.task;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import com.task.job.GroupBuyPlanStartTask;
import com.task.job.GroupBuyPlanStopTask;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

/**
 * -------------------------------------
 * 讲任务添加进quartz
 * -------------------------------------
 * Created by liutao on 2017/4/21 下午1:50.
 */
public class InitGroupBuyTask {
    public static void execute() {
        try {
            ReturnData gbpData = new API().call("/group/buy/plan/queryAllByStat");
            for (JSONObject gbp : gbpData.getData()) {
                String gbpId = gbp.getString("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID");
                String dateStr = gbp.getString("GROUP_BUY_PLAN.BEGIN_DATETIME");
                if (dateTimeEquals(dateStr)) {
                    SchedulerManager.addJob(gbpId,
                            "START_JOB_GROUP:" + gbpId,
                            "START_TRIGGER:" + gbpId,
                            "START_TRIGGER_GROUP:" + gbpId,
                            CronUtil.getCronByDateStr(dateStr),
                            GroupBuyPlanStartTask.class);
                } else {
                    //如果在定时任务执行时任务还没有启动就把任务起启动
                    new API().call("/group/buy/plan/modifyById", new HashMap<String, String>() {{
                        put("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID", gbpId);
                        put("GROUP_BUY_PLAN.STATE", "IN_SALE");
                    }});
                }
                dateStr = gbp.getString("GROUP_BUY_PLAN.END_DATETIME");
                if (dateTimeEquals(dateStr)) {
                    SchedulerManager.addJob(gbpId,
                            "STOP_JOB_GROUP:" + gbpId,
                            "STOP_TRIGGER:" + gbpId,
                            "STOP_TRIGGER_GROUP:" + gbpId,
                            CronUtil.getCronByDateStr(dateStr), GroupBuyPlanStopTask.class);
                } else {
                    //如果团购规则在定时任务启动时已经结束 就把任务结束
                    new API().call("/group/buy/plan/modifyById", new HashMap<String, String>() {{
                        put("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID", gbpId);
                        put("GROUP_BUY_PLAN.STAT", "END_SALE");
                    }});
                    //并且执行定时任务中的取消订单方法
                    new GroupBuyPlanStopTask().runTask(gbpId);
                }
            }
        } catch (RuleException e) {
            e.printStackTrace();
        }
    }

    //判断时间是否在当前时间全面
    //如果是 返回false；
    private static boolean dateTimeEquals(String dateStr) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date date = df.parse(dateStr);
            return date.after(new Date());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }
}
