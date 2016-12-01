package com.baidu.ueditor.upload;

import com.bolanggu.bbl.ENV;
import com.baidu.ueditor.PathFormat;
import com.baidu.ueditor.define.AppInfo;
import com.baidu.ueditor.define.BaseState;
import com.baidu.ueditor.define.FileType;
import com.baidu.ueditor.define.State;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class BinaryUploader {

	public static final State save(HttpServletRequest request,
			Map<String, Object> conf) {
//		System.err.println("conf: " + conf.toString());
		FileItemStream fileStream = null;
		boolean isAjaxUpload = request.getHeader( "X_Requested_With" ) != null;

		if (!ServletFileUpload.isMultipartContent(request)) {
			return new BaseState(false, AppInfo.NOT_MULTIPART_CONTENT);
		}

		ServletFileUpload upload = new ServletFileUpload(
				new DiskFileItemFactory());

        if ( isAjaxUpload ) {
            upload.setHeaderEncoding( "UTF-8" );
        }

		try {
			FileItemIterator iterator = upload.getItemIterator(request);

			while (iterator.hasNext()) {
				fileStream = iterator.next();

				if (!fileStream.isFormField())
					break;
				fileStream = null;
			}

			if (fileStream == null) {
				return new BaseState(false, AppInfo.NOTFOUND_UPLOAD_DATA);
			}

			String savePath = (String) conf.get("savePath");
			String originFileName = fileStream.getName();
			String suffix = FileType.getSuffixByFilename(originFileName);

			originFileName = originFileName.substring(0,
					originFileName.length() - suffix.length());
			savePath = savePath + suffix;

			long maxSize = ((Long) conf.get("maxSize")).longValue();

			if (!validType(suffix, (String[]) conf.get("allowFiles"))) {
				return new BaseState(false, AppInfo.NOT_ALLOW_FILE_TYPE);
			}

			savePath = PathFormat.parse(savePath, originFileName);

			String physicalPath = (String) conf.get("rootPath") + savePath;

			//System.err.println("savePath: " + savePath);
			//System.err.println("physicalPath: " + physicalPath);



			InputStream is = fileStream.openStream();
			/*State storageState = StorageManager.saveFileByInputStream(is,
					physicalPath, maxSize);*/
			/**
			 * 上传到阿里云：cxy添加
			 */
			//*******************开始***********************
			String fileName = new StringBuffer().append(new Date().getTime()).append(fileStream.getName().substring(fileStream.getName().indexOf("."))).toString();

			//System.err.println("fileName: " + fileName);

			State storageState = null;
			try {

				new UploadOSSUtil();
				UploadOSSUtil.uploadImgAliyun(is,fileName);
				storageState = StorageManager.saveFileByInputStream(is,
						physicalPath, maxSize);
				storageState.putInfo("state", "SUCCESS");// UEDITOR的规则:不为SUCCESS则显示state的内容
				//注意：下面的url是返回到前端访问文件的路径，请自行修改
				storageState.putInfo("url", ENV.ALIYUN_UPLOAD_URL + fileName + ENV.ALIYUN_UPLOAD_IMG_SIZE);
				storageState.putInfo("title", fileName);
				storageState.putInfo("original", fileName);
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
				storageState.putInfo("state", "文件上传失败!");
				storageState.putInfo("url","");
				storageState.putInfo("title", "");
				storageState.putInfo("original", "");
				//System.out.println("文件 "+fileName+" 上传失败!");
			}
			is.close();

			/*if (storageState.isSuccess()) {
				storageState.putInfo("url", PathFormat.format(savePath));
				storageState.putInfo("type", suffix);
				storageState.putInfo("original", originFileName + suffix);
			}*/

			return storageState;
		} catch (FileUploadException e) {
			return new BaseState(false, AppInfo.PARSE_REQUEST_ERROR);
		} catch (IOException e) {
		}
		return new BaseState(false, AppInfo.IO_ERROR);
	}

	private static boolean validType(String type, String[] allowTypes) {
		List<String> list = Arrays.asList(allowTypes);

		return list.contains(type);
	}
}
