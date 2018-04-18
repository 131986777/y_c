angular.module('AndSell.Main').controller('marketing_banner_bannerPosition_Controller', function ($scope, $stateParams, bannerFactory, modalFactory) {

    modalFactory.setTitle('横幅位置列表');

    $scope.bindData = function (response) {
        $scope.bannerPositionList = {};
        $scope.bannerPositionList = response.data;

    };
    $scope.detailClick = function (item) {
        $scope.detail = item;
    }

    $scope.addBannerPosition = function () {
        bannerFactory.addBannerPos($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = {};
            $("#addPos").modal('hide');
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };
    $scope.modifyClick = function (item) {

        $scope.mod = clone(item);

    };

    $scope.modBannerPosition = function () {
        console.log($scope.mod);
        bannerFactory.modifyBannerPos($scope.mod, function (response) {
            $("#bannerPosMod").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delPosition = function (item) {
        modalFactory.showAlert("确认删除吗?", function () {
            bannerFactory.delBannerPosById(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });

    }

});
