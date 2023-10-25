package tw.com.tradevan.petax.irxlot.vo.response;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 下午 04:33
 */
@Data
@Builder
public class DoDrowResponse {

    private String useTime;
    private Set<Long> drowSets;
    private IrxLotRewardsVo rewards;

}
