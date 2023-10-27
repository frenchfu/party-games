package tw.com.fu.game.party.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/6 下午 02:36
 * <p>
 * COMMENT ON COLUMN     EPAY_AP_CONFIG.SNAME 		   Is  '參數ID';
 * COMMENT ON COLUMN     EPAY_AP_CONFIG.VALUE 		   Is  '參數值';
 * COMMENT ON COLUMN     EPAY_AP_CONFIG.UPDATE_DATE 		   Is  '更新日期';
 * COMMENT ON COLUMN     EPAY_AP_CONFIG.MEMO 		   Is  '參數說明';
 */
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "EPAY_AP_CONFIG")
public class EpayApConfig implements Serializable {

    @Id
    @Column(name = "SNAME")
    private String sname;//SNAME Is  '參數ID';
    @Column(name = "VALUE")
    private String value;//VALUE Is  '參數值';
    @Column(name = "UPDATE_DATE")
    private LocalDateTime updateDate;// 	UPDATE_DATE	   Is  '更新日期';
    @Column(name = "MEMO")
    private String memo;//MEMO Is  '參數說明';

}
