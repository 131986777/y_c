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

                        <select ng-model="filter['member.CODE_ID']"
                                ng-init="filter['member.CODE_ID']='-1'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="-1">
                                客户来源
                            </option>
                            <option class="nya-bs-option"
                                    ng-repeat="value in sourceList"
                                    ng-bind="value['member_code_source.NAME']"
                                    value="{{value['member_code_source.CODE']}}">
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-2">

                        <select ng-model="filter['member.CODE_ID']"
                                ng-init="filter['member.CODE_ID']='-1'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="-1">
                                客户类型
                            </option>
                            <%--<option class="nya-bs-option"--%>
                                    <%--ng-repeat="value in sourceList"--%>
                                    <%--ng-bind="value['member_code_source.NAME']"--%>
                                    <%--value="{{value['member_code_source.CODE']}}">--%>
                            <%--</option>--%>
                        </select>
                    </div>
                    <div class="col-sm-2">

                        <select ng-model="filter['member.CODE_ID']"
                                ng-init="filter['member.CODE_ID']='-1'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="-1">
                                客户分组
                            </option>
                            <%--<option class="nya-bs-option"--%>
                                    <%--ng-repeat="value in sourceList"--%>
                                    <%--ng-bind="value['member_code_source.NAME']"--%>
                                    <%--value="{{value['member_code_source.CODE']}}">--%>
                            <%--</option>--%>
                        </select>
                    </div>
                    <div class="col-sm-1" style="padding-top: 8px;text-align: right">
                        排序:
                    </div>
                    <div class="col-sm-2">
                        <select ng-model="filter['member.CODE_ID']"
                                ng-init="filter['member.CODE_ID']='-1'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="-1">
                                注册时间
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
                <th class="col-sm-1">会员等级</th>
                <th class="col-sm-1">来源</th>
                <th class="col-sm-2">注册时间</th>
                <th class="col-sm-1">状态</th>
                <th class="col-sm-2">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="ml in memberList">
                <td ng-bind="ml['member.LOGIN_ID']"></td>
                <td ng-bind="ml['member.USER_NAME']"></td>
                <td ng-bind="ml['member.MOBILE']"></td>
                <td>会员等级</td>
                <td ng-bind="sourceMap.get(ml['member.CODE_ID'])"></td>
                <td ng-bind="ml['member.REG_DATETIME'] | FormatAllDate"></td>
                <td ng-bind="ml['member.USE_STATE'] | FormatState"></td>
                <td>
                    <a class="table-link" data-toggle="modal" data-target="#edit" ng-click="getMemberListById(ml)">
                        修改
                    </a>
                    <a class="table-link" ng-click="delMemberListById(ml)">
                        删除
                    </a>
                    <a class="table-link" ng-click="changeState(ml)">
                        <span ng-show="ml['member.USE_STATE'] == 1">停用</span>
                        <span ng-show="ml['member.USE_STATE'] == -1">启用</span>
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
                                           name="name" ng-model="memberAdd['member.USER_NAME']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>登陆账号：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="memberAdd['member.LOGIN_ID']"
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
                                    客户来源：
                                </label>
                                <div class="col-sm-7">
                                    <select ng-model="memberAdd['member.CODE_ID']"
                                            ng-init="memberAdd['member.CODE_ID']='-1'"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="value in sourceList"
                                                ng-bind="value['member_code_source.NAME']"
                                                value="{{value['member_code_source.CODE']}}">
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <%--<div class="form-group">--%>
                            <%--<label class="col-sm-3 control-label">--%>
                            <%--<span class="required" style="color: red"> * </span>客户类型：--%>
                            <%--</label>--%>
                            <%--<div class="col-sm-7">--%>
                            <%--<select ng-model="memberAdd['shop.DISTRICT_ID']"--%>
                            <%--ng-init="memberAdd['shop.DISTRICT_ID']='-1'"--%>
                            <%--class="nya-bs-select form-control"--%>
                            <%--ng-change="addDistrictModal(memberAdd['shop.DISTRICT_ID'])">--%>
                            <%--<option class="nya-bs-option"--%>
                            <%--ng-repeat="value in districtList"--%>
                            <%--ng-bind="value['district.DISTRICT_NAME']"--%>
                            <%--value="{{value['district.DISTRICT_ID']}}">--%>
                            <%--</option>--%>
                            <%--</select>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="form-group">--%>
                            <%--<label class="col-sm-3 control-label">--%>
                            <%--<span class="required" style="color: red"> * </span>客户分组：--%>
                            <%--</label>--%>
                            <%--<div class="col-sm-7">--%>
                            <%--<select ng-model="memberAdd['shop.DISTRICT_ID']"--%>
                            <%--ng-init="memberAdd['shop.DISTRICT_ID']='-1'"--%>
                            <%--class="nya-bs-select form-control"--%>
                            <%--ng-change="addDistrictModal(memberAdd['shop.DISTRICT_ID'])">--%>
                            <%--<option class="nya-bs-option"--%>
                            <%--ng-repeat="value in districtList"--%>
                            <%--ng-bind="value['district.DISTRICT_NAME']"--%>
                            <%--value="{{value['district.DISTRICT_ID']}}">--%>
                            <%--</option>--%>
                            <%--</select>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>手机号码：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="memberAdd['member.MOBILE']"
                                           maxlength="11" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" type="submit"
                                        ng-click="addMemberList()">
                                    保存
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
        <!-- END add modal -->
        <!-- BEGIN edit modal -->
        <div class="modal fade" id="edit" role="dialog" aria-labelledby="edit">
            <div class="modal-dialog" aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 class="modal-title">
                            修改客户
                        </h3>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" name="editForm" novalidate>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>用户名：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="name" ng-model="memberEdited['member.USER_NAME']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>登陆账号：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="memberEdited['member.LOGIN_ID']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    客户来源：
                                </label>
                                <div class="col-sm-7">
                                    <select ng-model="memberEdited['member.CODE_ID']"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="value in sourceList"
                                                ng-bind="value['member_code_source.NAME']"
                                                value="{{value['member_code_source.CODE']}}">
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <%--<div class="form-group">--%>
                            <%--<label class="col-sm-3 control-label">--%>
                            <%--<span class="required" style="color: red"> * </span>客户类型：--%>
                            <%--</label>--%>
                            <%--<div class="col-sm-7">--%>
                            <%--<select ng-model="memberEdit['shop.DISTRICT_ID']"--%>
                            <%--ng-init="memberEdit['shop.DISTRICT_ID']='-1'"--%>
                            <%--class="nya-bs-select form-control"--%>
                            <%--ng-change="addDistrictModal(memberEdit['shop.DISTRICT_ID'])">--%>
                            <%--<option class="nya-bs-option"--%>
                            <%--ng-repeat="value in districtList"--%>
                            <%--ng-bind="value['district.DISTRICT_NAME']"--%>
                            <%--value="{{value['district.DISTRICT_ID']}}">--%>
                            <%--</option>--%>
                            <%--</select>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="form-group">--%>
                            <%--<label class="col-sm-3 control-label">--%>
                            <%--<span class="required" style="color: red"> * </span>客户分组：--%>
                            <%--</label>--%>
                            <%--<div class="col-sm-7">--%>
                            <%--<select ng-model="memberEdit['shop.DISTRICT_ID']"--%>
                            <%--ng-init="memberEdit['shop.DISTRICT_ID']='-1'"--%>
                            <%--class="nya-bs-select form-control"--%>
                            <%--ng-change="addDistrictModal(memberEdit['shop.DISTRICT_ID'])">--%>
                            <%--<option class="nya-bs-option"--%>
                            <%--ng-repeat="value in districtList"--%>
                            <%--ng-bind="value['district.DISTRICT_NAME']"--%>
                            <%--value="{{value['district.DISTRICT_ID']}}">--%>
                            <%--</option>--%>
                            <%--</select>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>手机号码：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="memberEdited['member.MOBILE']"
                                           maxlength="11" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" type="submit"
                                        ng-click="modMemberList()">
                                    保存
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
        <!-- END edit modal -->
        <!--BEGIN 新增-->
        <div class="modal fade text-left" id="addMember" tabindex="-1" aria-hidden="true"
             style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"
                                aria-hidden="true"></button>
                        <h4 class="modal-title">新增客户</h4>
                    </div>
                    <div class="modal-body form-body text-right">

                        <form class="form-horizontal">

                            <div class="form-group row">
                                <label class="col-md-3 control-label">
                                    <span class="required" style="color: red"> * </span> 用户名:
                                </label>

                                <div class="col-md-8">
                                    <input type="text" class="form-control"
                                           ng-model="add['district.DISTRICT_NAME']"
                                           ng-init="add['district.DISTRICT_NAME']=''"
                                           placeholder=""></div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ng-click="addDistrict()" class="btn green">确定
                        </button>
                        <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--END 新增-->
        <div page-bar
             filter-obj="filter"
             url="/member/member/queryAll"
             callback="bindData(response)">
        </div>
    </div>