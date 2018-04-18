angular.module('AndSell.Main').controller('product_tag_tagList_Controller', function ($scope, $stateParams, tagFactory, modalFactory) {

    modalFactory.setTitle('商品标签管理');

    $scope.initLoad = function () {
        tagFactory.getPrdTagList({}, function (repsonce) {
            $scope.productTagList = repsonce.data;
        });
    };
    $scope.initLoad();

    $scope.addProductTag = function () {

        console.log($scope.add);
        $scope.add['SHOP_TAG.SERVICE_ID'] = 1;
        if ($scope.add['SHOP_TAG.TAG'] == '') {
            modalFactory.showShortAlert("请填写标签名称");
            return;
        }
        tagFactory.addPrdTag($scope.add, function (response) {
            $("#addTag").modal('hide');
            modalFactory.showShortAlert('新增成功');
            $scope.initLoad();
            $scope.add['SHOP_TAG.TAG'] = "";
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });

    };

    $scope.modifyTagNameClick = function (item) {

        $scope.modify = clone(item);
        console.log('in');
    };

    $scope.modifyProductTag = function () {
        $scope.modify['SHOP_TAG.SERVICE_ID'] = 1;
        tagFactory.modifyPrdTag($scope.modify, function (response) {
            $("#modifyTag").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.delProductTag = function (id) {
        modalFactory.showAlert("确认删除吗?", function () {
            tagFactory.delPrdTag({'SHOP_TAG.TAG_ID': id}, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.initLoad();
            });
        });

    }

});
