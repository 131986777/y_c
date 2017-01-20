angular.module('AndSell.Main').controller('user_role_roleList_Controller', function ($scope, roleFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('角色权限管理');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        $scope.roleList = response.data;
    };

    $scope.delRole = function (role) {
        modalFactory.showAlert("确定删除角色：［" + role['USER_ROLE.ROLE_NAME'] + "］?", function () {
            role['USER_ROLE.IS_DEL'] = "1";
            roleFactory.delRole(role, function (response) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        });
    };

});

