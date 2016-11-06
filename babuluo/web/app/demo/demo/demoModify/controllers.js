AndSellMainModule.controller('ModifyDemoController', function ($scope, $state, $stateParams, classFactory,modalFactory, demoFactory) {

    //设置页面Title
    modalFactory.setTitle('ModifyDemo');
    //无底边栏
    modalFactory.setBottom(false);

    //方法名可以随便写 参数必须为data
    $scope.classSwitch= function (data) {
        console.log('class switch');
        console.log(data);
    }

    $scope.tagSwitch= function (data) {
        console.log('tag switch');
        console.log(data);
    }

    $scope.prdSwitch= function (data) {
        console.log('prd switch');
        console.log(data);
    }

    $scope.prdItemSwitch= function (data) {
        console.log('prd item switch');
        console.log(data);
    }

    $scope.couponItemSwitch= function (data) {
        console.log('coupon item switch');
        console.log(data);
    }

});
