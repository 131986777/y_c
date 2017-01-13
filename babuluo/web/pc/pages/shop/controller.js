angular.module('AndSell.PC.Main').controller('pages_shop_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("订单列表");

    modalFactory.setHeader(false);
    $(".store").click(function () {
        $(".store").removeClass("active");
        $(".yang").removeClass("choosed");
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find(".yang").removeClass("choosed");
        } else {
            $(this).addClass("active");
            $(this).find(".yang").addClass("choosed");
        }
    });
    $(".storeArea").click(function () {

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find(".yang").removeClass("choosed");
        } else {
            $(this).addClass("active");
            $(this).find(".yang").addClass("choosed");
        }
    });
});
