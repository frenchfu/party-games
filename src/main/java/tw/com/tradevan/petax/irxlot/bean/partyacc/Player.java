package tw.com.tradevan.petax.irxlot.bean.partyacc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;

import java.util.Map;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 03:47
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    String no;//編號
    String name;//輸入的姓名
    Map<String,String> bingoCard;//賓果卡
    YesNo bingoReward;
    Long score;//分數



}
