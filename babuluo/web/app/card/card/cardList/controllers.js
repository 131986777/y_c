AndSellMainModule.controller('cardListController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('已开会员卡');

  $scope.initLoad = function () {
    unitFactory.getPrdUnitList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productUnitList = repsonce.data;
    }, null);
  };
  $scope.initLoad();


});
