package tw.com.tradevan.petax.irxlot.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;
import tw.com.tradevan.petax.irxlot.vo.response.IrxLotRewardsVo;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/7/11 上午 11:57
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExportRewardListFileRequest {

    private IrxLotRewardsVo irxLotRewardsVo;
    private String orgMain;//稅局
    private List<String> orgMains;//稅局
    private String irxLotListBeanJsonString;
    private List<IrxLotListBean> irxLotListBeans = new ArrayList<>();
    private List<IrxLotListUnHideSecreatDetailBean> irxLotListUnHideSecreatDetailBeans = new ArrayList<>();
    private YesNo hideSecretDetail = YesNo.N;//是否隱碼

}
