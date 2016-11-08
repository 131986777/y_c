AndSellMainModule.config(function ($stateProvider, $urlRouterProvider) {

    /**
     * 这里设置所有的跳转路径
     */

    $stateProvider
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

$import('member/member/memberList');
$import('member/member/memberInfo',{id: ''});
$import('member/member/memberData',{id: ''});
$import('member/member/memberAccount',{id: ''});
$import('member/member/memberAddress',{id: ''});
$import('member/member/memberCard',{id: ''});