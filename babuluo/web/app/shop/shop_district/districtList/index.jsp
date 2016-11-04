<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <div class="table-operbar row">

        <div class="table-toolbar">
            <div class="row">
                <div class="col-md-12 text-right">
                    <a show-modal id="#addDistrict" class="btn btn-default sbold green"> <i
                            class="fa fa-plus"></i> 新增区域 </a>
                    <%--<a href="#" class="btn green btn-outline">--%>
                        <%--排序 </a>--%>
                </div>
            </div>
        </div>


        <div class="col-md-12 multi-menu multi-menu-bordered" ng-cloak>

            <div class="table-scrollable">
                <table class="table table-striped table-hover">

                    <tbody ng-cloak>

                    <tr ng-repeat="value in districtList">
                        <td class="col-md-10" style="text-align: left">
                            <i class="fa fa-folder-o"></i>
                            {{value['DISTRICT.DISTRICT_NAME']}}
                        </td>

                        <td class="col-md-2 text-right">
                            <a show-modal id="#modifyDistrict"
                               ng-click="modifyDistrictNameClick(value)">修改</a>
                            <a ng-click="delDistrict(value)">删除</a>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>


    <!--BEGIN 新增标签-->
    <div class="modal fade text-left" id="addDistrict" tabindex="-1" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">新增区域</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <form class="form-horizontal">

                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required" style="color: red"> * </span> 区域名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="add['DISTRICT.DISTRICT_NAME']"
                                       ng-init="add['DISTRICT.DISTRICT_NAME']=''"
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
    <!--END 新增标签-->

    <!--BEGIN 修改标签-->
    <div class="modal fade text-left" id="modifyDistrict" tabindex="-1"
         aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">修改区域</h4>
                </div>
                <div class="modal-body form-body text-right">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required" style="color: red"> * </span> 区域名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['DISTRICT.DISTRICT_NAME']"
                                       placeholder=""></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="modifyDistrict()">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--END 修改标签-->

</div>
