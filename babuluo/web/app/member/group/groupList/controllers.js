AndSellMainModule.controller('MemberGroupController', function ($scope, $stateParams, memberGroupFactory, modalFactory) {

    $scope.MemberType= [];
    modalFactory.setTitle('客户分组管理');

    $scope.initLoad = function () {
        $scope.typeMap = new Map;

        memberGroupFactory.getMemberGroupList().get({}, function (repsonse) {
            console.log(repsonse.data);
            $scope.MemberGroupList = repsonse.data;
        }, null);

       memberGroupFactory.getMemberTypeList().get({},function (response) {
           console.log("返回的类型列表"+response.data);

           $scope.MemberTypeList = response.data;
           $scope.MemberTypeList.forEach(function (ele) {
               $scope.typeMap.set(ele['member_code_type.ID'], ele['member_code_type.NAME']);
           });


       },null);
    };

    //根据类型ID筛选分组
    $scope.filterGroup = function (id) {
        console.log("id为"+id);
        if ($scope.groupFilter['member_code_type.ID'] == "-1") {
           // $scope.loadShopList();
            return;
        }else {
            memberGroupFactory.getMemberGroupListByType().get({}, function (repsonse) {
                console.log(repsonse.data);
                $scope.MemberGroupList = repsonse.data;
            }, null);
        }

    };
    $scope.initLoad();

    $scope.addMemberGroup=function () {
        console.log($scope.add);
        $scope.add['MEMBER_CODE_Group.SERVICE_ID'] = 1;
        memberGroupFactory.addMemberGroup($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add='';
                $("#addMemberGroup").modal('hide');
                $scope.initLoad();

            }

        });
    };

    $scope.modifyMemberGroupClick = function (item) {
        $scope.modify=clone(item);
    };

    $scope.modifyMemberGroup = function () {
        $scope.modify['MEMBER_CODE_SOURCE.SERVICE_ID'] = 1;
        memberGroupFactory.modifyById().get($scope.modify, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyMember").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.initLoad();
            }
        });
    };

    $scope.deleteMemberGroup = function (id) {

        modalFactory.showAlert("确认删除吗?", function () {
            memberGroupFactory.delMemberGroup(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.initLoad();
                }
            });
        });

    }

});
