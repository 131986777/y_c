<%--<h1>Hello Word！</h1>--%>
<div class="table-operbar row">
    <div class="tablebar">

        <div class="col-sm-2">
            <div class="col-sm-3" style="padding: 8px">
                <label>筛选:</label>
            </div>
            <div class="col-sm-5" style="padding: 0px">

                <select ng-model="groupFilter['member_code_type.ID']"
                        ng-init="groupFilter['member_code_type.ID']='-1'"
                        class="nya-bs-select form-control " data-width="80px"
                        ng-change="filterGroup(groupFilter['member_code_type.ID'])">
                    <option class="nya-bs-option" value="-1">
                        所属类型
                    </option>
                    <option class="nya-bs-option"
                            ng-repeat="value in MemberTypeList"
                            ng-bind="value['member_code_type.NAME']"
                            value="{{value['member_code_type.ID']}}">
                    </option>
                </select>
            </div>

        </div>
        <div class="col-sm-10 text-right">
            <a show-modal id="#addMemberGroup" class="btn sbold green">
                <i class="fa fa-plus"></i> 新增客户分组 </a>
        </div>
    </div>
    <div class="col-md-12">
        <div class="table-scrollable">
            <table class="table table-striped table-hover">
                <thead>
                <tr>

                    <th class="col-md-2"> 所属类型</th>
                    <th class="col-md-2"> 分组名称</th>
                    <th class="col-md-3"> 分组介绍</th>

                    <th class="col-md-1 text-center"> 操作</th>
                </tr>
                </thead>
                <tbody ng-cloak>
                <tr ng-repeat="item in MemberGroupList">

                    <td ng-bind="typeMap.get(item['member_code_group.TYPE_ID'])"></td>
                    <td ng-bind="item['member_code_group.NAME']"></td>
                    <td ng-bind="item['member_code_group.INTRO']"></td>
                    <td class="text-center">
                        <a type="button" show-modal id="#modifyMemberGroup"
                           ng-click="modifyMemberGroupClick(item)">修改</a>
                        <button type="button" ng-click="deleteMemberGroup(item['member_code_group.ID'])"
                                class="btn btn-link btn-xs">
                            删除
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!--BEGIN 新增客户分组-->
<div class="modal fade text-left" id="addMemberGroup" tabindex="-1" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
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

                            <select ng-model="add['member_code_group.TYPE_ID']"
                                    ng-init="add['member_code_group.TYPE_ID']='-1'"
                                    class="nya-bs-select form-control">
                                <option class="nya-bs-option" ng-repeat="item in MemberTypeList "
                                        ng-bind="item['member_code_type.NAME']"
                                        value="{{item['member_code_type.ID']}}">
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
                                   ng-model="add['member_code_group.INTRO']"
                                   ng-init="add['member_code_group.INTRO']=''"
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
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true"></button>
                <h4 class="modal-title">修改客户分组</h4>
            </div>
            <div class="modal-body form-body text-right">

                <form class="form-horizontal">


                    <div class="form-group row">
                        <label class="col-md-3 control-label">
                            所属类型
                        </label>

                        <div class="col-md-8">
                            <%--<input type="text" class="form-control"
                                   ng-model="modify['member_code_group.TYPE_ID']"></div>--%>
                            <select ng-model="modify['member_code_group.TYPE_ID']"
                                    ng-init="typeMap.get(modify['member_code_group.TYPE_ID'])"
                                    class="nya-bs-select form-control"
                                    ng-change="addDistrictModal(shopEdited['shop.DISTRICT_ID'])">
                                <option class="nya-bs-option"
                                        ng-repeat="item in MemberTypeList"
                                        ng-bind="item['member_code_type.NAME']"
                                        value="{{item['member_code_type.NAME']}}">
                                </option>

                            </select>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分组名称
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['member_code_group.NAME']"
                                       placeholder=""></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                分组介绍
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['member_code_group.INTRO']"
                                       placeholder=""></div>
                        </div>
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


