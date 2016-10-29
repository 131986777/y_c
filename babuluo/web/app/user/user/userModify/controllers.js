AndSellMainModule.controller('userModifyController', function ($scope, $state, $stateParams, userFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('修改员工账号');

    $scope.initLoad = function () {

        if ($stateParams.id == 0) {
            modalFactory.showShortAlert("无该员工");
            return;
        }

        //加载员工信息
        var user = {};
        user['USER.UID'] = $stateParams.id;
        userFactory.getUserByUID(user).get({}, function (response) {
            console.log(response);
            $scope.userModify = response.data[0];
        });
    };
    $scope.initLoad();

    //重置密码
    $scope.initPWD = function () {
        modalFactory.showAlert("确定重置密码为【123456】?", function () {
            var pwd = {};
            pwd['USER.UID'] = $stateParams.id;
            pwd['USER.LOGIN_PWD'] = "123456";
            userFactory.modUserByUID(pwd).get({}, function (response) {
                console.log(response);
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("密码重置成功");
                }else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.isNull($scope.userModify['USER.LOGIN_ID'])
            || $scope.isNull($scope.userModify['USER.REAL_NAME'])
            || $scope.isNull($scope.userModify['USER.MOBILE'])) {
            modalFactory.showShortAlert("请填写完必填项");
            return;
        }
        userFactory.modUserByUID($scope.userModify).get({}, function (response) {
            console.log(response);
            if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("修改成功");
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

