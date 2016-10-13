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
                        <a ui-sref="memberData({id:memberId})">
                            资料 </a>
                    </li>
                    <li class="active">
                        <a> 账户 </a>
                    </li>
                    <li>
                        <a ui-sref="memberAddress({id:memberId})"> 收件地址 </a>
                    </li>
                    <li>
                        <a ui-sref="memberCard({id:memberId})"> 会员卡 </a>
                    </li>
                </ul>
                <!-- END 导航标签 -->
            </div>
        </div>
        <form class="form-horizontal" novalidate="novalidate">
            <h4>账户</h4>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">余额</label>
                <div class="col-sm-1">
                    <label class="control-label">可用：</label>
                    <label class="control-label" ng-bind="account['MEMBER_ACCOUNT.BALANCE'] | currency : '￥'"></label>
                </div>
                <div class="col-sm-1">
                    <label class="control-label">冻结：</label>
                    <label class="control-label" ng-bind="account['MEMBER_ACCOUNT.FREEZE_BALANCE'] | currency : '￥'"></label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">积分</label>
                <div class="col-sm-1">
                    <label class="control-label">可用：</label>
                    <label class="control-label" ng-bind="account['MEMBER_ACCOUNT.POINT']"></label>
                </div>
                <div class="col-sm-1">
                    <label class="control-label">冻结：</label>
                    <label class="control-label" ng-bind="account['MEMBER_ACCOUNT.FREEZE_POINT']"></label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">分组</label>
                <div class="col-sm-4">
                    <select ng-model="member['MEMBER.GROUP_ID']"
                            class="nya-bs-select form-control">
                        <option class="nya-bs-option"
                                ng-repeat="value in groupList"
                                ng-bind="value['MEMBER_CODE_GROUP.NAME']"
                                value="{{value['MEMBER_CODE_GROUP.ID']}}">
                        </option>
                    </select>
                </div>
            </div>
        </form>
    </div>