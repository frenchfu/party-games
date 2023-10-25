package tw.com.tradevan.petax.irxlot.vo.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/3 下午 12:21
 *
 *
 *{
 * "memberId":"E99999",
 * "paymentType":"15001",
 * "tax":"irxp",
 * "seqNo": "1094798638",
 * "idn": "A111111111"
 * }
 *
 */
@ApiModel("EpayConfirmRequestVo")
@Data
public class EpayConfirmRequestVo implements Serializable {

    @ApiModelProperty("Request: memberId")
    private String memberId; //6 是 APP業者代號
    @ApiModelProperty("Request: paymentType")
    private String paymentType;//5 是 繳稅類別 15001=綜合所得稅結算申報繳稅
    @ApiModelProperty("Request: tax")
    private String tax;//5 是 申報系統類別 irx=綜所稅離線版  irxw=綜所稅線上版 irxp=綜所稅手機版  ibx=綜所稅稅額試算 ibxp=綜所稅稅額試算手機版
    @ApiModelProperty("Request: seqNo")
    private String seqNo;//10 是 申報系統交易識別碼
    @ApiModelProperty("Request: idn")
    private String idn;//64 是 主納稅人身份證字號
    @ApiModelProperty("Request: iv")
    private String iv; //向量
    @ApiModelProperty("Request: encData")
    private String encData;//密文資料

}
