<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

        <a show-modal id="#classSwithModal"> class </a>
        <a show-modal id="#tagSwithModal"> tag </a>

        <%--方法名可以随便写 参数必须为data--%>
        <class-switch-modal callback="ss(data)"></class-switch-modal>
        <tag-switch-modal callback="ss2(data)"></tag-switch-modal>

</div>