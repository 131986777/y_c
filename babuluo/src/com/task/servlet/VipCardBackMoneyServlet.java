package com.task.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import com.task.InitGroupBuyTask;
import com.task.SchedulerManager;
import com.task.job.ShopOrderJob;
import com.task.trigger.UpdateOrderPayTrigger;
import com.task.trigger.VipCardBackMoneyTrigger;

public class VipCardBackMoneyServlet extends HttpServlet {

    public VipCardBackMoneyServlet() {
        super();
        vipcardbackmoneyTrigger.init();
        vipcardbackmoneyTrigger.start();
        InitGroupBuyTask.execute();
    }

    private static VipCardBackMoneyTrigger vipcardbackmoneyTrigger = new VipCardBackMoneyTrigger();


    public void destroy() {
    	vipcardbackmoneyTrigger.shutdown();
        SchedulerManager.shutdownJob();
        super.destroy();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    }

}

