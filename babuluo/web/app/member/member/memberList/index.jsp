<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <div class="col-sm-6">
                    <div class="col-sm-1" style="padding-top: 8px;text-align: right">
                        筛选:
                    </div>
                    <div class="col-sm-2">

                        <select ng-model="filter['MEMBER.CODE_ID']"
                                ng-init="filter['MEMBER.CODE_ID']='null'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="null">
                                客户来源
                            </option>
                            <option class="nya-bs-option"
                                    ng-repeat="value in sourceList"
                                    ng-bind="value['MEMBER_CODE_SOURCE.NAME']"
                                    value="{{value['MEMBER_CODE_SOURCE.CODE']}}">
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-2">

                        <select ng-model="filter['MEMBER.TYPE_ID']"
                                ng-init="filter['MEMBER.TYPE_ID']='null'"
                                class="nya-bs-select form-control " data-width="80px"
                                ng-change="loadGroupByType(1,filter['MEMBER.TYPE_ID'])">
                            <option class="nya-bs-option" value="null">
                                客户类型
                            </option>
                            <option class="nya-bs-option"
                                    ng-repeat="value in typeList"
                                    ng-bind="value['MEMBER_CODE_TYPE.NAME']"
                                    value="{{value['MEMBER_CODE_TYPE.ID']}}">
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <select ng-model="filter['MEMBER.GROUP_ID']"
                                ng-init="filter['MEMBER.GROUP_ID']='null'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="null">
                                客户分组
                            </option>
                            <option class="nya-bs-option"
                                    ng-repeat="value in groupListById"
                                    ng-bind="value['MEMBER_CODE_GROUP.NAME']"
                                    value="{{value['MEMBER_CODE_GROUP.ID']}}">
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-1" style="padding-top: 8px;text-align: right">
                        排序:
                    </div>
                    <div class="col-sm-2">
                        <select ng-model="filter['MEMBER.REG_DATETIME']"
                                ng-init="filter['MEMBER.REG_DATETIME']='REG_DATETIME DESC'"
                                class="nya-bs-select form-control" data-width="80px">
                            <option class="nya-bs-option" value="REG_DATETIME DESC">
                                注册时间↓
                            </option>
                            <option class="nya-bs-option" value="REG_DATETIME ASC">
                                注册时间↑
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-6 text-right">
                    <a type="button" class="btn btn-default" data-toggle="modal" data-target="#add">
                        新增客户
                    </a>
                </div>
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th class="col-sm-2">登陆账号</th>
                <th class="col-sm-2">用户名</th>
                <th class="col-sm-1">手机号码</th>
                <th class="col-sm-1">客户分组</th>
                <th class="col-sm-1">来源</th>
                <th class="col-sm-2">注册时间</th>
                <th class="col-sm-1">状态</th>
                <th class="col-sm-2">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="ml in memberList|filter:{}">
                <td ng-bind="ml['MEMBER.LOGIN_ID']"></td>
                <td ng-bind="ml['MEMBER.USER_NAME']"></td>
                <td ng-bind="ml['MEMBER.MOBILE']"></td>
                <td ng-bind="ml['MEMBER.GROUP_NAME']"></td>
                <td ng-bind="ml['MEMBER.CODE_NAME']"></td>
                <td ng-bind="ml['MEMBER.REG_DATETIME'] | FormatAllDate"></td>
                <td ng-bind="ml['MEMBER.USE_STATE'] | FormatState"></td>
                <td>
                    <a class="table-link" ui-sref="memberInfo({id:ml['MEMBER.USER_ID']})">
                        客户详情
                    </a>
                    <a class="table-link" ng-click="delMemberListById(ml)">
                        删除
                    </a>
                    <a class="table-link" ng-click="changeState(ml)">
                        <span ng-show="ml['MEMBER.USE_STATE'] == 1">停用</span>
                        <span ng-show="ml['MEMBER.USE_STATE'] == -1">启用</span>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
        <!-- BEGIN add modal -->
        <div class="modal fade" id="add" role="dialog" aria-labelledby="add">
            <div class="modal-dialog" aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 class="modal-title">
                            新增客户
                        </h3>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" name="editForm"
                              ng-submit="addShop()" novalidate>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>用户名：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="name" ng-model="memberAdd['MEMBER.USER_NAME']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>登陆账号：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="memberAdd['MEMBER.LOGIN_ID']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    初始密码：
                                </label>
                                <label class="col-sm-7 control-label" style="text-align: left">
                                    A123456
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    客户类型：
                                </label>
                                <div class="col-sm-7">
                                    <select ng-model="memberAdd['MEMBER.TYPE_ID']"
                                            ng-init="memberAdd['MEMBER.TYPE_ID']='-1'"
                                            class="nya-bs-select form-control"
                                            ng-change="loadGroupByType(2,memberAdd['MEMBER.TYPE_ID'])">
                                        <option class="nya-bs-option" value="-1">
                                            选择客户类型
                                        </option>
                                        <option class="nya-bs-option"
                                                ng-repeat="value in typeList"
                                                ng-bind="value['MEMBER_CODE_TYPE.NAME']"
                                                value="{{value['MEMBER_CODE_TYPE.ID']}}">
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    客户分组：
                                </label>
                                <div class="col-sm-7">
                                    <select ng-model="memberAdd['MEMBER.GROUP_ID']"
                                            ng-init="memberAdd['MEMBER.GROUP_ID']='-1'"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option" value="-1">
                                            选择客户分组
                                        </option>
                                        <option class="nya-bs-option"
                                                ng-repeat="value in groupListByTypeId"
                                                ng-bind="value['MEMBER_CODE_GROUP.NAME']"
                                                value="{{value['MEMBER_CODE_GROUP.ID']}}">
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>手机号码：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="memberAdd['MEMBER.MOBILE']"
                                           maxlength="11" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" type="submit"
                                        ng-click="addMemberList()">
                                    确定
                                </button>
                                <button class="btn btn-default"
                                        data-dismiss="modal" ng-click="clearForm()">
                                    关闭
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div page-bar
             filter-obj="filter"
             url="/member/member/queryAll"
             callback="bindData(response)">
        </div>
    </div>