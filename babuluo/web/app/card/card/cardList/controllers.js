angular.module('AndSell.Main').controller('card_card_cardList_Controller', function ($scope, $stateParams, cardFactory, modalFactory) {

    modalFactory.setTitle('已开会员卡');

    $scope.cardAdd = {};
    $scope.isFaceValue = false;

    $scope.bindData = function (response) {
        $scope.cardList = response.data;
        $scope.sourceList = response.extraData.sourceList;
        $scope.userDetailMap = response.extraData.userDetailMap;
        $scope.typeMap = response.extraData.typeMap;
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
        if ($scope.isFaceValue == false) {
            $scope.cardAdd['MEMBER_CARD.IS_FACE_VALUE'] = -1;
            $scope.cardAdd['MEMBER_CARD.FACE_VALUE'] = 0;
        } else {
            $scope.cardAdd['MEMBER_CARD.IS_FACE_VALUE'] = 1;
            if ($scope.cardAdd['MEMBER_CARD.FACE_VALUE'] - $scope.cardAdd['MEMBER_CARD.BALANCE'] < 0) {
                modalFactory.showAlert("可用余额不可大于面额！");
                return;
            }
        }
        if ($scope.isNull($scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'])) {
            $scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'] = 0;
        }
        cardFactory.addMemberCard($scope.cardAdd).get({}, function (response) {
            if (response.extraData.state == 'true') {
                $("#cardList").modal('hide');
                $scope.clearForm();
                $scope.$broadcast('pageBar.reload');
            } else {
                if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                    modalFactory.showShortAlert(response.msg);
                }
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
        $scope.isFaceValue = false;
        $scope.memberId = undefined;
        $scope.memberDetail = {};
    };

    $scope.query = function () {


        $scope.Member = {};
        if ($scope.isNotNull($scope.query['MEMBER_CARD.CARD_NO'])) {
            $scope.filter['MEMBER_CARD.CARD_NO'] = $scope.query['MEMBER_CARD.CARD_NO'];
        } else {
            $scope.filter['MEMBER_CARD.CARD_NO'] = "null";
        }
        if ($scope.isNotNull($scope.query['MEMBER_CARD.MEMBER'])) {

            $scope.Member['MEMBER.LOGIN_ID'] = $scope.query['MEMBER_CARD.MEMBER'];
            $scope.Member['MEMBER.MOBILE'] = $scope.query['MEMBER_CARD.MEMBER'];
            cardFactory.getUIDByLOGINID($scope.Member).get({}, function (response) {
                if (response.data.length != 0) {
                    console.log(response.data);
                    $scope.filter['MEMBER_CARD.USER_ID'] = response.data[0]['MEMBER.USER_ID'];
                } else {
                    cardFactory.getUIDByMobile($scope.Member).get({}, function (response) {
                        if (response.data.length != 0) {
                            $scope.filter['MEMBER_CARD.USER_ID'] = response.data[0]['MEMBER.USER_ID'];
                        } else {
                            $scope.filter['MEMBER_CARD.USER_ID'] = -1;
                        }
                    }, null);
                }
            }, null);
        } else {
            $scope.filter['MEMBER_CARD.USER_ID'] = "null";
        }
    };

    $scope.isNull = function (str) {
        return str == null || str == '';
    };

    $scope.isNotNull = function (str) {
        return !$scope.isNull(str);
    };
});
