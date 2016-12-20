angular.module('AndSell.Main').controller('member_member_memberList_Controller', function (http,$scope, memberFactory, $stateParams, memberGroupFactory, modalFactory, $q) {

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
        $scope.querySize = response.extraData.page.querySize;
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

    $scope.outPutQuery = function () {
        if ($scope.querySize - 5000 <= 0) {
            memberFactory.getMemberList($scope.filter, function (response) {
                if (response.code == 0 && response.msg == "ok") {
                    $scope.outputMember = [];
                    response.data.forEach(function (ele) {
                        var form = {};
                        form['MEMBER.LOGIN_ID'] = ele['MEMBER.LOGIN_ID'];
                        form['MEMBER.TRUE_NAME'] = ele['MEMBER.TRUE_NAME'];
                        form['MEMBER.MOBILE'] = ele['MEMBER.MOBILE'];
                        form['MEMBER.CODE_NAME'] = ele['MEMBER.CODE_NAME'];
                        form['MEMBER.ID_NUMBER'] = ele['MEMBER.ID_NUMBER'];
                        form['MEMBER.BIRTHDAY'] = ele['MEMBER.BIRTHDAY'];
                        form['MEMBER.SEX'] = ele['MEMBER.SEX'];
                        form['MEMBER.REFERENCE'] = ele['MEMBER.REFERENCE'];
                        form['MEMBER.REG_DATETIME'] = ele['MEMBER.REG_DATETIME'];
                        $scope.outputMember.push(form);
                    });

                    var url = "../../outputQuery";
                    $scope.outputList = {};
                    $scope.outputList['type'] = "member";
                    $scope.outputList['item'] = JSON.stringify($scope.outputMember);
                    http.post_ori(url, $scope.outputList, function (response) {
                        if (response != "failure") {
                            location.href = "/AndSell" + response;
                        } else {
                            modalFactory.showShortAlert("导出失败");
                        }
                    });
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        } else {
            modalFactory.showAlert("数据量过大，请缩小数据范围");
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

