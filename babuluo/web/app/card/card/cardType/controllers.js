AndSellMainModule.controller('cardTypeController', function ($scope, $stateParams, unitFactory, modalFactory) {

  modalFactory.setTitle('会员卡类型');

  $scope.initLoad = function () {
   /* unitFactory.getPrdUnitList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.productUnitList = repsonce.data;
    }, null);*/
    unitFactory.getCardSourceList().get({}, function (repsonce) {
      console.log(repsonce);
      $scope.cardSourceList = repsonce.data;
    }, null);
  };
  $scope.initLoad();


  $scope.addCardType = function () {
    console.log($scope.add);

    unitFactory.addCardType($scope.add).get({}, function (response) {

      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
        $scope.add='';
        $("#cardType").modal('hide');
        $scope.initLoad();

      }

    });
  };

  $scope.selectCardColor=function(color){

   //alert(color);
    $scope.add['MEMBER_CARD_TYPE.BG_COLOR']=color;
  }

});
