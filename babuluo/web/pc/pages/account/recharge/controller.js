/**
 * Created by njwb on 2017/1/12.
 */
angular.module('AndSell.PC.Main').controller('pages_account_recharge_Controller', function (productFactory, $interval, $scope, $state, modalFactory) {
    modalFactory.setTitle("充值中心");

    modalFactory.setHeader(false);

    modalFactory.setSide(true);

    modalFactory.setShowMenu(true);
    modalFactory.setTab(true);
    modalFactory.setLeftMenu(false);
    $(".zhifu").click(function () {
        $(".zhifu").removeClass("active");
        $(".yang").removeClass("choosed");
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $(this).find(".yang").removeClass("choosed");
        }else{
            $(this).addClass("active");
            $(this).find(".yang").addClass("choosed");
        }

    })



})
