package com.weixin;

import com.bolanggu.bbl.ENV;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.pabula.common.util.RandomUtil;
import com.pabula.common.util.SeqNumHelper;
import com.pabula.common.util.StrUtil;
import com.pabula.fw.exception.DataAccessException;
import com.tencent.common.MD5;
import com.tencent.common.XMLParser;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import javax.imageio.ImageIO;
import javax.xml.parsers.ParserConfigurationException;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.xml.sax.SAXException;

/**
 * 微信支付相关方法 Created by xq on 2016.6.28 17 33.
 */
public class WXPay {

    /**
     * 统一下单
     *
     * @param product_id 商品id
     * @param body 体
     * @param fee 支付金额
     */
    public static Map<String, Object> unifiedOrder(String ip, String openId, String product_id,
        String body, int fee) {

        HashMap<String, String> paramMap = new HashMap();

        paramMap.put("trade_type", "JSAPI");
        paramMap.put("openid", openId);

        paramMap.put("spbill_create_ip", ip); //Ip
        paramMap.put("product_id", product_id); // 商品ID
        paramMap.put("body", body);         //描述
        try {
            paramMap.put("out_trade_no", "1000" + SeqNumHelper.getNewSeqNum("andsell",
                "order_wx_pay_flow_num")); //每次统一下单生成唯一流水号
        } catch (DataAccessException e) {
            paramMap.put("out_trade_no", System.currentTimeMillis() + ""); //报错就用时间戳（唯一性） 防止这个参数没有值
            e.printStackTrace();
        }
        paramMap.put("total_fee", fee + ""); //金额 以分为单位
        paramMap.put("notify_url", ENV.WX_PAY_RESULT_CALLBACK_URL); //回调地址
        paramMap.put("appid", ENV.WX_APPID); //appid
        paramMap.put("mch_id", ENV.WX_MCHID); //商户号
        paramMap.put("nonce_str", RandomUtil.getRandomStringByLength(32));  //随机码
        String checkSign = wxPaySign(paramMap, ENV.WX_KEY);
        System.out.println(checkSign);
        String resultXML = HttpUtil.sendHttpsPOST(WxPayConfig.WX_PAY_UNIFIEDORDER,
            wxPayUnifiedOrderPostXml(paramMap, checkSign));

        Map<String, Object> resultMap = null;
        try {
            resultMap = XMLParser.getMapFromXML(resultXML);
            //addUnifiedOrderData(request, resultMap, resultXML, paramMap);
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        //微信返回结果里面吗没有这个 为了订单查询方便人添加
        resultMap.put("out_trade_no", paramMap.get("out_trade_no"));
        resultMap.put("resultXML", resultXML);
        return resultMap;
    }

    /**
     * 统一下单
     *
     * @param product_id 商品id
     * @param body 体
     * @param fee 支付金额
     */
    public static Map<String, Object> unifiedOrderForPC(String ip, String product_id, String body,
        int fee) {

        HashMap<String, String> paramMap = new HashMap();

        paramMap.put("trade_type", "NATIVE");

        paramMap.put("spbill_create_ip", ip); //Ip
        paramMap.put("product_id", product_id); // 商品ID
        paramMap.put("body", body);         //描述
        try {
            paramMap.put("out_trade_no", "1000" + SeqNumHelper.getNewSeqNum("andsell",
                "order_wx_pay_flow_num")); //每次统一下单生成唯一流水号
        } catch (DataAccessException e) {
            paramMap.put("out_trade_no", System.currentTimeMillis() + ""); //报错就用时间戳（唯一性） 防止这个参数没有值
            e.printStackTrace();
        }
        paramMap.put("total_fee", fee + ""); //金额 以分为单位
        paramMap.put("notify_url", ENV.WX_PAY_RESULT_CALLBACK_URL); //回调地址
        paramMap.put("appid", ENV.WX_APPID); //appid
        paramMap.put("mch_id", ENV.WX_MCHID); //商户号
        paramMap.put("nonce_str", RandomUtil.getRandomStringByLength(32));  //随机码
        String checkSign = wxPaySign(paramMap, ENV.WX_KEY);
        System.out.println(wxPayUnifiedOrderPostXml(paramMap, checkSign));
        String resultXML = HttpUtil.sendHttpsPOST(WxPayConfig.WX_PAY_UNIFIEDORDER,
            wxPayUnifiedOrderPostXml(paramMap, checkSign));
        System.out.println(resultXML);
        Map<String, Object> resultMap = null;
        try {
            resultMap = XMLParser.getMapFromXML(resultXML);
            //addUnifiedOrderData(request, resultMap, resultXML, paramMap);
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        //微信返回结果里面吗没有这个 为了订单查询方便人添加
        resultMap.put("out_trade_no", paramMap.get("out_trade_no"));
        resultMap.put("resultXML", resultXML);

//        resultMap.put("code_url",
//        encodeQrcodes(resultMap.get("code_url").toString(), WxPayConfig.WX_CODE_URL_PATH));
        return resultMap;
    }

    /**
     * 从ioInput 里面获取参数信息
     */
    public static String getPostStr(javax.servlet.http.HttpServletRequest request) {

        BufferedInputStream bis = null;
        StringBuffer reqXml = new StringBuffer();

        try {
            bis = new BufferedInputStream(request.getInputStream());
            byte[] buff = new byte[1024];
            int readSize = 0;
            try {
                while ((readSize = bis.read(buff, 0, 1)) != -1) {
                    reqXml.append(new String(buff, 0, readSize, "UTF-8"));
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                bis.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return reqXml.toString();
    }

    /**
     * 把微信的xml结果转换成map
     */
    public static Map<String, Object> getWxPayResult(String xml) {

        if (StrUtil.isNull(xml)) {
            return null;
        }
        try {
            Map<String, Object> result = XMLParser.getMapFromXML(xml);

            return result;
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }

        return null;
    }

    public static void addUnifiedOrderData(Map<String, Object> resultMap, String resultXML,
        HashMap<String, String> paramMap) {
        Object returnCode = resultMap.get("return_code");

        if (resultMap != null) {

            if ("SUCCESS".equals(returnCode)) {
                Object resultCode = resultMap.get("result_code");
                if ("SUCCESS".equals(resultCode)) {
                    //统一下单成功
                    // todo 保存相关信息
                    //OrderWxPayListVO vo = new OrderWxPayListVO();
                    //vo.setSERVICE_ID(UserHelper.getServiceID(request));
                    //vo.setCODE_URL((String) resultMap.get("code_url"));
                    //vo.setOUT_TRADE_NO(paramMap.get("out_trade_no"));//唯一流水号
                    //vo.setPREPAY_ID((String) resultMap.get("prepay_id"));
                    //vo.setRESULT_XML(resultXML);
                    //vo.setREMARK(paramMap.get("product_id"));//订单ID
                    //vo.setPAY_STATE(OrderWxPayListVO.PAY_FAILED);
                    //try {
                    //    new OrderWxPayListBean().addOrderWxPayList(vo);
                    //} catch (DataAccessException e) {
                    //    e.printStackTrace();
                    //}
                }
            }
        }
    }

    /**
     * 订单查询
     */
    public static Map<String, Object> queryOrder(String out_trade_no) {

        HashMap<String, String> paramMap = new HashMap();
        paramMap.put("out_trade_no", out_trade_no);
        paramMap.put("appid", ENV.WX_APPID);
        paramMap.put("mch_id", ENV.WX_MCHID);
        paramMap.put("nonce_str", RandomUtil.getRandomStringByLength(32));

        String checkSign = wxPaySign(paramMap, ENV.WX_KEY);
        String params = wxPayUnifiedOrderPostXml(paramMap, checkSign);
        System.out.println("上传结果 ：" + params);
        String res = HttpUtil.sendHttpsPOST(WxPayConfig.WX_PAY_QUERYORDER, params);

        Map<String, Object> result = null;
        try {
            result = XMLParser.getMapFromXML(res);
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 订单关闭
     */
    public static Map<String, Object> closeOrder(String out_trade_no, String appid, String mch_id,
        String key) {

        HashMap<String, String> paramMap = new HashMap();
        paramMap.put("out_trade_no", out_trade_no); //锟教伙拷 锟斤拷台锟斤拷贸锟阶碉拷锟斤拷
        paramMap.put("appid", appid); //appid
        paramMap.put("mch_id", mch_id); //锟教伙拷锟斤拷
        paramMap.put("nonce_str", RandomUtil.getRandomStringByLength(32));  //锟斤拷锟斤拷锟�

        String checkSign = wxPaySign(paramMap, key);
        String params = wxPayUnifiedOrderPostXml(paramMap, checkSign);
        String res = HttpUtil.sendHttpsPOST(WxPayConfig.WX_PAY_CLOSERDER, params);

        Map<String, Object> result = null;
        try {
            result = XMLParser.getMapFromXML(res);
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 订单关闭
     */
    public static void refundOrder(String orderNum, int fee) {

        HashMap<String, String> paramMap = new HashMap();
        paramMap.put("out_trade_no", orderNum); //金额 以分为单位
        paramMap.put("out_refund_no", "00" + orderNum); //金额 以分为单位
        paramMap.put("total_fee", fee + ""); //金额 以分为单位
        paramMap.put("refund_fee", fee + ""); //金额 以分为单位
        paramMap.put("notify_url", ENV.WX_PAY_RESULT_CALLBACK_URL); //回调地址
        paramMap.put("appid", ENV.WX_APPID); //appid
        paramMap.put("mch_id", ENV.WX_MCHID); //商户号
        paramMap.put("op_user_id", ENV.WX_MCHID); //商户号
        paramMap.put("nonce_str", RandomUtil.getRandomStringByLength(32));  //随机码
        String checkSign = wxPaySign(paramMap, ENV.WX_KEY);
        String data = wxPayUnifiedOrderPostXml(paramMap, checkSign);
        System.out.println(data);

        String resultXML = HttpUtil.sendHttpsPOST(WxPayConfig.WX_PAY_UNIFIEDORDER, data);

        //Map<String, Object> resultMap = null;
        //try {
        //    //resultMap = XMLParser.getMapFromXML(resultXML);
        //    //addUnifiedOrderData(request, resultMap, resultXML, paramMap);
        //} catch (ParserConfigurationException e) {
        //    e.printStackTrace();
        //} catch (IOException e) {
        //    e.printStackTrace();
        //} catch (SAXException e) {
        //    e.printStackTrace();
        //}
        System.out.println(resultXML);
        //return resultMap;
    }

    /**
     * WXPay
     */
    public static String wxPaySign(Map<String, String> map, String keyStr) {
        if (null == map || map.isEmpty()) {
            return null;
        }
        Set<String> keys = new TreeSet<String>(map.keySet());
        StringBuffer sb = new StringBuffer();
        for (String key : keys) {
            sb.append(key);
            sb.append("=");
            sb.append(map.get(key));
            sb.append("&");
        }
        sb.append("key=");
        sb.append(keyStr);
        System.out.println(sb.toString());
        System.out.println(MD5.MD5Encode(sb.toString()));
        System.out.println(MD5.MD5Encode(sb.toString()).toUpperCase());
        System.out.println("over");
        return MD5.MD5Encode(sb.toString()).toUpperCase();
    }

    /**
     * mapToXML
     */
    public static String wxPayUnifiedOrderPostXml(Map<String, String> map, String sign) {
        if (null == map || map.isEmpty()) {
            return null;
        }
        Set<String> keys = new TreeSet<String>(map.keySet());

        StringBuffer sb = new StringBuffer();

        sb.append("<xml>");
        for (String key : keys) {
            sb.append("<");
            sb.append(key);
            sb.append(">");
            sb.append(map.get(key));
            sb.append("</");
            sb.append(key);
            sb.append(">");
        }
        sb.append("<sign>");
        sb.append(sign);
        sb.append("</sign>");
        sb.append("</xml>");
        return sb.toString();
    }

    ///**
    // * 生成二维码
    // *
    // * @param content
    // * @param response
    // */
    //public static void encodeQrcode(String content, HttpServletResponse response) {
    //    //if (StringUtils.isBlank(content))
    //    //    return;
    //    //spsl
    //    if (StrUtil.isNull(content)) {
    //        return;
    //    }
    //    MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
    //    Map hints = new HashMap();
    //    hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
    //    BitMatrix bitMatrix = null;
    //    try {
    //        bitMatrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE, 300, 300, hints);
    //        BufferedImage image = MatrixToImageWriter.toBufferedImage(bitMatrix);
    //
    //        try {
    //            ImageIO.write(image, "jpg", response.getOutputStream());
    //        } catch (IOException e) {
    //            // TODO Auto-generated catch block
    //            e.printStackTrace();
    //        }
    //    } catch (WriterException e1) {
    //        // TODO Auto-generated catch block
    //        e1.printStackTrace();
    //    }
    //}
    //

    /**
     * 生成二维码
//     */
//    public static String encodeQrcodes(String content, String path) {
//        String name = System.currentTimeMillis() + "";
//        String parentPath = path + name + ".jpg";
//        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
//        Map hints = new HashMap();
//        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
//        BitMatrix bitMatrix = null;
//        try {
//            bitMatrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE, 300, 300, hints);
//            BufferedImage image = MatrixToImageWriter.toBufferedImage(bitMatrix);
//            try {
//                File file = new File(parentPath);
//                if (!file.getParentFile().exists()) {
//                    file.getParentFile().mkdirs();
//                }
//                ImageIO.write(image, "jpg", file);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            return parentPath;
//        } catch (WriterException e1) {
//            // TODO Auto-generated catch block
//            e1.printStackTrace();
//        }
//        return parentPath;
//    }

    /**
     * 拼接微信h5支付参数
     */
    public static String unifiedOrderJsonResult(String appid, String prepay_id, String oid,
        String key1) {

        if (StrUtil.isNull(appid) || StrUtil.isNull(prepay_id)) {
            return null;
        }

        long date = new Date().getTime() / 1000;

        String nonceStr = RandomUtil.randomStr(32);

        StringBuffer sb = new StringBuffer();

        Map<String, String> map = new HashMap<String, String>();

        map.put("appId", appid);
        map.put("timeStamp", "" + date);
        map.put("nonceStr", nonceStr);
        map.put("signType", "MD5");
        map.put("package", "prepay_id=" + prepay_id);

        sb.append("{");

        for (String key : map.keySet()) {
            sb.append("\"" + key + "\":");
            sb.append("\"" + map.get(key) + "\",");
        }
        String sign = wxPaySign(map, key1);
        sb.append("\"paySign\":");
        sb.append("\"" + sign + "\",");
        sb.append("\"oid\":");
        sb.append("\"" + oid + "\"");
        sb.append("}");
        return sb.toString();
    }

    /**
     * @param xml
     * @return
     */
    public static Map<String, String> parseXmlToMap(String xml) {

        if (null == xml || StrUtil.isNull(xml)) {
            return null;
        }

        Map<String, String> map = new HashMap<String, String>();

        try {
            Document document = DocumentHelper.parseText(xml);
            Element root = document.getRootElement();

            for (Object o : root.elements()) {
                Element e = (Element) o;

                map.put(e.getName(), e.getText());
                System.out.println("  set  " + e.getName() + "  value  " + e.getText());
            }
        } catch (Exception e) {
            return null;
        }

        return map;
    }

    public static void main(String[] args) {

        //        unifiedOrder("127.0.0.1", "fdskfjdskfj;dsjfds", "3232", "body", 12300);
        refundOrder("10003693", 1800);
    }
}
