AndSellMainModule.service('memberRechargeFactory', function (http) {

	 this.phoneSms = http.post('/sys/sms/login');
	 
	 this.commitCard = http.post('/member/membercard/activityRechargeAndValueCard');

});