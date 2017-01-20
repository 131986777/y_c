<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <a show-modal id="#classSwitchModal"> class </a>
    <a show-modal id="#tagSwitchModal"> tag </a>
    <a show-modal id="#productSwitchModal"> product </a>
    <a show-modal id="#productItemSwitchModal"> product Item </a>
    <a show-modal id="#couponItemSwitchModal"> coupon Item </a>



    <%--方法名可以随便写 参数必须为data--%>
    <class-switch-modal callback="classSwitch(data)"></class-switch-modal>
    <tag-switch-modal callback="tagSwitch(data)"></tag-switch-modal>
    <product-switch-modal callback="prdSwitch(data)"></product-switch-modal>
    <product-item-switch-modal callback="prdItemSwitch(data)"></product-item-switch-modal>
    <coupon-item-switch-modal callback="couponItemSwitch(data)"></coupon-item-switch-modal>
</div>