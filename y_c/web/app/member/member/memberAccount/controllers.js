angular.module('AndSell.Main').controller('member_member_memberAccount_Controller', function ($scope, $state, $stateParams, memberGroupFactory, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户账户');

    $scope.memberId = $stateParams.id;

    $scope.initLoad = function () {
        $scope.loadAccountByID();
    };

    $scope.loadAccountByID = function () {
        var form = {};
        form['MEMBER_ACCOUNT.USER_ID'] = $scope.memberId;
        memberFactory.loadMemberAccount(form, function (response) {
            $scope.account = response.data[0];
            $scope.groupList = response.extraData.groupList;
            $scope.member = response.extraData.member[0];
        });
    };

    $scope.initLoad();

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        console.log($scope.member);
        memberFactory.modMemberListById($scope.member, function (response) {
            modalFactory.showShortAlert("保存成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }, function () {
        //取消事件
        $state.go('member/member/memberList');
    });

});

