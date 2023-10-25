package tw.com.tradevan.petax.irxlot.vo.bingo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/24 下午 02:34
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckCanClickResponse {

    Set<String> canCheckdNums;

}
