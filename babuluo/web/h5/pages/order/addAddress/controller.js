AndSellH5MainModule.controller('H5.OrderAddAddressController', function ($scope, $state, $stateParams, weUI, orderFactory, modalFactory) {

    modalFactory.setTitle('收货/提货信息');
    modalFactory.setBottom(false);

    $scope.initData = function () {

        $scope.addressType = '1';
        $scope.pickupTime = getNowFormatDate();
        $scope.PickupPerson = {};

        $scope.shop = JSON.parse(getCookie('currentShopInfo'))['SHOP.SHOP_NAME'];
    };

    $scope.submit = function () {
        $scope.PickupPerson = {
            man: $scope.man,
            phone: $scope.phone,
            time: $scope.pickupTime,
            shop: $scope.shop
        };

        console.log($scope.PickupPerson);
        $state.go('order-add', {pickupPerson: $scope.PickupPerson, SKU_IDS: $stateParams.SKU_IDS});
    };

    // $(".datetime-picker").datetimePicker({
    //     title: '请选择时间',
    //     min: (function() {
    //         var minTime,
    //             year,
    //             month,
    //             day,
    //             minTimeString;
    //
    //         function formatNum(num) {
    //             return num < 10 ? '0' + num : num;
    //         }
    //
    //         minTime = new Date();
    //         minTime.setDate(minTime.getDate() + 2); // 推迟2天
    //         year = minTime.getFullYear();
    //         month = formatNum(minTime.getMonth() + 1);
    //         day = formatNum(minTime.getDate());
    //         minTimeString = year + '-' + month + '-' + day;
    //
    //         return minTimeString;
    //     })(),
    //     times: function () {
    //         return [  // 自定义的时间
    //             {
    //                 values: ['7:00-18:00']
    //             }
    //         ];
    //     }
    // });
    //
    // $("#city-picker").cityPicker({
    //     title: "请选择所在地区"
    // });
});

// AndSellH5MainModule.directive('convertToNumber', function() {
//     return {
//         require: 'ngModel',
//         link: function(scope, element, attrs, ngModel) {
//             ngModel.$parsers.push(function(val) {
//                 return parseInt(val, 10);
//             });
//             ngModel.$formatters.push(function(val) {
//                 return '' + val;
//             });
//         }
//     };
// });
