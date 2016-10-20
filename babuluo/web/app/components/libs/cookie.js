/**
 * Created by hh on 2016.6.22.
 */

setCookie = function (name, value, iDay) {

    var oDate = new Date();



    if (iDay == undefined) {
        iDay = 7;
    }

    oDate.setDate(oDate.getDate() + iDay);

    document.cookie = name + '=' + value + ';expires=' + oDate + ';path=/';

}

getCookie = function (name) {

    var arr = document.cookie.split('; ');

    for (var i = arr.length - 1; i >= 0; i--) {

        var arr2 = arr[i].split('=');

        if (arr2[0] === name) {

            return arr2[1];

        }

    }

    return '';

}

removeCookie = function (name) {

    setCookie(name, 1, -1);

}