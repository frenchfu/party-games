package tw.com.fu.game.party.handler;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/25 下午 12:13
 */
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GlobalExceptionHandler implements ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        // 返回首页的视图名称
        return "index";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
