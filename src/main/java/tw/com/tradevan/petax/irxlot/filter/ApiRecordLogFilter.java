//package tw.com.tradevan.petax.irxlot.filter;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.extern.log4j.Log4j2;
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.web.util.ContentCachingRequestWrapper;
//import org.springframework.web.util.ContentCachingResponseWrapper;
//import org.springframework.web.util.WebUtils;
//import tw.com.tradevan.petax.irxlot.bean.UserDetail;
//import tw.com.tradevan.petax.irxlot.config.IrxLotPath;
//import tw.com.tradevan.petax.irxlot.constant.enums.ApiAction;
//import tw.com.tradevan.petax.irxlot.entity.IrxLotLog;
//import tw.com.tradevan.petax.irxlot.repository.IrxLotLogRepository;
//import tw.com.tradevan.petax.irxlot.service.JwtUserDetailsService;
//import tw.com.tradevan.petax.irxlot.service.TokenService;
//import tw.com.tradevan.petax.util.MyJacksonUtil;
//import tw.com.tradevan.petax.util.RequestUtil;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.UnsupportedEncodingException;
//import java.nio.charset.StandardCharsets;
//import java.time.LocalDateTime;
//import java.util.*;
//
///**
// * Api record 執行log作業過濾器
// *
// * @author Yuting Liu
// * @create 2020.03.10
// */
//@Component
//@Log4j2
//public class ApiRecordLogFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private IrxLotLogRepository irxLotLogRepository;
//    @Autowired
//    TokenService tokenService;
//    @Autowired
//    ObjectMapper objectMapper;
//    @Autowired
//    JwtUserDetailsService jwtUserDetailsService;
//
//    /**
//     * 忽略敏感資訊的欄位的參數.
//     */
//    private static final List<String> IGNORE_REQ_PARAMS = Arrays.asList(
////            "userPw",
////            "matchingPassword",
////            "oldPassword",
////            "newPassword",
////            "token",
////            "refreshToken",
////            "accessToken",
////            "payInfo",
////            "cc",
////            "cardNumber",
////            "expireDate",
////            "cvv2",
////            "redirectHtml"
//    );
//
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request)  throws ServletException {
//        return ApiAction.getByUrl(request.getRequestURI()) == null || request.getMethod().equals("OPTIONS");
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//
//
//        response.setHeader("Access-Control-Allow-Origin","http://localhost:8099");
//
//
//
//        LocalDateTime startTime = LocalDateTime.now();
//        ContentCachingRequestWrapper wrapperRequest = new ContentCachingRequestWrapper(request);
//        ContentCachingResponseWrapper wrapperResponse = new ContentCachingResponseWrapper(response);
//        // do pre servlet
//        log.info("====================================================================ST==");
//        request.setAttribute("startTime", System.currentTimeMillis());
//        log.info("URL              : " + request.getRequestURL().toString());
//        String sourceIp = RequestUtil.getClientIp(request);
//        log.info("IP               : " + sourceIp);
//        log.info("HTTP_METHOD      : " + request.getMethod());
//
//        final String requestHeader = request.getHeader("Authorization");
//        UserDetail user = null;
//        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
//            String authToken = requestHeader.substring(7);
//            try {
//                user = (UserDetail)jwtUserDetailsService.loadUserByUsername(authToken);
//            } catch (Exception e) {
//                log.error(e.getMessage());
//            }
//        }
//
//
//        /******************************************************/
//        chain.doFilter(wrapperRequest, wrapperResponse);
//        /******************************************************/
//        // do post servlet write API_RECORD
//        String requestBody = ignoreReqParams(getRequestBody(wrapperRequest));
//        if (requestBody == null && wrapperRequest.getParameterMap() != null) {
//            // body取不到時，資料從parameter取
//            Map<String, String[]> map = wrapperRequest.getParameterMap();
//            StringBuffer sb = new StringBuffer();
//            List<String> stringList = new ArrayList<>();
//            map.forEach((key, value) -> stringList.add(key + "=" + Arrays.toString(value)));
//            requestBody = String.join("&", stringList);
//        }
//        log.info("ARGS             : " + requestBody);
//
//        try{
//
//            ApiAction action = ApiAction.getByUrl(request.getRequestURL().toString());
//            String responseBody = null;
//            Map<String,Object> responseBodyMap = null;
//            responseBody = ignoreReqParams(getResponseBody(wrapperResponse));
//            if(action.getSaveResponse()){
//                responseBodyMap= objectMapper.readValue(responseBody, Map.class);
//                if(responseBodyMap.get("result") != null ){
//                    if(StringUtils.trimToEmpty(responseBodyMap.get("result").toString()).contains("token")){
//                        user = (UserDetail)jwtUserDetailsService.loadUserByUsername((( Map<String,Object> )responseBodyMap.get("result")).get("token").toString());
//                    }
//                }
//            }
//            wrapperResponse.copyBodyToResponse();
//
//            if(action != null && user != null) {
//
//                    String requestBodySubStr = requestBody.length() > 500 ?requestBody.substring(0,500):requestBody;
//
//                    irxLotLogRepository.save(
//                            IrxLotLog.builder()
//                                    .uuid(UUID.randomUUID().toString())
//                                    .yr(IrxLotPath.LOT_YR)
//                                    .ip(sourceIp)
//                                    .beginTime(startTime)
//                                    .endTime(LocalDateTime.now())
//                                    .handlePc(IrxLotPath.HANDLE_PC)
//                                    .userAction(action.getAction())
//                                    .certTp(user==null?"":StringUtils.isNotEmpty(user.getAuthType())?user.getAuthType():"L")
//                                    .account(user==null?"":user.getAccount())
//                                    .resultMsg(responseBody==null?"VOID":responseBody.length() > 100? responseBody.substring(0,100) :responseBody)
//                                    .reqJson(requestBodySubStr)
//                                    //.reqJson("  ")
//                                    .resultId(responseBodyMap != null?responseBodyMap.get("code").toString()
//                                            :response.getStatus()+""
//                                            ).build());
//
//
//            }
//
//        }catch (Exception e){
//            log.error("error happen at log ",e);
//        }
//
//        log.info("====================================================================ED==");
//
//    }
//
//    private String ignoreReqParams(String body) {
//        if (StringUtils.isBlank(body)) {
//            return body;
//        }
//        try {
//            Object object = null;
//            if (body.startsWith("{")) {
//                object = objectMapper.readValue(body, Map.class);
//            } else if (body.startsWith("[")) {
//                object = objectMapper.readValue(body, List.class);
//            } else {
//                return body;
//            }
//            object = ignoreReqParams(object, "***");
//            return MyJacksonUtil.object2Json(object);
//        } catch (Exception e) {
//            log.warn("Parse JSON fail in ignoreReqParams.");
//            return body;
//        }
//    }
//
//    private Object ignoreReqParams(Object object, String replacement) {
//        if (object == null) {
//            return null;
//        }
//        if (object instanceof Map) {
//            Map map = (Map) object;
//            for (Object o : map.keySet()) {
//                if (IGNORE_REQ_PARAMS.contains(o)) {
//                    map.put(o, replacement);
//                } else {
//                    ignoreReqParams(map.get(o), replacement);
//                }
//            }
//        } else if (object instanceof List) {
//            List list = (List) object;
//            for (Object o : list) {
//                ignoreReqParams(o, replacement);
//            }
//        }
//        return object;
//    }
//
//    /**
//     * @param request
//     */
//    private String getRequestBody(ContentCachingRequestWrapper request) {
//        ContentCachingRequestWrapper wrapper = WebUtils.getNativeRequest(request, ContentCachingRequestWrapper.class);
//        if (wrapper != null) {
//            byte[] buf = wrapper.getContentAsByteArray();
//            if (buf.length > 0) {
//                String payload;
//                try {
//                    payload = new String(buf, 0, buf.length, wrapper.getCharacterEncoding());
//                } catch (UnsupportedEncodingException e) {
//                    payload = "[unknown]";
//                }
//                return payload.replaceAll("\\n", "").replaceAll("\\r", "");
//            } else {
//                return wrapper.getQueryString();
//            }
//        }
//        return "";
//    }
//
//    /**
//     * @param response
//     * @throws IOException
//     */
//    private String getResponseBody(ContentCachingResponseWrapper response) throws IOException {
//        ContentCachingResponseWrapper wrapper = WebUtils.getNativeResponse(response, ContentCachingResponseWrapper.class);
//        if (wrapper != null) {
//            byte[] buf = wrapper.getContentAsByteArray();
//            if (buf.length > 0) {
//                String payload;
//                payload = new String(buf, 0, buf.length, StandardCharsets.UTF_8);
//                return payload;
//            }
//        }
//        return "";
//    }
//
//}
