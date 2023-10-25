package tw.com.tradevan.petax.irxlot.bean;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:25
 *
 *  供不列印隱碼使用
 *
 */
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IrxLotListUnHideSecreatDetailBean implements Serializable {


    private Long id; // 資料序號

    private String fileNumber; // 檔案編號

    private String taxpayerName; // 納稅義務人姓名

    private String idn; // 身分證統一編號

    private String comuAddr; // 通訊地址

    private String addr; // 戶籍地址

    private String tel; // 電話

    private String telExt; // 分機

    private String phone; // 行動電話

    private String email; // 電子郵件

    private String yr; // 申報年度

    private String orgMain; // 國稅局代號

    private String org; // 稽徵所代號

    private String rewardCd; // 獎項代號

    private String itemCd; // 獎次代號

    private Integer serialNo; // 抽取序號

    private LocalDateTime drawingTime; // 抽獎日期時間

    private String drawingAcc; // 抽獎人

    public String getAddr() {
        return addr.substring(0,3);
    }

    public String getFullAddr() {
        return addr;
    }


}
