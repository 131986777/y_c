angular.module('AndSell.Main').controller('sys_comment_Controller', function ($scope, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('评论管理');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        $scope.smsLogList = response.data;
    };

    $scope.query = function () {
        $scope.filter['SMS_LOG.QUERY'] = $scope.queryContent;
    }

});

