AndSellH5MainModule.controller('H5.MainController', function ($scope, $state, modalFactory) {

    $scope.currentPage='sy';
    //逻辑
    $scope.$on('title', function (event, data) {
        $scope.title = data;
        updateWxTitle($scope.title);
    });

    //nav-Bottom 初始化
    $scope.$on('nav-bottom', function (event, data) {
        $scope.navShow = data.OnOffState;
    });

    //低栏
    $scope.$on('currentPage', function (event, data) {
        $scope.currentPage = data;
    });

    //低栏
    $scope.$on('updateCart', function (event, data) {
        $scope.caculCart();
    });

    $scope.toPage= function (page) {
       $scope.currentPage=page;
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
        $scope.cartSize = size;
    }

    $scope.caculCart();


});
