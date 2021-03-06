angular.module('AndSell.Main').controller('user_user_userAdd_Controller', function ($scope, $state, shopFactory, userFactory, roleFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('新增员工账号');

    $scope.userAdd = {};
    $scope.userAdd['USER.ROLE_ID_LIST'] = '';

    $scope.initLoad = function () {
        roleFactory.getRole({}, function (response) {
            $scope.roleList = response.data;
        });
        $scope.getShopList();
    };

    $scope.getShopList = function () {
        shopFactory.getShopList({}, function (response) {
            $scope.shopList = response.data;
        });
    };
    $scope.initLoad();

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

        //拼接用户角色id
        $scope.userAdd['USER.ROLE_ID_LIST'] = '';
        $scope.roleList.forEach(function (ele) {

            if (ele['USER_ROLE.CHECKED'] == true) {
                $scope.userAdd['USER.ROLE_ID_LIST'] = $scope.userAdd['USER.ROLE_ID_LIST']
                    + ","
                    + ele['USER_ROLE.ID'];
            }
            if ($scope.userAdd['USER.ROLE_ID_LIST'].substr(0, 1) == ',') {
                $scope.userAdd['USER.ROLE_ID_LIST'] = $scope.userAdd['USER.ROLE_ID_LIST'].substr(1);
            }
        });

        userFactory.addUser($scope.userAdd, function (response) {
            modalFactory.showShortAlert("添加成功");
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

