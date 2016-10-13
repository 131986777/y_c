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
            <div class="row">
                <div class="col-md-12">

                    <div ng-repeat="cl in cardInfoList" class="card center-block pull-left" ng-style="cl['MEMBER_CARD.CARD_STYLE']">
                        <div class="row cardTitle">
                            <div class="col-md-8">{{cl['MEMBER_CARD.CARD_NO'] | FormatNo}}</div>
                            <div class="col-md-4 text-right">{{cl['MEMBER_CARD.TYPE_NAME']}}</div>
                        </div>
                        <p class="balance"><span>余额</span>{{cl['MEMBER_CARD.BALANCE'] | currency : '￥'}}</p>
                        <p ng-show="cl['MEMBER_CARD.FREEZE_BALANCE']!=0" class="froze">
                            （冻结{{cl['MEMBER_CARD.FREEZE_BALANCE'] | currency : '￥'}}）</p>
                        <div class="row cardFooter">
                            <div class="col-md-4 nowrap">{{cl['MEMBER_CARD.ADD_DATETIME'] |FormatStrDate}}</div>
                            <div class="col-md-4 nowrap text-right count">
                                <span ng-show="cl['MEMBER_CARD.IS_FACE_VALUE']==1">面值{{cl['MEMBER_CARD.FACE_VALUE'] | currency : '￥'}}</span>
                            </div>
                            <div class="col-md-4 text-right time nowrap">
                                {{cl['MEMBER_CARD.SOURCE_NAME']}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>