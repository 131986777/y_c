package com.bolanggu.bbl.orderAnalysis;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;


public class orderQuery extends HttpServlet{

	private Logger log = LoggerFactory.getLogger(orderQuery.class);
	
	public void doPost(HttpServletRequest req, HttpServletResponse response)
		     throws ServletException, IOException {
		
		req.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("content-type","text/html;charset=UTF-8");
		PrintWriter pw = response.getWriter();
        String type = req.getParameter("type");
        String parameter = req.getParameter("param");
        List list = new ArrayList();
        try{
        	switch(type){
        	case "productOrder":
        		list = ProductOrderQuery.INSTANCE.getProductOrderList(parameter);
        		break;
        	case "shopProductOrder":
        		list = ProductOrderQuery.INSTANCE.getShopProductList(parameter);
        		break;
        	case "shopProductOrderInDate":
        		list = ProductOrderQuery.INSTANCE.getOrderInDate(parameter);
        		break;
        	case "onlineProductOrder":
        		list = ProductOrderQuery.INSTANCE.getOnlineOrder(parameter);
        		break;
        	case "onlineShopProductOrder":
        		list = ProductOrderQuery.INSTANCE.getOnlineShopOrder(parameter);
        		break;
        	case "onlineShopProductOrderIndate":
        		list = ProductOrderQuery.INSTANCE.getOnlineShopOrderInDate(parameter);
        		break;
        	case "orderInfo":
        		list = ProductOrderQuery.INSTANCE.getOrderInfo(parameter);
        		break;
        	}
        	
        	
        }catch(Exception e){
        	e.printStackTrace();
        	log.info(e.toString());
        }
        pw.write(JSON.toJSONString(list));
        
	}
	
	 public void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
		 
	 }
	
}
