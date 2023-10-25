package tw.com.tradevan.petax.irxlot.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.tradevan.petax.irxlot.entity.IrxLotRewards;

import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/27 下午 04:51
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoDrowServiceResponse {

     private  IrxLotRewards rewards;
     private  Set<Long> drowSets;


}
