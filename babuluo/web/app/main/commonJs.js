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

