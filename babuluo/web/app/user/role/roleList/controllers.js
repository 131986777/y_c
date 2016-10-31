AndSellMainModule.controller('roleListController', function ($scope, roleFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('角色管理');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        $scope.roleList = response.data;
        console.log(response);
    };


    $scope.delRole = function (role) {
        modalFactory.showAlert("确定删除角色：［" + role['USER_ROLE.ROLE_NAME'] + "］?", function () {
            role['USER_ROLE.IS_DEL'] = "1";
            roleFactory.delRole(role).get({}, function (response) {
                console.log(response);
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.$broadcast('pageBar.reload');
                }else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

});

