package com.bolanggu.bbl.utils;

public class TaskRedisLock {

	public static void redisLock(String key) throws Exception{
		long result = RedisCache.getInstance().setnx("UpdateOrderPay", "1", 60);
    	if(result == 0){
    		throw new Exception("============redislock=============");
    	}
	}
}
