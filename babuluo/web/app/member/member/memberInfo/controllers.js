AndSellMainModule.controller('MemberInfoController', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, memberTypeFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户信息');

    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

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
            form['member.USER_ID'] = $scope.memberId;

            memberFactory.getMemberListById(form).get({}, function (response) {
                $scope.memberInfo = response.data[0];
            });
        });
    };

    $scope.sourceMap = new Map;
    //加载客户来源
    $scope.loadSource = function () {

        memberSourceFactory.getMemberSourceList().get({}, function (response) {
            $scope.sourceList = response.data;
            $scope.sourceList.forEach(function (ele) {
                $scope.sourceMap.set(ele['MEMBER_CODE_SOURCE.CODE'], ele['MEMBER_CODE_SOURCE.NAME']);
            });
            $scope.deferLoad.resolve(response);
        }, null);
    };

    //加载客户类型
    $scope.loadType = function () {

        memberTypeFactory.getMemberTypeList().get({}, function (response) {
            $scope.typeList = response.data;
            console.log($scope.typeList);
            $scope.deferLoad.resolve(response);
        }, null);
    };

    $scope.initLoad();

    //重置密码
    $scope.initPWD = function () {
        $scope.memberInfo['MEMBER.LOGIN_PWD'] = "A123456";
        modalFactory.showAlert("确定将密码重置为【 A123456 】吗？", function () {
            memberFactory.modMemberListById($scope.memberInfo).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("密码重置成功");
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    //解除微信
    $scope.unBindWX = function () {
        modalFactory.showAlert("确定解除微信绑定吗？", function () {
            $scope.memberInfo['MEMBER.WX_OPENID'] = "{$null}";
            memberFactory.modMemberListById($scope.memberInfo).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.memberInfo['MEMBER.WX_OPENID'] = undefined;
                    modalFactory.showShortAlert("解绑成功");
                } else {
                    modalFactory.showShortAlert(response.msg);
                }
            });
        });
    };

    //解除QQ
    $scope.unBindQQ = function () {
        modalFactory.showAlert("确定解除QQ绑定吗？", function () {
            $scope.memberInfo['MEMBER.QQ_OPENID'] = "{$empty}";
            memberFactory.modMemberListById($scope.memberInfo).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.memberInfo['MEMBER.QQ_OPENID'] = undefined;
                    modalFactory.showShortAlert("解绑成功");
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
        console.log($scope.memberInfo);
        memberFactory.modMemberListById($scope.memberInfo).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("保存成功");
                $scope.modifyID = false;
                $scope.initLoad();
            }
        });
    }, function () {
        //取消事件
        $scope.initLoad();
    });
});

