<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content" >
    <!-- BEGIN 内容区 -->
    <div class="page-content-wrapper">
        <!-- BEGIN CONTENT BODY -->
        <div class="page-content">


            <div class="table-operbar row">

                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <a data-toggle="modal" href="#addClass" class="btn sbold green"> <i
                                    class="fa fa-plus"></i> 新增分类 </a>
                            <a href="" class="btn green btn-outline"> 排序 </a>
                        </div>
                    </div>
                </div>

                <!--新下拉组件  16.08.22  BY ZHJ and BYX-->
                <div class="col-md-12 multi-menu multi-menu-bordered" ng-cloak>
                    <div class="first-menu">
                        <div class="first-menu-item" ng-init="multiMenuInit()"
                             ng-repeat="(key, firstMenu) in multimenuList">
                            <div class="item" ng-show="key">
                                <i class="fa" ng-click="toggleMenu(firstMenu)"
                                   ng-class="firstMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                   data-stopPropagation="true" ng-show="firstMenu.childList"></i>
                                <i class="fa" ng-show="!firstMenu.childList"></i>
                                <span ng-bind="firstMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                <span class="pull-right" >
                                    <a data-toggle="modal" href="#modifyClass"
                                       ng-click="pclass2change(firstMenu['SHOP_PRODUCT_CLASS.CLASS_NAME'],firstMenu['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'],firstMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">修改</a>
                                    <a ng-click="delProductClass(firstMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                                </span>

                            </div>

                            <div class="second-menu" ng-show="firstMenu.showSubmenu">
                                <div class="second-menu-item"
                                     ng-repeat="(key, secondMenu) in firstMenu.childList">
                                    <div class="item">
                                        <i class="fa" ng-click="toggleMenu(secondMenu)"
                                           ng-class="secondMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                           data-stopPropagation="true" ng-show="secondMenu.childList"></i>
                                        <i class="fa" ng-show="!secondMenu.childList"></i>
                                        <span ng-bind="secondMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                        <span class="pull-right">
                                            <a data-toggle="modal"
                                               href="#modifyClass"
                                               ng-click="pclass2change(secondMenu['SHOP_PRODUCT_CLASS.CLASS_NAME'],secondMenu['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'],secondMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">修改</a>
                                            <a ng-click="delProductClass(secondMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                                        </span>
                                    </div>

                                    <div class="third-menu" ng-show="secondMenu.showSubmenu">
                                        <div class="third-menu-item"
                                             ng-repeat="(key, thirdMenu) in secondMenu.childList">
                                            <div class="item">
                                                <i class="fa" ng-click="toggleMenu(thirdMenu)"
                                                   ng-class="thirdMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                   data-stopPropagation="true" ng-show="thirdMenu.childList"></i>
                                                <i class="fa" ng-show="!thirdMenu.childList"></i>
                                                <span ng-bind="thirdMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                <span class="pull-right">
                                                    <a data-toggle="modal"
                                                       href="#modifyClass"
                                                       ng-click="pclass2change(thirdMenu['SHOP_PRODUCT_CLASS.CLASS_NAME'],thirdMenu['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'],thirdMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">修改</a>
                                                    <a ng-click="delProductClass(thirdMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                                                </span>
                                            </div>

                                            <div class="fourth-menu" ng-show="thirdMenu.showSubmenu">
                                                <div class="fourth-menu-item"
                                                     ng-repeat="(key, fourthMenu) in thirdMenu.childList">
                                                    <div class="item">
                                                        <i class="fa" ng-click="toggleMenu(fourthMenu)"
                                                           ng-class="fourthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                           data-stopPropagation="true" ng-show="fourthMenu.childList"></i>
                                                        <i class="fa"
                                                           ng-show="!fourthMenu.childList"></i>
                                                        <span ng-bind="fourthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>
                                                        <span class="pull-right">
                                                            <a data-toggle="modal"
                                                               href="#modifyClass"
                                                               ng-click="pclass2change(fourthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME'],fourthMenu['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'],fourthMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">修改</a>
                                                            <a ng-click="delProductClass(fourthMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                                                        </span>
                                                    </div>

                                                    <div class="fifth-menu" ng-show="fourthMenu.showSubmenu">
                                                        <div class="fifth-menu-item"
                                                             ng-repeat="(key, fifthMenu) in fourthMenu.childList">
                                                            <div class="item">
                                                                <i class="fa"
                                                                   ng-click="toggleMenu(fifthMenu)"
                                                                   ng-class="fifthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                                   data-stopPropagation="true" ng-show="fifthMenu.childList"></i>
                                                                <i class="fa"
                                                                   ng-show="!fifthMenu.childList"></i>
                                                                <span ng-bind="fifthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                                <span class="pull-right">
                                                                    <a data-toggle="modal"
                                                                       href="#modifyClass"
                                                                       ng-click="pclass2change(fifthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME'],fifthMenu['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'],fifthMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">修改</a>
                                                                    <a ng-click="delProductClass(fifthMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                                                                </span>
                                                            </div>

                                                            <div class="sixth-menu" ng-show="fifthMenu.showSubmenu">
                                                                <div class="sixth-menu-item"
                                                                     ng-repeat="(key, sixthMenu) in fifthMenu.childList">
                                                                    <div class="item">
                                                                        <i class="fa"></i>
                                                                        <span ng-bind="sixthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                                        <span class="pull-right">
                                                                            <a data-toggle="modal"
                                                                               href="#modifyClass"
                                                                               ng-click="pclass2change(sixthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME'],sixthMenu['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID'],sixthMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">修改</a>
                                                                            <a ng-click="delProductClass(sixthMenu['SHOP_PRODUCT_CLASS.CLASS_ID'])">删除</a>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
        <!-- END CONTENT -->

    </div>
    <!-- END 内容区 -->

    <!-- END CONTAINER -->


    <!--BEGIN 新增分类-->
    <div class="modal fade text-left" id="addClass" ng-enter="addProductClass()" tabindex="-1" aria-hidden="true"
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
                            <label class="col-md-3 control-label">所属分类
                            </label>

                            <div class="col-md-8">

                                <div class="btn-group dropdown dropdown-form-control multi-menu" ng-init="add['SHOP_PRODUCT_CLASS.PARENT_CLASS_ID']=0;parentName ='根分类'">
                                    <button type="button"
                                            class="btn btn-default dropdown-toggle"
                                            data-toggle="dropdown">
                                        <span ng-bind="parentName"></span>

                                        <i class="fa fa-angle-down"></i>
                                    </button>
                                    <div class="dropdown-menu first-menu">

                                        <div class="first-menu-item" ng-init="multiMenuInit()"
                                             ng-repeat="(key, firstMenu) in multimenuList2">

                                            <div class="item" ng-click="changeBtn(firstMenu)">
                                                <i class="fa" ng-click="toggleMenu(firstMenu)"
                                                   ng-class="firstMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                   data-stopPropagation="true" ng-show="firstMenu.childList"></i>
                                                <i class="fa" ng-show="!firstMenu.childList"></i>
                                                <span ng-bind="firstMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>


                                            </div>

                                            <div class="second-menu" ng-show="firstMenu.showSubmenu">
                                                <div class="second-menu-item"
                                                     ng-repeat="(key, secondMenu) in firstMenu.childList">
                                                    <div class="item" ng-click="changeBtn(secondMenu)">
                                                        <i class="fa" ng-click="toggleMenu(secondMenu)"
                                                           ng-class="secondMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                           data-stopPropagation="true" ng-show="secondMenu.childList"></i>
                                                        <i class="fa" ng-show="!secondMenu.childList"></i>
                                                        <span ng-bind="secondMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                    </div>

                                                    <div class="third-menu" ng-show="secondMenu.showSubmenu">
                                                        <div class="third-menu-item"
                                                             ng-repeat="(key, thirdMenu) in secondMenu.childList">
                                                            <div class="item" ng-click="changeBtn(thirdMenu)">
                                                                <i class="fa" ng-click="toggleMenu(thirdMenu)"
                                                                   ng-class="thirdMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                                   data-stopPropagation="true" ng-show="thirdMenu.childList"></i>
                                                                <i class="fa" ng-show="!thirdMenu.childList"></i>
                                                                <span ng-bind="thirdMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                            </div>

                                                            <div class="fourth-menu" ng-show="thirdMenu.showSubmenu">
                                                                <div class="fourth-menu-item"
                                                                     ng-repeat="(key, fourthMenu) in thirdMenu.childList">
                                                                    <div class="item" ng-click="changeBtn(fourthMenu)">
                                                                        <i class="fa" ng-click="toggleMenu(fourthMenu)"
                                                                           ng-class="fourthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                                           data-stopPropagation="true" ng-show="fourthMenu.childList"></i>
                                                                        <i class="fa"
                                                                           ng-show="!fourthMenu.childList"></i>
                                                                        <span ng-bind="fourthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                                    </div>

                                                                    <div class="fifth-menu" ng-show="fourthMenu.showSubmenu">
                                                                        <div class="fifth-menu-item"
                                                                             ng-repeat="(key, fifthMenu) in fourthMenu.childList">
                                                                            <div class="item"  ng-click="changeBtn(fifthMenu)">
                                                                                <i class="fa"
                                                                                   ng-click="toggleMenu(fifthMenu)"
                                                                                   ng-class="fifthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"
                                                                                   data-stopPropagation="true" ng-show="fifthMenu.childList"></i>
                                                                                <i class="fa"
                                                                                   ng-show="!fifthMenu.childList"></i>
                                                                                <span ng-bind="fifthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>

                                                                            </div>

                                                                            <div class="sixth-menu" ng-show="fifthMenu.showSubmenu">
                                                                                <div class="sixth-menu-item"
                                                                                     ng-repeat="(key, sixthMenu) in fifthMenu.childList">
                                                                                    <div class="item" ng-click="changeBtn(sixthMenu)">
                                                                                        <i class="fa"></i>
                                                                                        <span ng-bind="sixthMenu['SHOP_PRODUCT_CLASS.CLASS_NAME']"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 分类名称
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control" ng-model="add['SHOP_PRODUCT_CLASS.CLASS_NAME']" ng-init="add['SHOP_PRODUCT_CLASS.CLASS_NAME']=''"
                                       placeholder=""></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" ng-click="addProductClass()" class="btn green">确定</button>
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
    <div class="modal fade text-left" id="modifyClass"ng-enter="modifyProductClass()" tabindex="-1"
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
                                <input type="text" class="form-control" ng-model="modify['SHOP_PRODUCT_CLASS.CLASS_NAME']"
                                       ng-init="modify['SHOP_PRODUCT_CLASS.CLASS_NAME']=''" placeholder=""></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="modifyProductClass()">确定</button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- END 内容区 -->
    <div message-modal></div>
    <div short-message-modal></div>
</div>