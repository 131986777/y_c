<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content" >

    <div class="table-operbar row">

        <div class="table-toolbar">
            <div class="row">
                <div class="col-md-12 text-right">
                    <a show-modal id="#addUnit" class="btn sbold green"> <i
                            class="fa fa-plus"></i> 新增单位 </a>
                </div>
            </div>
        </div>


        <div class="col-md-12 multi-menu multi-menu-bordered" ng-cloak>
           
            <div class="table-scrollable">
                <table class="table table-striped table-hover">

                    <tbody ng-cloak>

                    <tr ng-repeat=" value in productUnitList">
                        <td class="col-md-10" style="text-align: left">
                            <i class="fa fa-folder-o"></i>
                            {{value['SHOP_UNIT.UNIT_NAME']}}
                        </td>

                        <td class="col-md-2">
                            <a show-modal id="#modifyUnit"
                               ng-click="modifyUnitNameClick(value)">修改</a>
                            <a ng-click="delProductUnit(value['SHOP_UNIT.UNIT_ID'])">删除</a>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>


    <!--BEGIN 新增单位-->
    <div class="modal fade text-left" id="addUnit" tabindex="-1" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">添加商品单位</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 单位名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="add['SHOP_UNIT.UNIT_NAME']"
                                       ng-init="add['SHOP_UNIT.UNIT_NAME']=''"
                                       placeholder=""></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" ng-click="addProductUnit()" class="btn green">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--END 新增单位-->

    <!--BEGIN 修改单位-->
    <div class="modal fade text-left" id="modifyUnit" tabindex="-1"
         aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">修改商品单位</h4>
                </div>
                <div class="modal-body form-body text-right">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 单位名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['SHOP_UNIT.UNIT_NAME']"
                                       placeholder=""></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="modifyProductUnit()">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</div>
<!-- END CONTENT -->
