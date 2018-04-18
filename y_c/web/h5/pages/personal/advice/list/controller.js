angular.module('AndSell.H5.Main').controller('pages_personal_advice_list_Controller', function ($scope, $state, personalFactory, weUI, modalFactory) {

    modalFactory.setTitle("我的建议");
    modalFactory.setBottom(false);

    $scope.initData = function () {
        personalFactory.getMyAdvice({}, function (response) {
            if (response.code == 0 && response.msg == "ok"){
                $scope.adviceList = response.data;
            }
        });
    }
});




