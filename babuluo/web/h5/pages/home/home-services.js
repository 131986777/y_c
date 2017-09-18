AndSellH5MainModule.service('seckillFactory', function (http) {
    //this.queryByStateAndTime=http.post('/promo/seckill/myInterface/indexQuerySeckill');
    
    this.queryByStateAndTime = function(data,fnSucceed){
    	$.ajax({
	    	type:"get",
	    	url:"http://yx.bblycyz.com/seckill/rest/seckill/queryAllIndex",//url写异域的请求地址
	    	dataType:"jsonp",//加上datatype
	    	data:data,
	    	//jsonpCallback:"callback",//设置一个回调函数，名字随便取，和的函下面数里的名字相同就行
	    	success:function(response){
	    		fnSucceed(response);
	    	}
    	})
    };

    //this.goSeckill=http.post('/promo/seckill/myInterface/goSeckill');
    this.goSeckill = function(data,fnSucceed){
    	$.ajax({
        	type:"get",
        	url:"http://yx.bblycyz.com/seckill/rest/seckill/goSeckill",//url写异域的请求地址
        	dataType:"jsonp",//加上datatype
        	data:data,
        	//jsonpCallback:"callback",//设置一个回调函数，名字随便取，和的函下面数里的名字相同就行
        	success:function(response){
        		fnSucceed(response);
        	}
        });
    }

    //this.backspaceSeckill=http.post('/promo/seckill/myInterface/backspaceOrder');
    this.backspaceSeckill = function(data,fnSucceed){
    	$.ajax({
        	type:"get",
        	url:"http://yx.bblycyz.com/seckill/rest/seckill/backspaceSeckill",//url写异域的请求地址
        	dataType:"jsonp",//加上datatype
        	data:data,
        	//jsonpCallback:"callback",//设置一个回调函数，名字随便取，和的函下面数里的名字相同就行
        	success:function(response){
        		fnSucceed(response);
        	}
        });
    }
});

AndSellH5MainModule.service('groupBuyPlanFactory', function (http) {
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
    this.getByGbpIds = http.post("/group/buy/plan/getByGbpIds");
});