package com.task.job;

import com.analysis.common.YesterdaySource;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by liutao on 2016/12/5 16:50.
 */
@DisallowConcurrentExecution
public class AnalysisJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        YesterdaySource.addYesterdayCardSource();
        YesterdaySource.addYesterdayOrderSource();
        YesterdaySource.addYesterdayShopSource();
        YesterdaySource.addYesterdayCompareSource();
    }
}