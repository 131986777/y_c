angular.module('AndSell.H5.Main').controller('pages_order_addAddress_Controller', function ($scope, $state, $stateParams, weUI, orderFactory, modalFactory, appointmentFactory) {

    modalFactory.setTitle('收货/提货信息');
    modalFactory.setBottom(false);

    $scope.initData = function () {

        $scope.addressType = '3';
        $scope.PickupPerson = {};
        
        $scope.endHours = 0;
        $scope.remark = 0;

        $scope.shop = JSON.parse(getCookie('currentShopInfo'))['SHOP.SHOP_NAME'];

        $scope.fromType=$stateParams.TYPE;
        console.log("fromType : "+$scope.fromType);
        var param = {
            'APPOINTMENT_PRODUCT.SKU_ID': $stateParams.SKU_IDS
        };
        appointmentFactory.queryAll(param, function (response) {
            if (response.data.length > 0) {
                $scope.appointment = true;
                $scope.endHours = response.data[0]['APPOINTMENT_PRODUCT.END_DAY'];
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
    	console.log($("#datetime-picker")[0].value)
    	if($("#datetime-picker")[0].value=="请选择提货日期"){
    		weUI.toast.error('请选择提货日期')
    		return
    	}
        $scope.PickupPerson = {
            man: $scope.man,
            phone: $scope.phone,
            shop: $scope.shop,
            type: $scope.addressType,
            shengshi: $scope.area,
            address: $scope.address,
            getTime: $("#datetime-picker")[0].value,
            skuIds: $stateParams.SKU_IDS,
            currDay: GetDateStr(0),
            endHours: $scope.endHours,
            remark:$scope.remark
        };
        console.log($scope.PickupPerson);
        if ($scope.appointment) {
            setCookie("pickupPersonAppointment", JSON.stringify($scope.PickupPerson));
        } else {
            setCookie("pickupPerson", JSON.stringify($scope.PickupPerson));
        }
		 var re =  /^1\d{10}$/;
       // var re = /^1[34578]\d{9}$/
			if (!re.test($scope.phone)) {
				weUI.toast.error("请输入正确的手机号");
				return
			}
        history.back();
    };

    function getDate(item) {

        var endHours = item['APPOINTMENT_PRODUCT.END_DAY'];//下单间隔小时
        var type = item['APPOINTMENT_PRODUCT.TIME_TYPE'];//提货类型 week day
        var still = item['APPOINTMENT_PRODUCT.STILL_DAY']; //可提货天数
        var startTime = item['APPOINTMENT_PRODUCT.START_TIME'];//提货时间//周几6
        var timeRange = '   '+item['APPOINTMENT_PRODUCT.TIME_START']+'-'+item['APPOINTMENT_PRODUCT.TIME_END'];
        var next = true;
        var dayList = new Array;
        dayList.push('请选择提货日期')
        var getDay = new Array();
        if (type == 'WEEK') {
            var currTime = new Date().getDay();//获得周几 5
            var currHours = new Date().getHours();//获得当前小时9
            var endDay = Math.ceil(Number(endHours / 24));
            if (currTime == 0) {
                currTime = 7;//周日
            }
            if ((startTime - currTime) > endDay) {
                next = false;
            } else {
                if ((startTime - currTime) > (endDay - 1)) {
                    if ((24 - currHours) > (endHours - (endDay - 1) * 24)) {
                        next = false;
                    } else {
                        next = true;
                    }
                } else {
                    next = true;
                }
            }
            var day;

            if (next) {
                day = Number(startTime) + 7 - Number(currTime);
            } else {
                day = Number(startTime) - Number(currTime);
            }
            getDay.push(Number(day));
            for (var i = 0; i < still; i++) {
                dayList.push(GetDateStr(Number(day) + Number(i)) + timeRange);//'   08:00-19:00');
            }
            var minDay = getDay[0];
            for(var i=1;i<getDay.length;i++){
            	if(minDay > getDay[i]){
            		minDay = getDay[i]
            	}
            }
            console.log("week截单时间"+GetDateStr(Number(minDay)-endDay));
            $scope.remark=GetDateStr(Number(minDay)-endDay);
        } else if (type == 'DAY') {      	
            for (var i = 0; i < still; i++) {
            	var orderDate = GetDateStr(Number(i), startTime)+' 00:00:00';
                var endHours = Number(endHours);
                
                var date = new Date(orderDate.replace(/\-/gi,"/")).getTime() - endHours*60*60*1000;
                var currDate = new Date().getTime();
                //console.log("提货时间"+date+"====当前时间==="+currDate)
                if(currDate < date){
                	dayList.push(GetDateStr(Number(i), startTime) + timeRange);//'   08:00-19:00');
                 }
            }
            var endDay = Math.ceil(Number(endHours / 24));
           var a= GetDateStr(-Number(endDay),startTime);
           console.log(startTime+"jijian "+endDay);
           console.log("Day截单时间"+a);
           $scope.remark=a;
        }else if(type=='WEEK_COMB'){
        	var currTime = new Date().getDay();//获得周几
            var currHours = new Date().getHours();//获得当前小时
            var endDay = Math.ceil(Number(endHours / 24));
            console.log(endDay)
            if (currTime == 0) {
              //  currTime = 7;//周日
            }
            var strs= new Array(); //定义一数组
            var strDay = null;
            strs=startTime.split(","); //字符分割     strs=strs.substring(0,(strs.length-1));
            for (i=0;i<strs.length ;i++ )
            {
            	strDay=(strs[i]);
				//if(strDay-currTime<0){
				//	strDay=strDay+7;
				//}
            	 if ((strDay - currTime) > endDay) {
                     next = false;
                 } else {
                     if ((strDay - currTime) > (endDay - 1)) {
                         if ((24 - currHours) > (endHours - (endDay - 1) * 24)) {
                             next = false;
                         } else {
                             next = true;
                         }
                     } else {
                         next = true;
                     }
                 }
                 var day;

                 if (next) {
                     day = Number(strDay) + 7 - Number(currTime);
                 } else {
                     day = Number(strDay) - Number(currTime);
                 }
                 
                 getDay.push(Number(day));
                 //dayList.push(GetDateStr(Number(day) ) + '   08:00-19:00');
            }    
            var minDay = getDay[0];
            for(var i=1;i<getDay.length;i++){
            	if(minDay > getDay[i]){
            		minDay = getDay[i]
            	}
            }
            		console.log(Number(minDay));
			console.log(GetDateStr(Number(minDay)));
			console.log("====截单时间");
			console.log(GetDateStr(Number(minDay)-endDay));
			$scope.remark=GetDateStr(Number(minDay)-endDay);
            dayList.push(GetDateStr(Number(minDay) ) + timeRange);//'   08:00-19:00');
        }

        $("#datetime-picker").picker({
            title: "请选择取货日期", cols: [{
                textAlign: 'center', values: dayList
            }]
        });
        $scope.date = dayList[0];
    }

});

