package tw.com.fu.game.party.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:45
 */
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class IrxLotRewardsId implements Serializable {
    @Column(name = "YR", length = 3)
    private String yr; // 申報年度
    @Column(name = "REWARD_CD", length = 10)
    private String rewardCd; // 獎項代號
    @Column(name = "ITEM_CD", length = 10)
    private String itemCd; // 獎次代號
}
