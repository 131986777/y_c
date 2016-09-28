AndSellMainModule.controller('pointListController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('积分管理');

  $scope.initLoad = function () {
    unitFactory.getPrdUnitList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productUnitList = repsonce.data;
    }, null);
  };
  $scope.initLoad();


});
