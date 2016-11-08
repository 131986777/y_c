angular.module('AndSell.Main').controller('shop_shop_district_districtList_Controller', function ($scope, $stateParams, districtFactory, modalFactory) {

    modalFactory.setTitle('区域管理');

    $scope.initLoad = function () {

        var form = {};
        //目前serviceId都设为1
        form['DISTRICT.SERVICE_ID'] = 1;

        districtFactory.getDistrictList(form).get({}, function (response) {
            console.log(response);
            $scope.districtList = response.data;
        }, null);
    };
    $scope.initLoad();

    $scope.addDistrict = function () {

        if ($scope.add['DISTRICT.DISTRICT_NAME'] == undefined || $scope.add['DISTRICT.DISTRICT_NAME'] == "") {
            modalFactory.showShortAlert("请填写区域名称");
            return
        }
        $scope.add['DISTRICT.SERVICE_ID'] = 1;
        districtFactory.addDistrict($scope.add).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#addDistrict").modal('hide');
                modalFactory.showShortAlert('新增成功');
                $scope.initLoad();
                $scope.add['DISTRICT.DISTRICT_NAME'] = "";
            }
        });
    };

    $scope.modifyDistrictNameClick = function (item) {
        $scope.modify = clone(item);
    };

    $scope.modifyDistrict = function () {
        $scope.modify['DISTRICT.SERVICE_ID'] = 1;
        console.log($scope.modify);
        districtFactory.modDistrictById().get($scope.modify, function (response) {
            if (response.code != undefined && response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#modifyDistrict").modal('hide');
                modalFactory.showShortAlert("修改成功");
                $scope.initLoad();
            }
        });
    };

    $scope.delDistrict = function (value) {

        modalFactory.showAlert("确认删除区域：［"+value['DISTRICT.DISTRICT_NAME']+"］吗?", function () {
            districtFactory.delById(value).get({}, function (response) {
                if (response.extraData.state = 'true') {
                    modalFactory.showShortAlert("删除成功");
                    $scope.initLoad();
                }
            });
        });

    }

});
