angular.module('AndSell.PC.Main').controller('pages_product_list_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("商品列表");

    modalFactory.setHeader(true);

    modalFactory.setSide(false);
    modalFactory.setLeftMenu(true);
    $scope.nofind=function () {
        var img=event.srcElement;
        img.src="../../public/css/img/product.png";
        img.onerror=null;
    }
    $scope.bindData= function (response) {

    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    $scope.filter = {
        'STOCK_REALTIME.STORE_ID': $scope.STORE_ID,
        'SHOP_PRODUCT.REMARK': 'offLine'
    };

    $scope.bindData = function (response) {

        // if (getCookie('currentShopInfo') != undefined) {
        //     $scope.STORE_ID = ToJson(getCookie('currentShopInfo'))['SHOP.REPOS_ID']
        // } else {
        //     $scope.toShop();
        // }

        console.log(response);
        $scope.prdList = response.data;
    };

    $scope.toShop = function () {
        $state.go('pages/shop', {'FROM': window.location.href});
    }


});
