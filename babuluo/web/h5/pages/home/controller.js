angular.module('AndSell.H5.Main').controller('pages_home_Controller', function ($scope, $state, weUI, modalFactory, shopFactory) {

    modalFactory.setTitle('主页');
    modalFactory.setBottom(true);

    //商品搜索
    $scope.searchPrd = function () {
        $state.go('pages/product/list', {keyword: $scope.prdKeyword});
    }

    $scope.initData = function () {
        var id = getCookie('currentShop');
        if (id == undefined || id.trim() == '') {
            weUI.toast.info('请先选择门店');
            $state.go('shopList');
        } else {
            shopFactory.getShopById(id).get({}, function (response) {
                $scope.shopInfo = response.data[0];
                if ($scope.shopInfo != undefined) {
                    setCookie('currentShopInfo', JSON.stringify($scope.shopInfo));
                }
            });
        }
        // 设置轮播图图片间隔
              $scope.myInterval = 4000;
               // 轮播图数据初始化
              $scope.slides = new Array;
              // 添加轮播图源
              $scope.slides.push({ image: 'http://img1.gtimg.com/9/910/91061/9106175_980x1200_960.jpg'});
              $scope.slides.push({ image: 'http://files.15w.com/image/2015/0621/14348708842995.png'});

        //$('#carousel-generic').hammer().on('swipeleft', function(){
        //    $(this).carousel('next');
        //});
        //
        //$('#carousel-generic').hammer().on('swiperight', function(){
        //    $(this).carousel('prev');
        //});
    }

    //$scope.ssss= function () {
    //    $scope.slides.push({ image: 'http://a.hiphotos.baidu.com/zhidao/pic/item/37d3d539b6003af352b41be2372ac65c1038b622.jpg'});
    //
    //}

});
