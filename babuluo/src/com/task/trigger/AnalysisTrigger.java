package com.task.trigger;

import com.task.job.AnalysisJob;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

/**
 * Created by liutao on 2016/12/5.
 */
public class AnalysisTrigger  {
/**
 * 定时获取用户要的数据存入数据库   测试版
 */
    private Scheduler scheduler = null;
    private boolean hasInit = false;
    private boolean hasStart = false;
    private static final String CRONSTR = "0 0 1 * * ? ";// /10 * * * * ? 十秒执行一次 0 0 1 * * ? 每天的1点执行  0 */5 * * * ? 5分钟执行一次
    public AnalysisTrigger(){
        System.out.println("Analysis Trigger is runing---");
    }

    public void init(){
        if(hasInit){
            return;
        }
        SchedulerFactory factory = new StdSchedulerFactory();
        try {
            scheduler = factory.getScheduler();
            JobDetail jobDetail = JobBuilder
                    .newJob(AnalysisJob.class)
                    .withIdentity("job2","group2")
                    .build();
            CronTrigger cronTrigger = TriggerBuilder
                    .newTrigger()
                    .withIdentity("trigger2","group2")
                    .withSchedule(CronScheduleBuilder.cronSchedule(CRONSTR))
                    .build();
            scheduler.scheduleJob(jobDetail,cronTrigger);
        } catch (SchedulerException e) {
            hasInit = false;
            e.printStackTrace();
        }
        hasInit = true;
    }
    public void start() {
        if (!hasInit || hasStart) {
            return;
        }
        try {
            scheduler.start();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
        hasStart = true;
    }
    public void shutDown(){
        if(!hasStart){
            return;
        }
        try {
            scheduler.shutdown();
        } catch (SchedulerException e) {
            hasStart = false;
            e.printStackTrace();
        }
    }

}
