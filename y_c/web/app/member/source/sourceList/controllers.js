angular.module('AndSell.Main').controller('member_source_sourceList_Controller', function ($scope, $stateParams, memberSourceFactory, modalFactory) {

    modalFactory.setTitle('客户来源管理');

    $scope.initLoad = function () {
        memberSourceFactory.getMemberSourceList({}, function (repsonce) {
            $scope.MemberSourceList = repsonce.data;
        });
    };
    $scope.initLoad();

    $scope.addMemberClass = function () {
        // console.log($scope.add);
        $scope.add['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        $scope.add['MEMBER_CODE_SOURCE.IS_SYS'] = -1;
        memberSourceFactory.addMemberSource($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = '';
            $("#addMember").modal('hide');
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyMemberSourceClick = function (item) {
        $scope.modify = clone(item);

    };

    $scope.modifyMemberSource = function () {
        $scope.modify['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        $scope.add['MEMBER_CODE_SOURCE.IS_SYS'] = -1;
        memberSourceFactory.modifyById($scope.modify, function (response) {
            $("#modifyMember").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.deleteMember = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            memberSourceFactory.delMemberSource({'member_code_source.CODE': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });

    }

});
