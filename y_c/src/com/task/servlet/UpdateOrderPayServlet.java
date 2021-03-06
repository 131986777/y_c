package com.task.servlet;

import com.task.InitGroupBuyTask;
import com.task.SchedulerManager;
import com.task.trigger.UpdateOrderPayTrigger;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created  on 2016/11/23 - 14:23.
 */
public class UpdateOrderPayServlet extends HttpServlet {

    public UpdateOrderPayServlet() {
        super();
        updateOrderPayTrigger.init();
        updateOrderPayTrigger.start();
        InitGroupBuyTask.execute();
    }

    private static UpdateOrderPayTrigger updateOrderPayTrigger = new UpdateOrderPayTrigger();


    public void destroy() {
        updateOrderPayTrigger.shutdown();
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
