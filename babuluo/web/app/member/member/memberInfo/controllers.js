angular.module('AndSell.Main').controller('member_member_memberInfo_Controller', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, memberTypeFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户信息');

    $scope.memberId = $stateParams.id;

    $scope.initLoad = function () {
        $scope.deferLoad = $q.defer();
        $scope.loadSource();
        $scope.loadType();
        $scope.loadMemberDetails();
    };

    $scope.loadMemberDetails = function () {
        $scope.promiseAll = $q.all([$scope.deferLoad.promise]);
        $scope.promiseAll.then(function () {
            if ($scope.memberId == 0) {
                modalFactory.showShortAlert("无该客户");
            }
            var form = {};
            form['MEMBER.USER_ID'] = $scope.memberId;
            memberFactory.getMemberListById(form, function (response) {
                $scope.memberInfo = response.data[0];
            });
        });
    };

    $scope.sourceMap = new Map;
    //加载客户来源
    $scope.loadSource = function () {

        memberSourceFactory.getMemberSourceList({}, function (response) {
            $scope.sourceList = response.data;
            $scope.sourceList.forEach(function (ele) {
                $scope.sourceMap.set(ele['MEMBER_CODE_SOURCE.CODE'], ele['MEMBER_CODE_SOURCE.NAME']);
            });
            $scope.deferLoad.resolve(response);
        });
    };

    //加载客户类型
    $scope.loadType = function () {
        memberTypeFactory.getMemberTypeList({}, function (response) {
            $scope.typeList = response.data;
            $scope.deferLoad.resolve(response);
        });
    };

    $scope.initLoad();

    //重置密码
    $scope.initPWD = function () {
        modalFactory.showAlert("确定将密码重置为【 A123456 】吗？", function () {
            $scope.memberInfo = {};
            $scope.memberInfo['MEMBER.USER_ID'] = $scope.memberId;
            memberFactory.resetPwd($scope.memberInfo, function (response) {
                if (response.extraData.state == "state") {
                    modalFactory.showShortAlert("密码重置成功");
                    $scope.initLoad();
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    //解除微信
    $scope.unBindWX = function () {
        modalFactory.showAlert("确定解除微信绑定吗？", function () {
            $scope.memberInfo = {};
            $scope.memberInfo['MEMBER.USER_ID'] = $scope.memberId;
            $scope.memberInfo['MEMBER.WX_OPENID'] = "{$null}";
            memberFactory.modMemberListById($scope.memberInfo, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.memberInfo['MEMBER.WX_OPENID'] = undefined;
                    modalFactory.showShortAlert("解绑成功");
                    $scope.initLoad();
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    //解除QQ
    $scope.unBindQQ = function () {
        modalFactory.showAlert("确定解除QQ绑定吗？", function () {
            $scope.memberInfo = {};
            $scope.memberInfo['MEMBER.USER_ID'] = $scope.memberId;
            $scope.memberInfo['MEMBER.QQ_OPENID'] = "{$null}";
            memberFactory.modMemberListById($scope.memberInfo, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.memberInfo['MEMBER.QQ_OPENID'] = undefined;
                    modalFactory.showShortAlert("解绑成功");
                    $scope.initLoad();
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.memberInfo['MEMBER.LOGIN_ID'] == undefined) {
            modalFactory.showAlert("登陆ID不能为空。");
            return;
        }
        if ($scope.memberInfo['MEMBER.MOBILE'] == undefined) {
            modalFactory.showAlert("手机号码不能为空。");
            return;
        }

        if ($scope.memberInfo['MEMBER.USER_NAME'] == undefined) {
            modalFactory.showAlert("用户名不能为空。");
            return;
        }
        memberFactory.modMemberListById($scope.memberInfo, function (response) {
            modalFactory.showShortAlert("保存成功");
            $scope.modifyID = false;
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }, function () {
        //取消事件
        $state.go('member/member/memberList');
    });
});

