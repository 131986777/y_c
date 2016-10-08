AndSellMainModule.controller('cardTypeController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('会员卡类型');

  $scope.initLoad = function () {
    unitFactory.getPrdUnitList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productUnitList = repsonce.data;
    }, null);
  };
  $scope.initLoad();


});
