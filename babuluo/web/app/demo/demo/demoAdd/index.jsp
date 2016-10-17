<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>

    <br>
    <%--页面跳转方式 ui-sref的目标路径从相应业务的router里面找--%>
    <a ui-sref="demo-list"> demoList</a> <%-- 不带参数--%>
    <br>

        <a ui-sref="demo-list({params1:1,params2:2})"> demoListWithParams</a> <%-- 携带参数--%>
　　
</div>