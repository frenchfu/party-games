package tw.com.fu.game.party.entity;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:40
 */

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "IRX_LOT_REWARDS")
public class IrxLotRewards implements Serializable {

    @EmbeddedId
    IrxLotRewardsId irxLotRewardsId;

    @Column(name = "ITEM_NM", length = 100)
    private String itemNm; // 獎次名稱

    @Column(name = "SHOW_ROW", length = 2)
    private String showRow; // 顯示行列

    @Column(name = "SORT")
    private Integer sort; // 獎次順序

    @Column(name = "QUOTA", precision = 5, scale = 0)
    private Integer quota; // 獎次名額

    @Column(name = "ENABLE_ICON_URL", length = 150)
    private String enableIconUrl; // 未抽選按鈕圖

    @Column(name = "DISABLE_ICON_URL", length = 150)
    private String disableIconUrl; // 已抽選按鈕圖

    @Column(name = "CREATE_TIME")
    private LocalDateTime createTime; // 建立日期時間

    @Column(name = "CREATE_ACC", length = 50)
    private String createAcc; // 建立人

    @Column(name = "DRAWING_TIME")
    private LocalDateTime drawingTime; // 抽獎日期時間

    @Column(name = "DRAWING_ACC", length = 50)
    private String drawingAcc; // 抽獎人


    @Transient
    private IrxLotCode geoupIrxLotCode;

    @Transient
    private IrxLotCode itemIrxLotCode;


}
