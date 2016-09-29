<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <div class="table-operbar row">

        <div class="table-toolbar">
            <div class="row">
                <div class="col-md-12 text-right">
                    <a show-modal id="#addTag" class="btn sbold green"> <i
                            class="fa fa-plus"></i> 新增标签 </a>
                    <a href="productTagOrder.jsp" class="btn green btn-outline">
                        排序 </a>
                </div>
            </div>
        </div>


        <div class="col-md-12 multi-menu multi-menu-bordered" ng-cloak>

            <div class="table-scrollable">
                <table class="table table-striped table-hover">

                    <tbody ng-cloak>

                    <tr ng-repeat=" value in productTagList">
                        <td class="col-md-10" style="text-align: left">
                            <i class="fa fa-folder-o"></i>
                            {{value['SHOP_TAG.TAG']}}
                        </td>

                        <td class="col-md-2">
                            <a show-modal id="#modifyTag"
                               ng-click="modifyTagNameClick(value)">修改</a>
                            <a ng-click="delProductTag(value['SHOP_TAG.TAG_ID'])">删除</a>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>


    <!--BEGIN 新增标签-->
    <div class="modal fade text-left" id="addTag" tabindex="-1" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">添加商品标签</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <form class="form-horizontal">

                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 标签名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="add['SHOP_TAG.TAG']"
                                       ng-init="add['SHOP_TAG.TAG']=''"
                                       placeholder=""></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" ng-click="addProductTag()" class="btn green">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--END 新增标签-->

    <!--BEGIN 修改标签-->
    <div class="modal fade text-left" id="modifyTag" tabindex="-1"
         aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">修改商品标签</h4>
                </div>
                <div class="modal-body form-body text-right">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 标签名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['SHOP_TAG.TAG']"
                                       placeholder=""></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="modifyProductTag()">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--END 修改标签-->

</div>
