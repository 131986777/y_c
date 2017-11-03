angular.module('AndSell.Main').controller('member_recharge_rechargeList_Controller', function ($q, http, $scope, $stateParams, cardFactory, memberFactory, balanceFactory, modalFactory, shopFactory) {
    modalFactory.setTitle('充值列表');
    modalFactory.setBottom(false);

    //获得所有资金明细
    $scope.bindData = function (response) {
        $scope.rechargeList = response.data;
        $scope.querySize = response.extraData.page.querySize;
        console.log($scope.rechargeList);
    };

    $scope.initData = function () {
        $scope.searchType = 'LOGIN_ID';
    }
    
    $scope.query = function () {
    	$scope.filter['SEARCH_TYPE'] = $scope.searchType;
        $scope.filter['QUERY_CONTENT'] = $scope.queryContent;

    };


});
