package tw.com.fu.game.party.vo.bingo.request;

import lombok.Data;

import java.util.Set;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/28 上午 12:49
 */
@Data
public class CheckBingoRequest {

    Set<Integer> checkNums;

}
