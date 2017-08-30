package com.task.trigger;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import com.task.job.ShopOrderJob;


public class ShopOrderTaskTrigger {
	
	private static final String CRONSTR = "0 50 23 L * ?";//每个月最后一天23点50分
	
	public ShopOrderTaskTrigger(){
		
	}

    private Scheduler scheduler = null;
    private boolean hasInit = false;
    private boolean hasStart = false;


    public void init() {

        if(hasInit){
            return;
        }

        SchedulerFactory schedulerFactory = new StdSchedulerFactory();
        try{
            scheduler = schedulerFactory.getScheduler();
            JobDetail jobDetail = JobBuilder.newJob(ShopOrderJob.class).withIdentity("job2","group1").build();

            CronTrigger cronTrigger = TriggerBuilder.newTrigger()
                .newTrigger()
                .withIdentity("trigger2", "group1")
                .withSchedule(CronScheduleBuilder.cronSchedule(CRONSTR)).build();//使用的是cron调度器  高级

            scheduler.scheduleJob(jobDetail, cronTrigger);
        }catch (Exception e) {
            System.err.println(e);
            hasInit = false;
        }

        hasInit = true;
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
            System.err.println(e);
            hasStart = false;
        }
        hasStart = true;
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
    }

	

}
