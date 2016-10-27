AndSellMainModule.controller('userAddController', function ($scope, userFactory, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('新增员工账号');

    modalFactory.setBottom(true);

    $scope.shopAdd = {};
    $scope.shopEdited = {};

    $scope.bindData = function (response) {
        $scope.userList = response.data;
        $scope.districtList = response.extraData.districtList;
        console.log(response);

    };


    $scope.modifyState = function (user) {
        if (user['USER.STATE'] == "1") {
            modalFactory.showAlert("确定停用：［" + user['USER.LOGIN_ID'] + "］?", function () {
                user['USER.STATE'] = "-1";
                userFactory.modifyState(user).get({}, function (response) {
                    console.log(response);
                    if (response.extraData.state == 'true') {
                        modalFactory.showShortAlert("停用成功");
                    }
                });
            });
        } else {
            user['USER.STATE'] = "1";
            userFactory.modifyState(user).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("启用成功");
                }
            });
        }
    };

});

