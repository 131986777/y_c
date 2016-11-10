angular.module('AndSell.Main').controller('member_group_groupList_Controller', function ($scope, $stateParams, memberGroupFactory, modalFactory) {


    modalFactory.setTitle('客户分组管理');

    $scope.bindData = function (response) {

       // console.log(response.data);
        $scope.MemberGroupList = response.data;
       // console.log('1233'+ $scope.MemberGroupList);
    };
    $scope.init= function () {
        $scope.typeMap = new Map;
        memberGroupFactory.getMemberTypeList().get({}, function (response) {
          //  console.log("返回的类型列表" + response.data);

            $scope.MemberTypeList = response.data;
            $scope.MemberTypeList.forEach(function (ele) {
                $scope.typeMap.set(ele['MEMBER_CODE_TYPE.ID'], ele['MEMBER_CODE_TYPE.NAME']);
            });


        }, null);
    };
    $scope.init();

    $scope.addMemberGroup = function () {
       // console.log($scope.add);
        $scope.add['MEMBER_CODE_Group.SERVICE_ID'] = 1;
        if($scope.add['MEMBER_CODE_GROUP.TYPE_ID'] =='-1'){
            modalFactory.showShortAlert('所属类型不为空');
            return;
        }
        memberGroupFactory.addMemberGroup($scope.add).get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add = '';
                $("#addMemberGroup").modal('hide');
                $scope.$broadcast('pageBar.reload');

            }

        });
    };

    $scope.modifyMemberGroupClick = function (item) {
       // console.log(item);
        //console.log($scope.MemberTypeList);
        $scope.modify = clone(item);
    };

    $scope.modifyMemberGroup = function () {
        $scope.modify['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        memberGroupFactory.modifyById().get($scope.modify, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {

                modalFactory.showShortAlert("修改成功");
                $("#modifyMemberGroup").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

    $scope.deleteMemberGroup = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            memberGroupFactory.delMemberGroup(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        });

    }

});
