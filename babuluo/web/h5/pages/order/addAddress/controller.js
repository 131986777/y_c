angular.module('AndSell.H5.Main').controller('pages_order_addAddress_Controller', function ($scope, $state, $stateParams, weUI, orderFactory, modalFactory) {

    modalFactory.setTitle('收货/提货信息');
    modalFactory.setBottom(false);

    $scope.initData = function () {

        $scope.addressType = '3';
        $scope.PickupPerson = {};

        $scope.shop = JSON.parse(getCookie('currentShopInfo'))['SHOP.SHOP_NAME'];
        //document.getElementById('datetime-picker').value = getNowFormatDate();
        document.getElementById('city-picker').value = '江苏省 南京市 ';

        $scope.date=$scope.setTime();

    };


    $scope.setTime= function () {
        var fDate = new Date();

        var ifToday = true;
        var modeTime = true;
        var ifEarly = false;
        if (fDate.getHours() >= 19) {
            ifToday = false;
        } else if (fDate.getHours() == 18) {
            if (fDate.getMinutes() >= 30) {
                modeTime = false;
            }
        }
        if (fDate.getHours() < 7) {
            ifEarly = true;
        } else if (fDate.getHours() == 7) {
            if (fDate.getMinutes() < 30) {
                ifEarly = true;
            }
        }

        var fDate2 = new Date(fDate.getTime());
        if (modeTime) {
            fDate2 = new Date(fDate.getTime() + 30 * 60 * 1000);
        }
        var todDate =  fDate2.getFullYear() + "-" + ifLessTen((fDate2.getMonth() + 1)) + "-" + ifLessTen(fDate2.getDate()) + " " + ifLessTen(fDate2.getHours()) + ":" + ifLessTen(fDate2.getMinutes()) + "-19:00";

        var fDate3 = new Date(fDate.getTime());
        var todDate2 =  fDate3.getFullYear() + "-" + ifLessTen((fDate3.getMonth() + 1)) + "-" + ifLessTen(fDate3.getDate()) + " 08:00-19:00";

        var nDate = new Date(fDate.getTime() + 24 * 60 * 60 * 1000);
        var tmoDate =  nDate.getFullYear() + "-" + ifLessTen((nDate.getMonth() + 1)) + "-" + ifLessTen(nDate.getDate()) + " 08:00-19:00";

        if(ifToday&&ifEarly){
            return todDate2;
        }else if(ifToday){
           return todDate;
        }else{
            return tmoDate;
        }
    }


    $scope.submit = function () {
        $scope.PickupPerson = {
            man: $scope.man,
            phone: $scope.phone,
            shop: $scope.shop,
            type: $scope.addressType,
            shengshi: document.getElementById('city-picker').value,
            address: $scope.address,
            getTime: $scope.date
        };
        setCookie("pickupPerson", JSON.stringify($scope.PickupPerson));

        $state.go('pages/order/add', {
            SKU_IDS: $stateParams.SKU_IDS
        });
    };

    $(".datetime-picker").datetimePicker({
        title: '请选择时间',
        min: (function () {
            var minTime,
                year,
                month,
                day,
                minTimeString;

            function formatNum(num) {
                return num < 10 ? '0' + num : num;
            }

            minTime = new Date();
            minTime.setDate(minTime.getDate() + 2); // 推迟2天
            year = minTime.getFullYear();
            month = formatNum(minTime.getMonth() + 1);
            day = formatNum(minTime.getDate());
            minTimeString = year + '-' + month + '-' + day;

            return minTimeString;
        })(),
        times: function () {
            return [  // 自定义的时间
                {
                    values: ['08:00-19:00', $scope.nextHours + '-19:00']
                }
            ];
        }
    });



    $("#city-picker").cityPicker({
        title: "请选择所在地区"
    });
});

