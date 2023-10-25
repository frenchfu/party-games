package tw.com.tradevan.petax.irxlot.entity;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:42
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
@Table(name = "IRX_LOT_LOG")
public class IrxLotLog implements Serializable {

    // 聲明表中的字段
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UUID")
    private String uuid;

    @Column(name = "YR", length = 3)
    private String yr; // 申報年度

    @Column(name = "ACCOUNT", length = 50)
    private String account; // 操作人帳號

    @Column(name = "CERT_TP", length = 1)
    private String certTp; // 認證方式

    @Column(name = "IP", length = 39)
    private String ip; // 來源IP

    @Column(name = "HANDLE_PC", length = 20)
    private String handlePc; // 操作主機

    @Column(name = "BEGIN_TIME")
    private LocalDateTime beginTime; // 操作起時

    @Column(name = "END_TIME")
    private LocalDateTime endTime; // 操作迄時

    @Column(name = "USER_ACTION", length = 10)
    private String userAction; // 操作項目

    @Column(name = "RESULT_ID", length = 3)
    private String resultId; // 操作結果

    @Column(name = "RESULT_MSG", length = 100, nullable = true)
    private String resultMsg; // 操作結果訊息

    @Column(name = "REQ_JSON", length = 500)
    private String reqJson; // 申報年度


}
