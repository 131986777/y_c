AndSellMainModule.controller('AddDemoController', function ($scope, $state, $stateParams, modalFactory, demoFactory) {

    //设置页面Title
    modalFactory.setTitle('AddDemo');

    //设置页面Bottom 是否显示 显示的话触发事件
    //页面带低栏
    modalFactory.setBottom(true, function () {
        console.log('点击确定');/*可选*/
    }, function () {
        console.log('点击取消');/*可选*/
    });
    //页面不带低栏
    // modalFactory.setBottom(false);



    //这里写业务逻辑
    $scope.getDemo = function () {
        //直接post请求
        demoFactory.getDemo().get({}, function (repsonse) {
            //处理业务返回结果

            //短时模态框提示
            modalFactory.showShortAlert("返回成功");
        });
    };

    $scope.delDemo = function (id) {


        //回调阻塞模态框提示 方法内处理回调
        modalFactory.showAlert("确定删除?", function () {
            //携带参数post请求
            var params = {};
            params['id'] = id;
            demoFactory.delDemo(params).get({}, function (repsonse) {
                //处理业务返回结果
            });
        })
    }

});
