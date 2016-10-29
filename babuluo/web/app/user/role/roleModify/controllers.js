AndSellMainModule.controller('roleModifyController', function ($scope, $state, $stateParams, roleFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('修改角色信息');

    $scope.initLoad = function () {

        if ($stateParams.id == 0) {
            modalFactory.showShortAlert("无该角色");
            return;
        }

        //加载角色信息
        var user = {};
        user['USER_ROLE.ID'] = $stateParams.id;
        roleFactory.getRoleById(user).get({}, function (response) {
            console.log(response);
            $scope.roleModify = response.data[0];
        });
    };
    $scope.initLoad();

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.isNull($scope.roleModify['USER_ROLE.ROLE_NAME'])) {
            modalFactory.showShortAlert("请填写角色名称");
            return;
        }
        roleFactory.modRoleById($scope.roleModify).get({}, function (response) {
            console.log(response);
            if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("修改成功");
                $state.go('roleList');
            } else {
                modalFactory.showShortAlert(response.msg);
            }
        });
    }, function () {
        //取消事件
        $state.go('roleList');
    });

    $scope.isNull = function (str) {
        return str == null || str == '';
    };

    $scope.isNotNull = function (str) {
        return !$scope.isNull(str);
    };
});

