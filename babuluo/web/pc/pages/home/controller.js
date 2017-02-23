angular.module('AndSell.PC.Main').controller('pages_home_Controller', function (productFactory, $interval, $scope, $state, modalFactory, seckillFactory,shopFactory) {

    modalFactory.setTitle("主页");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);
    //
    // modalFactory.setLeftMenu(true);

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;
    $scope.homeList = new Array();
    $scope.limitList = new Array();
    $scope.groupList = new Array();
    $scope.activityList = new Array();
    $scope.recommendList = new Array();
    $scope.recommThreeList = new Array();
    $scope.recommNineList = new Array();
    $scope.BannerList = new Array();
    $(function(){
        $(window).scroll(function () {
            var ling =$(document).scrollTop();
            //document.title=ling;
            if(ling>300){
                $(".leftMenu").removeClass('hidden');
            }
            if(ling>300 && ling <1100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(0).siblings('div').css('border','1px solid #ebebeb');
            }else if(ling>1600 && ling <2100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(1).siblings('div').css('border','1px solid #ebebeb');
            }else if(ling>=2600 && ling <3100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(2).siblings('div').css('border','1px solid #ebebeb');
            }else if(ling>=3600 && ling <4100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(3).siblings('div').css('border','1px solid #ebebeb');
            }else if(ling>=4600 && ling <5100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(4).siblings('div').css('border','1px solid #ebebeb');
            }else if(ling>=5600 && ling <6100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(5).siblings('div').css('border','1px solid #ebebeb');
            }
            else if(ling>=6600 && ling <7100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(6).siblings('div').css('border','1px solid #ebebeb');
            }
            else if(ling>=7400 && ling <8100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(7).siblings('div').css('border','1px solid #ebebeb');
            }
            else if(ling>=8400 && ling <9100){
                $('.leftMenu div').siblings('div').css('border','1px solid #f36f1a')
                $('.leftMenu div').eq(8).siblings('div').css('border','1px solid #ebebeb');
            }
            if(ling<300){
                // @ 这一句和下一句效果一样。
                $('.leftMenu').addClass('hidden');
            }
        })
    })
    $scope.myKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.searchPrd();
        }
    };

    //商品搜索
    $scope.searchPrd = function () {
        $state.go('pages/product/list', {keyword: $scope.prdKeyword});
    }

    $scope.initData = function () {
        $scope.STORE_ID = 0;

        modalFactory.setCurrentPage('sy');

        if (getCookie('currentShop') != undefined) {
            $scope.shopInfo = ToJson(getCookie('currentShopInfo'));
            $scope.STORE_ID = $scope.shopInfo['SHOP.REPOS_ID'];
        } else {
            $scope.toShop();
        }

        var params = {}
        params['SHOP_PRODUCT.TAG_ID'] = '1036,1037,3000,3001,3002,3003,3004,3005,3006';
        params['SHOP_PRODUCT.STORE_ID'] = $scope.STORE_ID;
        productFactory.getProductByTag(params, function (response) {
            if (response.code == 0) {
                $scope.tagProductList = {};
                response.data.forEach(function (ele) {
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('1036') >= 0) {
                        if ($scope.tagProductList['1036'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['1036'] = ne;
                        } else {
                            var ne = $scope.tagProductList['1036'];
                            ne.push(ele);
                            $scope.tagProductList['1036'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('1037') >= 0) {
                        if ($scope.tagProductList['1037'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['1037'] = ne;
                        } else {
                            var ne = $scope.tagProductList['1037'];
                            ne.push(ele);
                            $scope.tagProductList['1037'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3000') >= 0) {
                        if ($scope.tagProductList['3000'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3000'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3000'];
                            ne.push(ele);
                            $scope.tagProductList['3000'] = ne;
                        }
                    }

                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3001') >= 0) {
                        if ($scope.tagProductList['3001'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3001'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3001'];
                            ne.push(ele);
                            $scope.tagProductList['3001'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3002') >= 0) {
                        if ($scope.tagProductList['3002'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3002'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3002'];
                            ne.push(ele);
                            $scope.tagProductList['3002'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3003') >= 0) {
                        if ($scope.tagProductList['3003'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3003'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3003'];
                            ne.push(ele);
                            $scope.tagProductList['3003'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3004') >= 0) {
                        if ($scope.tagProductList['3004'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3004'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3004'];
                            ne.push(ele);
                            $scope.tagProductList['3004'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3005') >= 0) {
                        if ($scope.tagProductList['3005'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3005'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3005'];
                            ne.push(ele);
                            $scope.tagProductList['3005'] = ne;
                        }
                    }
                    if (ele['SHOP_PRODUCT.TAG_ID'].indexOf('3006') >= 0) {
                        if ($scope.tagProductList['3006'] == undefined) {
                            var ne = new Array;
                            ne.push(ele);
                            $scope.tagProductList['3006'] = ne;
                        } else {
                            var ne = $scope.tagProductList['3006'];
                            ne.push(ele);
                            $scope.tagProductList['3006'] = ne;
                        }
                    }
                });
            }
        });//


        // 设置轮播图图片间隔
        $scope.myInterval = 4000;


        shopFactory.getBannerList({}, function (response) {    //横幅列表

            var dataList = response.data;

            dataList.forEach(function (ele) {
                if (ele['BANNER.POSITION_ID'] == "3015") {   //首页
                    $scope.homeList.push(ele);
                }
                else if (ele['BANNER.POSITION_ID'] == "1013") {        //限时抢购
                    $scope.limitList.push(ele);
                    //获取到限时抢购的开始时间和结束时间
                    var startTime = new Date(ele['BANNER.BEGIN_DATETIME'].split('.')[0]).getTime();    //开始时间
                    var endTime = new Date(ele['BANNER.END_DATETIME'].split('.')[0]).getTime();      //结束时间
                    var currentTime = new Date().getTime();      //当前时间 毫秒

                    $scope.timer = $interval(function () {
                        if (currentTime > startTime && currentTime < endTime) {   //如果当前时间在活动时间内
                            currentTime += 1000;
                            fomtime(endTime - currentTime, ele);
                        } else {
                            $interval.cancel($scope.timer);
                        }
                    }, 1000);   //间隔1秒定时执行

                }
                else if (ele['BANNER.POSITION_ID'] == "1014") {    //  团购
                    $scope.groupList.push(ele);
                }
                else if (ele['BANNER.POSITION_ID'] == "1015") {      //活动专区
                    $scope.activityList.push(ele);
                }
                else if (ele['BANNER.POSITION_ID'] == "1016") {     //今日推荐
                    $scope.recommendList.push(ele);
                }
                /* if (ele['BANNER.POSITION_ID'] == 1017) {     //今日推荐三连排
                 $scope.recommThreeList.push(ele);
                 }*/
                else if (ele['BANNER.POSITION_ID'] == "1018") {     //今日推荐九宫格
                    $scope.recommNineList.push(ele);
                }
                else if (["3006", "3007", "3008", "3009", "3010", "3011", "3012", "3013", "3014"].contains(ele['BANNER.POSITION_ID'])) {
                    // console.log(ele['BANNER.POSITION_ID']);
                    var flag = false;
                    for (i = 0; i < $scope.BannerList.length; i++) {
                        if ($scope.BannerList[i].id == ele['BANNER.POSITION_ID']) {
                            console.log(1);
                            flag = true;
                            var arrayList = $scope.BannerList[i].content;
                            arrayList.push(ele);
                        }
                    }
                    if (flag == false) {
                        var array = new Array();
                        array.push(ele);

                        listItem = new Object();
                        listItem.id = ele['BANNER.POSITION_ID'];
                        listItem.name = ele['BANNER.NAME'];
                        listItem.content = array;

                        $scope.BannerList.push(listItem);
                    }
                }

                if (ele['BANNER.END_DATETIME'] == null && ele['BANNER.BEGIN_DATETIME'] == null) {
                    ele['is_show'] = true;
                } else if (ele['BANNER.BEGIN_DATETIME'] != null) {
                    var startTime = new Date(ele['BANNER.BEGIN_DATETIME'].split('.')[0]).getTime();    //开始时间
                    var currentTime = new Date().getTime();      //当前时间 毫秒
                    if (currentTime > startTime) {
                        if (ele['BANNER.BEGIN_DATETIME'] == null) {
                            ele['is_show'] = true;
                        }
                        else {
                            var endTime = new Date(ele['BANNER.END_DATETIME'].split('.')[0]).getTime();      //结束时间
                            if (currentTime < endTime) {
                                ele['is_show'] = true;
                            }
                        }
                    }
                }

            });
        });
        console.log($scope.BannerList);
    }

    //以毫秒为单位
    var fomtime = function (date, item) {

        // item.day=parseInt(date/(24*60*60*1000));
        // console.log(item.day);
        item.hour = parseInt(date / (60 * 60 * 1000));
        item.minute = parseInt((date - item.hour * 60 * 60 * 1000) / (60 * 1000));
        item.second = parseInt((date - item.hour * 60 * 60 * 1000 - item.minute * 60 * 1000)
            / 1000);

    }

    $scope.toShop = function () {
        $state.go('pages/shop');
    }

    $scope.$on('$destroy', function () {
        $interval.cancel($scope.timer);
    })

    var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        spaceBetween: 300,
        centeredSlides: true,
        autoplay: 3500,
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true
    });

    $scope.toPrdList = function () {
        $state.go('pages/product/list');
    }

    $scope.toPrdTagList = function (id) {
        $state.go('pages/product/tagPrdList', {tagId: id});
    }

    $scope.toOrderList = function () {
        $state.go('pages/order/list');
    }

    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }


    /***************************************************秒杀部分*************************************************************/
        //请求到的所有秒杀
    $scope.seckillList=[];
    //秒杀的商品详情
    $scope.prdMap=[];


    /**
     * 请求所有启用的已经开始的促销
     */
    $scope.queryByStateAndTime=function(){
        seckillFactory.queryByStateAndTime({},function(response){
            var promoReturn =response['extraData']['promoReturn'];
            $scope.seckillList=promoReturn['data'];
            $scope.queryPrd();
            $scope.timeUnit();
        })
    }

    /**
     * 请求秒杀的商品
     */
    $scope.queryPrd=function(){
        var skuIds="";
        $scope.seckillList.forEach(function(ele){
            if (skuIds!=""){
                skuIds+=",";
            }
            skuIds+=ele['sku_id'];
        })
        productFactory.getProductSkuBySkuIds({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            response.data.forEach(function (ele) {
                $scope.prdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
            },function(response){
                alert("请求商品失败")
            });
        });
    }

    /**
     * 倒计时，每秒调用函数
     */
    $scope.timeUnit=function(){
        setInterval($scope.initTime(), 1000);
    }

    /**
     * 剩余时间
     */
    $scope.initTime=function(){
        $scope.seckillList.forEach(function(ele){
            if (ele['type']=='time'||ele['type']=='timeAndNum'){
                var end = new Date(ele['end_datetime']).getTime();
                var now = new Date().getTime();
                if (end<now){
                    ele['hour']='已'
                    ele['min']='过'
                    ele['sec']='期'
                }else {
                    var time = (end - now) / 1000;
                    ele['hour'] = parseInt(time / 3600);
                    ele['min'] = parseInt(time / 60 - ele['hour'] * 60);
                    ele['sec'] = parseInt(time - ele['hour'] * 3600 - ele['min'] * 60);
                }
            }
        })
    }

    /**
     * 抢购
     */
    $scope.goSeckill=function(seckill){
        var json = JSON.stringify(seckill);
        setCookie('seckill', json);
        $state.go('pages/order/confirmSeckill', {});
    }
});

