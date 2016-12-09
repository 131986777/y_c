angular.module('AndSell.Main').controller('card_card_cardType_Controller', function ($scope, $stateParams, cardFactory, modalFactory) {

    modalFactory.setTitle('会员卡类型');

    $scope.initLoad = function () {

        cardFactory.getCardSourceList({}, function (repsonce) {
            $scope.cardSourceList = repsonce.data;
            $scope.sourceMap = new Map();
            for (var i = 0; i < $scope.cardSourceList.length; i++) {
                $scope.sourceMap.set($scope.cardSourceList[i]['MEMBER_CARD_SOURCE.ID'], $scope.cardSourceList[i]['MEMBER_CARD_SOURCE.NAME']);
            }
            $scope.queryCardBySource($scope.cardSourceList[0]['MEMBER_CARD_SOURCE.ID']);
        });

    };

    $scope.tabClick = function (cardSource) {
        $scope.add['MEMBER_CARD_TYPE.CARD_SOURCE_ID'] = cardSource;
        $scope.cardSourceId = cardSource;
        $scope.queryCardBySource(cardSource);

    };
    $scope.queryCardBySource = function (cardSource) {
        cardFactory.getCardListBySource({'MEMBER_CARD_TYPE.CARD_SOURCE_ID':cardSource}, function (repsonce) {
            $scope.cardList = repsonce.data;
        });
    }

    $scope.initLoad();
    $scope.addCardType = function () {
        cardFactory.addCardType($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $("#cardType").modal('hide');
            $scope.add = {};
            $scope.add['MEMBER_CARD_TYPE.CARD_SOURCE_ID'] = $scope.cardSourceId;
            $scope.queryCardBySource($scope.cardSourceId);
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.selectCardColor = function (color) {
        $scope.add['MEMBER_CARD_TYPE.BG_COLOR'] = color;
    }

    $scope.deleteCardType = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            cardFactory.delCardType({'MEMBER_CARD_TYPE.ID': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.queryCardBySource($scope.cardSourceId);

            });
        });
    }

    $scope.modifyCardTypeClick = function (item) {
        $scope.modify = clone(item);
        $scope.modifyId = item['MEMBER_CARD_TYPE.ID'];

    };

    $scope.modifyCardType = function () {
        $scope.modify['MEMBER_CARD_TYPE.ID'] = $scope.modifyId;

        cardFactory.modifyCardTypeById($scope.modify, function (response) {
            $("#modifyCardType").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.queryCardBySource($scope.cardSourceId);
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

});
