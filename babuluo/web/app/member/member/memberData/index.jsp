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
                    <li class="active">
                        <a> 资料 </a>
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
            <h4>资料</h4>
            <tbody>
            <tr>
                <th class="col-sm-1">真实姓名</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberData['MEMBER.USER_NAME']">
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">QQ</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberData['MEMBER.USER_NAME']">
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">所在地区</th>
                <td class="col-sm-2"></td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">地址</th>
                <td class="col-sm-2">
                    <input class="form-control" type="text" ng-model="memberData['MEMBER.USER_NAME']">
                </td>
                <td class="col-sm-1"></td>
            </tr>
            </tbody>
        </table>
    </div>