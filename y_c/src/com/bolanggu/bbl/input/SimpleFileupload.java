package com.bolanggu.bbl.input;

import com.bolanggu.bbl.ENV;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * Created by 95155 on 2017/2/13.
 */
public class SimpleFileupload extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        PrintWriter pw = response.getWriter();
        //1、创建一个DiskFileItemFactory工厂
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //2、创建一个文件上传解析器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //解决上传文件名的中文乱码
        upload.setHeaderEncoding("UTF-8");
        factory.setSizeThreshold(1024 * 500);//设置内存的临界值为500K
        File temp = new File(ENV.TEMP_FILE);//当超过500K的时候，存到一个临时文件夹中
        if (!temp.exists()) {
            temp.mkdirs();
        }
        factory.setRepository(temp);
        upload.setSizeMax(1024 * 1024 * 5);//设置上传的文件总的大小不能超过5M
        try {
            // 1. 得到 FileItem 的集合 items
            List<FileItem> items = upload.parseRequest(request);
            System.out.println(items);
            // 2. 遍历 items:
            for (FileItem item : items) {
                // 若是一个一般的表单域, 打印信息
                if (item.isFormField()) {
                    String name = item.getFieldName();
                    String value = item.getString("utf-8");
                    System.out.println(name + ": " + value);
                }
                // 若是文件域则把文件保存到目录下.
                else {
                    String fileName = item.getName();
                    InputStream in = item.getInputStream();
                    byte[] buffer = new byte[1024];
                    int len;

                    fileName = getClass()
                            .getClassLoader()
                            .getResource("/")
                            .getPath().replace("/WEB-INF/classes",
                                    ENV.UPLOAD_EXCEL_FILE + fileName);//文件最终上传的位置
                    File filePath = new File(getClass()
                            .getClassLoader()
                            .getResource("/")
                            .getPath().replace("/WEB-INF/classes",
                                    ENV.UPLOAD_EXCEL_FILE));
                    if (!filePath.exists()) {
                        filePath.mkdirs();
                    }
                    OutputStream out = new FileOutputStream(fileName);

                    while ((len = in.read(buffer)) != -1) {
                        out.write(buffer, 0, len);
                    }
                    out.close();
                    in.close();
                    pw.write("success");
                }
            }

        } catch (FileUploadException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
