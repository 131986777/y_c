<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <form class="form-horizontal" novalidate="novalidate">
            <h4>基本信息</h4>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">
                    <span class="icon-required">*</span>
                    角色名称
                </label>
                <div class="col-sm-4">
                    <input class="form-control" type="text" ng-model="roleModify['USER_ROLE.ROLE_NAME']">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">描述</label>
                <div class="col-sm-4">
                    <textarea class="form-control" type="text" ng-model="roleModify['USER_ROLE.INTRO']"></textarea>
                </div>
            </div>
        </form>
        <form class="form-horizontal" novalidate="novalidate">
            <h4>角色权限配置</h4>
            <div class="form-group">
                <label class="control-label col-sm-1 right form-input-title">
                    所选角色权限明细
                </label>
            </div>
            <div class="form-group">
                <div class="col-sm-8">
                    <div class="table-scrollable">
                        <table class="table table-bordered table-hover table-striped">
                            <thead>
                            <tr>
                                <th class="col-md-2"> 授权目标</th>
                                <th class="col-md-10"> 目标详细</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in pFirstAuthList">
                                <td style="text-align:center;font-size: 14px" ng-bind="item.auth_NAME"></td>
                                <td style="text-align:left">
                                    <div class="col-md-3" ng-repeat="value in item.childList">
                                        <div class="md-checkbox" ng-if="value.STATE==2"
                                             style="margin-left: 10px;margin-top: 15px;margin-bottom: 15px">
                                            <input type="checkbox"
                                                   id="{{value.AUTH_ID}}"
                                                   disabled="true"
                                                   ng-model="value.ifcheck"
                                                   class="md-check">
                                            <label for="{{value.AUTH_ID}}">
                                                <span class="inc"></span>
                                                <span class="check"></span>
                                                <span class="box"></span>
                                                {{value.AUTH_NAME}}
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>