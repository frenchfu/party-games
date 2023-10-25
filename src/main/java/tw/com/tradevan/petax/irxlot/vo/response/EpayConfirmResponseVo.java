package tw.com.tradevan.petax.irxlot.vo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/3 下午 12:22
 *
 * {
 *  "result": "0000",
 *  "message": "交易成功"
 * }
 *
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EpayConfirmResponseVo implements Serializable {

    private String result;//   4 是 請參照回應代碼
    private String message;//50否 結果訊息或失敗理由

}
