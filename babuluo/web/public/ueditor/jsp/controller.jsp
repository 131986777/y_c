<%--
  Created by IntelliJ IDEA.
  User: sunsai
  Date: 2015/8/28
  Time: 13:06
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="java.io.File" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.FileInputStream" %>

<%@ page import="com.pabula.common.util.StrUtil" %>
<%@ page import="com.baidu.ueditor.ActionEnter" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

//	String action = request.getParameter("action");
//
//	if(StrUtil.isNotNull(action)&&"config".equals(action)){
//		File file = new File(application.getRealPath("/")+"ui/public/ueditor/jsp/config.json");
//		response.setCharacterEncoding("utf-8");
//		response.setContentType("application/json");
//
//		ServletOutputStream outputStream = response.getOutputStream();
//		InputStream in = new FileInputStream(file);
//
//
//		int b = 0;
//		byte[] buffer = new byte[512];
//		while ((b = in.read(buffer)) != -1){
//			outputStream.write(buffer,0,b);
//		}
//		in.close();
//
//		outputStream.flush();
//		outputStream.close();
//	}





	request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html;charset=utf-8");
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Method","POST");
    response.setHeader("Access-Control-Allow-Headers","x-request-with");

	String rootPath = application.getRealPath( "/" );

	out.write( new ActionEnter( request, rootPath ).exec() );

%>
