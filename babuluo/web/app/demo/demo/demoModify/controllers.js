AndSellMainModule.controller('ModifyDemoController', function ($scope, $state, $stateParams, classFactory,modalFactory, demoFactory) {

    //设置页面Title
    modalFactory.setTitle('ModifyDemo');


    //方法名可以随便写 参数必须为data
    $scope.ss= function (data) {
        console.log(11);
        console.log(data);
    }

    $scope.ss2= function (data) {
        console.log(22);
        console.log(data);
    }

    $scope.ss3= function (data) {
        console.log(33);
        console.log(data);
    }

});
