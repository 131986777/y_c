package com.task.trigger;

import com.task.job.UpdateOrderPayJob;
import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

/**
 * Created by sunsai on 2016/8/15 - 11:23.
 */
public class UpdateOrderPayTrigger {

    /**
     * 等待订单支付完成，
     * 如果两个小时只能没有支付，则删除订单
     */

    private Scheduler scheduler = null;
    private boolean hasInit = false;
    private boolean hasStart = false;

    private static final String CRONSTR = "0 */1 * * * ?";//每5分钟执行一次

    public UpdateOrderPayTrigger(){
        System.out.println("UpdateOrderPayTrigger");
    }

    public void init() {

        if(hasInit){
            return;
        }

        SchedulerFactory schedulerFactory = new StdSchedulerFactory();
        try{
            scheduler = schedulerFactory.getScheduler();
            JobDetail jobDetail = JobBuilder.newJob(UpdateOrderPayJob.class).withIdentity("job1","group1").build();

            CronTrigger cronTrigger = TriggerBuilder.newTrigger()
                .newTrigger()
                .withIdentity("trigger1", "group1")
                .withSchedule(CronScheduleBuilder.cronSchedule(CRONSTR)).build();//使用的是cron调度器  高级

            scheduler.scheduleJob(jobDetail, cronTrigger);
        }catch (Exception e) {
            System.err.println("等待订单支付完成，初始化失败");
            System.err.println(e);
            hasInit = false;
        }

        hasInit = true;
        System.err.println("等待订单支付完成，初始化成功！");
    }



    public void start() {
        if(!hasInit){
            return;
        }

        if(hasStart) {
            return;
        }

        try{
            scheduler.start();
        }catch (Exception e){
            System.err.println("等待订单支付完成，启动失败!");
            System.err.println(e);
            hasStart = false;
        }
        hasStart = true;
        System.err.println("等待订单支付完成，启动成功！");
    }

    public void shutdown() {
        if(!hasStart){
            return;
        }
        try{
            scheduler.shutdown();
        }catch (Exception e) {
            System.err.println(e);
            hasStart = false;
        }
        System.err.println("等待订单支付完成，关闭成功！");
    }


}
