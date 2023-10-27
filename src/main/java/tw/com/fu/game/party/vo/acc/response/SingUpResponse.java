package tw.com.fu.game.party.vo.acc.response;

import lombok.Builder;
import lombok.Data;
import tw.com.fu.game.party.constant.enums.YesNo;

import java.util.Map;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 04:13
 */
@Data
@Builder
public class SingUpResponse {

    String no;//編號
    String name;//輸入的姓名
    Map<String,String> bingoCard;//賓果卡
    YesNo bingoReward;
    Long score;//分數


    String token;


}
