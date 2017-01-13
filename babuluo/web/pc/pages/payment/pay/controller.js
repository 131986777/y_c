angular.module('AndSell.PC.Main').controller('pages_payment_pay_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("订单支付");
    modalFactory.setHeader(false);
    modalFactory.setShowMenu(true);
    modalFactory.setTab(true);

    $(".zhifu").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find(".yang").removeClass("choosed");
        } else {
            $(this).addClass("active");
            $(this).find(".yang").addClass("choosed");
        }
    });
    });
