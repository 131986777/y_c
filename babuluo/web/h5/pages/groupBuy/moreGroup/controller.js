angular.module('AndSell.H5.Main').controller('pages_groupBuy_moreGroup_Controller', function (memberFactory, groupBuyMemberFactory, groupBuyGroupFactory, productFactory, $interval, $scope, $state, weUI, modalFactory, shopFactory, weUI, seckillFactory) {
    modalFactory.setTitle("团购详情");
    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var gbp = getCookie("GBP");
        var gbpPrd = getCookie("GBP_PRD");
        $scope.GBP = JSON.parse(gbp);
        $scope.GBP_PRD = JSON.parse(gbpPrd);
        $scope.surplusSize = $scope.GBP['GROUP_BUY_PLAN.SUM_COUNT'];
        $scope.sumPrice = $scope.GBP['GROUP_BUY_PLAN.GROUP_PRICE'];
        getGbgList($scope.GBP['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'])
        getImgURIS($scope.GBP_PRD)
        $scope.endDate = $scope.GBP['GROUP_BUY_PLAN.END_DATETIME'];
        startWorkerByGbp();
    }

    $scope.slides = new Array();
    function getImgURIS(prdDetail) {
        // 添加轮播图源
        if (prdDetail['SHOP_PRODUCT.CMP'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prdDetail['SHOP_PRODUCT.CMP']});
        }
        if (prdDetail['SHOP_PRODUCT.P1'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prdDetail['SHOP_PRODUCT.P1']});
        }
        if (prdDetail['SHOP_PRODUCT.P2'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prdDetail['SHOP_PRODUCT.P2']});
        }
        if (prdDetail['SHOP_PRODUCT.P3'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prdDetail['SHOP_PRODUCT.P3']});
        }
        if (prdDetail['SHOP_PRODUCT.P4'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prdDetail['SHOP_PRODUCT.P4']});
        }
        if (prdDetail['SHOP_PRODUCT.P5'] != undefined) {
            $scope.slides.push({image: FILE_SERVER_DOMAIN + prdDetail['SHOP_PRODUCT.P5']});
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
    $scope.gbgList = [];
    function getGbgList(gbpId) {
        groupBuyGroupFactory.getAllGroupByGbpId({"GROUP_BUY_GROUP.GROUP_BUY_PLAN_ID": gbpId}, function (response) {
            $scope.gbgList = response.data;
            var ids = "";
            $scope.gbgList.forEach(function (ele) {
                if (ids != "") {
                    ids += ",";
                }
                ids += ele['GROUP_BUY_GROUP.GROUP_BUY_GROUP_ID'];
            })
            if (ids != "") {
                $scope.GBG_IDS = ids;
                getGbmList(ids);
            }
        });
    }

    $scope.gbmList = [];

    function getGbmList(gbpIds) {

        groupBuyMemberFactory.getAllMemberInGbgIds({"GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS": gbpIds}, function (response) {
            $scope.gbmList = response.data;
            $scope.surplusSize -= $scope.gbmList.length;
            $scope.gbmListSub = $scope.gbmList.slice(0, 5);
        })
    }

    $scope.showDetail = false;
    $scope.clickDetail = function () {
        if ($scope.showDetail) {
            $scope.showDetail = false;
        } else {
            $scope.showDetail = true;
        }
    }
    var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        spaceBetween: 300,
        centeredSlides: true,
        autoplay: 3500,
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true
    });

    function initDate() {
        var tempDate = $scope.endDate;
        var yMd = tempDate.split(" ")[0].split("-");
        var Hms = tempDate.split(" ")[1].split(":");
        var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + ':00').getTime();
        var now = new Date().getTime();
        if (end < now) {
            document.getElementById("gbpHour" + index).innerHTML = '已'
            document.getElementById("gbpMin" + index).innerHTML = '过'
            document.getElementById("gbpSec" + index).innerHTML = '期'
        } else {
            var time = (end - now) / 1000;
            document.getElementById("gbpHour").innerHTML = parseInt(time / 3600);
            document.getElementById("gbpMin").innerHTML = parseInt(time / 60 - parseInt(time / 3600) * 60);
            document.getElementById("gbpSec").innerHTML = parseInt(time - parseInt(time / 3600) * 3600 - parseInt(time / 60 - parseInt(time / 3600) * 60) * 60);
        }
    }

    /**
     * 开启线程
     * 监听回馈
     */
    var gw;

    function startWorkerByGbp() {
        if (typeof(Worker) !== "undefined") {
            if (typeof(gw) == "undefined") {
                gw = new Worker("/AndSell/h5/pages/home/home_worker.js");
            }
            gw.onmessage = function (event) {
                initDate();
            };
        }
    }

    $scope.$on('$destroy', function () {
        if (undefined != gw)
            gw.terminate() //终止一个worker线程v
    })

    //显示该团下的所有参团用户
    $scope.showAllGroupMember = function () {
        gw.terminate();
        // removeCookie("GBM");
        // setCookie("GBM", JSON.stringify($scope.gbmList));
        $state.go("pages/groupBuy/allGroupper", {GBG_IDS: $scope.GBG_IDS});
    }


    $scope.sumCount = 1;

    $scope.downCount = function () {
        $scope.sumCount -= 1;
        $scope.sumPrice = $scope.sumCount * $scope.GBP['GROUP_BUY_PLAN.GROUP_PRICE'];
        if ($scope.sumCount <= 0) {
            $scope.sumPrice = $scope.GBP['GROUP_BUY_PLAN.GROUP_PRICE'];
            $scope.sumCount = 1;
        }
    }
    $scope.upCount = function () {
        $scope.sumCount += 1;
        $scope.sumPrice = $scope.sumCount * $scope.GBP['GROUP_BUY_PLAN.GROUP_PRICE'];
    }

    //用户点击参团
    //生成订单
    //在团用户表中添加一条记录
    //支付
    $scope.goGroup = function () {
        var param = {
            SKU_ID: $scope.GBP['GROUP_BUY_PLAN.SKU_ID'].toString(),
            SUM_COUNT: $scope.sumCount.toString()
        }
        $state.go("pages/order/addGroupBuy", param);
    }
});
