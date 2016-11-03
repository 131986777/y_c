<!--############通用变量区############-->

var PRODUCT_DEFAULT_IMG = "/uploads/images/product.png";


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

