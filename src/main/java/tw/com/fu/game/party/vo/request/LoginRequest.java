package tw.com.fu.game.party.vo.request;

import lombok.Data;
import tw.com.fu.game.party.constant.enums.UserMode;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/28 下午 02:08
 */
@Data
public class LoginRequest {

    private String username;
    private String password;
    private UserMode mode;
    private String verifyCode;//圖形驗證碼
    private String verifyToken;//圖形驗證碼Token


}
