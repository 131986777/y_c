package com.task.job;

import com.pabula.api.API;
import com.pabula.fw.exception.RuleException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.util.HashMap;

/**
 * -------------------------------------
 * 添加团购规则
 * 添加定时开启任务
 * -------------------------------------
 * Created by liutao on 2017/4/21 下午12:13.
 */
public class GroupBuyPlanStartTask implements Job {


    //将任务定时开启
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        String gbpId = context.getJobDetail().getKey().getName();
        try {
            runTask(gbpId);
        } catch (RuleException e) {
            e.printStackTrace();
        }
    }

    private void runTask(String gbpId) throws RuleException {

        new API().call("/group/buy/plan/modifyById", new HashMap<String, String>() {{
            put("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID", gbpId);
            put("GROUP_BUY_PLAN.STATE", "IN_SALE");
        }});
    }
}
