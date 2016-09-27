AndSellMainModule.controller('MemberTypeController', function ($scope, $stateParams, memberTypeFactory, modalFactory) {


    modalFactory.setTitle('客户类型管理');

    $scope.initLoad = function () {
        memberTypeFactory.getMemberTypeList().get({}, function (repsonce) {
            console.log(repsonce.data);
            $scope.MemberTypeList = repsonce.data;
        }, null);
    };
    $scope.initLoad();

    $scope.addMemberType = function () {
        console.log($scope.add);
        $scope.add['MEMBER_CODE_TYPE.SERVICE_ID'] = 1;
        memberTypeFactory.addMemberType($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add='';
                $("#addMemberType").modal('hide');
                $scope.initLoad();

            }

        });
    };

    $scope.modifyMemberTypeClick = function (item) {
        $scope.modify=clone(item);
    };

    $scope.modifyMemberType = function () {
        $scope.modify['MEMBER_CODE_TYPE.SERVICE_ID'] = 1;
        memberTypeFactory.modifyById().get($scope.modify, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyMemberType").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.initLoad();
            }
        });
    };

    $scope.deleteMemberType = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            memberTypeFactory.delMemberType(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");

                    $scope.initLoad();
                }
            });
        });

    }

});
