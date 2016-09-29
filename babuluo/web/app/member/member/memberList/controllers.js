AndSellMainModule.controller('memberListController', function ($scope, memberFactory, memberSourceFactory, memberTypeFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户管理');

    modalFactory.setBottom(false);

    $scope.memberAdd = {};
    $scope.memberEdited = {};
    $scope.memberFilter = {};

    $scope.bindData = function (response) {

        console.log(response);

        $scope.memberList = response.data;
        $scope.sourceList = response.extraData.sourceList;
        $scope.typeList = response.extraData.typeList;
        $scope.groupList = response.extraData.groupList;
        console.log("memberList");
        console.log($scope.memberList);
    };

    //新增客户
    $scope.addMemberList = function () {

        if ($scope.memberAdd['MEMBER.USER_NAME'] == undefined || $scope.memberAdd['MEMBER.LOGIN_ID'] == undefined || $scope.memberAdd['MEMBER.MOBILE'] == undefined) {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }
        $scope.memberAdd['MEMBER.LOGIN_PWD'] = "A123456";
        $scope.memberAdd['MEMBER.CODE_ID'] = "SYS";
        console.log($scope.memberAdd);
        memberFactory.addMemberList($scope.memberAdd).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#add").modal('hide');
                $scope.clearForm();
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

    //删除客户
    $scope.delMemberListById = function (ml) {
        modalFactory.showAlert("确定删除客户：［" + ml['MEMBER.USER_NAME'] + "］?", function () {
            memberFactory.delById(ml).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.$broadcast('pageBar.reload');
                }
            });
        });
    };

    $scope.changeState = function (ml) {
        if (ml['MEMBER.USE_STATE'] == 1) {
            //停用
            modalFactory.showAlert("确定停用客户：［" + ml['MEMBER.USER_NAME'] + "］?", function () {
                ml['MEMBER.USE_STATE'] = -1;
                memberFactory.modMemberListById(ml).get({}, function (response) {
                    if (response.extraData.state == 'true') {
                        modalFactory.showShortAlert("停用客户成功");
                    }
                });
            });
        } else {
            //启用
            ml['MEMBER.USE_STATE'] = 1;
            memberFactory.modMemberListById(ml).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("启用客户成功");
                }
            });
        }
    };

    //用于清除填写的内容
    $scope.clearForm = function () {
        $scope.memberAdd['MEMBER.USER_NAME'] = undefined;
        $scope.memberAdd['MEMBER.LOGIN_ID'] = undefined;
        $scope.memberAdd['MEMBER.MOBILE'] = undefined;
        $scope.memberAdd['MEMBER.CODE_ID'] = undefined;
    };
});

