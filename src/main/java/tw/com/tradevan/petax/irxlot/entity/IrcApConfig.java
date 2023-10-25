package tw.com.tradevan.petax.irxlot.entity;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:42
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
@Table(name = "IRC_AP_CONFIG")
public class IrcApConfig implements Serializable {

    @Id
    @Column(name = "SNAME")
    private String sname; // 參數名稱

    @Column(name = "VALUE")
    private String value; // 參數值

    @Column(name = "UPDATE_DATE")
    private LocalDateTime updateDate; // 更新日期

}
