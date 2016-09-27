AndSellMainModule.controller('DemoListController', function ($scope, $state, $stateParams, modalFactory, demoFactory) {

    //设置页面Title
    modalFactory.setTitle('DemoList');
    modalFactory.setBottom(false);

    console.log($stateParams);
    //$stateParams里面存储之前页面ui-sref里面传的参数
    $scope.p1=$stateParams.params1;
    $scope.p2=$stateParams.params2;


    //这里写业务逻辑

    $scope.toDemoAdd=function(){
        //controller内的跳转 使用$state.go方法
       $state.go("demo-add");
    }


});
