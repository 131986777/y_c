AndSellMainModule.controller('MemberCardController', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户详情');

    modalFactory.setBottom(true);

    $scope.memberId = $stateParams.id;
    console.log("这是客户的id：" + $scope.memberId);

    $scope.initLoad = function () {
        //var sourceID,typeID;
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
            $scope.sourceID=data[0]['MEMBER_CARD.SOURCE_ID'];
            $scope.typeID=data[0]['MEMBER_CARD.TYPE_ID'];
         //   console.log(sourceID+" "+typeID);

            $scope.cardNum=cardNum;
            $scope.cardName=cardName;
            $scope.faceValue=faceValue;
            $scope.balance=balance;
            $scope.addDatatime=addDatatime;
            $scope.freezeBalance=freezeBalance;

            memberFactory.getMembercardSource($scope.sourceID).get({},function (response) {
               // console.log('1111');
                console.log(response.data);
                $scope.cardSource=response.data[0]['MEMBER_CARD_SOURCE.NAME'];

            },null);

            memberFactory.getMembercardType($scope.typeID).get({},function (response) {
               // console.log('2222');
                console.log(response.data);
                $scope.cardType=response.data[0]['MEMBER_CARD_TYPE.NAME'];
            },null);


        }, null);



    };

    $scope.initLoad();

});

