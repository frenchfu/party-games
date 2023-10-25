package tw.com.tradevan.petax.irxlot.vo.request;

import lombok.Data;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 下午 04:32
 */
@Data
public class DoDrowRequest {

    //@NotBlank
    private String yr; // 申報年度
    //@NotBlank
    private String rewardCd; // 獎項代號
    //@NotBlank
    private String itemCd; // 獎次代號


}
