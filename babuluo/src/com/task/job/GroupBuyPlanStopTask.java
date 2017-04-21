package com.task.job;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;

/**
 * -------------------------------------
 * 添加团购规则
 * 添加定时关闭任务任务
 * -------------------------------------
 * Created by liutao on 2017/4/21 下午12:17.
 */
public class GroupBuyPlanStopTask implements Job {
    private Logger log = LoggerFactory.getLogger(GroupBuyPlanStopTask.class);


    //
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        String gbpId = context.getJobDetail().getKey().getName();
        try {
            runTask(gbpId);
        } catch (RuleException e) {
            e.printStackTrace();
        }
    }

    public void runTask(String gbpId) throws RuleException {
        //讲团状态改为已经结束
        new API().call("/group/buy/plan/modifyById", new HashMap<String, String>() {{
            put("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID", gbpId);
            put("GROUP_BUY_PLAN.STATE", "END_SALE");
        }});
        //判断团购是商家开团 还是用户开团
        ReturnData gbpData = new API().call("/group/buy/plan/getById", new HashMap<String, String>() {{
            put("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID", gbpId);
        }});
        log.debug("**********[GROUP BUY PLAN STOP RUN TASK GET GBP DATA :" + gbpData.getData() + "]**********");
        JSONObject jo = gbpData.getData().get(0);
        //将此规则下的所有团取出
        ReturnData gbgData = new API().call("/group/buy/group/getAllByGbpId", new HashMap<String, String>() {{
            put("GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID", jo.getString("GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID"));
        }});
        log.debug("**********[GROUP BUY PLAN STOP RUN TASK GET GBG DATA :" + gbgData.getData() + "]**********");
        //然后依次判断是否满足 如果满足则团成功 如果不满足 则团失败 将订单取消
        for (JSONObject gbgEntity : gbgData.getData()) {
            ReturnData gbmData = new API().call("/group/buy/member/getInGbgIds", new HashMap<String, String>() {{
                put("GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS", gbgEntity.getString("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID"));
            }});
            log.debug("**********[GROUP BUY PLAN STOP RUN TASK GET GBM DATA :" + gbmData.getData() + "]**********");
            if (gbmData.getData().size() < Integer.parseInt(jo.getString("GROUP_BUY_PLAN.SUM_COUNT"))) {
                //将团改为失败
                new API().call("/group/buy/group/modifyById", new HashMap<String, String>() {{
                    put("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID", gbgEntity.getString("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID"));
                    put("GROUP_BUY_GROUP.STATE", "FAIL");
                }});
                log.debug("**********[GROUP BUY GROUP FILED IN :" + gbgEntity.getString("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID") + "]**********");
                //团购未满足要把所有团用户订单取消掉
                for (JSONObject gbm : gbmData.getData()) {
                    new API().call("/shop/order/cancelOrder", new HashMap<String, String>() {{
                        put("SHOP_ORDER.ID", gbm.getString("GROUP_BUY_MEMBER.ORDER_ID"));
                    }});
                    log.debug("**********[GROUP BUY MEMBER CANCEL ORDER :" + gbm.getString("GROUP_BUY_MEMBER.ORDER_ID") + " SUCCESS]**********");
                }
            } else {
                //将团改为成功
                new API().call("/group/buy/group/modifyById", new HashMap<String, String>() {{
                    put("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID", gbgEntity.getString("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID"));
                    put("GROUP_BUY_GROUP.STATE", "DONE");
                }});
                log.debug("**********[GROUP BUY GROUP DONE IN :" + gbgEntity.getString("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID") + "]**********");
            }
        }
    }
}
