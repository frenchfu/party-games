package tw.com.tradevan.petax.irxlot.filter;


import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tw.com.tradevan.petax.irxlot.bean.UserDetail;
import tw.com.tradevan.petax.irxlot.service.TokenService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * token過濾器 驗證token有效性
 *
 * @author tradevan
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        try {

            final String requestHeader = request.getHeader("Authorization");

            if (requestHeader != null && requestHeader.startsWith("Bearer ")) {

                String authToken = requestHeader.substring(7);
                tokenService.validateToken(authToken);
                UserDetail userDetail = tokenService.getUserFromToken( authToken, UserDetail.class);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            }

            chain.doFilter(request, response);

        } catch (Exception e) {
            request.getRequestDispatcher("/app/tokenExpire")
                    .forward(request, response);
        }
    }
}
