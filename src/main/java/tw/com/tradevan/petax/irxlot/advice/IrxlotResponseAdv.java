package tw.com.tradevan.petax.irxlot.advice;


import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import tw.com.tradevan.petax.irxlot.service.TokenService;
import tw.com.tradevan.petax.irxlot.vo.response.ApiResponse;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

@RestControllerAdvice
@Log4j2
class IrxlotResponseAdv implements ResponseBodyAdvice<Object>{
	
	/**
     * i18n
     */
    @Autowired
    private MessageSource messageSource;
    @Autowired
	private TokenService tokenService;
    
    @SneakyThrows
    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> returnType) {
        log.info("MethodParameter : {} , HttpMessageConverter : {} ", methodParameter, returnType);

        String[] packages = new String[]{"tw.com.tradevan.petax.irxlot.vo.response"};

        return Arrays.stream(Package.getPackages())
                .filter(x -> Arrays.stream(packages).anyMatch(x.getName()::contains) )
                .anyMatch( methodParameter.getParameterType().getPackage()::equals)
               ;
    }

	/**
	 * 讓使用者延長燈ㄖ物時間
	 * @param body the body to be written
	 * @param returnType the return type of the controller method
	 * @param selectedContentType the content type selected through content negotiation
	 * @param selectedConverterType the converter type selected to write to the response
	 * @param request the current request
	 * @param response the current response
	 * @return
	 */
    @SneakyThrows
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType,
                                  MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request,
                                  ServerHttpResponse response) {



        //判斷是否要 renew token
		HttpHeaders requestHeaders = request.getHeaders();
		List<String> authorization = requestHeaders.get("Authorization");
		String authToken = CollectionUtils.isNotEmpty(authorization)? authorization.get(0) : "";
		if (authToken.startsWith("Bearer ")) {
			authToken = authToken.substring(7);
			if(tokenService.validateToken(authToken)){

				if( body instanceof ApiResponse){//將更新token 映射回 responseBody
					String refreshToken = tokenService.refreshToken(authToken);
					Class<?> bodyClass = body.getClass();
					Method setRefreshTokenMethod = bodyClass.getMethod("setReflashToken", String.class);
					setRefreshTokenMethod.invoke(body, refreshToken);
				}

			}

		}

		return body;
    }



}