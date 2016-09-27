<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="row row-content" ng-controller="AddProductController">
    <!-- BEGIN FORM-->
    <form class="form-horizontal form-middle-width" name="addProduct"
          novalidate>

        <h4 class="form-title">
            基本信息
        </h4>

        <div class="form-group">
            <label class="col-md-2 control-label">
                <span class="icon-required">*</span>
                商品分类
            </label>
            <div class="col-md-4">
                <tree-list tree-data="productClass" type="dropdown">
                </tree-list>
            </div>

            <label class="col-md-2 control-label">
                <span class="icon-required">*</span>
                商品品牌
            </label>
            <div class="col-md-4">
                <select class="form-control">
                    <option value="0">选择商品品牌</option>
                    <option class="select-add" value="-1000">+</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">
                <span class="icon-required">*</span>
                商品名称
            </label>
            <div class="col-md-10">
                <input class="form-control" name="number" type="text"
                       placeholder="请输入商品名称">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">
                <span class="icon-required">*</span>
                计量单位
            </label>
            <div class="col-md-4">
                <select class="form-control">
                    <option value="0">选择单位</option>
                    <option class="select-add" value="-1000">+</option>
                </select>
            </div>

            <label class="col-md-2 control-label">
                是否上架
            </label>
            <div class="col-md-4">
                <select class="form-control">
                    <option value="1">上架</option>
                    <option value="-1">下架</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">
                搜索关键字
            </label>
            <div class="col-md-4">
                <input class="form-control" type="text"
                       placeholder="请输入搜索关键字，使用逗号(，)隔开">
            </div>

            <label class="col-md-2 control-label">
                排序值
            </label>
            <div class="col-md-4">
                <input class="form-control" type="number"
                       placeholder="数字越大排名越靠前">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">
                商品标签
            </label>
            <div class="col-md-10">
                <button class="btn btn-default"
                        ng-repeat="prdTag in productTagList"
                        ng-bind="prdTag.tag"
                        style="margin-right:10px;min-width: 100px"
                        ng-class="{true:'green', false:'btn-default'}[tag[prdTag.tag_ID]]"
                        ng-click="selectTagButton(prdTag.tag_ID,prdTag.tag)">
                </button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">
                商品重量
            </label>
            <div class="col-md-4">
                <input class="form-control" name="weight" type="text"
                       placeholder="请输入商品重量">
            </div>
            <span class="control-remark">
                斤
            </span>
        </div>

        <div class="alert alert-grey clearfix">
            <label class="col-md-2">
                <input ng-model="product.setSku"
                       ng-init="product.setSku=false;" ng-change="changeSettingSku()"
                       type="checkbox">
                设置商品多规格
            </label>
            <div ng-cloak ng-show="product.setSku"
                 class="control-label col-md-10 text-right">
                <a href="#chooseSkuModel" ng-click="loadSkuTemplet()" data-toggle="modal">
                    选择模板>>
                </a>
            </div>
            <div ng-show="product.setSku">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="col-md-offset-2 col-md-9">
                            <span class="text-remark">可使用键盘“回车键”快速添加多个规格值</span>
                        </div>
                    </div>
                    <div class="form-group" ng-init="hasSkuAttrCount = 0;">
                        <div class="col-md-2">
                            <input type="text"
                                   class="form-control text-center"
                                   ng-init="product.skuName1 = '规格1';"
                                   ng-model="product.skuName1"
                                   focus-select
                                   placeholder="规格1"
                                   style="padding: 0;margin: 0;">
                        </div>
                        <div class="col-md-9">
                            <tags-input ng-model="tags1"
                                        placeholder="输入一个属性按[回车键]"
                                        min-length="1"
                                        max-length="58">
                            </tags-input>
                        </div>
                    </div>
                    <div class="form-group" ng-show="hasSkuAttrCount>=1">
                        <div class="col-md-2">
                            <input type="text"
                                   class="form-control text-center"
                                   ng-init="product.skuName2 = '规格2';"
                                   ng-model="product.skuName2"
                                   focus-select
                                   placeholder="规格2">
                        </div>
                        <div class="col-md-9">
                            <tags-input ng-model="tags2"
                                        placeholder="输入一个属性按[回车键]"
                                        min-length="1"
                                        max-length="58">
                            </tags-input>
                        </div>
                        <!--删除，需要时再用-->
                        <div class="col-md-1" ng-if="hasSkuAttrCount == 1">
                            <a class="control-remark"
                               ng-click="subHasSkuAttrCount();">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <div class="form-group" ng-show="hasSkuAttrCount>=2">
                        <div class="col-md-2">
                            <input type="text"
                                   class="form-control text-center"
                                   ng-init="product.skuName3= '规格3';"
                                   ng-model="product.skuName3"
                                   focus-select
                                   value="规格3"
                                   placeholder="规格3">
                        </div>
                        <div class="col-md-9">
                            <tags-input ng-model="tags3"
                                        placeholder="输入一个属性按[回车键]"
                                        min-length="1"
                                        max-length="58">
                            </tags-input>
                        </div>
                        <!--删除，需要时再用-->
                        <div class="col-md-1" ng-if="hasSkuAttrCount==2">
                            <a class="control-remark"
                               ng-click="subHasSkuAttrCount()">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 control-label">
                    <div class="col-md-3 text-left">
                        <a ng-click="addHasSkuAttrCount();"
                           class="font-green" ng-if="hasSkuAttrCount < 2">
                            <i class="fa fa-plus"></i>
                            添加规格</a>
                    </div>
                    <div class="col-md-9 text-right">
                        <a href="#inputSkuModelName" data-toggle="modal">
                            保存为模板
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-12">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th style="width: 16px;"></th>
                        <th class="text-center" style="width:60px;">缩略图</th>
                        <th ng-if="!product.setSku" style="width: 70px;">规格</th>
                        <th ng-if="product.setSku" style="width: 70px;"
                            ng-bind="product.skuName1"></th>
                        <th ng-if="hasSkuAttrCount>=1" style="width: 70px;"
                            ng-bind="product.skuName2"></th>
                        <th ng-if="hasSkuAttrCount>=2" style="width: 70px;"
                            ng-bind="product.skuName3"></th>
                        <th style="width: 120px;">商品编码</th>
                        <th style="width: 120px;">条形码</th>
                        <th style="width: 40px;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="(key,tag) in product.tags">
                        <td ng-bind="key + 1"></td>
                        <td style="padding: 0px;">
                            <div style="width: 60px; height: 60px;margin: auto;">
                                <div class="fileinput fileinput-new"
                                     data-provides="fileinput">
                                    <div class="thumbnail"
                                         data-trigger="fileinput"
                                         style="width: 60px; height: 60px; line-height: 60px;">
                                        <img align="middle"
                                             ng-src="{{tag.imageUrl}}">
                                    </div>
                                    <div class="hidden">
                                                            <span class="btn red btn-outline btn-file">
                                                                <input type="file"
                                                                       on-change="uploadSkuImageFile(skuImage,tag)"
                                                                       file-model="skuImage">
                                                            </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td ng-if="!product.setSku">无</td>
                        <td ng-if="product.setSku" ng-bind="tag.tag1"></td>
                        <td ng-if="hasSkuAttrCount>=1" ng-bind="tag.tag2"></td>
                        <td ng-if="hasSkuAttrCount>=2" ng-bind="tag.tag3"></td>
                        <td><input ng-readonly="tag.isDel" type="text"
                                   focus-select
                                   ng-model="tag.skuCode" class="form-control">
                        </td>
                        <td><input ng-readonly="tag.isDel" number
                                   ng-model="tag.barCode"
                                   class="form-control"
                        ></td>
                        <td>
                            <a ng-click="delOrRebackSkuTag(tag)"
                               ng-if="!tag.isDel">删除</a>
                            <a ng-click="delOrRebackSkuTag(tag)"
                               ng-if="tag.isDel">恢复</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h4 class="form-title">
            商品信息
        </h4>

        <div class="form-group">
            <div class="col-md-12">
                <script id="container" type="text/plain"></script>
            </div>
        </div>

        <h4 class="form-title">
            商品图片
            <small>(商品详情图片建议尺寸：960*960)</small>
        </h4>

        <div class="form-group">
            <div class="col-md-12">
                <div class="upload-img-tips"
                     ng-repeat="(key,imageFileUrl) in uploadImageFiles">
                    <img ng-src="{{imageFileUrl}}"
                         class="img-responsive">
                    <div class="product-img-operator">
                        <div class="operator-wrap top">
                            <a type="button"
                               class="operator-close"
                               aria-label="Close"
                               ng-click="delImageFile(imageFileUrl)">
                                &times;
                            </a>
                        </div>
                        <div class="operator-wrap bottom text-center">
                            <a class="font-white"  ng-model="showFirst" ng-if="key==uploadImageFilesIndex">
                                封面图片
                            </a>
                            <a class="font-white" ng-click="setFirstImg(imageFileUrl)" ng-model="cover='设为封面'" ng-if="key!=uploadImageFilesIndex">
                                设为封面
                            </a>
                        </div>
                    </div>
                </div>

                <div class="upload-img-wrap">
                    <label class="upload-img-tips" data-provides="fileinput">
                        添加商品图册<br>（上限10张）
                        <input class="hidden" type="file" file-model="images"
                               on-change="uploadImage(images)"
                               multiple>
                    </label>
                </div>
            </div>
        </div>

        <div class="upload-file-wrap">
            <label class="upload-btn" data-provides="fileinput">
                上传附件
                <input class="hidden" type="file" on-change="uploadFile(upfile)"
                       file-model="upfile" multiple>
            </label>


            <span class="pull-right">
                附件最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP
            </span>
        </div>

        <div class="form-group" ng-repeat="file in uploadFiles">
            <div class="col-md-9">
                <a target="_blank" href="../../{{file.url}}">
                    {{file.original}}
                </a>
                <span class="text-remark" ng-bind="file.size | bytes"></span>
            </div>
            <div class="col-md-3 text-right">
                <a target="_blank" href="../../{{file.url}}" class="font-green">
                    <i class="fa fa-eye "></i>
                    查看
                </a>
                <a ng-click="delUploadFile(file)" class="font-green">
                    <i class="fa fa-remove"></i>
                    删除
                </a>
            </div>
        </div>

        <h4 class="form-title">价格设置</h4>
        <div class="form-group">
            <label class="control-label col-md-1 right">
                市场价
            </label>

            <div class="col-md-2">
                <input class="form-control" ng-model="product.price"
                       ng-blur="changeMemberlevelPrice()"
                       focus-select currency format-currency
                       ng-init="product.price = 0.00;">
            </div>
            <label class="control-label col-md-1 right">
                成本价
            </label>
            <div class="col-md-2">
                <input class="form-control" ng-model="product.cost"
                       focus-select currency format-currency
                       ng-init="product.cost = 0.00;">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-12">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th class="col-md-5">客户级别</th>
                        <th class="col-md-2">默认折扣</th>
                        <th class="col-md-1 text-center">允许订货</th>
                        <th class="col-md-2">订货价</th>
                        <th class="col-md-2">起订量</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr ng-repeat="m in memberLevels">
                        <td ng-bind="m.level_NAME"></td>
                        <td ng-bind="m.price_OFF + '%'"></td>
                        <td class="text-center">

                        <td><input ng-model="m.price "
                                   ng-init="m.price = product.price * m.price_OFF / 100;" focus-select currency
                                   format-currency class="form-control" name="number">
                        </td>
                        <td>
                            <input ng-model="m.minNum" ng-init="m.minNum = 0;"
                                   class="form-control" name="number">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-4 col-md-offset-1">
                <a ng-click="submitForm()" ng-disabled="submitDisabled"
                   ng-init="submitDisabled= false;" class="btn btn-default"
                   ng-class="{true:'disabled'}[isSubmit]">保 存</a>
                <a type="button" href="product.jsp"
                   class="btn">取 消
                </a>
            </div>
        </div>
    </form>
    <!-- END FORM-->
    <!-- BEGIN chooseSkuModel模块 -->
    <div class="modal fade text-left" id="chooseSkuModel" tabindex="-1" aria-hidden="true" role="chooseSkuModel"
         style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">选择规格模板</h4>
                </div>
                <div class="modal-body form-body">
                    <table class="table table-striped table-bordered table-hover dataTable no-footer">
                        <thead>
                        <tr>
                            <th class="col-md-1"></th>
                            <th class="col-md-3">模板名称</th>
                            <th class="col-md-8">规格详情</th>
                        </tr>
                        </thead>

                        <tbody ng-cloak ng-repeat="skl in skuTempletList">
                        <tr>
                            <td>
                                 <span class="md-radio">
                                     <input type="radio" id="radio{{skl.sku_TEMPLET_ID}}"
                                            value="{{skl.sku_TEMPLET_ID}}"
                                            ng-model="$parent.tmpSelectTempletId"
                                            class="md-radiobtn">
                                     <label for="radio{{skl.sku_TEMPLET_ID}}">
                                         <span></span>
                                         <span class="check"></span>
                                         <span class="box"></span>
                                     </label>
                                 </span>
                            </td>
                            <td>
                                <span ng-bind="skl.templet_NAME"></span>
                            </td>
                            <td>
                                <span ng-if="skl.sku_NAME1!=undefined&&skl.sku_NAME1!=''"
                                      ng-bind="'【'+skl.sku_NAME1+'】'+skl.CONTENT1"></span><br>
                                <span ng-if="skl.sku_NAME2!=undefined&&skl.sku_NAME2!=''"
                                      ng-bind="'【'+skl.sku_NAME2+'】'+skl.CONTENT2"></span><br>
                                <span ng-if="skl.sku_NAME3!=undefined&&skl.sku_NAME3!=''"
                                      ng-bind="'【'+skl.sku_NAME3+'】'+skl.CONTENT3"></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="chooseTemplet()">确定</button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>

    </div>
    <!-- END chooseSkuModel模块 -->

    <!-- BEGIN inputSkuModelName -->
    <div class="modal fade text-left" id="inputSkuModelName" tabindex="-1" aria-hidden="true" role="chooseSkuModel"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">请输入商品规格模板名称</h4>
                </div>
                <div class="modal-body form-body text-right">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 control-label">
                                <span class="required"> * </span> 模板名称:
                            </label>

                            <div class="col-md-8">
                                <input type="text" class="form-control"
                                       ng-model="skuTempletName">
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn green" ng-click="saveAsTemplet()">确定</button>
                    <button type="button" class="btn green  btn-outline" data-dismiss="modal">取消</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- END inputSkuModelName -->
</div>
