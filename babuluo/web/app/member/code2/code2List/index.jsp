<%--
  Created by IntelliJ IDEA.
  User: cxy
  Date: 2016/9/26
  Time: 14:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>


<body>
<%--<h1>Hello Word！</h1>--%>
<div class="table-operbar row">
    <div class="table-toolbar">

        <div class="col-md-12 text-right" >
            <a   show-modal id="#addMemberType" class="btn sbold green" >
                <i class="fa fa-plus"></i> 新增客户类型 </a>
        </div>
    </div>
    <div class="col-md-12">
        <div class="table-scrollable">
            <table class="table table-striped table-hover">
                <thead>
                <tr>

                    <%--<th class="col-md-2"> 客户来源编码</th>--%>
                    <th class="col-md-2"> 客户类型名称</th>
                    <th class="col-md-3"> 客户类型介绍</th>

                    <th class="col-md-1 text-center"> 操作</th>
                </tr>
                </thead>
                <tbody ng-cloak>
                <tr ng-repeat="item in MemberTypeList">

                    <%--<td ng-bind="item['member_code_source.CODE']" ></td>--%>
                    <td ng-bind="item['member_code_type.NAME']"></td>
                    <td ng-bind="item['member_code_type.INTRO']"></td>
                    <td class="text-center">
                        <a type="button" show-modal id="#modifyMemberType"
                           ng-click="modifyMemberTypeClick(item)">修改</a>
                        <button type="button" ng-click="deleteMemberType(item['member_code_type.ID'])" class="btn btn-link btn-xs">
                            删除
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!--BEGIN 新增客户类型-->
<div class="modal fade text-left" id="addMemberType" tabindex="-1" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true"></button>
                <h4 class="modal-title">添加客户类型</h4>
            </div>
            <div class="modal-body form-body text-right">

                <form class="form-horizontal">



                    <div class="form-group row">
                        <label class="col-md-3 control-label">
                            <span class="required"> * </span> 客户类型名称
                        </label>

                        <div class="col-md-8">
                            <input type="text" class="form-control"
                                   ng-model="add['member_code_type.NAME']"
                                   ng-init="add['member_code_type.NAME']=''"
                                   placeholder=""></div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 control-label">
                            客户类型介绍
                        </label>

                        <div class="col-md-8">
                            <input type="text" class="form-control"
                                   ng-model="add['member_code_type.INTRO']"
                                   ng-init="add['member_code_type.INTRO']=''"
                                   placeholder=""></div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" ng-click="addMemberType()" class="btn green">确定
                </button>
                <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                </button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!--END 新增客户来源-->

<!--BEGIN 修改客户来源-->
<div class="modal fade text-left" id="modifyMemberType" tabindex="-1" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true"></button>
                <h4 class="modal-title">修改客户类型</h4>
            </div>
            <div class="modal-body form-body text-right">

                <form class="form-horizontal">


                    <div class="form-group row">
                        <label class="col-md-3 control-label">
                            <span class="required"> * </span> 客户类型名称
                        </label>

                        <div class="col-md-8">
                            <input type="text" class="form-control"
                                   ng-model="modify['member_code_type.NAME']"
                                   placeholder=""></div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 control-label">
                            客户类型介绍
                        </label>

                        <div class="col-md-8">
                            <input type="text" class="form-control"
                                   ng-model="modify['member_code_type.INTRO']"
                                   placeholder=""></div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" ng-click="modifyMemberType()" class="btn green">确定
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

</body>
</html>