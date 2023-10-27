package tw.com.fu.game.party.vo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 圖形驗證碼
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/7/3 上午 09:47
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerifyCodeResponse {

    private String imgBase64;//圖檔
    private String verifyToken;//token

}
