angular.module('AndSell.Main').controller('sys_advice_Controller', function ($scope, modalFactory, adviceFactory) {

    //设置页面Title
    modalFactory.setTitle('建议与投诉');

    modalFactory.setBottom(false);

    $scope.waitBack = 0;
    $scope.reply = {};

    $scope.bindData = function (response) {

        $scope.adviceList = response.data;
        if ($scope.filter['GUESTBOOK.STATE'] == 'null') {
            var num = 0;
            response.data.forEach(function (ele) {
                if (ele['GUESTBOOK.STATE'] == -1) {
                    num++;
                }
            });
            $scope.waitBack = num;
        }
    };

    $scope.replyGuestbook = function () {
        adviceFactory.replyAdvice($scope.reply, function (response) {
            if (response.code == 0 && response.msg == "ok") {
                modalFactory.showShortAlert("回复成功");
                $("#reply").modal('hide');
                $scope.$broadcast('pageBar.reload');
            } else {
                modalFactory.showShortAlert("回复失败，" + response.msg);
            }
        });
    }

    $scope.delGuestbook = function (advice) {
        modalFactory.showAlert("是否删除该条留言？", function () {
            adviceFactory.delAdvice(advice, function (response) {
                if (response.code == 0 && response.msg == "ok") {
                    modalFactory.showShortAlert("删除留言成功");
                    $scope.$broadcast('pageBar.reload');
                } else {
                    modalFactory.showShortAlert("删除留言失败，" + response.msg);
                }
            });
        });

    }
});

