angular.module('AndSell.Main').controller('shop_shop_district_districtList_Controller', function ($scope, $stateParams, districtFactory, modalFactory) {

    modalFactory.setTitle('区域管理');

    $scope.initLoad = function () {
        var form = {};
        //目前serviceId都设为1
        form['DISTRICT.SERVICE_ID'] = 1;
        districtFactory.getDistrictList(form, function (response) {
            $scope.districtList = response.data;
        });
    };
    $scope.initLoad();

    $scope.addDistrict = function () {

        if ($scope.add['DISTRICT.DISTRICT_NAME']
            == undefined
            || $scope.add['DISTRICT.DISTRICT_NAME']
            == "") {
            modalFactory.showShortAlert("请填写区域名称");
            return
        }
        $scope.add['DISTRICT.SERVICE_ID'] = 1;
        districtFactory.addDistrict($scope.add, function (response) {
            $("#addDistrict").modal('hide');
            modalFactory.showShortAlert('新增成功');
            $scope.initLoad();
            $scope.add['DISTRICT.DISTRICT_NAME'] = "";
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyDistrictNameClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyDistrict = function () {
        $scope.modify['DISTRICT.SERVICE_ID'] = 1;

        districtFactory.modDistrictById($scope.modify, function (response) {
            $("#modifyDistrict").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delDistrict = function (value) {
        modalFactory.showAlert("确认删除区域：［" + value['DISTRICT.DISTRICT_NAME'] + "］吗?", function () {
            districtFactory.delById(value, function (response) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });
    }

});
