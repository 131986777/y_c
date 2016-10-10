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
            <div style="margin-top:50px;margin-left:100px">

                <div style="width:500px;float:left"  ng-repeat="(key,item) in cardInfoList">
                    <div>
                        <label>卡号：</label><label>{{item['MEMBER_CARD.CARD_NO']}}</label>

                        <label style="margin-left: 120px">{{item['MEMBER_CARD.CARD_NAME']}}</label>
                    </div>
                    <br>
                    <label style="margin-left: 70px">{{cardTypeList[key]}}</label>
                    <div style="margin-left: 200px">
                        <label>余额：</label><label>{{item['MEMBER_CARD.BALANCE']}}</label><br>
                        <label>冻结：</label><label>{{item['MEMBER_CARD.FREEZE_BALANCE']}}</label>
                    </div>
                    <div>
                        <label>面值：</label><label>{{item['MEMBER_CARD.FACE_VALUE']}}</label>
                    </div><br>
                    <span>{{item['MEMBER_CARD.ADD_DATETIME']+cardSourceList[key]}}</span>
                </div>
            </div>
        </div>
    </div>
</div>