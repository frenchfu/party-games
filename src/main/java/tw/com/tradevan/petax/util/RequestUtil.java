package tw.com.tradevan.petax.util;

import lombok.extern.log4j.Log4j2;

import javax.servlet.http.HttpServletRequest;

@Log4j2
public class RequestUtil {

    private static final String[] IP_HEADER_CANDIDATES = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR" };

    public static String getClientIp(HttpServletRequest request) {
        for (String header : IP_HEADER_CANDIDATES) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                log.info(" GET IP FROM:"+header +" ip:"+ ip);
                return ip;
            }
        }
        log.info(" GET IP FROM: getRemoteAddr");
        return request.getRemoteAddr();
    }

//    public static String getClientIp(HttpServletRequest request) {
//        String Xip = request.getHeader("X-Real-IP");
//        String XFor = request.getHeader("X-Forwarded-For");
//        if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
//            int index = XFor.indexOf(",");
//            if(index != -1){
//                return XFor.substring(0,index);
//            }else{
//                return XFor;
//            }
//        }
//        XFor = Xip;
//        if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
//            return XFor;
//        }
//        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
//            XFor = request.getHeader("Proxy-Client-IP");
//        }
//        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
//            XFor = request.getHeader("WL-Proxy-Client-IP");
//        }
//        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
//            XFor = request.getHeader("HTTP_CLIENT_IP");
//        }
//        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
//            XFor = request.getHeader("HTTP_X_FORWARDED_FOR");
//        }
//        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
//            XFor = request.getRemoteAddr();
//        }
//        return XFor;
//    }

}
