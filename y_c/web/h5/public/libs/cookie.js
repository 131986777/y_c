/**
 * Created by hh on 2016.6.22.
 */
//
//setCookie = function (name, value, iDay) {
//
//    var oDate = new Date();
//
//    if (iDay == undefined) {
//        iDay = 7;
//    }
//
//    oDate.setDate(oDate.getDate() + iDay);
//
//    document.cookie = name + '=' + value + ';expires=' + oDate + ';path=/';
//
//}

//写cookies
function setCookie(name,value)
{
    var Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}

removeCookie = function (name) {

    setCookie(name, 1, -1);

}