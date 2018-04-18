package com.bolanggu.bbl.utils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * RedisCache : redis 缓存 插件
 *
 * @author StarZou
 * @since 2015-03-20 11:12
 */
public enum RedisCache {
	INSTANCE;
    private int port = 6379;
    private String host = "121.41.56.81";
    //private Jedis jedis = new Jedis(host, port);
    private static JedisPool jedisPool;
    
    public static RedisCache getInstance() {
    	if(jedisPool == null){
    		jedisPool = new JedisPool("121.41.56.81", 6379);
    	}
    	return INSTANCE;
    }
    
    

    public String set(String key, String value, int seconds) {
    	//Jedis jedis = new Jedis(host, port);
    	Jedis jedis = jedisPool.getResource();
    	try{
            String result = jedis.set(key, value);
            jedis.expire(key, seconds);
            return result;
    	}finally{
    		jedis.close();
    	}
    	
    }
    
    public Long setnx(String key, String value, int seconds) {
    	//Jedis jedis = new Jedis(host, port);
    	Jedis jedis = jedisPool.getResource();
    	try{
            long result = jedis.setnx(key, value);
            if(result == 1){
            	jedis.expire(key, seconds);
            }
            return result;
    	}finally{
    		jedis.close();
    	}
    	
    }
    
    public String cache(String key, String value){
    	//Jedis jedis = new Jedis(host, port);
    	Jedis jedis = jedisPool.getResource();
    	try{
        	String result = jedis.set(key, value);
            return result;
    	}finally{
    		jedis.close();
    	}
    	
    }

    public String get(String key) {
    	//Jedis jedis = new Jedis(host, port);
    	Jedis jedis = jedisPool.getResource();
    	try{
    		 return jedis.get(key);
    	}finally{
    		jedis.close();
    	}
       
    }
    
    public boolean exist(String key){
    	//Jedis jedis = new Jedis(host, port);
    	Jedis jedis = jedisPool.getResource();
    	try{
    		return jedis.exists(key);
    	}catch(Exception e){
    		return false;
    	}finally{
    		jedis.close();
    	}
    	
    }
    public String flushDB(){
    	//Jedis jedis = new Jedis(host, port);
    	Jedis jedis = jedisPool.getResource();
    	try{
    		return jedis.flushDB();
    	}finally{
    		jedis.close();
    	}
    	
    }
    
}
