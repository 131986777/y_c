angular.module('AndSell.H5.Main').controller('pages_product_list_Controller', function ($location, $anchorScroll, weUI, $scope, $state, $stateParams, productFactory, modalFactory) {

    modalFactory.setTitle('云厨1站商城 - 十分钟吃饭，优质食品购买平台');
    modalFactory.setBottom(true);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;
    $scope.historyList = [];

    $scope.initData = function () {

        $scope.getRecentSearch();
        $scope.getHotSearch();

        $("input").focus(function () {
            $('.prdList').css('visibility', "hidden");
            $('.search-bar').css('position', "relative");
            $('#nav-bottom').hide();
            $('.search-info').show();
            $('#search-cancel').show();
            $scope.getRecentSearch();
            $scope.getHotSearch();
        });
        $('#search-cancel').click(function () {
            $('.prdList').css('visibility', "visible");
            $('.search-bar').css('position', "fixed");
            $('#nav-bottom').show();
            $('.search-info').hide();
            $(this).hide();
        });
        modalFactory.setCurrentPage('fl');
        $('#all-list').css('min-height', document.documentElement.clientHeight - 40);
        $scope.STORE_ID = 0;
        if (getCookie('currentShopInfo') != undefined) {
            $scope.STORE_ID = ToJson(getCookie('currentShopInfo'))['SHOP.REPOS_ID']
        } else {
            $scope.toShop();
        }
        $scope.filter = {
            PAGE_SIZE: 10,
            PN: 1,
            'SHOP_PRODUCT.PRD_NAME': $stateParams.keyword,
            'STOCK_REALTIME.STORE_ID': $scope.STORE_ID,
            'SHOP_PRODUCT.REMARK': 'offLine'
        }

        $scope.TAG_STATE = $stateParams.tagId;
        if ($stateParams.tagId != '') {

            if ($stateParams.tagId == 1024) {
                modalFactory.setTitle('爆款菜品');
            } else {
                modalFactory.setTitle('新品上市');
            }

            $scope.filter['SHOP_PRODUCT.TAG_ID'] = $stateParams.tagId;
        }

        if ($stateParams.classId == '') {
            $stateParams.classId = undefined
        }
        $scope.filter['SHOP_PRODUCT.CLASS_ID'] = $stateParams.classId;
        $scope.filter['SHOP_PRODUCT.SEARCH_SOURCE'] = "H5";
        $scope.storeId = $scope.STORE_ID;
        $scope.hasNextPage = true;
        $scope.loading = false;  //状态标记
        $scope.prdList = new Array;
        $scope.getPrd();
        $scope.getCartInfoInCookie();

        //下拉监听器
        $(document.body).infinite().on("infinite", function () {
            if ($scope.loading) return;
            $scope.loading = true;
            if ($scope.hasNextPage) {
                $scope.getMorePrd();
            }
        });

        $scope.getDataReady = false;

    }

    $scope.myKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.getPrd();
            $('.search-info').hide();
            $('#search-cancel').hide();
            $("input").blur();
        }
    };

    //获取商品列表
    $scope.getPrd = function () {
        $('.prdList').css('visibility', "visible");
        $('.search-bar').css('position', "fixed");
        $('#nav-bottom').show();
        if (localStorage.getItem("PRD_LIST") != undefined) {
            $scope.prdList = JSON.parse(localStorage.getItem("PRD_LIST"));
            $scope.classList = JSON.parse(localStorage.getItem("CLASS_LIST"));
            $scope.filter['SHOP_PRODUCT.CLASS_ID'] = localStorage.getItem("CLASS_ID");
            if (localStorage.getItem("CLASS_ID") == 'undefined') {
                $scope.filter['SHOP_PRODUCT.CLASS_ID'] = undefined;
            }
            $scope.toAnchor(localStorage.getItem("ANCHOR_ID"));
            if (localStorage.getItem("ANCHOR_PAGE") != undefined) {
                $scope.filter['PN'] = Number(localStorage.getItem("ANCHOR_PAGE"));
            }
            $scope.page = {
                pageIndex: Number(localStorage.getItem("ANCHOR_PAGE")),
                pageSize: 10
            }
            localStorage.removeItem("PRD_LIST");
            localStorage.removeItem("CLASS_LIST");
            localStorage.removeItem("CLASS_ID");
            localStorage.removeItem("ANCHOR_ID");
            localStorage.removeItem("ANCHOR_PAGE");
            $scope.loading = false;
            $scope.getDataReady = true;
        } else {
            weUI.toast.showLoading('正在加载');
            productFactory.getProduct($scope.filter, function (response) {
                Array.prototype.push.apply($scope.prdList, response.data);//数组合并
                weUI.toast.hideLoading();
                $scope.classList = response.extraData.classList;
                $scope.page = response.extraData.page;
                if ($scope.page.querySize > $scope.page.pageIndex * $scope.page.pageSize) {
                    $scope.hasNextPage = true;
                } else {
                    $scope.hasNextPage = false;
                }
                $scope.loading = false;
                $scope.getDataReady = true;
            }, function (response) {
                weUI.toast.hideLoading();
                weUI.toast.error(response.msg);
            });
        }
    }

    //历史搜索
    $scope.getRecentSearch = function () {
        productFactory.getRecentSearch({}, function (response) {
            if (response.code == 0 && response.msg == "ok") {
                $scope.historyList = response.data;
            } else {
                weUI.toast.error("历史搜索记录获取失败");
            }
        });
    }

    //热门搜索
    $scope.getHotSearch = function () {
        productFactory.getHotSearch({}, function (response) {
            if (response.code == 0 && response.msg == "ok") {
                $scope.hotList = response.data;
            } else {
                weUI.toast.error("热门搜索记录获取失败");
            }
        });
    }


    //查询商品
    $scope.searchPrd = function () {
        $scope.prdList = new Array;
        $scope.getPrd();
        $('.search-info').hide();
        $('#search-cancel').hide();
    }

    //根据历史纪录查询商品
    $scope.searchPrdByHistory = function (key) {
        $('.search-info').hide();
        $scope.prdList = new Array;
        $scope.filter['SHOP_PRODUCT.PRD_NAME'] = key;
        $scope.getPrd();
        $('#search-cancel').hide();
    }

    //清空历史记录
    $scope.clearSearchHistory = function () {
        weUI.dialog.confirm("提示", "确认删除全部历史搜索？", function () {
            productFactory.clearSearchHistory({}, function (response) {
                if (response.code == 0 && response.msg == "ok") {
                    $scope.getRecentSearch();
                    weUI.toast.ok("已清空历史搜索");
                } else {
                    weUI.toast.error("清空历史搜索失败");
                }
            });
        });
    }

    //跳转至之前的商品项
    $scope.toAnchor = function (id) {
        $anchorScroll.yOffset = 350;
        $location.hash(id);
        $anchorScroll();
    }

    //跳转至详情页
    $scope.toDetail = function (id) {
        localStorage.setItem("PRD_LIST", JSON.stringify($scope.prdList));
        localStorage.setItem("CLASS_LIST", JSON.stringify($scope.classList));
        localStorage.setItem("CLASS_ID", clone($scope.filter['SHOP_PRODUCT.CLASS_ID']));
        localStorage.setItem("ANCHOR_ID", id);
        localStorage.setItem("ANCHOR_PAGE", $scope.page.pageIndex);
        $state.go('pages/product/detail', {PRD_ID: id});
    }

    $scope.toCart = function () {
        modalFactory.setCurrentPage('cart');
        $state.go('pages/cart');
    }

    $scope.filterClass = function (classId) {
        $scope.prdList = new Array;
        $scope.filter['SHOP_PRODUCT.CLASS_ID'] = classId;
        $scope.filter['PAGE_SIZE'] = 10;
        $scope.filter['PN'] = 1;
        $scope.getPrd();
    }

    //跳出弹出框选择sku
    $scope.selectSKU = function (id) {
        $scope.cartPrdId = id;
        $scope.cartModalShow = true;
    }

    //更新购物车价格
    $scope.updateCartPrice = function () {
        var price = 0;
        var size = 0;
        $scope.skuList.forEach(function (ele) {
            price += ele['SHOP_PRODUCT_SKU.REAL_PRICES'] * ele['SHOP_PRODUCT_SKU.SIZE'];
            size += ele['SHOP_PRODUCT_SKU.SIZE'];
        });
        $scope.totalPrice = price;
        $scope.totalSize = size;
    }

    //得到购物车信息
    $scope.getCartInfoInCookie = function () {
        $scope.skuList = new Array;
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = ToJson(cartInfo);
            cartSize = ToJson(cartSize);
        }
        if (cartInfo.length > 0) {
            var params = {};
            params['SHOP_PRODUCT_SKU.SKU_IDS'] = cartInfo.toString();
            params['STOCK_REALTIME.STORE_ID'] = $scope.STORE_ID;
            productFactory.getProductSkuBySkuIds(params, function (response) {
                $scope.skuList = response.data;
                $scope.skuList.forEach(function (ele) {
                    ele['SHOP_PRODUCT_SKU.SIZE'] = cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                });
                $scope.updateCartPrice();
            })
        } else {
            $scope.updateCartPrice();
        }
    }

    //结算
    $scope.addOrder = function () {
        var list = new Array;
        $scope.skuList.forEach(function (ele) {
            list.push(ele['SHOP_PRODUCT_SKU.SKU_ID']);
        });
        if ($scope.skuList.length > 0) {
            $state.go('pages/order/add', {SKU_IDS: list.toString()});
        } else {
            weUI.toast.error('至少选择一件商品');
        }
    }

    //购物车添加成功
    $scope.addToCartSuccess = function () {
        $scope.getCartInfoInCookie();
    }

    //下拉更多商品
    $scope.getMorePrd = function () {
        $scope.filter.PN = $scope.page.pageIndex + 1;
        $scope.filter['PAGE_SIZE'] = 10;
        $scope.getPrd();
    };

    $scope.toShop = function () {
        $state.go('pages/shop', {'FROM': window.location.href});
    }

    $scope.$on('$destroy', function () {
        $(document.body).infinite().off("infinite");
    })
});
