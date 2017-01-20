angular.module('AndSell.Main').controller('member_group_groupList_Controller', function ($scope, $stateParams, memberGroupFactory, modalFactory) {

    modalFactory.setTitle('客户分组管理');

    $scope.bindData = function (response) {
        $scope.MemberGroupList = response.data;
    };
    $scope.init = function () {
        $scope.typeMap = new Map;
        memberGroupFactory.getMemberTypeList({}, function (response) {
            $scope.MemberTypeList = response.data;
            $scope.MemberTypeList.forEach(function (ele) {
                $scope.typeMap.set(ele['MEMBER_CODE_TYPE.ID'], ele['MEMBER_CODE_TYPE.NAME']);
            });
        });
    };
    $scope.init();

    $scope.addMemberGroup = function () {
        $scope.add['MEMBER_CODE_Group.SERVICE_ID'] = 1;
        if ($scope.add['MEMBER_CODE_GROUP.TYPE_ID'] == '-1') {
            modalFactory.showShortAlert('所属类型不为空');
            return;
        }
        memberGroupFactory.addMemberGroup($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = '';
            $("#addMemberGroup").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyMemberGroupClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyMemberGroup = function () {
        $scope.modify['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        memberGroupFactory.modifyById($scope.modify, function (response) {
            modalFactory.showShortAlert("修改成功");
            $("#modifyMemberGroup").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.deleteMemberGroup = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            memberGroupFactory.delMemberGroup({'MEMBER_CODE_GROUP.ID': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });
    }

});
