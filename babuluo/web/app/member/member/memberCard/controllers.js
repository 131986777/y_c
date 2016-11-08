angular.module('AndSell.Main').controller('member_member_memberCard_Controller', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户会员卡信息');

    modalFactory.setBottom(false);

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

    $scope.initLoad = function () {
        //var sourceID,typeID;
        $scope.cardSourceList = new Array();
        $scope.cardTypeList = new Array();
        memberFactory.getMembercardInfo($scope.memberId).get({}, function (response) {
            console.log(response);
            $scope.cardInfoList = response.data;
        }, null);
    };
    $scope.initLoad();

});

