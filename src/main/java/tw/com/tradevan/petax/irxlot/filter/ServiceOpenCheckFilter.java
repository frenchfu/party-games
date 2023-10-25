package tw.com.tradevan.petax.irxlot.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tw.com.tradevan.petax.irxlot.config.IrxLotPath;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Api record 執行log作業過濾器
 * @author David Fu
 * @create 2022.03.24
 */
@Component
@Log4j2
public class ServiceOpenCheckFilter  extends OncePerRequestFilter {

    @Autowired
    IrxLotPath irxLotPath;

    @Autowired
    ObjectMapper mapper;


    /*



    【服務期間檢查邏輯】
    // 是否是否進行服務期間判斷
    if(epay.epay_open_service=='Y') {
        if (epay.is_check_date=='Y') {
            if(now() >= epay.pause_start_date && now() <= epay.pause_end_date) {
                // 暫停服務
                return E902
                break //限制使用
            } else if (now() >= epay.ap_start_date && now() <= epay.ap_end_date) {
                // 服務期間
                continue //允許使用
            } else {
                // 非服務期間
                return E901
                break //限制使用
            }
        } else {
            continue //允許使用
        }
    } else {
        // 暫停服務
        return E902
    }

     */

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        filterChain.doFilter(request, response);


    }



}
