<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content" >

    <div class="table-operbar row">

        <div class="table-toolbar">
            <div class="row">
                <div class="col-md-12 text-right">
                    <a show-modal id="#addClass" class="btn sbold green"> <i
                            class="fa fa-plus"></i> 新增分类 </a>
                    <a href="productClassOrder.jsp" class="btn green btn-outline">
                        排序 </a>
                </div>
            </div>
        </div>


        <div class="col-md-12 multi-menu multi-menu-bordered" ng-cloak>
            <%--<div class="first-menu">--%>
            <%--<div class="first-menu-item" ng-init="multiMenuInit()"--%>
            <%--ng-repeat="(key, firstMenu) in multimenuList">--%>
            <%--<div class="item">--%>
            <%--<i class="fa" ng-click="toggleMenu(firstMenu)"--%>
            <%--ng-class="firstMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
            <%--data-stopPropagation="true" ng-show="firstMenu.childList"></i>--%>
            <%--<i class="fa" ng-show="!firstMenu.childList"></i>--%>
            <%--{{firstMenu.class_NAME}}--%>

            <%--<span class="pull-right">--%>
            <%--<a data-toggle="modal" href="#modifyClass"--%>
            <%--ng-click="pclass2change(firstMenu.class_NAME,firstMenu.parent_CLASS_ID,firstMenu.class_ID)">修改</a>--%>
            <%--<a ng-click="delProductClass(key)">删除</a>--%>
            <%--</span>--%>
            <%--</div>--%>

            <%--<div class="second-menu" ng-show="firstMenu.showSubmenu">--%>
            <%--<div class="second-menu-item"--%>
            <%--ng-repeat="(key, secondMenu) in firstMenu.childList">--%>
            <%--<div class="item">--%>
            <%--<i class="fa" ng-click="toggleMenu(secondMenu)"--%>
            <%--ng-class="secondMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
            <%--data-stopPropagation="true" ng-show="secondMenu.childList"></i>--%>
            <%--<i class="fa" ng-show="!secondMenu.childList"></i>--%>
            <%--{{secondMenu.class_NAME}}--%>

            <%--<span class="pull-right">--%>
            <%--<a data-toggle="modal"--%>
            <%--href="#modifyClass"--%>
            <%--ng-click="pclass2change(secondMenu.class_NAME,secondMenu.parent_CLASS_ID,secondMenu.class_ID)">修改</a>--%>
            <%--<a ng-click="delProductClass(key)">删除</a>--%>
            <%--</span>--%>
            <%--</div>--%>

            <%--<div class="third-menu" ng-show="secondMenu.showSubmenu">--%>
            <%--<div class="third-menu-item"--%>
            <%--ng-repeat="(key, thirdMenu) in secondMenu.childList">--%>
            <%--<div class="item">--%>
            <%--<i class="fa" ng-click="toggleMenu(thirdMenu)"--%>
            <%--ng-class="thirdMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
            <%--data-stopPropagation="true" ng-show="thirdMenu.childList"></i>--%>
            <%--<i class="fa" ng-show="!thirdMenu.childList"></i>--%>
            <%--{{thirdMenu.class_NAME}}--%>

            <%--<span class="pull-right">--%>
            <%--<a data-toggle="modal"--%>
            <%--href="#modifyClass"--%>
            <%--ng-click="pclass2change(thirdMenu.class_NAME,thirdMenu.parent_CLASS_ID,thirdMenu.class_ID)">修改</a>--%>
            <%--<a ng-click="delProductClass(key)">删除</a>--%>
            <%--</span>--%>
            <%--</div>--%>

            <%--<div class="fourth-menu" ng-show="thirdMenu.showSubmenu">--%>
            <%--<div class="fourth-menu-item"--%>
            <%--ng-repeat="(key, fourthMenu) in thirdMenu.childList">--%>
            <%--<div class="item">--%>
            <%--<i class="fa" ng-click="toggleMenu(fourthMenu)"--%>
            <%--ng-class="fourthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
            <%--data-stopPropagation="true" ng-show="fourthMenu.childList"></i>--%>
            <%--<i class="fa"--%>
            <%--ng-show="!fourthMenu.childList"></i>--%>
            <%--{{fourthMenu.class_NAME}}--%>

            <%--<span class="pull-right">--%>
            <%--<a data-toggle="modal"--%>
            <%--href="#modifyClass"--%>
            <%--ng-click="pclass2change(fourthMenu.class_NAME,fourthMenu.parent_CLASS_ID,fourthMenu.class_ID)">修改</a>--%>
            <%--<a ng-click="delProductClass(key)">删除</a>--%>
            <%--</span>--%>
            <%--</div>--%>

            <%--<div class="fifth-menu" ng-show="fourthMenu.showSubmenu">--%>
            <%--<div class="fifth-menu-item"--%>
            <%--ng-repeat="(key, fifthMenu) in fourthMenu.childList">--%>
            <%--<div class="item">--%>
            <%--<i class="fa"--%>
            <%--ng-click="toggleMenu(fifthMenu)"--%>
            <%--ng-class="fifthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
            <%--data-stopPropagation="true" ng-show="fifthMenu.childList"></i>--%>
            <%--<i class="fa"--%>
            <%--ng-show="!fifthMenu.childList"></i>--%>
            <%--{{fifthMenu.class_NAME}}--%>

            <%--<span class="pull-right">--%>
            <%--<a data-toggle="modal"--%>
            <%--href="#modifyClass"--%>
            <%--ng-click="pclass2change(fifthMenu.class_NAME,fifthMenu.parent_CLASS_ID,fifthMenu.class_ID)">修改</a>--%>
            <%--<a ng-click="delProductClass(key)">删除</a>--%>
            <%--</span>--%>
            <%--</div>--%>

            <%--<div class="sixth-menu" ng-show="fifthMenu.showSubmenu">--%>
            <%--<div class="sixth-menu-item"--%>
            <%--ng-repeat="(key, sixthMenu) in fifthMenu.childList">--%>
            <%--<div class="item">--%>
            <%--<i class="fa"></i>--%>
            <%--{{sixthMenu.class_NAME}}--%>

            <%--<span class="pull-right">--%>
            <%--<a data-toggle="modal"--%>
            <%--href="#modifyClass"--%>
            <%--ng-click="pclass2change(sixthMenu.class_NAME,sixthMenu.parent_CLASS_ID,sixthMenu.class_ID)">修改</a>--%>
            <%--<a ng-click="delProductClass(key)">删除</a>--%>
            <%--</span>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <div class="table-scrollable">
                <table class="table table-striped table-hover">

                    <tbody ng-cloak>

                    <tr ng-repeat=" value in productClassList">
                        <td class="col-md-10" style="text-align: left">
                            <i class="fa fa-folder-o"></i>
                            {{value['SHOP_PRODUCT_CLASS.CLASS_NAME']}}
                        </td>

                        <td class="col-md-2">
                            <a show-modal id="#modifyClass"
                               ng-click="modifyClssNameClick(value)">修改</a>
                            <a ng-click="delProductClass(value['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>


    <!--BEGIN 新增分类-->
    <div class="modal fade text-left" id="addClass" tabindex="-1" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">添加商品分类</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">所属分类:
                            </label>

                            <div class="col-md-8">
                                <select ng-model="add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID']"
                                        ng-init="add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID']='BASIC'"
                                        class="nya-bs-select form-control">
                                    <option class="nya-bs-option" value="BASIC">根分类</option>
                                    <option class="nya-bs-option"
                                            ng-repeat="value in productClassList"
                                            ng-bind="value['SHOP_PRODUCT_CLASS.CLASS_NAME']"
                                            value="{{value['SHOP_PRODUCT_CLASS.CLASS_ID']}}">
                                    </option>
                                </select>

                                <%--<div class="btn-group dropdown dropdown-form-control multi-menu">--%>
                                <%--<button type="button"--%>
                                <%--class="btn btn-default dropdown-toggle"--%>
                                <%--data-toggle="dropdown">--%>
                                <%--请选择--%>
                                <%--<i class="fa fa-angle-down"></i>--%>
                                <%--</button>--%>
                                <%--<div class="dropdown-menu first-menu">--%>
                                <%--<div class="first-menu-item" ng-init="multiMenuInit()"--%>
                                <%--ng-repeat="(key, firstMenu) in multimenuList">--%>
                                <%--<div class="item">--%>
                                <%--<i class="fa" ng-click="toggleMenu(firstMenu)"--%>
                                <%--ng-class="firstMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                                <%--data-stopPropagation="true" ng-show="firstMenu.childList"></i>--%>
                                <%--<i class="fa" ng-show="!firstMenu.childList"></i>--%>
                                <%--{{firstMenu.class_NAME}}--%>

                                <%--</div>--%>

                                <%--<div class="second-menu" ng-show="firstMenu.showSubmenu">--%>
                                <%--<div class="second-menu-item"--%>
                                <%--ng-repeat="(key, secondMenu) in firstMenu.childList">--%>
                                <%--<div class="item">--%>
                                <%--<i class="fa" ng-click="toggleMenu(secondMenu)"--%>
                                <%--ng-class="secondMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                                <%--data-stopPropagation="true" ng-show="secondMenu.childList"></i>--%>
                                <%--<i class="fa" ng-show="!secondMenu.childList"></i>--%>
                                <%--{{secondMenu.class_NAME}}--%>
                                <%--</div>--%>

                                <%--<div class="third-menu" ng-show="secondMenu.showSubmenu">--%>
                                <%--<div class="third-menu-item"--%>
                                <%--ng-repeat="(key, thirdMenu) in secondMenu.childList">--%>
                                <%--<div class="item">--%>
                                <%--<i class="fa" ng-click="toggleMenu(thirdMenu)"--%>
                                <%--ng-class="thirdMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                                <%--data-stopPropagation="true" ng-show="thirdMenu.childList"></i>--%>
                                <%--<i class="fa" ng-show="!thirdMenu.childList"></i>--%>
                                <%--{{thirdMenu.class_NAME}}--%>
                                <%--</div>--%>

                                <%--<div class="fourth-menu" ng-show="thirdMenu.showSubmenu">--%>
                                <%--<div class="fourth-menu-item"--%>
                                <%--ng-repeat="(key, fourthMenu) in thirdMenu.childList">--%>
                                <%--<div class="item">--%>
                                <%--<i class="fa" ng-click="toggleMenu(fourthMenu)"--%>
                                <%--ng-class="fourthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                                <%--data-stopPropagation="true" ng-show="fourthMenu.childList"></i>--%>
                                <%--<i class="fa"--%>
                                <%--ng-show="!fourthMenu.childList"></i>--%>
                                <%--{{fourthMenu.class_NAME}}--%>
                                <%--</div>--%>

                                <%--<div class="fifth-menu" ng-show="fourthMenu.showSubmenu">--%>
                                <%--<div class="fifth-menu-item"--%>
                                <%--ng-repeat="(key, fifthMenu) in fourthMenu.childList">--%>
                                <%--<div class="item">--%>
                                <%--<i class="fa"--%>
                                <%--ng-click="toggleMenu(fifthMenu)"--%>
                                <%--ng-class="fifthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                                <%--data-stopPropagation="true" ng-show="fifthMenu.childList"></i>--%>
                                <%--<i class="fa"--%>
                                <%--ng-show="!fifthMenu.childList"></i>--%>
                                <%--{{fifthMenu.class_NAME}}--%>
                                <%--</div>--%>

                                <%--<div class="sixth-menu" ng-show="fifthMenu.showSubmenu">--%>
                                <%--<div class="sixth-menu-item"--%>
                                <%--ng-repeat="(key, sixthMenu) in fifthMenu.childList">--%>
                                <%--<div class="item">--%>
                                <%--<i class="fa"></i>--%>
                                <%--{{sixthMenu.class_NAME}}--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>
                                <%--</div>--%>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分类名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="add['SHOP_PRODUCT_CLASS.CLASS_NAME']"
                                       ng-init="add['SHOP_PRODUCT_CLASS.CLASS_NAME']=''"
                                       placeholder=""></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" ng-click="addProductClass()" class="btn green">确定
                    </button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--END 新增分类-->

    <!--BEGIN 修改分类-->
    <div class="modal fade text-left" id="modifyClass" tabindex="-1"
         aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">修改商品分类</h4>
                </div>
                <div class="modal-body form-body text-right">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分类名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="modify['SHOP_PRODUCT_CLASS.CLASS_NAME']"
                                       placeholder=""></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="modifyProductClass()">确定
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
