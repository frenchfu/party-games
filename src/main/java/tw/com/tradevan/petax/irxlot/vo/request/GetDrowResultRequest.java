package tw.com.tradevan.petax.irxlot.vo.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.tradevan.petax.irxlot.vo.response.IrxLotRewardsVo;

import java.util.List;
import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/27 下午 05:04
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetDrowResultRequest {

    private Set<Long> drowSets;
    private IrxLotRewardsVo rewards;
    private List<String> orgMains;

}
