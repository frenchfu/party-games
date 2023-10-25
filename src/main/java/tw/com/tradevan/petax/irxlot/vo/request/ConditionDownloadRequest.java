package tw.com.tradevan.petax.irxlot.vo.request;

import lombok.Data;
import tw.com.tradevan.petax.irxlot.constant.enums.DownLoadFileType;
import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;

import java.util.List;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/7/11 上午 10:39
 */
@Data
public class ConditionDownloadRequest {

    private String yr; // 申報年度
    private List<String> rewardCds; // 獎項代號
    private List<String> orgMains;//國稅局
    private YesNo showSecretDetail;//是否明碼
    private String settingPassword;////設定密碼
    private DownLoadFileType downLoadFileType;

}
