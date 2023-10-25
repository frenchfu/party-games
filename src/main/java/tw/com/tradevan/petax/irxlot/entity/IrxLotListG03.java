package tw.com.tradevan.petax.irxlot.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:25
 */
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "IRX_LOT_LISTG03")
public class IrxLotListG03 implements Serializable {

    @Id
    @Column(name = "ID", precision = 10)
    private Long id; // 資料序號

    @Column(name = "PFN", length = 17)
    private String fileNumber; // 檔案編號

    @Column(name = "TAX_PAYER", length = 60)
    private String taxpayerName; // 納稅義務人姓名

    @Column(name = "IDN", length = 10)
    private String idn; // 身分證統一編號

    @Column(name = "COMU_ADDR", length = 174)
    private String comuAddr; // 通訊地址

    @Column(name = "ADDR", length = 174)
    private String addr; // 戶籍地址

    @Column(name = "TEL", length = 13)
    private String tel; // 電話

    @Column(name = "TEL_EXT", length = 6)
    private String telExt; // 分機

    @Column(name = "PHONE", length = 13)
    private String phone; // 行動電話

    @Column(name = "EMAIL", length = 40)
    private String email; // 電子郵件

    @Column(name = "YR", length = 3)
    private String yr; // 申報年度

    @Column(name = "ORG_MAIN", length = 3)
    private String orgMain; // 國稅局代號

    @Column(name = "ORG", length = 3)
    private String org; // 稽徵所代號

    @Column(name = "REWARD_CD", length = 10)
    private String rewardCd; // 獎項代號

    @Column(name = "ITEM_CD", length = 10)
    private String itemCd; // 獎次代號

    @Column(name = "SERIAL_NO")
    private Integer serialNo; // 抽取序號

    @Column(name = "DRAWING_TIME")
    private LocalDateTime drawingTime; // 抽獎日期時間

    @Column(name = "DRAWING_ACC", length = 50)
    private String drawingAcc; // 抽獎人

}
