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

        <table class="table table-bordered table-hover table-striped">
            <h4>基本信息</h4>
            <tbody>
            <tr>
                <th class="col-sm-1">余额</th>
                <td class="col-sm-2">
                    可用：<span ng-bind="account['MEMBER_ACCOUNT.BALANCE']"></span>
                    冻结：<span ng-bind="account['MEMBER_ACCOUNT.FREEZE_BALANCE']"></span>
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">积分</th>
                <td class="col-sm-2">
                    可用：<span ng-bind="account['MEMBER_ACCOUNT.POINT']"></span>
                    冻结：<span ng-bind="account['MEMBER_ACCOUNT.FREEZE_POINT']"></span>
                </td>
                <td class="col-sm-1"></td>
            </tr>
            <tr>
                <th class="col-sm-1">分组</th>
                <td class="col-sm-2">
                    <select ng-model="account['MEMBER_ACCOUNT.GROUP_ID']"
                            ng-init="account['MEMBER_ACCOUNT.GROUP_ID']='-1'"
                            class="nya-bs-select form-control">
                        <option class="nya-bs-option" value="-1">
                            选择客户分组
                        </option>
                        <option class="nya-bs-option"
                                ng-repeat="value in groupList"
                                ng-bind="value['MEMBER_CODE_GROUP.NAME']"
                                value="{{value['MEMBER_CODE_GROUP.ID']}}">
                        </option>
                    </select>
                </td>
                <td class="col-sm-1"></td>
            </tr>

            </tbody>
        </table>
    </div>