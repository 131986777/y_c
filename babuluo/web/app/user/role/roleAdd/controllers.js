AndSellMainModule.controller('user_role_roleAdd_Controller', function ($scope, $state, roleFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('新增员工角色');

    $scope.roleAdd = {};

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.isNull($scope.roleAdd['USER_ROLE.ROLE_NAME'])) {
            modalFactory.showShortAlert("请填写角色名");
            return;
        }
        roleFactory.addRole($scope.roleAdd).get({}, function (response) {
            console.log(response);
            if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("添加成功");
                $state.go('user/role/roleList');
            } else {
                modalFactory.showShortAlert(response.msg);
            }
        });

    }, function () {
        //取消事件
        $state.go('user/role/roleList');
    });

    $scope.isNull = function (str) {
        return str == null || str == '';
    };

    $scope.isNotNull = function (str) {
        return !$scope.isNull(str);
    };
});

