<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <div class="table-operbar row" ng-cloak>
        <div class="table-toolbar">
            <%--筛选功能--%>
            <div class="row">
                <%--<!-- 新下拉组件 08.22 By ZHJ and BYX-->--%>
                <%--<div class="col-md-9 form-inline">--%>
                <%--&lt;%&ndash;<span>筛选</span>&ndash;%&gt;--%>
                <%--<div ng-model="parentName" class="btn-group dropdown multi-menu" ng-init="filter.classId = -1">--%>

                <%--<button type="button"--%>
                <%--class="btn btn-default dropdown-toggle"--%>
                <%--data-toggle="dropdown">--%>

                <%--<span ng-bind="parentName"></span>--%>
                <%--<i class="fa fa-angle-down"></i>--%>
                <%--</button>--%>
                <%--<div class="dropdown-menu first-menu">--%>

                <%--<div class="first-menu-item" ng-init="multiMenuInit()"--%>
                <%--ng-repeat="(key,firstMenu) in multimenuList">--%>

                <%--<div class="item "ng-click="changeBtn(firstMenu)" >--%>
                <%--<i class="fa" ng-click="toggleMenu(firstMenu,$event)"--%>
                <%--ng-class="firstMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                <%--data-stopPropagation="true" ng-show="firstMenu.childList" ></i>--%>
                <%--<i class="fa" ng-show="!firstMenu.childList"></i>--%>
                <%--<span ng-bind="firstMenu.class_NAME"></span>--%>

                <%--</div>--%>

                <%--<div class="second-menu" ng-show="firstMenu.showSubmenu">--%>
                <%--<div class="second-menu-item"--%>
                <%--ng-repeat="(key, secondMenu) in firstMenu.childList">--%>
                <%--<div class="item" ng-click="changeBtn(secondMenu)">--%>
                <%--<i class="fa" ng-click="toggleMenu(secondMenu,$event)"--%>
                <%--ng-class="secondMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                <%--data-stopPropagation="true" ng-show="secondMenu.childList"></i>--%>
                <%--<i class="fa" ng-show="!secondMenu.childList"></i>--%>
                <%--<span ng-bind="secondMenu.class_NAME"></span>--%>

                <%--</div>--%>

                <%--<div class="third-menu" ng-show="secondMenu.showSubmenu">--%>
                <%--<div class="third-menu-item"--%>
                <%--ng-repeat="(key, thirdMenu) in secondMenu.childList">--%>
                <%--<div class="item" ng-click="changeBtn(thirdMenu)" >--%>
                <%--<i class="fa" ng-click="toggleMenu(thirdMenu,$event)"--%>
                <%--ng-class="thirdMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                <%--data-stopPropagation="true" ng-show="thirdMenu.childList"></i>--%>
                <%--<i class="fa" ng-show="!thirdMenu.childList"></i>--%>
                <%--<span ng-bind="thirdMenu.class_NAME"></span>--%>

                <%--</div>--%>

                <%--<div class="fourth-menu" ng-show="thirdMenu.showSubmenu">--%>
                <%--<div class="fourth-menu-item"--%>
                <%--ng-repeat="(key, fourthMenu) in thirdMenu.childList">--%>
                <%--<div class="item" ng-click="changeBtn(fourthMenu)">--%>
                <%--<i class="fa" ng-click="toggleMenu(fourthMenu,$event)"--%>
                <%--ng-class="fourthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                <%--data-stopPropagation="true" ng-show="fourthMenu.childList"></i>--%>
                <%--<i class="fa"--%>
                <%--ng-show="!fourthMenu.childList"></i>--%>
                <%--<span ng-bind="fourthMenu.class_NAME"></span>--%>
                <%--</div>--%>

                <%--<div class="fifth-menu" ng-show="fourthMenu.showSubmenu">--%>
                <%--<div class="fifth-menu-item"--%>
                <%--ng-repeat="(key, fifthMenu) in fourthMenu.childList">--%>
                <%--<div class="item"  ng-click="changeBtn(fifthMenu,$event)">--%>
                <%--<i class="fa"--%>
                <%--ng-click="toggleMenu(fifthMenu)"--%>
                <%--ng-class="fifthMenu.showSubmenu ? 'fa-angle-up' : 'fa-angle-down'"--%>
                <%--data-stopPropagation="true" ng-show="fifthMenu.childList"></i>--%>
                <%--<i class="fa"--%>
                <%--ng-show="!fifthMenu.childList"></i>--%>
                <%--<span ng-bind="fifthMenu.class_NAME"></span>--%>
                <%--</div>--%>

                <%--<div class="sixth-menu" ng-show="fifthMenu.showSubmenu">--%>
                <%--<div class="sixth-menu-item"--%>
                <%--ng-repeat="(key, sixthMenu) in fifthMenu.childList">--%>
                <%--<div class="item" changeBtn(sixthMenu,$event) >--%>
                <%--<i class="fa"></i>--%>
                <%--<span ng-bind="sixthMenu.class_NAME"></span>--%>
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


                <span>
                <select ng-model="filter['SHOP_PRODUCT.IS_SALE']"
                ng-init="filter['SHOP_PRODUCT.IS_SALE'] = 'null'"
                class="nya-bs-select ">
                <option class="nya-bs-option" value="null">所有商品</option>
                <option class="nya-bs-option" value="1">上架</option>
                <option class="nya-bs-option" value="-1">下架</option>
                </select>
                </span>

                <span>
                <select ng-model="filter['SHOP_PRODUCT.TAG_ID']"
                ng-init="filter['SHOP_PRODUCT.TAG_ID'] = 'null'"
                class="nya-bs-select">
                <option class="nya-bs-option" value="null">全部标签</option>
                <option class="nya-bs-option" ng-repeat="tag in tagList" ng-bind="tag['SHOP_TAG.TAG']" value="'{{tag['SHOP_TAG.TAG_ID']}}'"></option>
                </select>
                <%--</span>--%>

                <%--<span>&nbsp;排序</span>--%>
                <select ng-model="filter['SHOP_PRODUCT.ODRDER']"
                ng-init="filter['SHOP_PRODUCT.ODRDER'] = 'ORDER_NUM DESC'; "
                class="nya-bs-select">
                <option class="nya-bs-option" value="ORDER_NUM DESC">排序号</option>
                <option class="nya-bs-option" value="ADD_DATETIME DESC">添加时间 ↓</option>
                <option class="nya-bs-option" value="ADD_DATETIME ASC">添加时间 ↑</option>
                </select>
                </div>

                <%--<div class="col-md-3 text-right">--%>

                <%--<div class="btn-group ">--%>
                <%--<a href="productDistributionAdd.jsp">--%>
                <%--<button class="btn sbold green">--%>
                <%--<i class="fa fa-plus"></i> 新增商品代理--%>
                <%--</button>--%>
                <%--</a>--%>
                <%--</div>--%>

                <div class="btn-group ">
                <a ui-sref="productAdd">
                <button id="sample_editable_1_new" class="btn sbold green">
                <i class="fa fa-plus"></i> 新增商品
                </button>
                </a>
                </div>

                <%--<div class="btn-group ">--%>
                <%--<button class="btn green  btn-outline dropdown-toggle"--%>
                <%--data-toggle="dropdown">操作--%>
                <%--<i class="fa fa-angle-down"></i>--%>
                <%--</button>--%>
                <%--<ul class="dropdown-menu pull-right" style="min-width: 120px;">--%>

                <%--<li>--%>
                <%--<a ng-click="multiSaleProduct(1)">--%>
                <%--上架</a>--%>
                <%--</li>--%>
                <%--<li>--%>
                <%--<a ng-click="multiSaleProduct(1)">--%>
                <%--下架</a>--%>
                <%--</li>--%>

                <%--<li>--%>
                <%--<a ng-click="multiDelProduct()">--%>
                <%--删除</a>--%>
                <%--</li>--%>

                <%--<li>--%>
                <%--<a ng-click="multiModifyProductTag()">--%>
                <%--设置标签</a>--%>
                <%--</li>--%>

                <%--<li>--%>
                <%--<a ng-click="importXls()">--%>
                <%--导入商品--%>
                <%--</a>--%>
                <%--</li>--%>


                <%--<li>--%>
                <%--<a ng-click="exportXls()">--%>
                <%--导出选中商品</a>--%>
                <%--</li>--%>

                <%--<li>--%>
                <%--<a ng-click="exportAllXls()">--%>
                <%--导出所有商品</a>--%>
                <%--</li>--%>

                <%--</ul>--%>
                <%--</div>--%>
                <%--</div>--%>

            </div>
            <%--筛选功能--%>
        </div>

        <div class="col-md-12">
            <div class="table-scrollable">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th style="width: 30px">
                            <div class="md-checkbox" style="margin-left: 10px">
                                <input type="checkbox" id="checkbox_all"
                                       ng-model="checkAllProduct"
                                       ng-change="checkedAllProduct(checkAllProduct)"
                                       class="md-check">
                                <label for="checkbox_all">
                                    <span class="inc"></span>
                                    <span class="check"></span>
                                    <span class="box"></span>
                                </label>
                            </div>
                        </th>
                        <th style="width: 20px">&nbsp;</th>
                        <th class="text-left"> 商品名称</th>
                        <th style="width: 120px" class="text-left"> 编码</th>
                        <th style="width: 60px" class="text-left"> 单位</th>
                        <th style="width: 100px" class="text-left"> 市场价</th>
                        <th style="width: 100px" class="text-left"> 成本价</th>
                        <th style="width: 60px" class="text-center"> 状态</th>
                        <th style="width: 120px" class="text-center"> 操作</th>
                    </tr>
                    </thead>
                    <tbody ng-cloak>

                        <tr  ng-repeat-start='product in productList'>
                            <td>
                                <div class="md-checkbox"
                                     style="margin-left: 10px">
                                    <input type="checkbox"
                                           id="checkbox_parent_{{product['SHOP_PRODUCT.PRD_ID']}}"
                                           ng-model="product.checkedParent"
                                           ng-change="checkProduct(product)"
                                           name="checkProduct"
                                           class="md-check">
                                    <label for="checkbox_parent_{{product['SHOP_PRODUCT.PRD_ID']}}">
                                        <span class="inc"></span>
                                        <span class="check"></span>
                                        <span class="box"></span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <i ng-if="product['SHOP_PRODUCT.SKULIST'][0]!=undefined"
                                   ng-click="product['SHOP_PRODUCT.SHOUSKULIST']=!product['SHOP_PRODUCT.SHOUSKULIST']"
                                   ng-class="{true:'glyphicon glyphicon-minus-sign green  btn-lg', false:'glyphicon glyphicon-plus-sign green btn-lg'}[product['SHOP_PRODUCT.SHOUSKULIST']]"></i>
                            </td>

                            <td class="text-left">
                                <a href="productDetail.jsp">
                                    <img class="img-thumbnail"
                                         ng-src=""
                                         style="height: 60px;width: 60px;float: left">
                                </a>

                                <div style="padding-left: 70px">

                                    <span class="label label-info" style="margin-left: 5px"
                                          ng-repeat="tag in product['SHOP_PRODUCT.TAG']"
                                          ng-bind="tag"> </span>

                                    <br>
                                    <a class="black_a"
                                       href="productDetail.jsp?prdId={{product.prdId}}"
                                       ng-bind="product['SHOP_PRODUCT.PRD_NAME']"
                                       class="font-dark"></a>
                                </div>
                            </td>


                            <td ng-bind="product['SHOP_PRODUCT.PRD_SPU']"></td>

                            <td ng-bind="product['SHOP_PRODUCT.UNIT_NAME']"></td>

                            <td> </td>
                            <td> </td>

                            <td>
                                <a ng-click="product['SHOP_PRODUCT.IS_SALE']=product['SHOP_PRODUCT.IS_SALE']*-1;changeProductSaleState(product)"><span
                                        class="label"
                                        ng-class="{true:'label-success', false:'label-danger'}[product['SHOP_PRODUCT.IS_SALE']==1]"
                                        ng-bind="product['SHOP_PRODUCT.IS_SALE']==1?'正在销售':'下架停售'"></span></a>

                            </td>
                            <td>
                                <a ng-if="product.isParent"
                                   href="productModify.jsp?prdId={{product.prdId}}"
                                   target="_blank">修改</a>
                               <a ng-click="delProduct(product)">删除</a>
                            </td>
                        </tr>

                        <tr ng-class="table-tr-small" ng-if="product['SHOP_PRODUCT.SHOUSKULIST']"
                            ng-repeat-end="" ng-repeat=" sku in product['SHOP_PRODUCT.SKULIST'] ">

                            <td> </td>
                            <td> </td>

                            <td class="text-left">

                                <div style="padding-left: 70px" ng-bind="sku['SHOP_PRODUCT_SKU.SKU_CONTENT_INFO']">


                                </div>
                            </td>


                            <td ng-bind="sku['SHOP_PRODUCT_SKU.PRD_SKU']"></td>

                            <td> </td>

                            <td ng-bind="sku['SHOP_PRODUCT_SKU.PRICE'] | currency :'￥'"
                                class="text-left"></td>
                            <td ng-bind="sku['SHOP_PRODUCT_SKU.REAL_PRICES'] | currency :'￥'"
                                class="text-left"></td>

                            <td>
                                <a ng-click="sku['SHOP_PRODUCT_SKU.IS_SALE']=sku['SHOP_PRODUCT_SKU.IS_SALE']*-1;changeSkuSaleState(sku)">
                                    <span
                                        class="label"
                                        ng-class="{true:'label-success', false:'label-danger'}[sku['SHOP_PRODUCT_SKU.IS_SALE']==1]"
                                        ng-bind="sku['SHOP_PRODUCT_SKU.IS_SALE']==1?'正在销售':'下架停售'"></span>
                                </a>

                            </td>
                            <td>
                                <a ng-if="product.isParent"
                                   href="productModify.jsp?prdId={{product.prdId}}"
                                   target="_blank">修改</a>

                                <a ng-if="!product.isParent"
                                   ng-click="showModifySkuPrice(product)">改价</a>

                                <a ng-click="delSku(sku)">删除</a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>


        <div page-bar
             filter-obj="filter"
             url="/shop/product/queryAll"
             callback="bindData(response)">
        </div>


    </div>


    <%--修改商品价格--%>
    <div class="modal fade text-left" id="modifySkuPrice" ng-enter="submitModifySkuPrice()" tabindex="-1"
         aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">设置商品价格</h4>
                </div>
                <div class="modal-body form-body text-right">

                    <div class="form-body " style="">
                        <div class="form-group">
                            <div class="form-group row">
                                <div class="col-md-2">
                                    <img style="width: 40px; height: 40px;"
                                         ng-src="{{modifySkuPriceInfo.img}}">
                                </div>
                                <div class="col-md-10">
                                    <div class="col-md-12 text-left"
                                         ng-bind="modifySkuPriceInfo.prdName"></div>
                                    <div class="col-md-12 text-left"
                                         ng-bind="modifySkuPriceInfo.skuShowName"></div>
                                </div>

                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-2 right form-inpit-title font-green"
                                       style="padding-right:0px;font-size: 16px;font-weight: 600;">市场价</label>

                                <div class="col-md-3">
                                    <input focus-select currency format-currency
                                           ng-blur="changeMemberLevelPrice(modifySkuPriceInfo, modifySkuPriceInfo.memberLevelPriceList)"
                                           style="padding-right:0px;font-size: 16px;font-weight: 600;"
                                           ng-model="modifySkuPriceInfo.price"
                                           class="form-control font-green">
                                </div>
                                <label class="control-label col-md-2 right form-inpit-title font-green"
                                       style="padding-right:0px;font-size: 16px;font-weight: 600;">成本价</label>

                                <div class="col-md-3">
                                    <input focus-select currency format-currency
                                           style="padding-right:0px;font-size: 16px;font-weight: 600;"
                                           ng-model="modifySkuPriceInfo.cost"
                                           class="form-control font-green">
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ng-click="submitModifySkuPrice()"
                                class="btn green">确定
                        </button>
                        <button type="button" class="btn green  btn-outline"
                                data-dismiss="modal">取消
                        </button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </div>
    <%--结束修改--%>
</div>