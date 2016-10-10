AndSellMainModule.controller('cardTypeController', function ($scope, $stateParams, unitFactory, modalFactory) {

    modalFactory.setTitle('会员卡类型');

    $scope.initLoad = function () {

        unitFactory.getCardSourceList().get({}, function (repsonce) {
            console.log(repsonce);
            $scope.cardSourceList = repsonce.data;

            $scope.sourceMap=new Map();

           for ( var i=0;i<$scope.cardSourceList.length;i++){


               $scope.sourceMap.set($scope.cardSourceList[i]['member_card_source.ID'],$scope.cardSourceList[i]['member_card_source.NAME']);


              // console.log("对象2为"+ $scope.sourceMap.get($scope.cardSourceList[i]['member_card_source.ID']));

           }




           $scope.queryCardBySource($scope.cardSourceList[0]['member_card_source.ID']);


        }, null);


    };


    $scope.queryCardBySource = function (cardSource) {
        // alert(cardSource);

        unitFactory.getCardListBySource(cardSource).get({}, function (repsonce) {
            console.log(repsonce);
            $scope.cardList = repsonce.data;

            var index = $scope.cardList.length % 2;
            var size = $scope.cardList.length / 2;
            if (index == 0) {   //数组长度为偶数
                $scope.cardListLeft = $scope.cardList.slice(0, size);   //0 1 2 3  ：2
                $scope.cardListRight = $scope.cardList.slice(size, $scope.cardList.length);
                console.log($scope.cardListLeft);

            } else {  //数组长度为奇数
                $scope.cardListLeft = $scope.cardList.slice(0, size + 1);   //0 1 2 3 4 ：2
                $scope.cardListRight = $scope.cardList.slice(size + 1, $scope.cardList.length);
                console.log("left" + $scope.cardListLeft + 'right' + $scope.cardListRight);
            }
        }, null);

    }


    $scope.initLoad();
    $scope.addCardType = function () {
        console.log($scope.add);

        unitFactory.addCardType($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add = '';
                $("#cardType").modal('hide');
                $scope.initLoad();

            }

        });
    };

    $scope.selectCardColor = function (color) {

        //alert(color);
        $scope.add['MEMBER_CARD_TYPE.BG_COLOR'] = color;
    }

    $scope.deleteCardType=function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            unitFactory.delCardType(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");

                    $scope.initLoad();
                }
            });
        });
    }

    $scope.modifyCardTypeClick = function (item) {
        $scope.modify=clone(item);
        $scope.modifyId=item['MEMBER_CARD_TYPE.ID'];
        console.log('修改ID为'+modifyId);

    };


    $scope.modifyCardType = function () {
        $scope.modify['MEMBER_CARD_TYPE.ID'] =  $scope.modifyId;

        unitFactory.modifyCardTypeById ().get($scope.modify, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyCardType").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.initLoad();
            }
        });
    };

});
