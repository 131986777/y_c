angular.module('AndSell.Main').controller('member_type_typeList_Controller', function ($scope, $stateParams, memberTypeFactory, modalFactory) {

    modalFactory.setTitle('客户类型管理');

    $scope.initLoad = function () {
        memberTypeFactory.getMemberTypeList({}, function (repsonce) {
            console.log(repsonce.data);
            $scope.MemberTypeList = repsonce.data;
        }, null);
    };
    $scope.initLoad();

    $scope.addMemberType = function () {
        console.log($scope.add);
        $scope.add['MEMBER_CODE_TYPE.SERVICE_ID'] = 1;
        memberTypeFactory.addMemberType($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = '';
            $("#addMemberType").modal('hide');
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyMemberTypeClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyMemberType = function () {
        $scope.modify['MEMBER_CODE_TYPE.SERVICE_ID'] = 1;
        memberTypeFactory.modifyById($scope.modify, function (response) {
            $("#modifyMemberType").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.deleteMemberType = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            memberTypeFactory.delMemberType({'MEMBER_CODE_TYPE.ID': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });

    }

});
