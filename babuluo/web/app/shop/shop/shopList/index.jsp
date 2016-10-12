<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <div class="col-sm-2">
                    <div class="col-sm-3" style="padding: 8px">
                        <label>筛选：</label>
                    </div>
                    <div class="col-sm-6" style="padding: 0px">

                        <select ng-model="filter['SHOP.DISTRICT_ID']"
                                ng-init="filter['SHOP.DISTRICT_ID']='null'"
                                class="nya-bs-select form-control " data-width="80px">
                            <option class="nya-bs-option" value="null">
                                门店区域
                            </option>
                            <option class="nya-bs-option"
                                    ng-repeat="value in districtList"
                                    ng-bind="value['DISTRICT.DISTRICT_NAME']"
                                    value="{{value['DISTRICT.DISTRICT_ID']}}">
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-3" style="padding: 0px">
                    </div>
                </div>
                <div class="col-sm-10 text-right">
                    <a type="button" class="btn btn-default" data-toggle="modal" data-target="#add">
                        新增门店
                    </a>
                </div>
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th>店名</th>
                <th>区域</th>
                <th>地理位置</th>
                <th>电话</th>
                <th>门店管理员</th>
                <th>创建时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="sl in shopList|filter:{}">
                <td ng-bind="sl['SHOP.SHOP_NAME']"></td>
                <td ng-bind="sl['SHOP.SHOP_DISTRICT_NAME']"></td>
                <td><a class="table-link" ng-click="showMap(sl)">查看地图</a></td>
                <td ng-bind="sl['SHOP.TELEPHONE']"></td>
                <td>暂无</td>
                <td ng-bind="sl['SHOP.ADD_DATETIME'] | FormatStrDate"></td>
                <td>
                    <a class="table-link" data-toggle="modal" data-target="#edit" ng-click="getShopListById(sl)">
                        修改
                    </a>
                    <a class="table-link" ng-click="delShopListById(sl)">
                        关闭
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
        <div page-bar
             filter-obj="filter"
             url="/shop/shop/queryAll"
             callback="bindData(response)">
        </div>
        <!-- BEGIN add modal -->
        <div class="modal fade" id="add" role="dialog" aria-labelledby="add">
            <div class="modal-dialog" aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 class="modal-title">
                            新增门店
                        </h3>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" name="editForm"
                              ng-submit="addShop()" novalidate>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>门店名称：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="name" ng-model="shopAdd['SHOP.SHOP_NAME']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>电话：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="shopAdd['SHOP.TELEPHONE']"
                                           required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>区域：
                                </label>
                                <div class="col-sm-7">
                                    <select ng-model="shopAdd['SHOP.DISTRICT_ID']"
                                            ng-init="shopAdd['SHOP.DISTRICT_ID']='-1'"
                                            class="nya-bs-select form-control"
                                            ng-change="addDistrictModal(shopAdd['SHOP.DISTRICT_ID'])">
                                        <option class="nya-bs-option" value="-1">
                                            选择门店区域
                                        </option>
                                        <option class="nya-bs-option" ng-repeat="value in districtList"
                                                ng-bind="value['DISTRICT.DISTRICT_NAME']"
                                                value="{{value['DISTRICT.DISTRICT_ID']}}">
                                        </option>
                                        <option class="nya-bs-option" value="-100">
                                            ----添加门店区域----
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    地理位置：
                                </label>
                                <a class="col-sm-2 control-label table-link" ng-click="choosePoint()">
                                    地图选点
                                </a>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    开门时间：
                                </label>
                                <div class="col-sm-2">
                                    <select ng-model="open_time_hour"
                                            ng-init="open_time_hour='0'"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="hour in hourList"
                                                ng-bind="hour"
                                                value="{{hour}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">时</label>
                                <div class="col-sm-2">
                                    <select ng-model="open_time_min"
                                            ng-init="open_time_min='00'"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="min in minList"
                                                ng-bind="min"
                                                value="{{min}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">分</label>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    关门时间：
                                </label>
                                <div class="col-sm-2">
                                    <select ng-model="close_time_hour"
                                            ng-init="close_time_hour='0'"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="hour in hourList"
                                                ng-bind="hour"
                                                value="{{hour}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">时</label>
                                <div class="col-sm-2">
                                    <select ng-model="close_time_min"
                                            ng-init="close_time_min='00'"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="min in minList"
                                                ng-bind="min"
                                                value="{{min}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">分</label>
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-primary" type="submit"
                                        ng-click="addShopList()">
                                    保存
                                </button>
                                <button class="btn btn-default"
                                        data-dismiss="modal" ng-click="clearForm()">
                                    关闭
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- END add modal -->
        <!-- BEGIN edit modal -->
        <div class="modal fade" id="edit" role="dialog" aria-labelledby="edit">
            <div class="modal-dialog" aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 class="modal-title">
                            修改门店信息
                        </h3>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" name="editForm"
                              ng-submit="commitEdit()" novalidate>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>门店名称：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="name" ng-model="shopEdited['SHOP.SHOP_NAME']" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>电话：
                                </label>
                                <div class="col-sm-7">
                                    <input class="form-control" type="text"
                                           name="telephone" ng-model="shopEdited['SHOP.TELEPHONE']">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    <span class="required" style="color: red"> * </span>区域：
                                </label>
                                <div class="col-sm-7">
                                    <select ng-model="shopEdited['SHOP.DISTRICT_ID']"
                                            ng-init="shopEdited['SHOP.DISTRICT_ID']='-1'"
                                            class="nya-bs-select form-control"
                                            ng-change="addDistrictModal(shopEdited['SHOP.DISTRICT_ID'])">
                                        <option class="nya-bs-option"
                                                ng-repeat="value in districtList"
                                                ng-bind="value['DISTRICT.DISTRICT_NAME']"
                                                value="{{value['DISTRICT.DISTRICT_ID']}}">
                                        </option>
                                        <option class="nya-bs-option" value="-100">
                                            ----添加门店区域----
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    地理位置：
                                </label>
                                <a class="col-sm-2 control-label table-link" ng-click="choosePoint()">
                                    地图选点
                                </a>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    开门时间：
                                </label>
                                <div class="col-sm-2">
                                    <select ng-model="edit_open_time_hour"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="hour in hourList"
                                                ng-bind="hour"
                                                value="{{hour}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">时</label>
                                <div class="col-sm-2">
                                    <select ng-model="edit_open_time_min"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="min in minList"
                                                ng-bind="min"
                                                value="{{min}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">分</label>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    关门时间：
                                </label>
                                <div class="col-sm-2">
                                    <select ng-model="edit_close_time_hour"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="hour in hourList"
                                                ng-bind="hour"
                                                value="{{hour}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">时</label>
                                <div class="col-sm-2">
                                    <select ng-model="edit_close_time_min"
                                            class="nya-bs-select form-control">
                                        <option class="nya-bs-option"
                                                ng-repeat="min in minList"
                                                ng-bind="min"
                                                value="{{min}}">
                                        </option>
                                    </select>
                                </div>
                                <label class="col-sm-1 control-label">分</label>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" type="submit">
                                    保存
                                </button>
                                <button class="btn btn-default"
                                        data-dismiss="modal">
                                    关闭
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- END edit modal -->
        <!-- BEGIN showMap modal -->
        <div class="modal fade" id="showMap" role="dialog">
            <div class="modal-dialog" aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 class="modal-title">
                            门店位置地图
                        </h3>
                    </div>
                    <div id="allmap"></div>
                    <div class="modal-footer">
                        <button class="btn btn-default"
                                data-dismiss="modal">
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END showMap modal -->
    <!-- BEGIN choosePoint modal -->
    <div class="modal fade" id="choosePoint" role="dialog">
        <div class="modal-dialog" aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 class="modal-title">
                        选择门店位置
                    </h3>
                </div>
                <div id="container"></div>
                <div id="myPageTop">
                    <table>
                        <tr>
                            <td>
                                <label>按关键字搜索：</label>
                            </td>
                            <td class="column2">
                                <label>左击获取经纬度：</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="请输入关键字进行搜索" ng-model="area" id="tipinput">
                            </td>
                            <td class="column2">
                                <input type="text" readonly="true" id="lnglat">
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary"
                            data-dismiss="modal" ng-click="clearMap()">
                        确定
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- END choosePoint modal -->
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
</div>