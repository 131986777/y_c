<%@ page import="com.pabula.common.util.StrUtil" %>
<%@ page import="com.weixin.OAuthUtil" %>
<%@ page import="com.pabula.api.API" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>

<%--
  Created by IntelliJ IDEA.
  User: sunsai
  Date: 2016/11/14
  Time: 上午10:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>



<%
    /**
     * 1. 判断cookie 里面有没有openid, 如果没有, 则判断paramater 里面有没有code ,如果用也没有则说明, 没有微信个人呢信息
     * 则需要请求个人信息openid
     */


    Cookie[] cookies = request.getCookies();

    String code = request.getParameter("code");

    boolean cookieHasOpenId = false;

    String openId = "";
    String loginId = "";
    if(null != cookies){
        for (Cookie cookie : cookies) {

            if ("openId".equals(cookie.getName())) {
                openId = cookie.getValue();
                if (StrUtil.isNotNull(openId)) {
                    cookieHasOpenId = true;
                }
            }

            if("ANDSELLID".equals(cookie.getName())) {
                loginId = cookie.getValue();
            }

        }
    }


    /**
     * 如果cookie 里面没有openid,
     */
    if (!cookieHasOpenId) {
        /**
         * 并且没有code ,则需要重定向
         */
        if (StrUtil.isNull(code)) {
            /**
             * 根据code 获取openid
             */

            String url = OAuthUtil.getURLByOAuth("http://h5.bblycyz.com/AndSell/h5/pages/main/main.jsp");

//            String url = "main.jsp?code=1234";

            response.sendRedirect(url);
            return;
        } else {

            openId = OAuthUtil.getOpenID(code);

            if (StrUtil.isNotNull(openId)) {


                System.out.println("openId");
                System.out.println(openId);
                Cookie cook = new Cookie("openId", openId);
                response.addCookie(cook);

                /**
                 * 如果有loginId, 表示已经登陆了, 则更新openid
                 * 更新openid
                 */

                if (StrUtil.isNotNull(loginId)) {

                    Map<String, String> data = new HashMap<String,String>();

                    data.put("MEMBER.USER_ID",loginId);
                    data.put("MEMBER.WX_OPENID", openId);
                    new API().call("/AndSell/bubu/member/member/updateOpenID", data);

                }
            }
        }
    }





%>


<!DOCTYPE html>
<html lang="en"  ng-app="AndSell.H5.Main" ng-controller="H5.MainController" >
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <title ng-bind="title"></title>


    <link rel="stylesheet" href="/AndSell/h5/public/libs/bootstrap/dist/css/bootstrap.min.css">
    <!--<link rel="stylesheet" href="/AndSell/h5/public/libs/weui/dist/css/jquery-weui.min.css">-->
    <link rel="stylesheet" href="/AndSell/h5/public/libs/weui/dist/lib/weui.css">
    <link rel="stylesheet" href="/AndSell/h5/public/css/style.css">
    <link rel="stylesheet" href="/AndSell/h5/public/libs/swiper/swiper.min.css">
    <link rel="stylesheet" href="/AndSell/h5/public/libs/weui/weui-modal.css">

</head>
<body class="home-index">

<div><!-- BEGIN 内容 -->

    <div class="row-content">
        <div ui-view="" class="ng-scope"></div>
    </div>

</div> <!--END 内容-->

<!-- BEGIN footer-nav -->
<nav class="nav-fixed-bottom" ng-if="navShow" role="navigation" ng-init="currentPage='sy'">
    <ul class="nav-list flexbox">
        <li class="cell" ng-class="{true:'selected'}[currentPage=='sy']">
            <a ui-sref="pages/home" ng-click="currentPage='sy'">
                <i class="icon icon-home"></i>
                <p class="nav-txt">首页</p>
            </a>
        </li>
        <li class="cell"  ng-class="{true:'selected'}[currentPage=='cart']">
            <a ui-sref="pages/cart"  ng-click="currentPage='cart'">
                <i class="icon icon-cart"></i>
                <p class="nav-txt">购物车</p>
            </a>
        </li>
        <li class="cell"  ng-class="{true:'selected'}[currentPage=='fl']">
            <a ui-sref="pages/product/list" ng-click="currentPage='fl'">
                <i class="icon icon-product-class"></i>
                <p class="nav-txt">分类</p>
            </a>
        </li>
        <li class="cell" ng-class="{true:'selected'}[currentPage=='wd']">
            <a ui-sref="pages/personal" ng-click="currentPage='wd'">
                <i class="icon icon-personal"></i>
                <p class="nav-txt">我的</p>
            </a>
        </li>
    </ul>
</nav>
<!-- END footer-nav -->
</body>

<!--############JS引用区############-->
<script src="/AndSell/h5/public/libs/jquery/dist/jquery.min.js"></script>
<script src="/AndSell/h5/public/libs/angular/angular.min.js"></script>
<script src="/AndSell/h5/public/libs/angular/angular-sanitize.js"></script>
<script src="/AndSell/h5/public/libs/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="/AndSell/h5/public/libs/ocLazyLoad.min.js"></script>
<script src="/AndSell/h5/public/libs/angular-resource/angular-resource.min.js"></script>
<script src="/AndSell/h5/public/libs/weui.js"></script>
<script src="/AndSell/h5/public/libs/weui/dist/lib/jquery-2.1.4.js"></script>
<script src="/AndSell/h5/public/libs/weui/dist/js/jquery-weui.min.js"></script>
<script src="/AndSell/h5/public/libs/weui/dist/js/city-picker.min.js"></script>
<script src="/AndSell/h5/public/libs/banner/jquery.hammer.js"></script>
<script src="/AndSell/h5/public/libs/banner/transition.js"></script>
<script src="/AndSell/h5/public/libs/banner/angular-animate.js"></script>
<script src="/AndSell/h5/public/libs/banner/hammer.js"></script>
<script src="/AndSell/h5/public/libs/banner/ui-bootstrap-2.2.0.min.js"></script>
<script src="/AndSell/h5/public/libs/banner/ui-bootstrap.js"></script>
<script src="/AndSell/h5/public/libs/cookie.js"></script>
<script src="/AndSell/h5/public/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/AndSell/h5/public/libs/swiper/swiper.jquery.min.js"></script>

<%--微信js sdk--%>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>


<!--importantJs -->
<script src="/AndSell/h5/public/application.js"></script>

<!--############通用方法区############-->
<script src="/AndSell/h5/public/commonJs.js"> </script>


<!--############ router ############-->
<script src="router.js"> </script>


<!--############ service ############-->
<script src="../product/product-services.js"></script>
<script src="../order/order-services.js"></script>
<script src="../personal/personal-services.js"></script>
<script src="../shop/shop-services.js"></script>
<script src="../coupon/coupon-services.js"></script>
<script src="../user/user-services.js"></script>
<script src="../account/account-services.js"></script>
<script src="../security/security-services.js"></script>




<!--############ controller ############-->
<script src="controller.js"> </script>

</html>
