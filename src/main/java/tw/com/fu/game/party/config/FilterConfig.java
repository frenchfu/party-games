package tw.com.fu.game.party.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tw.com.fu.game.party.filter.ServiceOpenCheckFilter;

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
