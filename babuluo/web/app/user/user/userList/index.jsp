<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <div class="col-sm-2">
                    <div class="col-sm-3" style="padding: 8px">
                        <label>筛选：</label>
                    </div>
                    <div class="col-sm-6" style="padding: 0px">

                        <select ng-model="filter['USER.STATE']"
                                ng-init="filter['USER.STATE']='null'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="null">
                                全部状态
                            </option>
                            <option class="nya-bs-option" value="1">
                                启用
                            </option>
                            <option class="nya-bs-option" value="-1">
                                停用
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-3" style="padding: 0px">
                    </div>
                </div>
                <div class="col-sm-10 text-right">
                    <a ui-sref="userAdd" type="button" class="btn btn-default">
                        新增员工
                    </a>
                </div>
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th>登陆账号</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>邮箱</th>
                <th>注册时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="user in userList|filter:{}">
                <td>
                    <span ng-bind="user['USER.LOGIN_ID']"></span>
                </td>
                <td ng-bind="user['USER.REAL_NAME']"></td>
                <td ng-bind="user['USER.MOBILE']"></td>
                <td ng-bind="user['USER.MAIL']"> </td>
                <td ng-bind="user['USER.REG_DATETIME'] | FormatStrDate"></td>
                <td ng-bind="user['USER.STATE'] | FormatState"></td>
                <td>
                    <a class="table-link">
                        修改
                    </a>
                    <a class="table-link"  ng-click="modifyState(user)">
                        <span ng-show="user['USER.STATE']==1">停用</span>
                        <span ng-show="user['USER.STATE']==-1">启用</span>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
        <div page-bar
             filter-obj="filter"
             url="/user/user/queryAll"
             callback="bindData(response)">
        </div>
    </div>
</div>