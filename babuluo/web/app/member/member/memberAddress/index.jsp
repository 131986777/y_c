<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <!-- BEGIN 导航标签 -->
                <ul class="nav nav-tabs" style="margin-bottom: 0px; margin-left: 4px;">
                    <li>
                        <a ui-sref="memberInfo({id:memberId})"> 客户信息 </a>
                    </li>
                    <li>
                        <a ui-sref="memberData({id:memberId})"> 资料 </a>
                    </li>
                    <li>
                        <a ui-sref="memberAccount({id:memberId})"> 账户 </a>
                    </li>

                    <li class="active">
                        <a> 收件地址 </a>
                    </li>
                    <li>
                        <a ui-sref="memberCard({id:memberId})"> 会员卡 </a>
                    </li>
                </ul>
                <!-- END 导航标签 -->
                <h3 >{{address}}</h3><br>
                <h3>{{name}}&nbsp;&nbsp;&nbsp;{{mobile}}</h3>
            </div>
        </div>
    </div>