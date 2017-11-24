package com.task.job;

import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.api.data.ReturnData;
import com.pabula.fw.exception.RuleException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by sunsai on 2016/8/15 - 11:22.
 */
public class VipBackMoneyJob implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext)
            throws JobExecutionException {

        System.out.println("VipBackMoneyJob.execute");

        //修改api(shop_order.DATETIME_OUT < curdate()   and  STATE_ORDER = 1  and  STATE_OUT = 1  and  STATE_MONEY = -1 and  TYPE = 6)

        try {
            Map orderMap = new HashMap<>();
            ReturnData orderResponse =
                    new API().call("/member/balance/feedback", orderMap);

         
            List<JSONObject> vipList = orderResponse.getData();

           
            System.out.println("VIP无忧卡，季度返点错误  "+orderResponse.getMsg()  );
          //  updateGroupBuyMember(gbmOrderIds);
        } catch (RuleException e) {
            e.printStackTrace();
        }

    }

    
}
