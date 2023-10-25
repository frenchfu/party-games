package tw.com.tradevan.petax.irxlot.entity;

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
public class IrxLotCodeId implements Serializable {
    @Column(name = "YR", length = 3)
    private String yr; // 申報年度
    @Column(name = "CODE_TYPE", length = 10)
    private String codeType; // 種類
    @Column(name = "CODE_CD", length = 10)
    private String codeCd; // 代碼
}
