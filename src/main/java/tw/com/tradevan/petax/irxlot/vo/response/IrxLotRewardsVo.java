package tw.com.tradevan.petax.irxlot.vo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 上午 12:20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IrxLotRewardsVo {

    private String yr; // 申報年度
    private String rewardCd; // 獎項代號
    private String itemCd; // 獎次代號
    private String codeNm; //獎次名稱
    private String itemNm; // 獎次內容
    private String showRow; // 顯示行列
    private Integer sort; // 獎次順序
    private Integer quota; // 獎次名額
    private String enableIconUrl; // 未抽選按鈕圖
    private String disableIconUrl; // 已抽選按鈕圖
    private LocalDateTime createTime; // 建立日期時間
    private String createAcc; // 建立人
    private LocalDateTime drawingTime; // 抽獎日期時間
    private String drawingAcc; // 抽獎人

    private String groupNm; // 群組名
    private String itemNmTittle; // 獎名

    private String groupCd;

    private boolean edit;


}
