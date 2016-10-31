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
        .state("userModify", {
            url: "/userModify",
            params: {id: 0},
            templateUrl: "/AndSell/app/user/user/userModify/index.jsp",
            controller: "userModifyController"
        })
        .state("roleList", {
            url: "/roleList",
            templateUrl: "/AndSell/app/user/role/roleList/index.jsp",
            controller: "roleListController"
        })
        .state("roleAdd", {
            url: "/roleAdd",
            templateUrl: "/AndSell/app/user/role/roleAdd/index.jsp",
            controller: "roleAddController"
        })
        .state("roleModify", {
            url: "/roleModify",
            params: {id: 0},
            templateUrl: "/AndSell/app/user/role/roleModify/index.jsp",
            controller: "roleModifyController"
        })
});