AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    /**
     * 这里设置所有的跳转路径
     */

    $stateProvider
        .state("demo-add", {
            url: "/demoAdd",
            templateUrl: "/AndSell/app/demo/demo/demoAdd/index.jsp",
            controller: "AddDemoController"
        })
        .state("demo-list", {
            url: "/demoList",
            params: {params1: 0, params2: 0},
            templateUrl: "/AndSell/app/demo/demo/demoList/index.jsp",
            controller: "DemoListController"
        })
        .state("demoModify", {
            url: "/demoModify",
            templateUrl: "/AndSell/app/demo/demo/demoModify/index.jsp",
            controller: "ModifyDemoController"
        })
        .state("demoOrder", {
            url: "/demoOrder",
            templateUrl: "/AndSell/app/demo/demo/demoOrder/index.jsp",
            controller: "OrderDemoController"
        })
        .state("demoFilter", {
            url: "/demoFilter",
            templateUrl: "/AndSell/app/demo/demo/demoOrder/index.jsp",
            controller: "OrderDemoController"
        })

});