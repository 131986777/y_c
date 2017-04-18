angular.module('AndSell.H5.Main').controller('pages_groupBuy_myGroup_Controller', function ($interval, $scope, $state, weUI, modalFactory, groupBuyMemberFactory, groupBuyGroupFactory, memberFactory, shopFactory, weUI) {
    modalFactory.setTitle("团购详情");

    $scope.initPage = function () {
        modalFactory.setBottom(false);
        var gbp = getCookie("GBP");
        var gbpPrd = getCookie("GBP_PRD");
        $scope.GBP = JSON.parse(gbp);
        $scope.GBP_PRD = JSON.parse(gbpPrd);
        $scope.surplusSize = $scope.GBP['GROUP_BUY_PLAN.SUM_COUNT'];
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
            var ids = "";
            $scope.gbmList.forEach(function (ele) {
                if (ids != "") {
                    ids += ",";
                }
                ids += ele['GROUP_BUY_MEMBER.UID'];
            })
            if (ids != "") {
                getMemberInfo(ids);
                getSurplusSizeList();
            }
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

    //获取用户信息
    $scope.memberInfoList = {};
    function getMemberInfo(ids) {
        memberFactory.getMemberByUID({"MEMBER_INFO.USER_ID": ids}, function (response) {
            response.data.forEach(function (ele) {
                $scope.memberInfoList[ele['MEMBER_INFO.USER_ID'].toString()] = ele;
            })
        })
    }

    //获取各个团剩余参团人数
    $scope.surplusSizeList = {};
    function getSurplusSizeList() {
        $scope.gbmList.forEach(function (ele) {
            if ($scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] == undefined) {
                $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] = 1;
            } else {
                $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']] += $scope.surplusSizeList[ele['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']];
            }
        });
    }

    //用户点击去参团
    $scope.goGroupBuy = function (gbm) {
        removeCookie("GBM");
        removeCookie("GBM_USER_INFO");
        removeCookie("GBM_SURP_LIST");
        removeCookie("surplusSize");
        setCookie("surplusSize", $scope.surplusSize);
        setCookie("GBM", JSON.stringify($scope.gbmList));
        setCookie("GBM_USER_INFO", JSON.stringify($scope.memberInfoList));
        setCookie("GBM_SURP_LIST", JSON.stringify($scope.surplusSizeList));
        removeCookie("CURRENT_GBM_GBG_ID");
        setCookie("CURRENT_GBM_GBG_ID", gbm['GROUP_BUY_MEMBER.GROUP_BUY_GROUP_ID']);
        $state.go("pages/groupBuy/groupDetail");
    }
    //查看全部团
    $scope.goAllGroup = function () {
        removeCookie("GBM");
        removeCookie("GBM_USER_INFO");
        removeCookie("GBM_SURP_LIST");
        removeCookie("surplusSize");
        setCookie("surplusSize", $scope.surplusSize);
        setCookie("GBM", JSON.stringify($scope.gbmList));
        setCookie("GBM_USER_INFO", JSON.stringify($scope.memberInfoList));
        setCookie("GBM_SURP_LIST", JSON.stringify($scope.surplusSizeList));
        $state.go("pages/groupBuy/allGroup");
    }
});
