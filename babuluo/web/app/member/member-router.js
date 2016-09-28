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
        .state("memberDetails", {
            url: "/memberDetails",
            templateUrl: "/AndSell/app/member/member/memberDetails/index.jsp",
            controller: "MemberDetailsController"
        })
        .state("memberSourceList", {
            url: "/memberSourceList",
            templateUrl: "/AndSell/app/member/source/sourceList/index.jsp",
            controller: "MemberSourceController"
        })
        .state("memberTypeList", {
            url: "/memberTypeList",
            templateUrl: "/AndSell/app/member/type/typeList/index.jsp",
            controller: "MemberTypeController"
        })
        .state("memberGroupList", {
            url: "/memberGroupList",
            templateUrl: "/AndSell/app/member/group/groupList/index.jsp",
            controller: "MemberGroupController"
        })

});