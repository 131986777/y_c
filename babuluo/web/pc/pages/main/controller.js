AndSellPCMainModule.controller('PC.MainController', function ($scope, $state, modalFactory, personalFactory, userFactory, productFactory) {

    $scope.key = $scope;
    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
    });

    $scope.$on('header-bar', function (event, data) {
        $scope.showMenuBar = data.OnOffState;
        $scope.showControllerBar = data.OnOffState;
        $scope.showGoodsCategoriesBar = data.OnOffState;
    });
    $scope.$on('header-showMenu', function (event, data) {
        $scope.showMenuBar = data.OnOffState;
    });
    $scope.$on('leftMenu', function (event, data) {
        $scope.showLeftMenu = data.OnOffState;
    });
    $scope.$on('header-tab', function (event, data) {
        $scope.showControllerBar = data.OnOffState;
    });

    $scope.$on('categories-bar', function (event, data) {
        $scope.showGoodsCategoriesBar = data.OnOffState;
    });

    //nav-Bottom 初始化
    $scope.$on('side-bar', function (event, data) {
        $scope.showSideBar = data.OnOffState;
    });

    //低栏
    $scope.$on('updateShop', function (event, data) {
        $scope.updateShop();
    });

    //低栏
    $scope.$on('updateCart', function (event, data) {
        $scope.caculCart();
    });

    //低栏
    $scope.$on('updateUser', function (event, data) {
        $scope.updateUser();
    });

    $scope.toPage = function (page) {
        $scope.currentPage = page;
    }

    $scope.updateShop = function () {
        $scope.shop = JSON.parse(getCookie('currentShopInfo'));
    }

    $scope.caculCart = function () {
        $scope.cartSize = 0;
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartInfo = JSON.parse(cartInfo);
            cartSize = JSON.parse(cartSize);
        }
        if (cartInfo.length > 0)$scope.getPrdInfo(cartInfo, cartSize);
    };

    //商品搜索
    $scope.searchPrd = function () {
        $state.go('pages/product/list', {keyword: $scope.key.prdKeyword});
    }

    $scope.myKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.searchPrd();
        }
    };

    $scope.getPrdInfo = function (cartInfo, cartSize) {
        var size = 0;
        var params = {};
        params['SHOP_PRODUCT_SKU.SKU_IDS'] = cartInfo.toString();
        if (getCookie('currentShopInfo')
            != ''
            && getCookie('currentShopInfo')
            != undefined
            && getCookie('currentShopInfo')
            != null) {
            if (JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'] != undefined) {
                params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
                productFactory.getProductSkuBySkuIds(params, function (response) {
                    response.data.forEach(function (ele) {
                        size += cartSize[ele['SHOP_PRODUCT_SKU.SKU_ID']];
                    });
                    $scope.cartSize = size;
                })
            }
        }
    }

    $scope.caculCart();

    $scope.updateShop();

    $scope.toPrdTagList = function (id) {
        $state.go('pages/product/list', {tagId: id});
    }

    $scope.toPrdClassList = function (id) {
        $state.go('pages/product/list', {classId: id});
    }

    $scope.getUser = function (uid) {
        var form = {};
        form['MEMBER.USER_ID'] = uid;
        personalFactory.getPhone(form, function (response) {
            $scope.USER = response.data[0];
        }, function (response) {

        });
    }

    $scope.updateUser = function () {
        userFactory.isLogin({'USER_TYPE':'CUSTOMER'}, function (response) {
            $scope.uid = getCookie('ANDSELLID');
            if ($scope.uid != undefined && $scope.uid != '') {
                $scope.getUser($scope.uid);
            } else {
                $scope.USER = undefined;
            }
        }, function (response) {
            $scope.USER = undefined;
        });

    }

    $scope.logOut = function () {
        modalFactory.showAlert("确定退出登录？", function () {
            userFactory.loginOut({}, function (response) {
                modalFactory.updateUser();
                $state.go('pages/login/accountLogin');
            });
        })
    }

    $scope.updateUser();

});
