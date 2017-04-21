package com.task;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * -------------------------------------
 * cron 表达式生成
 * -------------------------------------
 * Created by liutao on 2017/4/21 下午12:53.
 */
public class CronUtil {
    private static SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");

    /**
     * 精确执行
     * 根据时间字符串生成 cron表达式
     *
     * @param str
     * @return
     */
    public static String getCronByDateStr(String str) {
        try {
            return getCronByDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(str));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        throw new IllegalArgumentException("?");
    }

    /**
     * 精确执行
     * 根据输入的Date 返回cron 表达式
     *
     * @param date
     * @return
     */
    public static String getCronByDate(Date date) {
        String[] fileds = df.format(date).split("-");
        return fileds[5] + " " + fileds[4] + " " + fileds[3] + " " + fileds[2] + " " + fileds[1] + " ? " + fileds[0];
    }
}
