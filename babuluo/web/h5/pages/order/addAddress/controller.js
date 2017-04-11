angular.module('AndSell.H5.Main').controller('pages_order_addAddress_Controller', function ($scope, $state, $stateParams, weUI, orderFactory, modalFactory, appointmentFactory) {

    modalFactory.setTitle('收货/提货信息');
    modalFactory.setBottom(false);

    $scope.initData = function () {

        $scope.addressType = '3';
        $scope.PickupPerson = {};

        $scope.shop = JSON.parse(getCookie('currentShopInfo'))['SHOP.SHOP_NAME'];

        var param = {
            'APPOINTMENT_PRODUCT.SKU_ID': $stateParams.SKU_IDS
        };
        appointmentFactory.queryAll(param, function (response) {
            if (response.data.length > 0) {
                $scope.appointment = true;
                getDate(response.data[0]);
            } else {
                $scope.appointment = false;
                $scope.setTime();
            }
        });

    };

    $scope.setTime = function () {
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
        var todDate = fDate2.getFullYear()
            + "-"
            + ifLessTen((fDate2.getMonth() + 1))
            + "-"
            + ifLessTen(fDate2.getDate())
            + " "
            + ifLessTen(fDate2.getHours())
            + ":"
            + ifLessTen(fDate2.getMinutes())
            + "-19:00";

        var fDate3 = new Date(fDate.getTime());
        var todDate2 = fDate3.getFullYear()
            + "-"
            + ifLessTen((fDate3.getMonth() + 1))
            + "-"
            + ifLessTen(fDate3.getDate())
            + " 08:00-19:00";

        var nDate = new Date(fDate.getTime() + 24 * 60 * 60 * 1000);
        var tmoDate = nDate.getFullYear()
            + "-"
            + ifLessTen((nDate.getMonth() + 1))
            + "-"
            + ifLessTen(nDate.getDate())
            + " 08:00-19:00";

        var dayList = new Array;
        if (ifToday && ifEarly) {
            dayList.push(todDate2);
        } else if (ifToday) {
            dayList.push(todDate);
        } else {
            dayList.push(tmoDate);
        }

        $("#datetime-picker").picker({
            title: "请选择取货日期", cols: [{
                textAlign: 'center', values: dayList
            }]
        });
        $scope.date = dayList[0];
    }

    $scope.submit = function () {
        $scope.PickupPerson = {
            man: $scope.man,
            phone: $scope.phone,
            shop: $scope.shop,
            type: $scope.addressType,
            shengshi: $scope.area,
            address: $scope.address,
            getTime: $("#datetime-picker")[0].value,
            skuIds:$stateParams.SKU_IDS,
            currDay:GetDateStr(0)
        };
        console.log($scope.PickupPerson);
        if ($scope.appointment) {
            setCookie("pickupPersonAppointment", JSON.stringify($scope.PickupPerson));
        } else {
            setCookie("pickupPerson", JSON.stringify($scope.PickupPerson));
        }
        history.back();
    };

    function getDate(item) {

        var endDay = item['APPOINTMENT_PRODUCT.END_DAY'];
        var type = item['APPOINTMENT_PRODUCT.TIME_TYPE'];
        var still = item['APPOINTMENT_PRODUCT.STILL_DAY'];
        var startTime = item['APPOINTMENT_PRODUCT.START_TIME'];
        var next = true;
        var dayList = new Array;
        if (type == 'WEEK') {
            var currTime = new Date().getDay();
            if (currTime == 0) {
                currTime = 7;//周日
            }

            if (startTime - currTime > endDay) {
                next = false;
            }
            var day;

            if (next) {
                day = Number(startTime) + 7 - Number(currTime);
            } else {
                day = Number(startTime) - Number(currTime);
            }
            for (var i = 0; i < still; i++) {
                dayList.push(GetDateStr(Number(day) + Number(i)) + '   08:00-19:00');
            }

        } else if (type == 'DAY') {
            for (var i = 0; i < still; i++) {
                dayList.push(GetDateStr(Number(i), startTime) + '   08:00-19:00');
            }
        }

        $("#datetime-picker").picker({
            title: "请选择取货日期", cols: [{
                textAlign: 'center', values: dayList
            }]
        });
        $scope.date = dayList[0];
    }

});

