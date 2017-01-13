  /**
 * Created by njwb on 2017/1/13.
 */
  angular.module('AndSell.PC.Main').controller('pages_personal_pay_Controller', function (productFactory, $interval, $scope, $state, modalFactory, balanceFactory) {

      modalFactory.setTitle("微信支付");

      modalFactory.setHeader(false);

      modalFactory.setSide(true);
      modalFactory.setCateGory(true);
      $(".zhifu").click(function () {
          $(".zhifu").removeClass("active");
          $(".yang").removeClass("choosed");
          if ($(this).hasClass("active")) {
              $(this).removeClass("active");
              $(this).find(".yang").removeClass("choosed");
          } else {
              $(this).addClass("active");
              $(this).find(".yang").addClass("choosed");
          }
      });
      $scope.chooseModal=function () {
          $scope.ifShow=true;
      }
      $scope.close=function () {
          $scope.ifShow=false;
          $scope.ifShowhuiyuan=false;
      }
      $scope.chooseHuiyuan=function () {
          $scope.ifShowhuiyuan=true;
      }
  });