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
public class UpdateOrderPayJob implements Job {

    @Override public void execute(JobExecutionContext jobExecutionContext)
        throws JobExecutionException {

        System.out.println("UpdateOrderPayJob.execute");

        try {
            Map orderMap = new HashMap<>();
            ReturnData orderResponse =
                new API().call("/shop/order/getWaitPayOrder", orderMap);

            String ids = "";

            List<JSONObject> orderList = orderResponse.getData();
            for (int i = 0; i < orderList.size(); i++) {
                ids+=","+orderList.get(i).getString("SHOP_ORDER.ID");
                Map map = new HashMap<>();
                map.put("SHOP_ORDER.ID", orderList.get(i).getString("SHOP_ORDER.ID"));
                new API().call("/shop/order/cancelOrder", map);
            }
            System.out.println(orderList.size() + "单 超时未支付 已被取消取消  ids = "+ids);

        } catch (RuleException e) {
            e.printStackTrace();
        }

    }

}
