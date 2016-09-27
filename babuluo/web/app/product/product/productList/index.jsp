
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


                <%--<span>--%>
                <%--<select ng-model="filter.isSale"--%>
                <%--ng-init="filter.isSale =0"--%>
                <%--class="nya-selectpicker bs-select form-control input-small">--%>
                <%--<option value="<%=0%>">所有商品</option>--%>
                <%--<option value="<%=1%>">上架</option>--%>
                <%--<option value="<%=-1%>">下架</option>--%>
                <%--</select>--%>
                <%--</span>--%>

                <%--<span>--%>
                <%--<select ng-model="filter.tagId"--%>
                <%--ng-init="filter.tagId = 0;"--%>
                <%--class="nya-selectpicker bs-select form-control input-small">--%>
                <%--<option value="<%=0%>">全部标签</option>--%>
                <%--<option value="{{prdTag.tag_ID}}"--%>
                <%--ng-repeat="prdTag in productTagList">--%>
                <%--{{prdTag.tag}}--%>
                <%--</option>--%>

                <%--</select>--%>
                <%--</span>--%>

                <%--&lt;%&ndash;<span>&nbsp;排序</span>&ndash;%&gt;--%>
                <%--<select ng-model="filter.orderState"--%>
                <%--ng-init="filter.orderState = 'ORDER_NUM DESC'; "--%>
                <%--class="nya-selectpicker bs-select form-control input-small">--%>
                <%--<option value="ORDER_NUM DESC">排序号</option>--%>
                <%--<option value="ADD_DATETIME DESC">添加时间 ↓</option>--%>
                <%--<option value="ADD_DATETIME ASC">添加时间 ↑</option>--%>
                <%--<option value="MIN_PRICE DESC">市场价 ↓</option>--%>
                <%--<option value="MAX_PRICE ASC">市场价 ↑</option>--%>
                <%--<option value="UPDATE_DATETIME DESC">修改时间 ↓</option>--%>
                <%--<option value="UPDATE_DATETIME ASC">修改时间 ↑</option>--%>
                <%--<option value="SALES_VOLUME DESC">销量 ↓</option>--%>
                <%--<option value="SALES_VOLUME ASC">销量 ↑</option>--%>
                <%--</select>--%>
                <%--</div>--%>

                <%--<div class="col-md-3 text-right">--%>

                <%--<div class="btn-group ">--%>
                <%--<a href="productDistributionAdd.jsp">--%>
                <%--<button class="btn sbold green">--%>
                <%--<i class="fa fa-plus"></i> 新增商品代理--%>
                <%--</button>--%>
                <%--</a>--%>
                <%--</div>--%>

                <%--<div class="btn-group ">--%>
                <%--<a href="productAdd.jsp">--%>
                <%--<button id="sample_editable_1_new" class="btn sbold green">--%>
                <%--<i class="fa fa-plus"></i> 新增商品--%>
                <%--</button>--%>
                <%--</a>--%>
                <%--</div>--%>

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
                        <th style="width: 40px" class="text-center"> 单位</th>
                        <th style="width: 100px" class="text-left"> 市场价</th>
                        <th style="width: 100px" class="text-left"> 成本价</th>
                        <th style="width: 60px" class="text-center"> 状态</th>
                        <th style="width: 120px" class="text-center"> 操作</th>
                    </tr>
                    </thead>
                    <tbody ng-cloak>
                    <tr ng-class="{false:'table-tr-small'}[product.isParent]"
                        ng-if="product.isParent || product.parent.showChildSku"
                        ng-repeat="product in productResultList">

                        <td>
                            <div ng-if="product.isParent" class="md-checkbox"
                                 style="margin-left: 10px">
                                <input type="checkbox"
                                       id="checkbox_parent_{{product.prdSpu}}"
                                       ng-model="product.checkedParent"
                                       ng-change="checkProduct(product)"
                                       name="checkProduct"
                                       class="md-check">
                                <label for="checkbox_parent_{{product.prdSpu}}">
                                    <span class="inc"></span>
                                    <span class="check"></span>
                                    <span class="box"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <i ng-if="product.isParent && product.hasSku"
                               ng-click="showChildSku(product)"
                               ng-class="{true:'glyphicon glyphicon-minus-sign green  btn-lg', false:'glyphicon glyphicon-plus-sign green btn-lg'}[product.showChildSku]"></i>
                        </td>

                        <td ng-if="product.isParent" class="text-left">
                            <a href="productDetail.jsp?prdId={{product.prdId}}">
                                <img class="img-thumbnail"
                                     ng-src=""
                                     style="height: 60px;width: 60px;float: left">
                            </a>

                            <div style="padding-left: 70px">

        <span ng-if="product.hasTag">
        <span class="label label-info" style="padding: 1px"
              ng-bind="product.tag1"> </span>
        <span class="label label-info" style="padding: 1px"
              ng-bind="product.tag2"> </span>
        <span class="label label-info" style="padding: 1px"
              ng-bind="product.tag3"> </span>
        <span class="label label-info" style="padding: 1px"
              ng-bind="product.tag4"> </span>
        <span class="label label-info" style="padding: 1px"
              ng-bind="product.tag5"> </span>
        <br></span>
                                <a class="black_a" href="productDetail.jsp?prdId={{product.prdId}}"
                                   ng-bind="product.PRD_NAME"
                                   class="font-dark"></a>
                            </div>
                        </td>

                        <td ng-if="!product.isParent && product.hasSku"
                            style="text-align: left">
                            <div>
                                <span ng-bind="product.skuShowName"></span>
                            </div>
                        </td>

                        <td ng-if="product.isParent" ng-bind="product.PRD_SPU"></td>
                        <td ng-if="!product.isParent" ng-bind="product.prdSku"></td>

                        <td ng-bind="product.unitName" class="text-center"></td>
                        <td ng-if="product.isParent"
                            ng-bind="product.maxPrice | currency :'￥'"
                            class="text-left"></td>
                        <td ng-if="!product.isParent"
                            ng-bind="product.price | currency :'￥'"
                            class="text-left"></td>
                        <td ng-bind="product.cost  | currency :'￥'" class="text-left"></td>

                        <td>

                            <a ng-click="changeProductSaleState(product)"><span
                                    class="label"
                                    ng-class="{true:'label-success', false:'label-danger'}[getPrdIsSale(product)]"
                                    ng-bind="getProductSaleState(product)"></span></a>


                        </td>
                        <td>
                            <a ng-if="product.isParent"
                               href="productModify.jsp?prdId={{product.prdId}}"
                               target="_blank">修改</a>
                            <a ng-if="!product.isParent" ng-click="showModifySku(product)">修改</a>

                            <a ng-if="product.isParent"
                               href="productModifyPrice.jsp?prdId={{product.prdId}}"
                               target="_blank"> 改价</a>
                            <a ng-if="!product.isParent"
                               ng-click="showModifySkuPrice(product)">改价</a>

                            <a ng-click="delProduct(product)">删除</a>
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

</div>