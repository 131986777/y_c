angular.module('AndSell.Main').controller('user_user_userList_Controller', function ($scope, userFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('员工管理');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        $scope.userList = response.data;
        $scope.shopList = response.extraData.shopList;
    };

    $scope.modifyState = function (user) {
        if (user['USER.STATE'] == "1") {
            modalFactory.showAlert("确定停用员工账号：［" + user['USER.LOGIN_ID'] + "］?", function () {
                user['USER.STATE'] = "-1";
                userFactory.modifyState(user, function (response) {
                    modalFactory.showShortAlert("停用成功");
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
            });
        } else {
            user['USER.STATE'] = "1";
            userFactory.modifyState(user, function (response) {
                modalFactory.showShortAlert("启用成功");
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
        }
    };

    $scope.query = function () {
        $scope.filter['USER.QUERY_CONTENT'] = $scope.queryContent;
    }

});

