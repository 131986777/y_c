AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    /**
     * 这里设置所有的跳转路径
     */

    $stateProvider
        .state("memberList", {
            url: "/memberList",
            templateUrl: "/AndSell/app/member/member/memberList/index.jsp",
            controller: "memberListController"
        })

        .state("memberSourceList", {
            url: "/memberSourceList",
            templateUrl: "/AndSell/app/member/code/codeList/index.jsp",
            controller: "MemberSourceController"
        })
        .state("memberTypeList", {
            url: "/memberTypeList",
            templateUrl: "/AndSell/app/member/code2/code2List/index.jsp",
            controller: "MemberTypeController"
        })

});