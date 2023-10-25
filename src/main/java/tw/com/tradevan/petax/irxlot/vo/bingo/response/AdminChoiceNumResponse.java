package tw.com.tradevan.petax.irxlot.vo.bingo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/24 下午 02:30
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminChoiceNumResponse {

    private YesNo ok;

}
