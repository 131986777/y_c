AndSellMainModule.controller('MemberAddressController', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户详情');

    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

    $scope.initLoad = function () {
        console.log($scope.memberId);
        memberFactory.getMemberAddress($scope.memberId).get({}, function (response) {
            console.log(response.data);
            var data=response.data;

            var address=data[0]['MEMBER_ADDRESS.ADDR_GUO']+data[0]['MEMBER_ADDRESS.ADDR_SHENG']+data[0]['MEMBER_ADDRESS.ADDR_SHI']+data[0]['MEMBER_ADDRESS.ADDR_XIAN']+data[0]['MEMBER_ADDRESS.ADDR_QU']+data[0]['MEMBER_ADDRESS.ADDR']+"  "+data[0]['MEMBER_ADDRESS.ZIP_CODE'];
            var name=data[0]['MEMBER_ADDRESS.NAME'];
            var mobile=data[0]['MEMBER_ADDRESS.MOBILE'];
            $scope.address=address;
            $scope.name=name;
            $scope.mobile=mobile;
            console.log(address);

        }, null);
    };

    $scope.initLoad();

});

