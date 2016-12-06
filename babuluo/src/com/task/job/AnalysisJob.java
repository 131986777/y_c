package com.task.job;

import com.analysis.common.YesterdayOnceMore;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by liutao on 2016/12/5 16:50.
 */
public class AnalysisJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        System.out.println("-------------------------------------------------ruin sfdfksdff -----------");
        YesterdayOnceMore.addYesterdayCardSource();
    }
}