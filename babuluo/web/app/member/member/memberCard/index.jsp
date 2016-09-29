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

                    <li>
                        <a ui-sref="memberAddress({id:memberId})"> 收件地址 </a>
                    </li>
                    <li class="active">
                        <a> 会员卡 </a>
                    </li>
                </ul>
                <!-- END 导航标签 -->

            </div>
            <!--内容区-->
            <div style="margin-top: 50px;margin-left: 100px">
                <div>
                    <label>卡号：</label><label>{{cardNum}}</label>

                    <label style="margin-left: 100px">{{cardName}}</label>
                </div><br>
                <label  style="margin-left: 70px">卡类型</label>
                <div style="margin-left: 230px">
                    <label>余额：</label><label>{{balance}}</label><br>
                    <label>冻结：</label><label>{{freezeBalance}}</label>
                </div>
                <div >
                    <label>面值：</label><label>{{faceValue}}</label>
                </div>
                <span>{{addDatatime}}</span>

            </div>
        </div>
    </div>