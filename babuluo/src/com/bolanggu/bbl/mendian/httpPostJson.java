package com.bolanggu.bbl.mendian;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pabula.api.API;
import com.pabula.common.util.HttpClientUtil;
import com.pabula.fw.exception.RuleException;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import com.bolanggu.bbl.ENV;
import java.util.HashMap;
import java.util.Map;
import sun.net.www.protocol.http.HttpURLConnection;

/**
 * Created  on 2016/10/31 - 10:09.
 */
public class httpPostJson {

    public static String ERP_DOMAIN= ENV.API_MENDIAN;
    public static String ERP_SIGN= ENV.API_MENDIAN_CERT;

    public static String post(String webserviceUrl,String data){
        try {
            URL url = new URL(ERP_DOMAIN+webserviceUrl);
            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");

            connection.setRequestProperty("Content-Type","application/json");
            connection.connect();
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());
            out.writeBytes(data);
            out.flush();
            out.close();

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String lines;
            StringBuffer sbf = new StringBuffer();
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sbf.append(lines);
            }
            // 断开连接
            reader.close();
            connection.disconnect();
            return  sbf.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}