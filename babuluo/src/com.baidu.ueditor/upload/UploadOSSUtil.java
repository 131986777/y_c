package com.baidu.ueditor.upload;

/**
 * Created by cxy on 2016/11/10.
 */
/**
 * 上传到阿里云：xhj
 *
 *
 */

import com.bolanggu.bbl.ENV;
import com.aliyun.oss.OSSClient;

import java.io.FileNotFoundException;
import java.io.InputStream;


public class UploadOSSUtil {
    public UploadOSSUtil(){}

    public static void uploadImgAliyun(InputStream inputStream ,String fileName)
            throws FileNotFoundException{
        String accesskeyId = ENV.ALIYUN_KEY;      //阿里云accesskeyId
        String accessKeySecret = ENV.ALIYUN_SERCT;

        String endpoint = ENV.ALIYUN_POINT ;   //http://babuluo-file.oss-cn-hangzhou.aliyuncs.com
        String bucketName = ENV.ALIYUN_BUCKET ;
        OSSClient client = new OSSClient(endpoint,accesskeyId,accessKeySecret);

        //此处"xxxx/yyyy/"+fileName,表示上传至阿里云中xxxx文件夹下的yyyy文件夹中，请修改为自己的路径即可
        client.putObject(bucketName, ENV.ALIYUN_UPLOAD_MAIN_DIR + "/" + fileName, inputStream);
        client.shutdown();
    }
}