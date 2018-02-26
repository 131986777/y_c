package com.task.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.task.SchedulerManager;
import com.task.trigger.ShopOrderTaskTrigger;

public class ShopOrderServlet extends HttpServlet{
	
	private static ShopOrderTaskTrigger  shopOrderTaskTrigger = new ShopOrderTaskTrigger();
	
	public ShopOrderServlet (){
		super();
		shopOrderTaskTrigger.init();
		shopOrderTaskTrigger.start();
	}
	
	 public void destroy() {
		 shopOrderTaskTrigger.shutdown();
		 super.destroy();
	 }
	 
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		        throws ServletException, IOException {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    }

}
