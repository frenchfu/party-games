package tw.com.tradevan.petax.irxlot.vo.bingo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 03:32
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DrowCardResponse {

    Map<String,String> bingoCard;


}
