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

    Cookie ipCookie = new Cookie("ip", ip);
    response.addCookie(ipCookie);

    Cookie[] cookies = request.getCookies();

    String code = request.getParameter("code");

    boolean cookieHasOpenId = false;

    String openId ;
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

                    Map<String, String> data = new HashMap<String,String>();

                    data.put("MEMBER.USER_ID",loginId);
                    data.put("MEMBER.WX_OPENID", openId);
                    new API().call("/AndSell/bubu/member/member/updateOpenID", data);

                    response.addCookie(new Cookie("hasUpdateOpenId","1"));
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
<%@ include file="main_bak.html"%>
