angular.module('AndSell.Main').controller('member_member_memberAddress_Controller', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户收件地址');

    modalFactory.setBottom(false);

    $scope.memberId = $stateParams.id;

    $scope.initLoad = function () {
        console.log($scope.memberId);
        memberFactory.getMemberAddress($scope.memberId, function (response) {
            $scope.addressList=response.data;
        });
    };

    $scope.initLoad();

});

