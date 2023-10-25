//package tw.com.tradevan.petax.irxlot.filter;
//
///**
// * @Author: 6582 DAVID.FU
// * @create-date: 2023/7/27 上午 11:37
// */
//
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.List;
//
//@Component
//public class HostValidationFilter extends OncePerRequestFilter {
//
//    @Value("#{'${allowed.origins}'.split(',')}")
//    private List<String> allowedOrigins ;
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//        String host = request.getServerName();
//        String hostHeader = request.getHeader("Host");
//
//        if (allowedOrigins.contains(host)  && ( StringUtils.isEmpty(hostHeader) || allowedOrigins.contains(hostHeader) ) ){
//            chain.doFilter(request, response);
//        }else{
//            response.setHeader("Location", allowedOrigins.get(0));
//            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//            response.getWriter().write("Invalid Host");
//        }
//
//    }
//
//
//}
//
