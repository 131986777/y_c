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

    @Override
    public void execute(JobExecutionContext jobExecutionContext)
            throws JobExecutionException {

        System.out.println("UpdateOrderPayJob.execute");

        try {
            Map orderMap = new HashMap<>();
            ReturnData orderResponse =
                    new API().call("/shop/order/getWaitPayOrder", orderMap);

            String ids = "";
            String gbmOrderIds = "";
            List<JSONObject> orderList = orderResponse.getData();

            for (int i = 0; i < orderList.size(); i++) {
                if (orderList.get(i).getString("SHOP_ORDER.TYPE").equals("6")) {
                    gbmOrderIds += "," + orderList.get(i).getString("SHOP_ORDER.ID");
                }
                ids += "," + orderList.get(i).getString("SHOP_ORDER.ID");
                Map map = new HashMap<>();
                map.put("SHOP_ORDER.ID", orderList.get(i).getString("SHOP_ORDER.ID"));
                new API().call("/shop/order/cancelOrder", map);
            }
            System.out.println(orderList.size() + "单 超时未支付 已被取消取消  ids = " + ids);
            updateGroupBuyMember(gbmOrderIds);
        } catch (RuleException e) {
            e.printStackTrace();
        }

    }

    //将团购订单取消 如果为member订单的话 如果leader被取消 则查看这个团里有没有其他的成员  如果有 讲leader换为其他的人  如果没有就讲这个团取消掉
    private void updateGroupBuyMember(String orderIds) throws RuleException {
        System.out.println(orderIds + "  团购订单超时取消。。。");
        if (!orderIds.equals("")) {
            ReturnData gbmData = new API().call("/group/buy/member/getByOrderIds", new HashMap<String, String>() {{
                put("GROUP_BUY_MEMBER.ORDER_ID", orderIds);
            }});
            List<JSONObject> gbmList = gbmData.getData();
            for (JSONObject jo : gbmList) {
                jo.put("GROUP_BUY_MEMBER.IS_DEL", "-1");
                jo.put("GROUP_BUY_MEMBER.MONEY_STATE", "OVER_TIME");
                new API().call("/group/buy/member/modifyById", jo);
                if (jo.getString("GROUP_BUY_MEMBER.IS_LEADER").equals("1")) {
                    //判断其团下有没有其他人
                    ReturnData gbmDataByGbg = new API().call("/group/buy/member/getInGbgIds", new HashMap<String, String>() {{
                        put("GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS", jo.getString("GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID"));
                    }});
                    if (gbmDataByGbg.getData().size() == 1) {
                        new API().call("", new HashMap<String, String>() {{
                            put("GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID", jo.getString("GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID"));
                            put("GROUP_BUY_GROUP.IS_DEL", "1");
                        }});
                    } else {
                        for (JSONObject jo2 : gbmDataByGbg.getData()) {
                            if (!jo2.getString("GROUP_BUY_MEMBER.IS_LEADER").equals("1")) {
                                jo2.put("GROUP_BUY_MEMBER.IS_LEADER", "1");
                                new API().call("/group/buy/member/modifyById", jo2);
                                break;
                            }
                        }
                    }
                }
            }
        }

    }

}
