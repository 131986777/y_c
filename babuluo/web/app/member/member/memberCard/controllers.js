AndSellMainModule.controller('MemberCardController', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户详情');

    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

    $scope.initLoad = function () {
        memberFactory.getMembercardInfo($scope.memberId).get({}, function (response) {
            console.log(response.data);

            var data=response.data;
            var cardNum=data[0]['MEMBER_CARD.CARD_ID'];
            var cardName=data[0]['MEMBER_CARD.CARD_NAME'];
            var isFaceVale=data[0]['IS_FACE_VALUE'];
            var faceValue=data[0]['MEMBER_CARD.FACE_VALUE'];
            var balance=data[0]['MEMBER_CARD.BALANCE'];    //可用余额
            var freezeBalance=data[0]['MEMBER_CARD.FREEZE_BALANCE'];
            var addDatatime=data[0]['MEMBER_CARD.ADD_DATETIME'];
            var sourceID=data[0]['MEMBER_CARD.SOURCE_ID'];
            var typeID=data[0]['MEMBER_CARD.TYPE_ID'];

           // var address=data[0]['MEMBER_CARD.ADDR_GUO']+data[0]['MEMBER_ADDRESS.ADDR_SHENG']+data[0]['MEMBER_ADDRESS.ADDR_SHI']+data[0]['MEMBER_ADDRESS.ADDR_XIAN']+data[0]['MEMBER_ADDRESS.ADDR_QU']+data[0]['MEMBER_ADDRESS.ADDR']+"  "+data[0]['MEMBER_ADDRESS.ZIP_CODE'];
            //var name=data[0]['MEMBER_ADDRESS.NAME'];
            //var mobile=data[0]['MEMBER_ADDRESS.MOBILE'];
            $scope.cardNum=cardNum;
            $scope.cardName=cardName;
            $scope.faceValue=faceValue;
            $scope.balance=balance;
            $scope.addDatatime=addDatatime;
            $scope.freezeBalance=freezeBalance;


            console.log(address);

        }, null);

    };

    $scope.initLoad();

});

