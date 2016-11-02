AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    /**
     * 这里设置所有的跳转路径
     */

    $stateProvider
        .state("memberList", {
            url: "/memberList",
            params: {keyword: ''},
            templateUrl: "/AndSell/app/member/member/memberList/index.jsp",
            controller: "memberListController"
        })
        .state("memberInfo", {
            url: "/memberInfo",
            params: {id: 0},
            templateUrl: "/AndSell/app/member/member/memberInfo/index.jsp",
            controller: "MemberInfoController"
        })
        .state("memberData", {
            url: "/memberData",
            params: {id: 0},
            templateUrl: "/AndSell/app/member/member/memberData/index.jsp",
            controller: "MemberDataController"
        })
        .state("memberAccount", {
            url: "/memberAccount",
            params: {id: 0},
            templateUrl: "/AndSell/app/member/member/memberAccount/index.jsp",
            controller: "MemberAccountController"
        })
        .state("memberAddress", {
            url: "/memberAddress",
            params: {id: 0},
            templateUrl: "/AndSell/app/member/member/memberAddress/index.jsp",
            controller: "MemberAddressController"
        })
        .state("memberCard", {
            url: "/memberCard",
            params: {id: 0},
            templateUrl: "/AndSell/app/member/member/memberCard/index.jsp",
            controller: "MemberCardController"
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
        .state("memberCouponList", {
            url: "/memberCouponList",
            templateUrl: "/AndSell/app/member/member/memberCoupon/index.html",
            controller: "MemberCoupon"
        })
});