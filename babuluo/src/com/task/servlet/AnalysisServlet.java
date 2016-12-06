package com.task.servlet;

import com.task.trigger.AnalysisTrigger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by liutao on 2016/12/5.
 */
public class AnalysisServlet extends HttpServlet {
    private static AnalysisTrigger analysisTrigger = new AnalysisTrigger();

    public AnalysisServlet(){
        super();
        analysisTrigger.init();
        analysisTrigger.start();

    }

    @Override
    public void destroy() {
        analysisTrigger.shutDown();
        super.destroy();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
