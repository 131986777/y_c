<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <div class="col-sm-12 text-right">
                    <a ui-sref="roleAdd" type="button" class="btn btn-default">
                        <i class="fa fa-plus"></i>新增角色
                    </a>
                </div>
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th class="col-sm-3">角色名</th>
                <th class="col-sm-7">描述</th>
                <th class="col-sm-2">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="role in roleList">
                <td ng-bind="role['USER_ROLE.ROLE_NAME']"></td>
                <td ng-bind="role['USER_ROLE.INTRO']"></td>
                <td>
                    <a class="table-link" ui-sref="roleModify({id:role['USER_ROLE.ID']})">
                        修改
                    </a>
                    <a class="table-link" ng-click="delRole(role)">
                        删除
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
        <div page-bar
             filter-obj="filter"
             url="/user/role/queryAll"
             callback="bindData(response)">
        </div>
    </div>
</div>