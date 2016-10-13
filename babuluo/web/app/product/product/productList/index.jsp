<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <div class="table-operbar row" ng-cloak>
        <div class="table-toolbar">
            <%--筛选功能--%>
            <div class="row">

                <select ng-model="filter['SHOP_PRODUCT.IS_SALE']"
                        ng-init="filter['SHOP_PRODUCT.IS_SALE'] = 'null'"
                        class="nya-bs-select ">
                    <option class="nya-bs-option" value="null">所有商品</option>
                    <option class="nya-bs-option" value="1">上架</option>
                    <option class="nya-bs-option" value="-1">下架</option>
                </select>

                <select ng-model="filter['SHOP_PRODUCT.TAG_ID']"
                        ng-init="filter['SHOP_PRODUCT.TAG_ID'] = 'null'"
                        class="nya-bs-select">
                    <option class="nya-bs-option" value="null">全部标签</option>
                    <option class="nya-bs-option" ng-repeat="tag in tagList"
                            ng-bind="tag['SHOP_TAG.TAG']"
                            value="'{{tag['SHOP_TAG.TAG_ID']}}'"></option>
                </select>

                <select ng-model="filter['SHOP_PRODUCT.ODRDER']"
                        ng-init="filter['SHOP_PRODUCT.ODRDER'] = 'ORDER_NUM DESC'; "
                        class="nya-bs-select">
                    <option class="nya-bs-option" value="ORDER_NUM DESC">排序号</option>
                    <option class="nya-bs-option" value="ADD_DATETIME DESC">添加时间 ↓</option>
                    <option class="nya-bs-option" value="ADD_DATETIME ASC">添加时间 ↑</option>
                </select>
            </div>

            <div class="btn-group ">
                <a ui-sref="productAdd">
                    <button id="sample_editable_1_new" class="btn sbold green">
                        <i class="fa fa-plus"></i> 新增商品
                    </button>
                </a>
            </div>

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

                <tr ng-repeat-start='product in productList'>
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
                           ng-click="product['SHOP_PRODUCT.SHOWSKULIST']=!product['SHOP_PRODUCT.SHOWSKULIST']"
                           ng-class="{true:'glyphicon glyphicon-minus-sign green  btn-lg', false:'glyphicon glyphicon-plus-sign green btn-lg'}[product['SHOP_PRODUCT.SHOWSKULIST']]"></i>
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
                            <a href="productDetail.jsp?prdId={{product.prdId}}"
                               ng-bind="product['SHOP_PRODUCT.PRD_NAME']"
                               class="font-dark"></a>
                        </div>
                    </td>


                    <td ng-bind="product['SHOP_PRODUCT.PRD_SPU']"></td>

                    <td ng-bind="product['SHOP_PRODUCT.UNIT_NAME']"></td>

                    <td></td>
                    <td></td>

                    <td>
                        <a ng-click="product['SHOP_PRODUCT.IS_SALE']=product['SHOP_PRODUCT.IS_SALE']*-1;changeProductSaleState(product)"><span
                                class="label"
                                ng-class="{true:'label-success', false:'label-danger'}[product['SHOP_PRODUCT.IS_SALE']==1]"
                                ng-bind="product['SHOP_PRODUCT.IS_SALE']==1?'正在销售':'下架停售'"></span></a>

                    </td>
                    <td>
                        <a ui-sref="productModify({productId:product['SHOP_PRODUCT.PRD_ID']})">修改</a>


                        <a show-modal id="#modifySkuPrice"
                           ng-if="product['SHOP_PRODUCT.SKULIST'][0]!=undefined"
                           ng-click="showModifySkuPrice(product)">改价</a>

                        <a ng-click="delProduct(product)">删除</a>
                    </td>
                </tr>


                <tr ng-class="table-tr-small" ng-if="product['SHOP_PRODUCT.SHOWSKULIST']"
                    ng-repeat-end="" ng-repeat=" sku in product['SHOP_PRODUCT.SKULIST'] ">

                    <td></td>
                    <td></td>

                    <td class="text-left">

                        <div style="padding-left: 70px"
                             ng-bind="sku['SHOP_PRODUCT_SKU.SKU_CONTENT_INFO']">


                        </div>
                    </td>


                    <td ng-bind="sku['SHOP_PRODUCT_SKU.PRD_SKU']"></td>

                    <td></td>

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


    <%--修改商品价格--%>
    <div class="modal fade text-left" id="modifySkuPrice" ng-enter="submitModifySkuPrice()"
         tabindex="-1"
         aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true"></button>
                    <h4 class="modal-title">设置商品价格</h4>
                </div>

                <div class="form-body ">

                    <div class="form-group row">
                        <div class="col-md-2">
                            <img style="width: 40px; height: 40px;"
                                 ng-src="{{modifyProduct['SHOP_PRODUCT.CMP']}}">
                        </div>
                        <div class="col-md-10">
                            <span ng-bind="modifyProduct['SHOP_PRODUCT.PRD_NAME']"></span>
                        </div>

                    </div>

                    <div class="form-group">
                        <table class="table table-striped table-hover">

                            <thead>
                            <tr>
                                <th class="text-left"> sku名称</th>
                                <th style="width: 100px" class="text-left"> 市场价</th>
                                <th style="width: 100px" class="text-left"> 成本价</th>
                            </tr>
                            </thead>
                            <tbody ng-cloak>
                            <tr ng-repeat=" sku in modifyProduct['SHOP_PRODUCT.SKULIST'] ">

                                <td class="text-left">

                                    <div style="padding-left: 70px"
                                         ng-bind="sku['SHOP_PRODUCT_SKU.SKU_CONTENT_INFO']">
                                    </div>
                                </td>

                                <td class="text-left">
                                    <span ng-click="addToChangeList(sku)" ng-show="!sku.isChange"
                                          ng-bind="sku['SHOP_PRODUCT_SKU.PRICE'] | currency :'￥'"></span>
                                    <input type="text" ng-show="sku.isChange" class="form-control"
                                           ng-model="sku['SHOP_PRODUCT_SKU.PRICE']">
                                </td>
                                <td class="text-left">
                                    <span ng-click="addToChangeList(sku)" ng-show="!sku.isChange"
                                          ng-bind="sku['SHOP_PRODUCT_SKU.REAL_PRICES'] | currency :'￥'"></span>
                                    <input type="text" ng-show="sku.isChange" class="form-control"
                                           ng-model="sku['SHOP_PRODUCT_SKU.REAL_PRICES']">
                                </td>

                            </tr>
                            </tbody>
                        </table>
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

                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </div>
    <%--结束修改--%>
</div>


