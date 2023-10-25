package tw.com.tradevan.petax.irxlot.model;

import lombok.Data;

/**
 * @Author 6582 David.Fu
 * @create 2021/4/24 上午 11:07
 */
@Data
public class ServiceRespModel {

    protected String message;
    protected String result;
    protected String fiscStan;//.FISC_STAN 		   Is  '財金公司回傳的交易序號';
    protected String fiscRCode;//.FISC_R_CODE 		   Is  '財金公司回傳的回應代碼';
    protected String lastIdType;//支付方式更新用

}
