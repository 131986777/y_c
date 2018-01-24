package com.task.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.task.trigger.WeekCouponTrigger;

public class WeekCouponServlet  extends HttpServlet{
	
	public static WeekCouponTrigger weekCouponTask = new WeekCouponTrigger();
	
	public WeekCouponServlet (){
		super();
		weekCouponTask.init();
		weekCouponTask.start();

	}
	
	 public void destroy() {
		 weekCouponTask.shutdown();
		 super.destroy();
	 }
	 
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		        throws ServletException, IOException {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    }


}
