angular.module('AndSell.H5.Main').controller('pages_user_accountLogin_Controller', function ($http, $scope, $state, $stateParams, userFactory, modalFactory, weUI) {

    modalFactory.setTitle('登录');
    modalFactory.setBottom(false);

    $scope.login = function () {
        var form = $scope.memberInfo;
        //ajaxPost(baseURL+'/login/login','LOGIN_ID=pabula&PWD=A123456', function (response) {
        //    console.log(response);
        //});
        //$http.post(baseURL + '/login/login', $.param({
        //    'LOGIN_ID': 'pabula',
        //    'PWD': 'A123456'
        //}), {
        //    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //    'withCredentials': true
        //}).success(function (data) {
        //    console.log(data);
        //});
        userFactory.login(form).get({'withCredentials': true}, function (response) {
            if (response.code == 400) {
                weUI.toast.error(response.msg);
            } else {
                weUI.toast.info('登录成功');
                $state.go('pages/home');
            }
        });
    }

});




