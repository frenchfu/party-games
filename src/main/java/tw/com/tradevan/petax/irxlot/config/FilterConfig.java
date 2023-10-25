package tw.com.tradevan.petax.irxlot.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tw.com.tradevan.petax.irxlot.filter.ServiceOpenCheckFilter;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean logProcessTimeFilter() {
        FilterRegistrationBean<ServiceOpenCheckFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new ServiceOpenCheckFilter());
        bean.addUrlPatterns("/confirm");
        bean.addUrlPatterns("/result");
        bean.setName("serviceOpenCheckFilter");
        return bean;
    }

}
