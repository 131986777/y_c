<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

        <a show-modal id="#classSwitchModal"> class </a>
        <a show-modal id="#tagSwitchModal"> tag </a>
        <a show-modal id="#productSwitchModal"> product </a>

        <%--方法名可以随便写 参数必须为data--%>
        <class-switch-modal callback="classSwitch(data)"></class-switch-modal>
        <tag-switch-modal callback="tagSwitch(data)"></tag-switch-modal>
        <product-switch-modal callback="prdSwitch(data)"></product-switch-modal>

</div>