angular.module('AndSell.Main').controller('user_role_roleModify_Controller', function ($scope, $state, $stateParams, roleFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('修改角色信息');

    $scope.initLoad = function () {

        $scope.deferLoad = $q.defer();

        if ($stateParams.id == 0) {
            modalFactory.showShortAlert("无该角色");
            return;
        }

        //加载角色信息
        var user = {};
        user['USER_ROLE.ID'] = $stateParams.id;
        roleFactory.getRoleById(user, function (response) {
            $scope.roleModify = response.data[0];
        });

        $scope.appChooseList = [];
        $scope.loadChoice();
        $scope.promiseLoad = $q.all([$scope.deferLoad.promise]);
        $scope.promiseLoad.then(function (ok) {
            $scope.loadAPPs();
        });
    };

    $scope.loadAPPs = function () {

        //加载权限App类型
        roleFactory.getAppClass({"APP_CLASS.SYS_ID": "BBL"}, function (response) {
            $scope.roleClassList = response.data;
            $scope.roleClassList.forEach(function (ele) {
                ele.childList = $scope.filterParentAuth(ele['APP_CLASS.ID']);
            });
        });
    };

    $scope.filterParentAuth = function (id) {

        var returnValue = new Array;
        var form = {};
        form['APP.CLASS_ID'] = id;
        roleFactory.getAppByClass(form, function (response) {
            response.data.forEach(function (ele) {
                ele['APP.CHECKED'] = false;
                $scope.appChooseList.forEach(function (ele1) {
                    if (ele1['APP.APP_ID'] == ele['APP.APP_ID']) {
                        ele['APP.CHECKED'] = true;
                    }
                });
                returnValue.push(ele);
            });
        });
        return returnValue;
    };

    $scope.loadChoice = function () {
        var form = {};
        form['APP_MAP_ROLE.ROLE_ID'] = $stateParams.id;
        roleFactory.getAppListByRole(form, function (response) {
            $scope.appChooseList = response.data;
            $scope.deferLoad.resolve(response);
        });
    };

    $scope.initLoad();

    $scope.addAppIntoList = function (value, checked) {

        if (checked == true) {
            $scope.appChooseList.push(value);
        } else {
            $scope.appChooseList.remove(value);
            $scope.appChooseList.forEach(function (ele) {
                if (ele['APP.APP_ID'] == value['APP.APP_ID']) {
                    $scope.appChooseList.remove(ele);
                }
            })
        }
    };

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.isNull($scope.roleModify['USER_ROLE.ROLE_NAME'])) {
            modalFactory.showShortAlert("请填写角色名称");
            return;
        }
        //拼接应用id
        $scope.roleModify['USER_ROLE.ROLE_MAP_APP'] = '';
        $scope.appChooseList.forEach(function (ele) {
            $scope.roleModify['USER_ROLE.ROLE_MAP_APP'] = $scope.roleModify['USER_ROLE.ROLE_MAP_APP']
                + ","
                + ele['APP.APP_ID'];

            if ($scope.roleModify['USER_ROLE.ROLE_MAP_APP'].substr(0, 1) == ',') {
                $scope.roleModify['USER_ROLE.ROLE_MAP_APP'] = $scope.roleModify['USER_ROLE.ROLE_MAP_APP'].substr(1);
            }
        });
        console.log($scope.roleModify['USER_ROLE.ROLE_MAP_APP']);
        roleFactory.modRoleById($scope.roleModify, function (response) {
            modalFactory.showShortAlert("修改成功");
            $state.go('user/role/roleList');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
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

