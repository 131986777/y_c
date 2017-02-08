angular.module('AndSell.H5.Main').controller('pages_personal_advice_Controller', function ($scope, $state, personalFactory, weUI, modalFactory) {

    modalFactory.setTitle("投诉与建议");
    modalFactory.setBottom(false);

    $scope.addAdvice = function () {
        if ($scope.CONTENT != undefined) {
            personalFactory.addAdvice({"GUESTBOOK.GUESTBOOK_CONTENT": $scope.CONTENT}, function (response) {
                if (response.code == 0 && response.msg == "ok") {
                    weUI.toast.ok("我们已收到您的建议或者意见，请耐心等待回复。");
                    $state.go('pages/personal');
                } else {
                    weUI.toast.error("提交建议或者意见失败");
                }
            });
        } else {
            weUI.toast.error("请输入您的建议或者意见");
        }

    }
});




