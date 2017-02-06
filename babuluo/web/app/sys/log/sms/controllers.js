angular.module('AndSell.Main').controller('sys_log_sms_Controller', function ($scope, modalFactory) {

    //设置页面Title
    modalFactory.setTitle('短信发送记录');

    modalFactory.setBottom(false);

    $scope.bindData = function (response) {
        $scope.smsLogList = response.data;
    };

    $scope.query = function () {
        $scope.filter['SMS_LOG.QUERY'] = $scope.queryContent;
    }

});

