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

        <table class="table table-bordered table-hover table-striped">
            <h4>基本信息</h4>
            <tbody>
            <tr>
                <th class="col-sm-1">ID</th>
                <td class="col-sm-2" ng-bind="memberInfo['MEMBER.TYPE_ID']"></td>
                <td class="col-sm-1"></td>
            </tr>
            <tr ng-init="modifyID=false">
                <th class="col-sm-1">登陆ID</th>
                <td class="col-sm-2" ng-show="!modifyID" ng-bind="memberInfo['MEMBER.LOGIN_ID']"></td>
                <td class="col-sm-2" ng-show="modifyID">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.LOGIN_ID']">
                </td>
                </td>
                <td class="col-sm-1">
                    <a class="table-link" ng-click="modifyID=true">重置登陆ID</a>
                    <a class="table-link" ng-click="initPWD()">重置密码</a>
                </td>
            </tr>
            <tr>
                <th class="col-sm-1">用户名</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.USER_NAME']"></td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">头像</th>
                <td class="col-sm-2"></td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">手机号</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.MOBILE']"></td>
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">邮箱</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.EMAIL']">
                </td>
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">备注</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberInfo['MEMBER.REMARK']"></td>
                </td>
                <td class="col-sm-1"></td>
            </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-hover table-striped">
            <h4>渠道</h4>
            <tbody>
            <tr>
                <th class="col-sm-1">来源</th>
                <td class="col-sm-2" ng-bind="sourceMap.get(memberInfo['MEMBER.CODE_ID'])"></td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">类型</th>
                <td class="col-sm-2">
                    <select ng-model="memberInfo['MEMBER.TYPE_ID']"
                            class="nya-bs-select form-control">
                        <option class="nya-bs-option"
                                ng-repeat="value in typeList"
                                ng-bind="value['MEMBER_CODE_TYPE.NAME']"
                                value="{{value['MEMBER_CODE_TYPE.ID']}}">
                        </option>
                    </select>
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">绑定微信ID</th>
                <td class="col-sm-2" ng-bind="memberInfo['MEMBER.WX_OPENID']"></td>
                <td class="col-sm-1"><a class="table-link" ng-click="unBindWX()" ng-show="memberInfo['MEMBER.WX_OPENID']!=undefined">解除</a>
                </td>
            </tr>
            <tr>
                <th class="col-sm-1">绑定QQ登录</th>
                <td class="col-sm-2" ng-bind="memberInfo['MEMBER.QQ_OPENID']"></td>
                <td class="col-sm-1"><a class="table-link" ng-click="unBindQQ()" ng-show="memberInfo['MEMBER.QQ_OPENID']!=undefined">解除</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>