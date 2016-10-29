AndSellMainModule.controller('userAddController', function ($scope, $state, userFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('新增员工账号');

    $scope.userAdd = {};

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.isNull($scope.userAdd['USER.LOGIN_ID'])
            || $scope.isNull($scope.userAdd['USER.LOGIN_PWD'])
            || $scope.isNull($scope.userAdd['USER.LOGIN_PWD_AGAIN'])
            || $scope.isNull($scope.userAdd['USER.REAL_NAME'])
            || $scope.isNull($scope.userAdd['USER.MOBILE'])) {
            modalFactory.showShortAlert("请填写完必填项");
            return;
        }
        if ($scope.userAdd['USER.LOGIN_PWD'] != $scope.userAdd['USER.LOGIN_PWD_AGAIN']) {
            modalFactory.showShortAlert("两次输入密码不一致");
            return;
        }
        userFactory.addUser($scope.userAdd).get({}, function (response) {
            console.log(response);
            if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("添加成功");
                $state.go('userList');
            }else {
                modalFactory.showShortAlert(response.msg);
            }
        });

    }, function () {
        //取消事件
        $state.go('userList');
    });

    $scope.isNull = function (str) {
        return str == null || str == '';
    };

    $scope.isNotNull = function (str) {
        return !$scope.isNull(str);
    };
});

