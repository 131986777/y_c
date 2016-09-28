AndSellMainModule.controller('MemberInfoController', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户信息');

    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

    $scope.initLoad = function () {

        $scope.deferLoad = $q.defer();

        $scope.loadSource();
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
                $scope.sourceMap.set(ele['member_code_source.CODE'], ele['member_code_source.NAME']);
            });
            $scope.deferLoad.resolve(response);
        }, null);
    };

    $scope.initLoad();

});

