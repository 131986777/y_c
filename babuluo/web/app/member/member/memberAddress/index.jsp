<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="page-content">

    <%--在这里写样式--%>
    <div class="col-sm-12">
        <div class="page-operation-wrap">
            <div class="row">
                <!-- BEGIN 导航标签 -->
                <ul class="nav nav-tabs" style="margin-bottom: 0px; margin-left: 4px;">
                    <li>
                        <a ui-sref="memberInfo({id:memberId})"> 客户信息 </a>
                    </li>
                    <li>
                        <a ui-sref="memberData({id:memberId})"> 资料 </a>
                    </li>
                    <li>
                        <a ui-sref="memberAccount({id:memberId})"> 账户 </a>
                    </li>

                    <li class="active">
                        <a> 收件地址 </a>
                    </li>
                    <li>
                        <a ui-sref="memberCard({id:memberId})"> 会员卡 </a>
                    </li>
                </ul>
                <!-- END 导航标签 -->
            </div>
            <div style="margin-top: 30px" ng-repeat="item in addressList">
                <%--<input ng-if="item['MEMBER_ADDRESS.IS_DEFAULT']==1"  type="checkbox" checked="checked" disabled/>--%>
                <span ng-if="item['MEMBER_ADDRESS.IS_DEFAULT']==1">(默认地址)</span>
                <label>{{item['MEMBER_ADDRESS.ADDR_GUO']+item['MEMBER_ADDRESS.ADDR_SHENG']+item['MEMBER_ADDRESS.ADDR_SHI']+item['MEMBER_ADDRESS.ADDR_XIAN']+item['MEMBER_ADDRESS.ADDR_QU']+item['MEMBER_ADDRESS.ADDR']+"  "+item['MEMBER_ADDRESS.ZIP_CODE']}}</label><br>
                <label>{{item['MEMBER_ADDRESS.NAME']}}&nbsp;&nbsp;{{item['MEMBER_ADDRESS.MOBILE']}}</label>
            </div>
        </div>
    </div>