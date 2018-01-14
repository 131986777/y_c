package com.task.trigger;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import com.task.job.WeekCouponJob;

public class WeekCouponTrigger {
	
	//private static final String CRONSTR = "0 0 7 ? * SAT 2018";
	private static final String CRONSTR = "0 27 13 ? * THU 2018";

	public WeekCouponTrigger (){
		
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
            JobDetail jobDetail = JobBuilder.newJob(WeekCouponJob.class).withIdentity("job1","group3").build();

            CronTrigger cronTrigger = TriggerBuilder.newTrigger()
                .newTrigger()
                .withIdentity("trigger1", "group3")
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
