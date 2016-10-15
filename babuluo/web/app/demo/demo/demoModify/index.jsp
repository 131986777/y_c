<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

        <a show-modal id="#classSwitchModal"> class </a>
        <a show-modal id="#tagSwitchModal"> tag </a>
        <a show-modal id="#productSwitchModal"> product </a>

        <%--方法名可以随便写 参数必须为data--%>
        <class-switch-modal callback="ss(data)"></class-switch-modal>
        <tag-switch-modal callback="ss2(data)"></tag-switch-modal>
        <product-switch-modal callback="ss3(data)"></product-switch-modal>

</div>