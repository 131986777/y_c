AndSellMainModule.controller('cardListController', function ($scope, $stateParams, cardFactory, modalFactory) {

    modalFactory.setTitle('已开会员卡');

    // $scope.initLoad = function () {
    //     cardFactory.getMemberCardList().get({}, function (response) {
    //         console.log(response);
    //         $scope.cardList = response.data;
    //     }, null);
    // };
    // $scope.initLoad();
    $scope.cardAdd = {};

    $scope.bindData = function (response) {
        $scope.cardList = response.data;
        $scope.sourceList = response.extraData.sourceList;
        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.typeListMap = response.extraData.typeListMap;
        console.log(response);
    };

    $scope.queryMemberById = function (memberId) {
        $scope.memberDetail = $scope.userDetailMap[memberId];
        console.log($scope.memberDetail);
        if ($scope.memberDetail == undefined) {
            modalFactory.showAlert("未找到该客户");
        }
    };

    $scope.queryTypeBySourceId = function (sourceId) {
        $scope.typeList = $scope.typeListMap[sourceId];
        $scope.filter['MEMBER_CARD.TYPE_ID'] = 'null';
        console.log($scope.typeList);
    };

    $scope.addQueryTypeBySourceId = function (sourceId) {
        $scope.typeListAdd = $scope.typeListMap[sourceId];
        $scope.cardAdd['MEMBER_CARD.TYPE_ID'] = 'null';
        console.log($scope.typeListAdd);
    };

    $scope.addCard = function () {
        if ($scope.memberDetail == undefined) {
            modalFactory.showAlert("未选择客户");
            return;
        }
        $scope.cardAdd['MEMBER_CARD.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];
        if ($scope.IS_FACE_VALUE == false) {
            $scope.cardAdd['MEMBER_CARD.IS_FACE_VALUE'] = -1;
            $scope.cardAdd['MEMBER_CARD.FACE_VALUE'] = 0;
        } else {
            $scope.cardAdd['MEMBER_CARD.IS_FACE_VALUE'] = 1;
            if ($scope.cardAdd['MEMBER_CARD.FACE_VALUE'] < $scope.cardAdd['MEMBER_CARD.BALANCE']) {
                modalFactory.showAlert("可用余额不可大于面额！");
                return;
            }
        }
        if ($scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'] == undefined) {
            $scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'] = 0;
        }
        console.log($scope.cardAdd);
        cardFactory.addMemberCard($scope.cardAdd).get({}, function (response) {
            if (response.extraData.state == 'true') {
                $("#cardList").modal('hide');
                $scope.clearForm();
                $scope.$broadcast('pageBar.reload');
            }
        }, null);
    };

    //用于清除填写的内容
    $scope.clearForm = function () {
        $scope.cardAdd['MEMBER_CARD.SOURCE_ID'] = "null";
        $scope.cardAdd['MEMBER_CARD.TYPE_ID'] = "null";
        $scope.cardAdd['MEMBER_CARD.CARD_NO'] = undefined;
        $scope.cardAdd['MEMBER_CARD.FACE_VALUE'] = undefined;
        $scope.cardAdd['MEMBER_CARD.CARD_NO'] = undefined;
        $scope.cardAdd['MEMBER_CARD.BALANCE'] = undefined;
        $scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'] = undefined;
        $scope.IS_FACE_VALUE = false;
        $scope.memberId = undefined;
        $scope.memberDetail = {};
    };

});
