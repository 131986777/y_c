<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- build:js demo.js -->
<script src="/AndSell/public/angular/angular.min.js"></script>
<script src="/AndSell/public/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="/AndSell/public/angular-resource/angular-resource.min.js"></script>
<!-- script jquery.js before bootstrap.js -->
<script src="/AndSell/public/jquery/dist/jquery.min.js"></script>
<script src="/AndSell/public/bootstrap/dist/js/bootstrap.min.js"></script>

<script src="/AndSell/public/angular-select/nya-bootstrap-select.js"></script>

<!-- UEDITOR 配置文件 -->
<script type="text/javascript" src="/AndSell/public/ueditor/ueditor.config.js"></script>
<!-- UEDITOR 编辑器源码文件 -->
<script type="text/javascript" src="/AndSell/public/ueditor/ueditor.all.js"></script>

<%--标签输入框--%>
<script src="/AndSell/public/angular/ngTagInput/ng-tags-input.js"></script>

<%--importantJs--%>
<script src="/AndSell/public/application.js"></script>

<script>
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
        if (values != undefined)
            values.forEach(function (ele) {
                list.push(ele.text);
            });
        return list.toString();
    }


    var filterTableFromList = function (list, tablename) {
        if (list != undefined)
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
    };

    var PRODUCT_DEFAULT_IMG = "/uploads/images/product.png";

</script>