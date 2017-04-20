angular.module('AndSell.H5.Main').controller('pages_groupBuy_myGroup_Controller', function ($interval, $scope, $state, weUI, modalFactory, groupBuyMemberFactory, groupBuyGroupFactory, memberFactory, shopFactory, weUI) {
    modalFactory.setTitle("团购详情");

    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var gbp = getCookie("GBP");
        var gbpPrd = getCookie("GBP_PRD");
        $scope.GBP = JSON.parse(gbp);
        $scope.GBP_PRD = JSON.parse(gbpPrd);
        $scope.surplusSize = $scope.GBP['GROUP_BUY_PLAN.SUM_COUNT'];
        $scope.sumCount = getCookie("SUM_COUNT") == null ? 1 : parseInt(getCookie("SUM_COUNT"));
        $scope.sumPrice = $scope.GBP['GROUP_BUY_PLAN.GROUP_PRICE'] * $scope.sumCount;
        $scope.showDate = $scope.GBP['GROUP_BUY_PLAN.END_DATETIME'];
        initDate();
        getGbgList($scope.GBP['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID']);
        getImgURIS($scope.GBP_PRD)
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
                getGbmList(ids);
            }
        });
    }

    $scope.gbmList = [];
    function getGbmList(gbpIds) {
        groupBuyMemberFactory.getAllMemberInGbgIds({"GROUP_BUY_MEMBER.GROUP_BUY_GROUP_IDS": gbpIds}, function (response) {
            $scope.gbmList = response.data;
            getSurplusSizeList();
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
    //获取各个团剩余参团人数
    $scope.surplusSizeList = {};
    function getSurplusSizeList() {
        $scope.gbmList.forEach(function (ele) {
            if ($scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] == undefined) {
                $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] = 1;
            } else {
                $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] += 1;
            }
        });
    }

    //用户点击去参团
    $scope.goGroupBuy = function (gbm) {
        removeCookie("SUM_COUNT");
        setCookie("SUM_COUNT", $scope.sumCount);
        $state.go("pages/groupBuy/groupDetail", {GBG_ID: gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']});
    }
    //查看全部团
    $scope.goAllGroup = function () {
        removeCookie("surplusSize");
        removeCookie("SUM_COUNT");
        setCookie("SUM_COUNT", $scope.sumCount);
        setCookie("surplusSize", $scope.surplusSize);
        $state.go("pages/groupBuy/allGroup");
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


    function initDate() {
        var tempDate = $scope.showDate;
        var yMd = tempDate.split(" ")[0].split("-");
        var Hms = tempDate.split(" ")[1].split(":");
        var end = new Date(yMd[0] + '/' + yMd[1] + '/' + yMd[2] + ' ' + Hms[0] + ':' + Hms[1] + '00').getTime();
        var now = new Date().getTime();
        if (end < now) {
            $scope.showDate = "已";
        } else {
            var time = (end - now) / 1000;
            $scope.showDate = parseInt(time / 3600) + "时" + parseInt(time / 60 - parseInt(time / 3600) * 60) + "分";
        }

    }

    $scope.goGroup = function () {
        var param = {
            SKU_ID: $scope.GBP['GROUP_BUY_PLAN.SKU_ID'].toString(),
            SUM_COUNT: $scope.sumCount.toString()
        }
        $state.go("pages/order/addGroupBuy", param);
    }
});
