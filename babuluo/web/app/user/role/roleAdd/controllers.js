angular.module('AndSell.Main').controller('user_role_roleAdd_Controller', function ($scope, $state, roleFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('新增员工角色');

    $scope.initLoad = function () {
        $scope.roleAdd = {};
        $scope.appChooseList = [];
        $scope.loadAPPs();
    };

    $scope.loadAPPs = function () {
        //加载权限App类型
        roleFactory.getAppClass({}, function (response) {
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
                returnValue.push(ele);
            });
        });
        return returnValue;
    };

    $scope.initLoad();

    $scope.addAppIntoList = function (value, checked) {
        if (checked == true) {
            $scope.appChooseList.push(value);
        } else {
            $scope.appChooseList.remove(value);
        }
        console.log($scope.appChooseList);
    };

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.isNull($scope.roleAdd['USER_ROLE.ROLE_NAME'])) {
            modalFactory.showShortAlert("请填写角色名");
            return;
        }

        $scope.roleAdd['ROLE_MAP_APP'] = $scope.appChooseList;
        console.log($scope.roleAdd);
        roleFactory.addRole($scope.roleAdd, function (response) {
            modalFactory.showShortAlert("添加成功");
            $state.go('user/role/roleList');
        }, function (resposne) {
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

