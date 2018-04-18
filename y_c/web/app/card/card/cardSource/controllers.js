
angular.module('AndSell.Main').controller('card_card_cardSource_Controller', function ($scope, $stateParams, cardFactory, modalFactory) {

  modalFactory.setTitle('会员卡发布渠道');
  $scope.initLoad = function () {
    cardFactory.getCardSourceList({}, function (repsonce) {
      $scope.cardSourceList = repsonce.data;
    });
  };

  $scope.initLoad();


    $scope.addCardSource = function () {
    console.log($scope.add);

    cardFactory.addCardSource($scope.add, function (response) {
        modalFactory.showShortAlert('新增成功');
        $scope.add='';
        $scope.IS_DEF=false;
        $("#addSource").modal('hide');
        $scope.initLoad();
    }, function (response) {
      modalFactory.showShortAlert(response.msg);
    });
  };

  $scope.modifyCardSourceClick = function (item) {

    $scope.modify=clone(item);
    $scope.modifyId=item['MEMBER_CARD_SOURCE.ID'];
    //console.log('删除ID为'+modifyId);

  };

  $scope.modifyCardSource = function () {
    $scope.modify['MEMBER_CARD_SOURCE.ID'] =  $scope.modifyId;

    cardFactory.modifyCardSourceById($scope.modify, function (response) {
        $("#modifySource").modal('hide');
        modalFactory.showShortAlert("修改成功");
        $scope.initLoad();
    }, function (response) {
      modalFactory.showShortAlert(response.msg);
    });
  };

  $scope.deleteCardSource = function (id) {
    modalFactory.showAlert("确认删除吗?", function () {
      cardFactory.delCardSource({'MEMBER_CARD_SOURCE.ID':id}, function (res) {
          modalFactory.showShortAlert("删除成功");

          $scope.initLoad();
      });
    });

  }

});
