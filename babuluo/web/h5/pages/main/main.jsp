<%@ page import="com.pabula.api.API" %>
<%@ page import="com.pabula.common.util.StrUtil" %>
<%@ page import="com.weixin.OAuthUtil" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    /**
     * 1. 判断cookie 里面有没有openid, 如果没有, 则判断paramater 里面有没有code ,如果用也没有则说明, 没有微信个人呢信息
     * 则需要请求个人信息openid
     */
    /**
     * 设置ip地址
     */
    //String ip = request.getRemoteHost();
    //String ip = request.getHeader("Host");  //上了nginx与tomcat集群后，要用这个获得
    String ip = request.getHeader("X-Real-IP");  //上了nginx与tomcat集群后，要用这个获得
//    String ip = "117.89.49.108";
    Cookie ipCookie = new Cookie("ip", ip);
    response.addCookie(ipCookie);

    Cookie[] cookies = request.getCookies();

    String code = request.getParameter("code");

    boolean cookieHasOpenId = false;

    String openId;
    String loginId = "";
    if (null != cookies) {
        for (Cookie cookie : cookies) {

            if ("openId".equals(cookie.getName())) {
                openId = cookie.getValue();
                if (StrUtil.isNotNull(openId)) {
                    cookieHasOpenId = true;
                }
            }

            if ("ANDSELLID".equals(cookie.getName())) {
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

            String url = OAuthUtil.getURLByOAuth("http://app.bblycyz.com/AndSell/h5/pages/main/main.jsp");

            response.sendRedirect(url);
            return;
        } else {

            openId = OAuthUtil.getOpenID(code);

            if (StrUtil.isNotNull(openId)) {

                Cookie cook = new Cookie("openId", openId);
                response.addCookie(cook);

                /**
                 * 如果有loginId, 表示已经登陆了, 则更新openid
                 * 更新openid
                 */

                if (StrUtil.isNotNull(loginId)) {

                    Map<String, String> data = new HashMap<String, String>();

                    data.put("MEMBER.USER_ID", loginId);
                    data.put("MEMBER.WX_OPENID", openId);
                    new API().call("/AndSell/bubu/member/member/updateOpenID", data);

                    response.addCookie(new Cookie("hasUpdateOpenId", "1"));
                }
            }
        }
    }

    String path = request.getServletPath();


    boolean hasMoreParam = request.getParameterNames().hasMoreElements();

    if (!hasMoreParam) {
        String url = "http://app.bblycyz.com/AndSell/h5/pages/main/main.jsp".replace(path, path + "?t=1");
        response.sendRedirect(url);
        return;
    }

%>

<!DOCTYPE html>
<html lang="en" ng-app="AndSell.H5.Main" ng-controller="H5.MainController">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <title ng-bind="title"></title>


    <link rel="stylesheet" href="/AndSell/h5/public/libs/bootstrap/dist/css/bootstrap.min.css">
    <!--<link rel="stylesheet" href="/AndSell/h5/public/libs/weui/dist/css/jquery-weui.min.css">-->
    <link rel="stylesheet" href="/AndSell/h5/public/libs/weui/dist/lib/weui.css">
    <link rel="stylesheet" href="/AndSell/h5/public/css/style.css">
    <link rel="stylesheet" href="/AndSell/h5/public/libs/swiper/swiper.min.css">
    <%--<link rel="stylesheet" href="/AndSell/h5/public/libs/weui/weui-modal.css">--%>
    <!--高德地图-->
    <%--<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>--%>

</head>
<body class="home-index">

<!-- BEGIN 内容 -->

<div class="row-content">
    <div ui-view="" class="ng-scope" style="overflow-x:hidden "></div>
</div>

<!--END 内容-->

<!-- BEGIN footer-nav -->
<nav class="nav-fixed-bottom" ng-if="navShow" role="navigation">
    <ul class="nav-list flexbox" style="padding: 6px 0">
        <li class="cell" ng-class="{true:'selected'}[currentPage=='sy']">
            <a ui-sref="pages/home" ng-click="toPage('sy')">
                <i class="icon icon-home"></i>
                <p class="nav-txt">首页</p>
            </a>
        </li>
        <li class="cell" ng-class="{true:'selected'}[currentPage=='fl']">
            <a ui-sref="pages/product/list" ng-click="toPage('fl')">
                <i class="icon icon-product-class"></i>
                <p class="nav-txt">分类</p>
            </a>
        </li>
        <li class="cell" ng-class="{true:'selected'}[currentPage=='cart']">
            <a ui-sref="pages/cart" ng-click="toPage('cart')" class="home-nav-cart">
                <i class="icon icon-cart"></i>
                <p class="nav-txt">购物车</p>
                <span class="cartNum" ng-if="cartSize!=0" ng-bind="cartSize"></span>
            </a>
        </li>
        <li class="cell" ng-class="{true:'selected'}[currentPage=='wd']">
            <a ui-sref="pages/personal" ng-click="toPage('wd')">
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
<script src="/AndSell/h5/public/libs/cookie.js"></script>
<script src="/AndSell/h5/public/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/AndSell/h5/public/libs/swiper/swiper.jquery.min.js"></script>

<!--微信js sdk-->
<script src="/AndSell/h5/public/libs/jweixin-1.0.0.js"></script>

<!--高德地图-->
<script src="http://cache.amap.com/lbs/static/es5.min.js"></script>
<script type="text/javascript"
        src="http://webapi.amap.com/maps?v=1.3&key=ef5bbbdf7bca82910095f043224c0138&plugin=AMap.Autocomplete"></script>

<!--importantJs -->
<script src="/AndSell/h5/public/application.js"></script>

<!--############通用方法区############-->
<script src="/AndSell/h5/public/commonJs.js"></script>


<!--############ router ############-->
<script src="router.js"></script>


<!--############ service ############-->
<script src="../product/product-services.js"></script>
<script src="../order/order-services.js"></script>
<script src="../personal/personal-services.js"></script>
<script src="../shop/shop-services.js"></script>
<script src="../coupon/coupon-services.js"></script>
<script src="../user/user-services.js"></script>
<script src="../account/account-services.js"></script>
<script src="../security/security-services.js"></script>
<script src="../shopLbs/lbs-services.js"></script>

<!--############ controller ############-->
<script src="controller.js"></script>

</html>


