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

    $scope.imgList = new Array();
    function getImgURIS(prdDetail) {
        if (prdDetail['SHOP_PRODUCT.CMP'] != null) {
            $scope.imgList.push(prdDetail['SHOP_PRODUCT.CMP']);
        }
        if (prdDetail['SHOP_PRODUCT.P1'] != null) {
            $scope.imgList.push(prdDetail['SHOP_PRODUCT.CMP']);
        }
        if (prdDetail['SHOP_PRODUCT.P2'] != null) {
            $scope.imgList.push(prdDetail['SHOP_PRODUCT.CMP']);
        }
        if (prdDetail['SHOP_PRODUCT.P3'] != null) {
            $scope.imgList.push(prdDetail['SHOP_PRODUCT.CMP']);
        }
        if (prdDetail['SHOP_PRODUCT.P4'] != null) {
            $scope.imgList.push(prdDetail['SHOP_PRODUCT.CMP']);
        }
        if (prdDetail['SHOP_PRODUCT.P5'] != null) {
            $scope.imgList.push(prdDetail['SHOP_PRODUCT.CMP']);
        }
    }

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
});
