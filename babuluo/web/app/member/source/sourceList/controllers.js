angular.module('AndSell.Main').controller('member_source_sourceList_Controller', function ($scope, $stateParams, memberSourceFactory, modalFactory) {


    modalFactory.setTitle('客户来源管理');

    $scope.initLoad = function () {
        memberSourceFactory.getMemberSourceList().get({}, function (repsonce) {
            console.log(repsonce.data);
            $scope.MemberSourceList = repsonce.data;
        }, null);
    };
    $scope.initLoad();

    $scope.addMemberClass = function () {
       // console.log($scope.add);
        $scope.add['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        $scope.add['MEMBER_CODE_SOURCE.IS_SYS'] = -1;
        memberSourceFactory.addMemberSource($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add='';
                $("#addMember").modal('hide');
                $scope.initLoad();

            }

        });
    };

    $scope.modifyMemberSourceClick = function (item) {
        $scope.modify=clone(item);

    };

    $scope.modifyMemberSource = function () {
        $scope.modify['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        $scope.add['MEMBER_CODE_SOURCE.IS_SYS'] = -1;
        memberSourceFactory.modifyById().get($scope.modify, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyMember").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.initLoad();
            }
        });
    };

    $scope.deleteMember = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            memberSourceFactory.delMemberSource(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");

                    $scope.initLoad();
                }
            });
        });

    }

});
