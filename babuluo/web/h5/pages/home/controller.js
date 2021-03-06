angular.module('AndSell.H5.Main').controller('pages_home_Controller', function (groupBuyPlanFactory, productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {

    modalFactory.setTitle('云厨1站商城 - 回家吃饭，优质食品购买平台');
    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;
    modalFactory.setBottom(true);
    $scope.homeList = new Array();
    $scope.limitList = new Array();
    $scope.groupList = new Array();
    $scope.activityList = new Array();
    $scope.recommendList = new Array();
    $scope.recommThreeList = new Array();
    $scope.recommNineList = new Array();
    $scope.BannerList = new Array();

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

        if (getCookie('currentShop') != undefined) {

            $scope.shopInfo_Cookie = ToJson(getCookie('currentShopInfo'));
            shopFactory.getShopById({'SHOP.SHOP_ID': $scope.shopInfo_Cookie['SHOP.SHOP_ID']}, function (response) {
                if (response.data.length > 0) {
                    $scope.shopInfo = response.data[0];
                    $scope.STORE_ID = $scope.shopInfo['SHOP.REPOS_ID'];
                } else {
                    modalFactory.setCurrentPage('sy');
                    $scope.toShop();
                    return;
                }
            });
        } else {
            modalFactory.setCurrentPage('sy');
            $scope.toShop();
            return;
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
            //$scope.queryAllGroupBuyPlanByState();
        });//

        // 设置轮播图图片间隔
        $scope.myInterval = 4000;

        shopFactory.getBannerList({}, function (response) {    //横幅列表

            var dataList = response.data;
            var currCity = getCookie('currentCity');
            if(getCookie('currentCity') == undefined){
            	currCity = 1;
            }

            dataList.forEach(function (ele) {
                if (ele['BANNER.POSITION_ID'] == "1012" && ele['BANNER.CITY'] == currCity) {   //首页
                    $scope.homeList.push(ele);
                } else if (ele['BANNER.POSITION_ID'] == "1013") {        //限时抢购
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

                } else if (ele['BANNER.POSITION_ID'] == "1014" && ele['BANNER.CITY'] == currCity) {    //  团购
                    $scope.groupList.push(ele);
                } else if (ele['BANNER.POSITION_ID'] == "1015" && ele['BANNER.CITY'] == currCity) {      //活动专区
                    $scope.activityList.push(ele);
                } else if (ele['BANNER.POSITION_ID'] == "1016") {     //今日推荐
                    $scope.recommendList.push(ele);
                }
                /* if (ele['BANNER.POSITION_ID'] == 1017) {     //今日推荐三连排
                 $scope.recommThreeList.push(ele);
                 }*/ else if (ele['BANNER.POSITION_ID'] == "1018") {     //今日推荐九宫格
                    $scope.recommNineList.push(ele);
                } else if (["1019", "1020", "1017", "3000", "3001", "3002", "3003", "3004", "3005"].contains(ele['BANNER.POSITION_ID'])) {
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
                    var startTime = new Date(ele['BANNER.BEGIN_DATETIME'].split('.')[0].replace(/\-/g, "/")).getTime();    //开始时间
                    var currentTime = new Date().getTime();      //当前时间 毫秒
                    if (currentTime > startTime) {
                        if (ele['BANNER.BEGIN_DATETIME'] == null) {
                            ele['is_show'] = true;
                        } else {
                            var endTime = new Date(ele['BANNER.END_DATETIME'].split('.')[0].replace(/\-/g, "/")).getTime();      //结束时间
                            if (currentTime < endTime) {
                                ele['is_show'] = true;
                            }
                        }
                    }
                }

            });
        });

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
    $scope.seckillList = [];
    //秒杀的商品详情
    $scope.prdMap = [];


    /**
     * 请求所有启用的已经开始的秒杀
     */
    $scope.queryByStateAndTime = function () {
        seckillFactory.queryByStateAndTime({}, function (response) {
            //var promoReturn = response['extraData']['promoReturn'];
            $scope.seckillList = response;
            console.log( $scope.seckillList)
            $scope.queryPrd();
            startWorker();
          
        })
    }
    
    /**
     * 请求秒杀的商品
     */
    $scope.queryPrd = function () {
        var skuIds = "";
        $scope.seckillList.forEach(function (ele) {
            if (skuIds != "") {
                skuIds += ",";
            }
            skuIds += ele['skuId'];
        })
        productFactory.getProductSkuBySkuIds({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            response.data.forEach(function (ele) {
                $scope.prdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
              
            }, function (response) {
                alert("请求商品失败")
            });
        });
    }

    /**
     * 剩余时间
     */
    $scope.initTime = function () {
        $scope.seckillList.forEach(function (ele, index) {
        
            if (ele['type'] == 'time' || ele['type'] == 'timeAndNum') {
                var end =new Date(ele['endDatetime']);
                var start=new Date(ele['beginDatetime']);
                var now = new Date().getTime();
                if (end < now) {
                    ele['hour'] = '已';
                    ele['min'] = '过';
                    ele['sec'] = '期';
                	 $('#hour'+index).parent().parent().find('button').attr("disabled","true");
                } 
                else if(start>now) {
                	 /*ele['hour'] = '未';
                     ele['min'] = '开';
                     ele['sec'] = '始';*/
                    $('#hour'+index).parent().parent().find('button').attr("disabled","true");
                    $('#hour'+index).prev().html('距开始');
                    var time = (start - now) / 1000;
                    ele['hour'] = parseInt(time / 3600);
                    ele['min'] = parseInt(time / 60 - ele['hour'] * 60);
                    ele['sec'] = parseInt(time - ele['hour'] * 3600 - ele['min'] * 60);
                }
                else if(start==now){
                	  $('#hour'+index).parent().parent().find('button').removeAttr("disabled");
                		$('#hour'+index).prev().html('距结束');
                }
                else if(start<now && end>now) {
                	if(parseInt(ele['surplusNum']) == 0){
                		$('#hour'+index).parent().parent().find('button').attr("disabled","true");
                		ele['hour'] = '已';
                        ele['min'] = '抢';
                        ele['sec'] = '光';
                	}else{
                		$('#hour'+index).parent().parent().find('button').removeAttr("disabled");
                		$('#hour'+index).prev().html('距结束');
                        var time = (end - now) / 1000;
                        ele['hour'] = parseInt(time / 3600);
                        ele['min'] = parseInt(time / 60 - ele['hour'] * 60);
                        ele['sec'] = parseInt(time - ele['hour'] * 3600 - ele['min'] * 60);
                	}
                	
                }
               
                $("#hour" + index).html(ele['hour']);
                $("#min" + index).html(ele['min']);
                $("#sec" + index).html(ele['sec']);
            }
        })
    }

    /**
     * 抢购
     */
    $scope.goSeckill = function (seckill) {
        var json = JSON.stringify(seckill);
        setCookie('seckill', json);
        w.terminate();
        var formt = {};
        formt['SECKILL_ID']=seckill['seckillId'];
        seckillFactory.getSeckillSurNum(formt, function (response) {
           var surNum = response;
           console.log("surNum===="+surNum);
           if(surNum > 0){
        	   $state.go('pages/order/addSeckill');
           }else{
        	   alert("商品已被抢光");
           }
        })
        
    }

    /**
     * 开启线程
     * 监听回馈
     */
    var w;

    function startWorker() {
        if (typeof(Worker) !== "undefined") {
            if (typeof(w) == "undefined") {
                w = new Worker("/AndSell/h5/pages/home/home_worker.js");
            }
            w.onmessage = function (event) {
                $scope.initTime();
            };
        }
    }

    $scope.$on('$destroy', function () {
        if (undefined != w)
            w.terminate() //终止一个worker线程v
    })
    /***************************************************团购部分*************************************************************/
   /* //请求到的所有团购
    $scope.showGbp = false;
    $scope.groupBuyPlanList = [];
    //团购的商品详情
    $scope.groupPrdMap = [];
    $scope.queryAllGroupBuyPlanByState = function () {
        groupBuyPlanFactory.queryAllByState({}, function (response) {
            $scope.groupBuyPlanList = response.data;
            if ($scope.groupBuyPlanList.length > 0) {
                $scope.queryPrdByGroupBuyPlan();
                startWorkerByGbp()
            }
        }, function (response) {
            alert("请求团购商品失败。")
        })
    }
    *//**
     * 请求团购的商品
     *//*
    $scope.queryPrdByGroupBuyPlan = function () {
        var skuIds = "";
        $scope.groupBuyPlanList.forEach(function (ele) {
            if (skuIds != "") {
                skuIds += ",";
            }
            skuIds += ele['GROUP_BUY_PLAN.SKU_ID'];
        })
        productFactory.getProductSkuBySkuIds({"SHOP_PRODUCT_SKU.SKU_IDS": skuIds}, function (response) {
            $scope.showGbp = true;
            response.data.forEach(function (ele) {
                $scope.groupPrdMap[ele['SHOP_PRODUCT_SKU.SKU_ID']] = ele;
            }, function (response) {
                alert("请求商品失败")
            });
        });
    }
    *//**
     * 开启线程
     * 监听回馈
     *//*
    var gw;

    function startWorkerByGbp() {
        if (typeof(Worker) !== "undefined") {
            if (typeof(gw) == "undefined") {
                gw = new Worker("/AndSell/h5/pages/home/home_worker.js");
            }
            gw.onmessage = function (event) {
                $scope.initDataByGroupBuyPlan();
            };
        }
    }

    $scope.$on('$destroy', function () {
        if (undefined != gw)
            gw.terminate() //终止一个worker线程v
    })
    $scope.initDataByGroupBuyPlan = function () {
        $scope.groupBuyPlanList.forEach(function (ele, index) {
            if (ele['GROUP_BUY_PLAN.STATE'] == 'IN_SALE') {
                var tempDate = ele['GROUP_BUY_PLAN.END_DATETIME'];
                var yMd = tempDate.split(" ")[0].split("-");
                var Hms = tempDate.split(" ")[1].split(":");
                var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + ":00").getTime();
                var now = new Date().getTime();
                if (end < now) {
                    ele['hour'] = '已'
                    ele['min'] = '过'
                    ele['sec'] = '期'
                } else {
                    var time = (end - now) / 1000;
                    ele['hour'] = parseInt(time / 3600);
                    ele['min'] = parseInt(time / 60 - ele['hour'] * 60);
                    ele['sec'] = parseInt(time - ele['hour'] * 3600 - ele['min'] * 60);
                }
                document.getElementById("gbpHour" + index).innerHTML = ele['hour'];
                document.getElementById("gbpMin" + index).innerHTML = ele['min'];
                document.getElementById("gbpSec" + index).innerHTML = ele['sec'];
            }
        })
    }
    $scope.goGbp = function (gbp) {
        var param = {};
        param['GBP_ID'] = gbp['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'];
        param['PRD_ID'] = $scope.groupPrdMap[gbp['GROUP_BUY_PLAN.SKU_ID']]['SHOP_PRODUCT_SKU.SKU_ID'];
        gw.terminate();
        if (gbp['GROUP_BUY_PLAN.TYPE'] == 'MANAGE') {
            $state.go('pages/groupBuy/moreGroup',param);
        } else if (gbp['GROUP_BUY_PLAN.TYPE'] == 'MEMBER') {
            removeCookie("SUM_COUNT");
            $state.go('pages/groupBuy/myGroup',param);
        }
    }*/
});

