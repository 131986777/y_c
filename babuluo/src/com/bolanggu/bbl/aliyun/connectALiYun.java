package com.bolanggu.bbl.aliyun;

import com.bolanggu.bbl.ENV;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.time.DateFormatUtils;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

/**
 * Created by cxy on 2016/10/23.
 */
public class connectALiYun extends HttpServlet {

    // AccessKey请登录https://ak-console.aliyun.com/#/查看
    // private String accessKeyId = "LTAImVQlWKQXIQcD";
    private String accessKeySecret = ENV.ALIYUN_SERCT;
    // 你之前创建的bucket，确保这个bucket已经创建
    // private String bucketName = "jiaorder-file";
    // 上传文件后的object名称
    //private String key = "myImage";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      //   int serviceId =  UserHelper.getServiceID(request);
        int serviceId = 10000;

        String pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z";       //"2120-01-01T12:00:00.000Z"
        String expiration= DateFormatUtils.format(new Date().getTime()+60*60*1000, pattern);    //expiration设置policy的过期时间，1个小时

        //String policy = "{\"expiration\": \"2018-01-01T12:00:00.000Z\",\"conditions\": [[\"content-length-range\", 0, 104857600],[\"starts-with\", \"$key\",\""+serviceId+"\"]]}";
        String policy = "{\"expiration\": \""+expiration+"\",\"conditions\": [[\"content-length-range\", 0, 104857600],[\"starts-with\", \"$key\",\""+serviceId+"\"]]}";

        String encodePolicy = new String(Base64.encodeBase64(policy.getBytes()));
        // Signature
        String signaturecom = com.aliyun.oss.common.auth.ServiceSignature.create().computeSignature(accessKeySecret, encodePolicy);
        String content=serviceId+","+encodePolicy+","+signaturecom;

        PrintWriter pw = resp.getWriter();
        pw.print(serviceId+","+encodePolicy+","+signaturecom);

    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }


}
