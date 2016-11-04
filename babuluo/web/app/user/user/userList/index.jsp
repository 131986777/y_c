<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="table-operbar row">
                <div class="form-inline form-group col-sm-12">
                    <div class="form-group">
                        <input type="text" class="form-control" id="name" placeholder="登陆账号/姓名/手机号"
                               ng-model="queryContent">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-default pull-right"
                                ng-click="query()">查询
                        </button>
                    </div>
                    <label class="control-label">筛选：</label>
                    <select ng-model="filter['USER.STATE']"
                            ng-init="filter['USER.STATE'] = 'null'"
                            class="nya-bs-select form-control">
                        <option class="nya-bs-option" value="null">全部状态</option>
                        <option class="nya-bs-option" value="1">启用</option>
                        <option class="nya-bs-option" value="-1">停用</option>
                    </select>
                    <select ng-model="filter['USER.REG_DATETIME']"
                            ng-init="filter['USER.REG_DATETIME'] = 'REG_DATETIME DESC'; "
                            class="nya-bs-select form-control">
                        <option class="nya-bs-option" value="REG_DATETIME DESC">注册时间 ↓</option>
                        <option class="nya-bs-option" value="REG_DATETIME ASC">注册时间 ↑</option>
                    </select>
                    <a ui-sref="userAdd">
                        <button id="sample_editable_1_new" class="btn btn-default pull-right">
                            <i class="fa fa-plus"></i> 新增员工
                        </button>
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
                <td ng-bind="user['USER.MAIL']"></td>
                <td ng-bind="user['USER.REG_DATETIME'] | FormatStrDate"></td>
                <td ng-bind="user['USER.STATE'] | FormatState"></td>
                <td>
                    <a class="table-link" ui-sref="userModify({id:user['USER.UID']})">
                        修改
                    </a>
                    <a class="table-link" ng-click="modifyState(user)">
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