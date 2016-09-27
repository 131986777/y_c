<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>
    <a ng-click="toDemoAdd()"> demoAdd</a>

    <span ng-show="p1!=0||p2!=0">接到了参数<span ng-bind="p1+' & '+ p2"></span></span>

    <span ng-show="p1==0&&p2==0">未接到参数</span>

</div>