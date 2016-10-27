AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("userList", {
            url: "/userList",
            templateUrl: "/AndSell/app/user/user/userList/index.jsp",
            controller: "userListController"
        })
        .state("userAdd", {
            url: "/userAdd",
            templateUrl: "/AndSell/app/user/user/userAdd/index.jsp",
            controller: "userAddController"
        })
});