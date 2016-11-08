angular.module('AndSell.Main').controller('member_member_memberAccount_Controller', function ($scope, $state, $stateParams, memberGroupFactory, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户账户');

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

    $scope.initLoad = function () {
        $scope.loadAccountByID();
    };


    $scope.loadAccountByID = function () {
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = $scope.memberId;
        memberFactory.loadMemberAccount(form).get({}, function (response) {
            if (response.extraData.state == '') {
                $scope.account = response.data[0];
                console.log(response);
                $scope.groupList = response.extraData.groupList;
                $scope.member = response.extraData.member[0];
                console.log($scope.member['MEMBER.GROUP_ID']);
            }
        });
    };

    $scope.initLoad();

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        console.log($scope.member);
        memberFactory.modMemberListById($scope.member).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("保存成功");
                $scope.initLoad();
            }
        });
    }, function () {
        //取消事件
        $state.go('member/member/memberList');
    });

});

