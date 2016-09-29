AndSellMainModule.controller('balanceListController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('资金明细');

  $scope.initLoad = function () {
    unitFactory.getPrdUnitList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productUnitList = repsonce.data;
    }, null);
  };
  $scope.initLoad();


});
