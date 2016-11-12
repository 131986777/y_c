<!--############通用变量区############-->

var PRODUCT_DEFAULT_IMG = "/uploads/images/product.png";
var FILE_SERVER_DOMAIN = "http://babuluo-file.oss-cn-hangzhou.aliyuncs.com//";
var basePath='/AndSell/h5/';
var baseURL='http://localhost:8081/AndSell/bubu';

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
function getDate(dateStr){
    if(dateStr!=undefined){
        var mydate = dateStr.slice(0, dateStr.indexOf("."));
        return mydate;
    }else{
        return undefined;
    }
}


/*
 *删除数组元素.
 */
Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a
        >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};


//   get Sku  content info
function setContentsInfo(sku) {
    var contents = '';
    if (sku['SHOP_PRODUCT_SKU.SKU_CONTENT1'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_PRODUCT_SKU.SKU_NAME1'] + " : " + sku['SHOP_PRODUCT_SKU.SKU_CONTENT1'];
    }
    if (sku['SHOP_PRODUCT_SKU.SKU_CONTENT2'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_PRODUCT_SKU.SKU_NAME2'] + " : " + sku['SHOP_PRODUCT_SKU.SKU_CONTENT2'];
    }
    if (sku['SHOP_PRODUCT_SKU.SKU_CONTENT3'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_PRODUCT_SKU.SKU_NAME3'] + " : " + sku['SHOP_PRODUCT_SKU.SKU_CONTENT3'];
    }
    sku['SHOP_PRODUCT_SKU.SKU_CONTENT_INFO'] = contents;
}

//   get Sku  content info
function setContentsInfoForOrder(sku) {
    var contents = '';
    if (sku['SHOP_ORDER_INFO.SKU_1_VALUE'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_ORDER_INFO.SKU_1_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_1_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO.SKU_2_VALUE'] != undefined) {
        contents +=' , ';
        contents += sku['SHOP_ORDER_INFO.SKU_2_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_2_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
        contents +=' , ';
        contents += sku['SHOP_ORDER_INFO.SKU_3_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_3_VALUE'];
    }
    sku['SHOP_ORDER_INFO.SKU_CONTENT_INFO'] = contents;
}


/**
 * 判断一个对象是否为空
 * @param e
 * @author yhx
 */
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

/**
 * 得到当前日期 yyyy-MM-dd
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + seperator1 + month + seperator1 + strDate;
}

var noUndefinedAndNull = function (x) {
    if(x==undefined){
        return "";
    }else return x;
}

var replaceAll = function (str,s1, s2) {
    return str.replace(new RegExp(s1, "gm"), s2);
}

function routerPath(base, path, param, css) {
    var url =base+path;

    var controller = {
        name: 'app', insertBefore: '#app-level', files: [url + '/controller.js']
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
        loadServiceAndController: function ($ocLazyLoad,userFactory,$state,weUI) {
            var filtertList=[
                'pages/product/list',
                'pages/product/tagPrdList',
                'pages/home',
                'pages/product/detail',
                'pages/cart',
                'pages/shop',
                'pages/user/accountLogin',
                'pages/user/register',
                'pages/security/resetPwd'
            ];
            if(filtertList.indexOf(path)<0){
                userFactory.isLogin().get({'withCredentials': true}, function (response) {
                    if (response.code != 0) {
                        weUI.toast.error('请先登录');
                        $state.go('pages/user/accountLogin');
                    }
                });
            }
            return $ocLazyLoad.load(loadItemList);
        }
    }
    return router;
}

function $when(from,to){
    AndSellH5MainModule.config(function ($urlRouterProvider) {
        $urlRouterProvider.when(from,to);
    });
}

function $import(path,param,css){

        AndSellH5MainModule.config(function ($stateProvider) {
            $stateProvider.state(path,routerPath(basePath,path,param,css))
        });
}

function ToJson(str){
    var json = (new Function("return " + str))();
    return json;
}


function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    }
    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    }
    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    }
    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    }
    var size = function () {
        return this.arr.length;
    }
    var isEmpty = function () {
        return this.arr.length <= 0;
    }
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.set = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

var updateWxTitle = function(title) {
    //var body = document.getElementsByTagName('body')[0];
    //document.title = title;
    //var iframe = document.createElement("iframe");
    //iframe.setAttribute("src", "/empty.png");
    //
    //iframe.addEventListener('load', function() {
    //    setTimeout(function() {
    //        iframe.removeEventListener('load');
    //        document.body.removeChild(iframe);
    //    }, 0);
    //});
    //document.body.appendChild(iframe);
}
