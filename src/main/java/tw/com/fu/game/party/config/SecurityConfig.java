package tw.com.fu.game.party.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import tw.com.fu.game.party.filter.JwtAuthenticationTokenFilter;
import tw.com.fu.game.party.service.JwtAuthenticationEntryPoint;
import tw.com.tradevan.petax.util.XssUtils;

import javax.servlet.http.Cookie;
import java.util.List;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 上午 10:12
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Log4j2
public class SecurityConfig  extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;
    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;
    //@Autowired
    //private ApiRecordLogFilter apiRecordLogFilter;

    @Value("#{'${allowed.origins}'.split(',')}")
    private List<String> allowedOrigins ;

    //@Autowired
    //private JwtUserDetailsService jwtUserDetailsService;


//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .userDetailsService(jwtUserDetailsService)
//                .passwordEncoder(passwordEncoderBean());
//    }

    @Bean
    public PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }


    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.headers()
                .contentSecurityPolicy("script-src 'self'; img-src 'self'")
                .and()
                .frameOptions().sameOrigin();
        httpSecurity

                // 禁用 CSRF
                .csrf().disable()

                // 授權異常
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

                // 不新增會話
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // 過濾請求
                .authorizeRequests()
                .antMatchers(
                        HttpMethod.GET,
                        "/","/**"
//                        "/*.html",
//                        "/**/*.html",
//                        "/**/*.css",
//                        "/**/*.js",
//                        "/**/*.png",
//                        "/**/*.ico"
                ).anonymous()

                // 登入頁面
                .antMatchers(HttpMethod.POST, "/api/account/**")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/account/**")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/player/**")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/Version-jsp")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/bingo-admin/**")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/bingo-admin/**")
                .permitAll()
        ;






        // 介面限流測試
        httpSecurity.authorizeRequests().antMatchers("/test/**").anonymous()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .anonymous()

                // 所有請求都需要認證
                .anyRequest().authenticated()
                // 防止iframe 造成跨域

                .and()
                .logout()
//               .logoutSuccessUrl("/logout")
                .logoutUrl("/logout").addLogoutHandler((request, response, auth) -> {
                    for (Cookie cookie : request.getCookies()) {
                        log.info("cookie.getName() : {}",cookie.getName());
                        String cookieName = XssUtils.stripXSS(cookie.getName());
                        Cookie cookieToDelete = new Cookie(cookieName, null);
                        cookieToDelete.setMaxAge(0);
                        response.addCookie(cookieToDelete);
                    }
                })
                .and()
                .headers()
                .frameOptions()
                .disable();


        //TODO 補API LOG
        httpSecurity
                //.addFilterBefore(apiRecordLogFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class)
                ;


    }




    /**
     * 跨域配置
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration allowAllConfig = new CorsConfiguration();

        // 添加允许的起始网址
        allowAllConfig.setAllowedOrigins(allowedOrigins);
        allowAllConfig.addAllowedHeader("*");
        allowAllConfig.addAllowedMethod("*");
        // 允许带认证信息的请求
        allowAllConfig.setAllowCredentials(true);

        // 将配置应用于所有路径
        source.registerCorsConfiguration("/**", allowAllConfig);
        return source;
    }


}
