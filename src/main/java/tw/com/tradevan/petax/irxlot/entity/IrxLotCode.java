package tw.com.tradevan.petax.irxlot.entity;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:41
 */

import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "IRX_LOT_CODE")
public class IrxLotCode implements Serializable {

    @EmbeddedId
    IrxLotCodeId irxLotCodeId;

    @Column(name = "CODE_NM", length = 100)
    private String codeNm; // 名稱

    @Column(name = "REF_REWARD", length = 10, nullable = true)
    private String refReward; // 關聯獎項

    @Column(name = "SHOW_ROWS", length = 10, nullable = true)
    private String showRows; // 顯示行列


}
