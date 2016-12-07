angular.module('AndSell.Main').controller('member_member_memberList_Controller', function ($scope, memberFactory, $stateParams, memberGroupFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户管理');

    modalFactory.setBottom(false);

    $scope.initData = function () {
        $scope.memberAdd = {};
        $scope.memberEdited = {};
        $scope.filter = {};
        $scope.queryContent = '';
        if ($stateParams.keyword != '') {
            $scope.queryContent = $stateParams.keyword;
            $scope.queryMember();
        }
    };

    $scope.bindData = function (response) {
        $scope.memberList = response.data;
        $scope.sourceList = response.extraData.sourceList;
        $scope.typeList = response.extraData.typeList;
        $scope.groupList = response.extraData.groupList;
    };

    //根据类型加载客户分组
    $scope.loadGroupByType = function (what, id) {
        memberGroupFactory.getMemberGroupListByType({'MEMBER_CODE_GROUP.TYPE_ID': id}, function (repsonse) {
            if (what == 1) {
                $scope.groupListById = repsonse.data;
            } else if (what == 2) {
                $scope.groupListByTypeId = repsonse.data;
            }
        });
    };

    //新增客户
    $scope.addMemberList = function () {

        if ($scope.memberAdd['MEMBER.USER_NAME']
            == undefined
            || $scope.memberAdd['MEMBER.LOGIN_ID']
            == undefined
            || $scope.memberAdd['MEMBER.MOBILE']
            == undefined) {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }
        $scope.memberAdd['MEMBER.LOGIN_PWD'] = "A123456";

        memberFactory.addMemberList($scope.memberAdd, function (response) {
            $("#add").modal('hide');
            $scope.clearForm();
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    //删除客户
    $scope.delMemberListById = function (ml) {
        modalFactory.showAlert("确定删除客户：［" + ml['MEMBER.USER_NAME'] + "］?", function () {
            memberFactory.delById(ml, function (response) {
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
                memberFactory.modMemberListById(ml, function (response) {
                    if (response.extraData.state == 'true') {
                        modalFactory.showShortAlert("停用客户成功");
                    }
                });
            });
        } else {
            //启用
            ml['MEMBER.USE_STATE'] = 1;
            memberFactory.modMemberListById(ml, function (response) {
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
        $scope.memberAdd['MEMBER.TYPE_ID'] = "-1";
        $scope.memberAdd['MEMBER.GROUP_ID'] = "-1";
    };

    $scope.queryMember = function () {
        $scope.filter['MEMBER.QUERY_CONTENT'] = $scope.queryContent;

    };
});

