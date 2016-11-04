<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<h1>Hello Word！</h1>--%>
<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-md-12">
        <div class="page-operation-wrap">
            <div class="table-operbar ">
                <div class="table-toolbar" style="padding:14px 0;">

                    <div class="row">
                    <div class="col-md-2">

                        <select ng-model="filter['MEMBER_CODE_GROUP.TYPE_ID']"
                                ng-init="filter['MEMBER_CODE_GROUP.TYPE_ID']='null'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="null">
                                所属类型
                            </option>
                            <option class="nya-bs-option"
                                    ng-repeat="value in MemberTypeList"
                                    ng-bind="value['MEMBER_CODE_TYPE.NAME']"
                                    value="{{value['MEMBER_CODE_TYPE.ID']}}">
                            </option>
                        </select>
                    </div>


                    <div class="col-md-10 text-right">
                        <button show-modal id="#addMemberGroup" class="btn btn-default sbold green">
                            <i class="fa fa-plus"></i> 新增客户分组 </button>
                    </div>
                    </div>
                </div>
                <table class="table table-bordered table-hover table-striped">
                    <thead>
                    <tr>


                        <th class="col-md-2"> 分组名称</th>
                        <th class="col-md-2"> 所属类型</th>
                        <th class="col-md-3"> 分组介绍</th>

                        <th class="col-md-1 text-center"> 操作</th>
                    </tr>
                    </thead>
                    <tbody ng-cloak>
                    <tr ng-repeat="item in MemberGroupList">
                        <td ng-bind="item['MEMBER_CODE_GROUP.NAME']"></td>
                        <td ng-bind="typeMap.get(item['MEMBER_CODE_GROUP.TYPE_ID'])"></td>
                        <td ng-bind="item['MEMBER_CODE_GROUP.INTRO']"></td>
                        <td class="text-center">
                            <a type="button" show-modal id="#modifyMemberGroup"
                               ng-click="modifyMemberGroupClick(item)">修改</a>
                            <a type="button" ng-click="deleteMemberGroup(item['MEMBER_CODE_GROUP.ID'])">
                                删除
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div page-bar
         filter-obj="filter"
         url="/member/group/queryAll"
         callback="bindData(response)">
    </div>


    <!--BEGIN 新增客户分组-->
    <div class="modal fade text-left" id="addMemberGroup" tabindex="-1" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dimdiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">添加客户分组</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <form class="form-horizontal">


                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                所属类型
                            </label>

                            <div class="col-md-8">

                                <select ng-model="add['MEMBER_CODE_GROUP.TYPE_ID']"
                                        ng-init="add['MEMBER_CODE_GROUP.TYPE_ID']='-1'"
                                        class="nya-bs-select form-control">
                                    <option class="nya-bs-option" ng-repeat="item in MemberTypeList "
                                            ng-bind="item['MEMBER_CODE_TYPE.NAME']"
                                            value="{{item['MEMBER_CODE_TYPE.ID']}}">
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分组名称
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="add['MEMBER_CODE_GROUP.NAME']"
                                       ng-init="add['MEMBER_CODE_GROUP.NAME']=''"
                                       placeholder=""></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                分组介绍
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="add['MEMBER_CODE_GROUP.INTRO']"
                                       ng-init="add['MEMBER_CODE_GROUP.INTRO']=''"
                                       placeholder=""></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" ng-click="addMemberGroup()" class="btn green">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>

                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--END 新增客户分组-->

    <!--BEGIN 修改客户分组-->
    <div class="modal fade text-left" id="modifyMemberGroup" tabindex="-1" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dimdiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">修改客户分组</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">所属类型:
                            </label>

                            <div class="col-md-8">
                                <select ng-model="modify['MEMBER_CODE_GROUP.TYPE_ID']"
                                        class="nya-bs-select form-control">
                                    <option class="nya-bs-option"
                                            ng-repeat="item in MemberTypeList"
                                            ng-bind="item['MEMBER_CODE_TYPE.NAME']"
                                            value="{{item['MEMBER_CODE_TYPE.ID']}}">
                                    </option>

                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分类名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['MEMBER_CODE_GROUP.NAME']"
                                       placeholder=""></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分类名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['MEMBER_CODE_GROUP.INTRO']"
                                       placeholder=""></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" ng-click="modifyMemberGroup()" class="btn green">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>

            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--END 修改客户来源-->


