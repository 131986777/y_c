<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <!-- BEGIN 导航标签 -->
                <ul class="nav nav-tabs" style="margin-bottom: 0px; margin-left: 4px;">
                    <li class="active">
                        <a> 客户信息 </a>
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
                    <li>
                        <a ui-sref="memberCard({id:memberId})"> 会员卡 </a>
                    </li>
                </ul>
                <!-- END 导航标签 -->
            </div>
        </div>
        <form class="form-horizontal" novalidate="novalidate">
            <h4>基本信息</h4>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">ID</label>
                <div class="col-sm-4">
                    <label class="control-label" ng-bind="memberInfo['MEMBER.TYPE_ID']"></label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">登陆ID</label>
                <div ng-show="!modifyID" class="col-sm-4">
                    <label class="control-label" ng-bind="memberInfo['MEMBER.LOGIN_ID']"></label>
                </div>
                <div ng-show="modifyID" class="col-sm-4">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.LOGIN_ID']">
                </div>
            </div>
            <div ng-init="modifyID=false" class="form-group">
                <label class="control-label col-sm-1 right form-input-title"></label>
                <div class="col-sm-2">
                    <a class="table-link control-label" ng-click="modifyID=true">重置登陆ID</a>
                    <a class="table-link control-label" ng-click="initPWD()">重置密码</a>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">用户名</label>
                <div class="col-sm-4">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.USER_NAME']">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">头像</label>
                <div class="col-sm-4">

                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">手机号</label>
                <div class="col-sm-4">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.MOBILE']">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">邮箱</label>
                <div class="col-sm-4">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.EMAIL']">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">备注</label>
                <div class="col-sm-4">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.REMARK']">
                </div>
            </div>
        </form>
        <form class="form-horizontal" novalidate="novalidate">
            <h4>渠道</h4>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">来源</label>
                <div class="col-sm-4">
                    <label class="control-label" ng-bind="sourceMap.get(memberInfo['MEMBER.CODE_ID'])"></label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">类型</label>
                <div class="col-sm-4">
                    <select ng-model="memberInfo['MEMBER.TYPE_ID']"
                            class="nya-bs-select form-control">
                        <option class="nya-bs-option"
                                ng-repeat="value in typeList"
                                ng-bind="value['MEMBER_CODE_TYPE.NAME']"
                                value="{{value['MEMBER_CODE_TYPE.ID']}}">
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">绑定微信ID</label>
                <div class="col-sm-4">
                    <label class="control-label" ng-bind="memberInfo['MEMBER.WX_OPENID']"></label>
                </div>
                <div class="col-sm-4">
                    <a class="table-link" ng-click="unBindWX()"
                       ng-show="memberInfo['MEMBER.WX_OPENID']!=undefined">解除</a>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">绑定QQ登录</label>
                <div class="col-sm-4">
                    <label class="control-label" ng-bind="memberInfo['MEMBER.QQ_OPENID']"></label>
                </div>
                <div class="col-sm-1">
                    <a class="table-link" ng-click="unBindQQ()"
                       ng-show="memberInfo['MEMBER.QQ_OPENID']!=undefined">解除</a>
                </div>
            </div>
        </form>
    </div>
</div>