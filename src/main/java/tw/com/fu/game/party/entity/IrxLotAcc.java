package tw.com.fu.game.party.entity;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:41
 */

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "IRX_LOT_ACC")
public class IrxLotAcc implements Serializable {

    @Id
    @Column(name = "ACCOUNT", length = 50)
    private String account; // 帳號

    @Column(name = "ENC_PWD", length = 50)
    private String password; // 密碼

    @Column(name = "NAME", length = 30)
    private String name; // 名稱

    @Column(name = "AUTH_TYPE", length = 1, nullable = true)
    private String authType; // 權限

    @Column(name = "CREATE_TIME")
    private LocalDateTime createTime; // 建立日期時間

    @Column(name = "START_DATE", length = 20)
    private String startDate; // 效期起日

    @Column(name = "END_DATE", length = 20)
    private String endDate; // 效期迄日

}
