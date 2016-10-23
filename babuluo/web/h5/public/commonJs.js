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
    var mydate=dateStr.slice(0,dateStr.indexOf("."));
    return mydate;
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
    if (sku['SHOP_PRODUCT_SKU.SKU_CONTENT3'] != undefined) {
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
    if (sku['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_ORDER_INFO.SKU_1_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_3_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_ORDER_INFO.SKU_2_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_3_VALUE'];
    }
    if (sku['SHOP_ORDER_INFO.SKU_3_VALUE'] != undefined) {
        contents +=' ';
        contents += sku['SHOP_ORDER_INFO.SKU_3_NAME'] + " : " + sku['SHOP_ORDER_INFO.SKU_3_VALUE'];
    }
    sku['SHOP_ORDER_INFO.SKU_CONTENT_INFO'] = contents;
}

