<!--############通用变量区############-->

var PRODUCT_DEFAULT_IMG = "/uploads/images/product.png";
var FILE_SERVER_DOMAIN = "http://babuluo-file.oss-cn-hangzhou.aliyuncs.com//";
var basePath='/AndSell/app/';

<!--############通用方法区############-->

/**
 * 普通对象 不引用赋值
 * @param myObj
 * @returns {*}
 */
function clone(myObj) {
    if (typeof(myObj) != 'object' || myObj == null) return myObj;
    var newObj = {};
    for (var i in myObj) {
        newObj[i] = clone(myObj[i]);
    }
    return newObj;
}

/**
 * tab_input getTest
 * @param myObj
 * @returns {*}
 */
function getTabInputText(values) {
    var list = [];
    if (values != undefined) {
        values.forEach(function (ele) {
            list.push(ele.text);
        });
    }
    return list.toString();
}

var filterTableFromList = function (list, tablename) {
    if (list != undefined) {
        list.forEach(function (ele) {
            for (var p in ele) { // 方法
                if (typeof ( ele [p]) == " function ") {
                    ele [p]();
                } else { // p 为属性名称，obj[p]为对应属性的值
                    if (p.trim().startsWith(tablename)) {
                        var a = p.substring(tablename.length + 1);
                        ele[a] = ele [p];
                    }
                }
            } // 最后显示所有的属性
        });
    }
};

//处理商品价格
function moneyFormat(money) {
    return Number(money / 100).toFixed(2);
}

//过滤时间后面的毫秒
function getDate(dateStr) {
    if (dateStr != undefined) {
        var mydate = dateStr.slice(0, dateStr.indexOf("."));
        return mydate;
    } else {
        return undefined;
    }
}

/*
 *删除数组元素.
 */
Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};

//   get Sku  content info
function setContentsInfoForOrder(sku) {
    var contents = '';
    if (sku['SHOP_ORDER_INFO.SKU_1_VALUE'] != undefined) {
        contents += ' ';
        contents += sku['SHOP_ORDER_INFO.SKU_1_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_1_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO.SKU_2_VALUE'] != undefined) {
        contents += ' ';
        contents += sku['SHOP_ORDER_INFO.SKU_2_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_2_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
        contents += ' ';
        contents += sku['SHOP_ORDER_INFO.SKU_3_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_3_VALUE'];
    }
    sku['SHOP_ORDER_INFO.SKU_CONTENT_INFO'] = contents;
}

//   get Sku  content info
function setContentsInfoForOrder_OFFLINE(sku) {
    var contents = '';
    if (sku['SHOP_ORDER_INFO_OFFLINE.SKU_1_VALUE'] != undefined) {
        contents += ' ';
        contents += sku['SHOP_ORDER_INFO_OFFLINE.SKU_1_NAME'] + " : " + sku['SHOP_ORDER_INFO_OFFLINE.SKU_1_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO_OFFLINE.SKU_2_VALUE'] != undefined) {
        contents += ' ';
        contents += sku['SHOP_ORDER_INFO_OFFLINE.SKU_2_NAME'] + " : " + sku['SHOP_ORDER_INFO_OFFLINE.SKU_2_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO_OFFLINE.SKU_3_VALUE'] != undefined) {
        contents += ' ';
        contents += sku['SHOP_ORDER_INFO_OFFLINE.SKU_3_NAME'] + " : " + sku['SHOP_ORDER_INFO_OFFLINE.SKU_3_VALUE'];
    }
    sku['SHOP_ORDER_INFO_OFFLINE.SKU_CONTENT_INFO'] = contents;
}

//list to map   by  key
function listToMap(list, key) {
    var map = new Map;
    list.forEach(function (ele) {
        if (ele[key] != undefined) {
            map.set(ele[key], ele);
        }
    });
    return map;
}

var replaceAll = function (str,s1, s2) {
    return str.replace(new RegExp(s1, "gm"), s2);
}

function routerPath(base, path, param, css) {
    var url =base+path;

    var controller = {
        name: 'app', insertBefore: '#app-level', files: [url + '/controllers.js']
    };

    var pageCss = {
        name: 'app', insertBefore: '#app-level', files: [url + '/page.css']
    };

    var loadItemList = new Array;
    if (css != undefined&&css==true) {
        loadItemList.push(pageCss);
    }
    loadItemList.push(controller);

    var router = {};
    router.url = "/" + path;
    if (param != undefined) {
        var p='';
        for (var s in param) {
            p+='/:'+s;
        }
        router.url += p;
        router.params = (param);
    }
    router.controller =  replaceAll( path+"/",'/','_') + "Controller";
    router.templateUrl = url + "/index.html";
    router.resolve = {
        loadServiceAndController: function ($ocLazyLoad,userFactory) {

                userFactory.isLogin().get({'withCredentials': true}, function (response) {
                    if (response.code != 0) {
                        window.location.href='../login/index.html';
                    }
                });


            return $ocLazyLoad.load(loadItemList)
        }
    }
    return router;
}

function $when(from,to){
    AndSellMainModule.config(function ($urlRouterProvider) {
        $urlRouterProvider.when(from,to);
    });
}

function $import(path,param,css){
    AndSellMainModule.config(function ($stateProvider) {
        $stateProvider.state(path,routerPath(basePath,path,param,css))
    });
}



// ajax 对象
function ajaxObject() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
    return xmlHttp;
}

// ajax post请求：
function ajaxPost ( url , data , fnSucceed , fnFail , fnLoading ) {
    var ajax = ajaxObject();
    ajax.open( "post" , url , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.withCredentials = true; //支持跨域发送cookies
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                fnSucceed( ajax.responseText );
            }
            else {
                fnFail( "HTTP请求错误！错误码："+ajax.status );
            }
        }
        else {
            //fnLoading();
        }
    }
    ajax.send( data );

}