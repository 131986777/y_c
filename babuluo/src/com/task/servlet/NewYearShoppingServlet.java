package com.task.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.task.trigger.NewYearShoppingTrigger;

public class NewYearShoppingServlet  extends HttpServlet{
	
	public static NewYearShoppingTrigger newYearTask = new NewYearShoppingTrigger();
	
	public NewYearShoppingServlet (){
		super();
		newYearTask.init();
		newYearTask.start();

	}
	
	 public void destroy() {
		 newYearTask.shutdown();
		 super.destroy();
	 }
	 
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		        throws ServletException, IOException {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    }


}
