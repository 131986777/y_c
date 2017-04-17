angular.module('AndSell.H5.Main').controller('pages_groupBuy_myGroup_Controller', function ($interval, $scope, $state, weUI, modalFactory, groupBuyMemberFactory, groupBuyGroupFactory, shopFactory, weUI) {
    modalFactory.setTitle("团购详情");
    $scope.initPage = function () {
        var gbp = getCookie("GBP");
        var gbpPrd = getCookie("GBP_PRD");
        $scope.GBP = JSON.parse(gbp);
        $scope.GBP_PRD = JSON.parse(gbpPrd);
        getGbgList($scope.GBP['GROUP_BUY_PLAN.GROUP_BUY_PLAN_ID'])
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
});
