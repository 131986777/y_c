angular.module('AndSell.Main').controller('card_card_cardType_Controller', function ($scope, $stateParams, cardFactory, modalFactory) {

    modalFactory.setTitle('会员卡类型');

    $scope.initLoad = function () {

        cardFactory.getCardSourceList().get({}, function (repsonce) {
            console.log(repsonce);
            $scope.cardSourceList = repsonce.data;

            $scope.sourceMap=new Map();

           for ( var i=0;i<$scope.cardSourceList.length;i++){


               $scope.sourceMap.set($scope.cardSourceList[i]['MEMBER_CARD_SOURCE.ID'],$scope.cardSourceList[i]['MEMBER_CARD_SOURCE.NAME']);


              // console.log("对象2为"+ $scope.sourceMap.get($scope.cardSourceList[i]['MEMBER_CARD_SOURCE.ID']));

           }




           $scope.queryCardBySource($scope.cardSourceList[0]['MEMBER_CARD_SOURCE.ID']);


        }, null);


    };

    $scope.tabClick=function (cardSource) {
        $scope.add['MEMBER_CARD_TYPE.CARD_SOURCE_ID']=cardSource;
        $scope.cardSourceId=cardSource;
        $scope.queryCardBySource(cardSource);

}
    $scope.queryCardBySource = function (cardSource) {
        // alert(cardSource);

        cardFactory.getCardListBySource(cardSource).get({}, function (repsonce) {
            console.log(repsonce);
            $scope.cardList = repsonce.data;
            $scope.cardListLeft=new Array();
            $scope.cardListRight=new Array();
            /*var index = $scope.cardList.length % 2;
            var size = $scope.cardList.length / 2;
            if (index == 0) {   //数组长度为偶数
                $scope.cardListLeft = $scope.cardList.slice(0, size);   //0 1 2 3  ：2
                $scope.cardListRight = $scope.cardList.slice(size, $scope.cardList.length);
                console.log($scope.cardListLeft);

            } else {  //数组长度为奇数
                $scope.cardListLeft = $scope.cardList.slice(0, size + 1);   //0 1 2 3 4 ：2
                $scope.cardListRight = $scope.cardList.slice(size + 1, $scope.cardList.length);
                console.log("left" + $scope.cardListLeft + 'right' + $scope.cardListRight);
            }*/

            for(i in  $scope.cardList){
                if(i%2==0){       //偶数
                    $scope.cardListLeft.push($scope.cardList[i]);
                }else{  //奇数
                    $scope.cardListRight.push($scope.cardList[i]);
                }
            }

        }, null);

    }


    $scope.initLoad();
    $scope.addCardType = function () {
        console.log($scope.add);

        cardFactory.addCardType($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $("#cardType").modal('hide');
               // $scope.initLoad();
                $scope.add={};
                $scope.add['MEMBER_CARD_TYPE.CARD_SOURCE_ID']=$scope.cardSourceId;
                $scope.queryCardBySource( $scope.cardSourceId);

            }

        });
    };

    $scope.selectCardColor = function (color) {

        //alert(color);
        $scope.add['MEMBER_CARD_TYPE.BG_COLOR'] = color;
    }

    $scope.deleteCardType=function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            cardFactory.delCardType(id).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");

                   // $scope.initLoad();
                    $scope.queryCardBySource($scope.cardSourceId);

                }
            });
        });
    }

    $scope.modifyCardTypeClick = function (item) {
        $scope.modify=clone(item);
        $scope.modifyId=item['MEMBER_CARD_TYPE.ID'];


    };


    $scope.modifyCardType = function () {
        $scope.modify['MEMBER_CARD_TYPE.ID'] =  $scope.modifyId;

        cardFactory.modifyCardTypeById ().get($scope.modify, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyCardType").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.queryCardBySource($scope.cardSourceId);
            }
        });
    };

});
