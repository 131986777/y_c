angular.module('AndSell.PC.Main').filter('formatDate', function () {
    return function (value) {
        if ('' == value)return '';
        else {
            return value.substr(0, 19);
        }
    }
});

angular.module('AndSell.PC.Main').controller('pages_product_detail_Controller', function (productFactory, $interval, $scope, $state, $stateParams, modalFactory, orderFactory) {

    modalFactory.setTitle("商品详细");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);

    modalFactory.setLeftMenu(false);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.prdSkuMap = new Map();

    $scope.initData = function () {

        // 设置轮播图图片间隔
        $scope.myInterval = 4000;
        // 轮播图数据初始化
        $scope.slides = new Array;

        // current sku select map
        $scope.currSkuContentSelectMap = {
            name1: '', name2: '', name3: ''
        }


        var params = {};
        params['SHOP_PRODUCT.PRD_ID'] = $stateParams.PRD_ID;
        $scope.STORE_ID = 0;
        if (getCookie('currentShopInfo') != undefined) {
            params['STOCK_REALTIME.STORE_ID'] = JSON.parse(getCookie('currentShopInfo'))['SHOP.REPOS_ID'];
            $scope.STORE_ID = params['STOCK_REALTIME.STORE_ID'];
        }
        productFactory.getProductAllInfoById(params, function (response) {
            $scope.product = response.data[0];
            if ($scope.product != undefined) {
                modalFactory.setTitle($scope.product['SHOP_PRODUCT.PRD_NAME'] + ' - 云厨1站商城 - 十分钟吃饭，优质食品购买平台');
                $scope.setPrdPicBanner($scope.product);
                if ($scope.product['SHOP_PRODUCT.SKU_LIST'].length > 0) {
                    $scope.skuList = $scope.product['SHOP_PRODUCT.SKU_LIST'];
                    var skulistsForOrder = new Array;
                    $scope.skuList.forEach(function (ele) {
                        ele['SHOP_PRODUCT_SKU.REAL_PRICES_OLD'] = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
                        ele.isSale = false;
                        ele.isSelect = false;
                        skulistsForOrder.push({
                            'prdId': ele['SHOP_PRODUCT_SKU.PRD_ID'],
                            'num': 1,
                            'price': ele['SHOP_PRODUCT_SKU.REAL_PRICES']
                        });
                    });
                    $scope.calculateSaleInfo(skulistsForOrder);
                    $scope.skuData = $scope.getPrdSkuData($scope.skuList);
                    if ($scope.skuData['SHOP_PRODUCT_SKU.SKU_CONTENT1'].length > 0) {
                        $scope.checkContent(1, $scope.skuData['SHOP_PRODUCT_SKU.SKU_CONTENT1'][0]);
                    }
                    $scope.getPriceArea();
                    $scope.filterSkuList();
                    $scope.skuSelectable();
                }

                $scope.noStore = false;
                if ($scope.product['SHOP_PRODUCT.HAS_STOCK'] == undefined) {
                    $scope.noStore = true;
                }
            }
        });

        //商品评论
        productFactory.getCommemtByProIdProSku({'SHOP_COMMENT.PRO_ID': $stateParams['PRD_ID']}, function (resp) {
            $scope.proComments = resp.data;
            $scope.allComments = $scope.proComments;
            $scope.goodComments = resp.extraData.goodList;
            $scope.midComments = resp.extraData.midList;
            $scope.badComments = resp.extraData.badList;
        });

        $scope.skuSize = 1;
        $scope.caculCart();
    }

    $scope.setPrdPicBanner = function (prd) {
        // 添加轮播图源
        if (prd['SHOP_PRODUCT.CMP'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prd['SHOP_PRODUCT.CMP']});
        }
        if (prd['SHOP_PRODUCT.P1'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prd['SHOP_PRODUCT.P1']});
        }
        if (prd['SHOP_PRODUCT.P2'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prd['SHOP_PRODUCT.P2']});
        }
        if (prd['SHOP_PRODUCT.P3'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prd['SHOP_PRODUCT.P3']});
        }
        if (prd['SHOP_PRODUCT.P4'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prd['SHOP_PRODUCT.P4']});
        }
        if (prd['SHOP_PRODUCT.P5'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prd['SHOP_PRODUCT.P5']});
        }
    }

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 300,
        centeredSlides: true,
        autoplay: 4500,
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false
    });

    //计算销售信息
    $scope.calculateSaleInfo = function (list) {
        orderFactory.calculateSale({'ORDER_PRD_LIST': JSON.stringify(list)}, function (response) {
            var newPrdListInOrder = objectToArray(response.extraData.newOrder);
            var newPriceMap = {};
            newPrdListInOrder.forEach(function (ele) {
                newPriceMap[ele['prdId']] = ele['price'];
            });

            $scope.skuList.forEach(function (ele) {
                if (newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']] != undefined) {
                    if (ele['SHOP_PRODUCT_SKU.REAL_PRICES']
                        != newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']]) {
                        //价格不一致 参与了促销
                        ele.isSale = true;
                    }
                    ele['SHOP_PRODUCT_SKU.REAL_PRICES'] = newPriceMap[ele['SHOP_PRODUCT_SKU.PRD_ID']];
                }
            });
        }, function (response) {
        });
    }

    //获取价格区间
    $scope.getPriceArea = function () {
        var minPrice = 0;
        var maxPrice = 0;
        $scope.skuList.forEach(function (ele) {
            if (minPrice == 0 || minPrice > ele['SHOP_PRODUCT_SKU.REAL_PRICES']) {
                minPrice = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
            }
            if (maxPrice == 0 || maxPrice < ele['SHOP_PRODUCT_SKU.REAL_PRICES']) {
                maxPrice = ele['SHOP_PRODUCT_SKU.REAL_PRICES'];
            }
        });
        $scope.skuData.minPrice = minPrice;
        $scope.skuData.maxPrice = maxPrice;
    }

    //get product sku data by sku list
    $scope.getPrdSkuData = function (list) {
        var skuLists = list;
        var skuData = {};
        if (skuLists.length > 0) {
            var infoSku = skuLists[0];
            skuData['SHOP_PRODUCT_SKU.LENGTH'] = 0;
            if (infoSku['SHOP_PRODUCT_SKU.SKU_NAME1'] != undefined) {
                skuData['SHOP_PRODUCT_SKU.SKU_NAME1'] = infoSku['SHOP_PRODUCT_SKU.SKU_NAME1'];
                skuData['SHOP_PRODUCT_SKU.SKU_CONTENT1'] = new Array;
                skuData['SHOP_PRODUCT_SKU.LENGTH'] = 1;
            }
            if (infoSku['SHOP_PRODUCT_SKU.SKU_NAME2'] != undefined) {
                skuData['SHOP_PRODUCT_SKU.SKU_NAME2'] = infoSku['SHOP_PRODUCT_SKU.SKU_NAME2'];
                skuData['SHOP_PRODUCT_SKU.SKU_CONTENT2'] = new Array;
                skuData['SHOP_PRODUCT_SKU.LENGTH'] = 2;
            }
            if (infoSku['SHOP_PRODUCT_SKU.SKU_NAME3'] != undefined) {
                skuData['SHOP_PRODUCT_SKU.SKU_NAME3'] = infoSku['SHOP_PRODUCT_SKU.SKU_NAME3'];
                skuData['SHOP_PRODUCT_SKU.SKU_CONTENT3'] = new Array;
                skuData['SHOP_PRODUCT_SKU.LENGTH'] = 3;
            }

            // get basic sku data  list
            skuLists.forEach(function (ele) {
                if (skuData['SHOP_PRODUCT_SKU.LENGTH']
                    > 0
                    && skuData['SHOP_PRODUCT_SKU.SKU_CONTENT1'].indexOf(ele['SHOP_PRODUCT_SKU.SKU_CONTENT1'])
                    < 0) {
                    skuData['SHOP_PRODUCT_SKU.SKU_CONTENT1'].push(ele['SHOP_PRODUCT_SKU.SKU_CONTENT1']);
                }
                if (skuData['SHOP_PRODUCT_SKU.LENGTH']
                    > 1
                    && skuData['SHOP_PRODUCT_SKU.SKU_CONTENT2'].indexOf(ele['SHOP_PRODUCT_SKU.SKU_CONTENT2'])
                    < 0) {
                    skuData['SHOP_PRODUCT_SKU.SKU_CONTENT2'].push(ele['SHOP_PRODUCT_SKU.SKU_CONTENT2']);
                }
                if (skuData['SHOP_PRODUCT_SKU.LENGTH']
                    > 2
                    && skuData['SHOP_PRODUCT_SKU.SKU_CONTENT3'].indexOf(ele['SHOP_PRODUCT_SKU.SKU_CONTENT3'])
                    < 0) {
                    skuData['SHOP_PRODUCT_SKU.SKU_CONTENT3'].push(ele['SHOP_PRODUCT_SKU.SKU_CONTENT3']);
                }
            });
        }
        return skuData;
    }

    //规格单选
    $scope.checkContent = function (num, content) {
        if ($scope.currSkuSelectClassMap[num][content] != cannotSelectCLass) {
            $scope.lastCheck = {
                num: num, content: clone($scope.currSkuContentSelectMap['name' + num])
            };
            if ($scope.currSkuContentSelectMap['name' + num] != content) {
                $scope.currSkuContentSelectMap['name' + num] = content;
            } else {
                $scope.currSkuContentSelectMap['name' + num] = '';
            }

            $scope.filterSkuList();
            $scope.skuSelectable();
        } else {
            modalFactory.showShortAlert('该规格不存在！或者已下架');
        }
    }

    // 根据已选的规格 过滤剩余的sku列表
    $scope.filterSkuList = function () {
        var list = new Array;
        $scope.skuList.forEach(function (ele) {
            var ifOK = true;
            if ($scope.skuData['SHOP_PRODUCT_SKU.LENGTH'] > 0) {
                if ($scope.currSkuContentSelectMap['name1']
                    != ''
                    && $scope.currSkuContentSelectMap['name1']
                    != ele['SHOP_PRODUCT_SKU.SKU_CONTENT1']) {
                    ifOK = false;
                }
            }
            if ($scope.skuData['SHOP_PRODUCT_SKU.LENGTH'] > 1) {
                if ($scope.currSkuContentSelectMap['name2']
                    != ''
                    && $scope.currSkuContentSelectMap['name2']
                    != ele['SHOP_PRODUCT_SKU.SKU_CONTENT2']) {
                    ifOK = false;
                }
            }
            if ($scope.skuData['SHOP_PRODUCT_SKU.LENGTH'] > 2) {
                if ($scope.currSkuContentSelectMap['name3']
                    != ''
                    && $scope.currSkuContentSelectMap['name3']
                    != ele['SHOP_PRODUCT_SKU.SKU_CONTENT3']) {
                    ifOK = false;
                }
            }
            if (ifOK) {
                list.push(ele);
            }
        });
        $scope.currSkuList = list;
        if ($scope.currSkuList.length == 1 && $scope.SkuContentCheckComplete()) {
            $scope.sku = $scope.currSkuList[0];
            $scope.skuSize = 1;
        } else if ($scope.currSkuList.length == 0 && $scope.SkuContentCheckComplete()) {
            modalFactory.showShortAlert('该规格不存在！或者已下架');
            $scope.checkContent($scope.lastCheck.num, $scope.lastCheck.content);
        } else {
            $scope.sku = undefined;
        }
    }

    //是否选了所有的规格项
    $scope.SkuContentCheckComplete = function () {
        var ifOK = true;
        if ($scope.skuData['SHOP_PRODUCT_SKU.LENGTH'] > 0) {
            if ($scope.currSkuContentSelectMap['name1'] == '') {
                ifOK = false;
            }
        }
        if ($scope.skuData['SHOP_PRODUCT_SKU.LENGTH'] > 1) {
            if ($scope.currSkuContentSelectMap['name2'] == '') {
                ifOK = false;
            }
        }
        if ($scope.skuData['SHOP_PRODUCT_SKU.LENGTH'] > 2) {
            if ($scope.currSkuContentSelectMap['name3'] == '') {
                ifOK = false;
            }
        }
        return ifOK;
    }

    $scope.currSkuSelectClassMap = {1: [], 2: [], 3: []};

    //不可选的样式
    var cannotSelectCLass = 'btn-disabled-sku';

    //控制sku可选 和不可选的calss
    $scope.skuSelectable = function () {
        var currSkuData = $scope.getPrdSkuData($scope.currSkuList);
        [1, 2, 3].forEach(function (index) {
            if ($scope.skuData['SHOP_PRODUCT_SKU.SKU_CONTENT' + index] != undefined) {
                $scope.skuData['SHOP_PRODUCT_SKU.SKU_CONTENT' + index].forEach(function (e) {
                    if ($scope.currSkuContentSelectMap['name' + index]
                        == ''
                        && currSkuData['SHOP_PRODUCT_SKU.SKU_CONTENT' + index].indexOf(e)
                        < 0) {
                        $scope.currSkuSelectClassMap[index][e] = cannotSelectCLass; //danger
                    } else {
                        $scope.currSkuSelectClassMap[index][e] = ''; //danger
                    }
                })
            }
        });
    }

    $scope.caculCart = function () {
        var cartInfo = getCookie('cartInfo');
        var cartSize = getCookie('cartSize');
        if (cartInfo == '' || cartInfo == undefined) {
            cartInfo = new Array;
            cartSize = {};
        } else {
            cartSize = JSON.parse(cartSize);
        }
        var size = 0;
        for (var prop in cartSize) {
            if (cartSize.hasOwnProperty(prop)) {
                size = size + Number(cartSize[prop]);
            }
        }
        $scope.totalSize = size;
    }

    //加入购物车
    $scope.addToCart = function () {
        if ($scope.sku != undefined) {
            if ($scope.sku['SHOP_PRODUCT_SKU.STOCK'] > 0) {
                var cartInfo = getCookie('cartInfo');
                var cartSize = getCookie('cartSize');
                if (cartInfo == '' || cartInfo == undefined) {
                    cartInfo = new Array;
                    cartSize = {};
                } else {
                    cartInfo = JSON.parse(cartInfo);
                    cartSize = JSON.parse(cartSize);
                }

                if (cartInfo.indexOf($scope.sku['SHOP_PRODUCT_SKU.SKU_ID']) < 0) {
                    cartInfo.push($scope.sku['SHOP_PRODUCT_SKU.SKU_ID']);
                }

                //size in cookie
                var size = cartSize[$scope.sku['SHOP_PRODUCT_SKU.SKU_ID']];
                if (size != undefined) {
                    size += $scope.skuSize;
                } else {
                    size = $scope.skuSize;
                }
                cartSize[$scope.sku['SHOP_PRODUCT_SKU.SKU_ID']] = size;

                //加入购物车
                setCookie('cartSize', JSON.stringify(cartSize));
                setCookie('cartInfo', JSON.stringify(cartInfo));

                modalFactory.showShortAlert('已加入到购物车');

                // get prd size in cart
                $scope.cartSize = cartInfo.length;
                $scope.caculCart();
                modalFactory.updateCart();
            } else {
                modalFactory.showShortAlert('该规格已售罄');
            }
        } else {
            modalFactory.showShortAlert('请选择规格！');
        }
    }

    $scope.toShop = function () {
        $state.go('pages/shop', {'FROM': window.location.href});
    }

    $scope.toCart = function () {
        $state.go('pages/cart');
    }

    //数量减
    $scope.lessSize = function () {
        if ($scope.skuSize > 1) {
            $scope.skuSize = $scope.skuSize - 1;
        }
    }

    $scope.moreSize = function () {
        if ($scope.skuSize < $scope.sku['SHOP_PRODUCT_SKU.STOCK']) {
            $scope.skuSize = clone($scope.skuSize) + 1
        } else {
            modalFactory.showShortAlert('已达到该商品最大库存数');
        }

    }

    //切换数据源
    $scope.reset = function (val) {
        if (val == 'all') {
            $scope.allComments = $scope.proComments;
        }
        if (val == 'good') {
            $scope.allComments = $scope.goodComments;
        }
        if (val == 'mid') {
            $scope.allComments = $scope.midComments;
        }
        if (val == 'bad') {
            $scope.allComments = $scope.badComments;
        }
    };

    //判断数据长度
    $scope.listLength = function (val) {
        if ($.isEmptyObject(val)) {
            return 0;
        } else {
            return [val].length;
        }
    };

    var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        spaceBetween: 300,
        centeredSlides: true,
        autoplay: 3500,
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true
    });

});
