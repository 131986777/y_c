angular.module('AndSell.Main').controller('user_user_userModify_Controller', function ($scope, $state, $stateParams, shopFactory, userFactory, roleFactory, modalFactory) {

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
        userFactory.getUserByUID(user, function (response) {
            $scope.userModify = response.data[0];
            $scope.roleList = response.extraData.roleList;
            //解析
            if ($scope.isNotNull($scope.userModify['USER.ROLE_ID_LIST'])) {
                var result = $scope.userModify['USER.ROLE_ID_LIST'].split(",");
                for (var i = 0; i < result.length; i++) {
                    $scope.roleList.forEach(function (ele) {
                        if (ele['USER_ROLE.ID'] == result[i]) {
                            ele['USER_ROLE.CHECKED'] = true;
                        }
                    });
                }
            }
        });

        $scope.getShopList();
    };

    $scope.getShopList = function () {
        shopFactory.getShopList({}, function (response) {
            $scope.shopList = response.data;
        });
    };

    $scope.initLoad();

    //重置密码
    $scope.initPWD = function () {
        modalFactory.showAlert("确定重置密码为【123456】?", function () {
            var pwd = {};
            pwd['USER.UID'] = $stateParams.id;
            pwd['USER.LOGIN_PWD'] = "123456";
            pwd['USER.MOBILE'] = $scope.userModify['USER.MOBILE'];
            userFactory.modUserByUID(pwd, function (response) {
                modalFactory.showShortAlert("密码重置成功");
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
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
        //拼接用户角色id
        $scope.userModify['USER.ROLE_ID_LIST'] = '';
        $scope.roleList.forEach(function (ele) {
            if (ele['USER_ROLE.CHECKED'] == true) {
                $scope.userModify['USER.ROLE_ID_LIST'] = $scope.userModify['USER.ROLE_ID_LIST']
                    + ","
                    + ele['USER_ROLE.ID'];
            }
            if ($scope.userModify['USER.ROLE_ID_LIST'].substr(0, 1) == ',') {
                $scope.userModify['USER.ROLE_ID_LIST'] = $scope.userModify['USER.ROLE_ID_LIST'].substr(1);
            }
        });
        userFactory.modUserByUID($scope.userModify, function (response) {
            modalFactory.showShortAlert("修改成功");
            $state.go('user/user/userList');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }, function () {
        //取消事件
        $state.go('user/user/userList');
    });

    $scope.isNull = function (str) {
        return str == null || str == '';
    };

    $scope.isNotNull = function (str) {
        return !$scope.isNull(str);
    };
});

