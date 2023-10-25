package tw.com.tradevan.petax.irxlot.vo.response;

import lombok.Builder;
import lombok.Data;
import tw.com.tradevan.petax.irxlot.bean.IrxLotListBean;

import java.util.List;
import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 下午 04:33
 */
@Data
@Builder
public class GetDrowResultResponse {

    private  List<IrxLotListBean> irxLotListBeans;
    private IrxLotRewardsVo rewards;

}
