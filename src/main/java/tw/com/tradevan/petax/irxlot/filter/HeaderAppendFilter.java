//package tw.com.tradevan.petax.irxlot.filter;
//
//import lombok.extern.log4j.Log4j2;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//
///**
// * Api record 執行log作業過濾器
// *
// * @author Yuting Liu
// * @create 2020.03.10
// */
//@Component
//@Log4j2
//public class HeaderAppendFilter extends OncePerRequestFilter {
//
//
//    /**
//     * 忽略敏感資訊的欄位的參數.
//     */
//    private static final List<String> IGNORE_REQ_PARAMS = Arrays.asList(
//    );
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//
//        //response.setHeader("Access-Control-Allow-Origin","http://localhost:8099");
//        response.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//        chain.doFilter(request, response);
//
//    }
//
//
//}
