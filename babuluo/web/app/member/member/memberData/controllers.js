AndSellMainModule.controller('MemberDataController',function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户资料');

    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;

    console.log("这是客户的id：" + $scope.memberId);

   // var jiaOrderData = angular.module("jiaOrder.data");

    $scope.initLoad = function () {

        $scope.loadMemberData();

    };

    $scope.loadMemberData = function () {


        memberFactory.getMemberData($scope.memberId).get({}, function (response) {
            console.log('这是返回的数据');
            console.log(response.data);

            $scope.memberData = response.data[0];


        }, null);
    };

    $scope.initLoad();


    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        if ($scope.memberData['MEMBER_INFO.TRUE_NAME'] == undefined) {
            modalFactory.showAlert("真实姓名不能为空。");
            return;
        }

        console.log($scope.memberData);
        memberFactory.modMemberDataById($scope.memberData).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert("保存成功");
               // $scope.modifyID = false;
                $scope.initLoad();
            }
        });
    }, function () {
        //取消事件
        $scope.initLoad();
    });
});

