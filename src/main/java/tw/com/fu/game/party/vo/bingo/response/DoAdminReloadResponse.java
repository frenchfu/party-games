package tw.com.fu.game.party.vo.bingo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.fu.game.party.bean.partyacc.Player;

import java.util.List;
import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/27 下午 10:53
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoAdminReloadResponse {

    Set<String> canCheckdNums;//已選中號碼
    List<Player>  rewardPlayers;//中獎人
    Integer  getRewardConnectionNum;//賓果需要的線數
    Integer  rewardNumMax;//中獎上限
    Integer  rewardNum;//中獎人數


}
