package tw.com.fu.game.party.vo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tw.com.fu.game.party.config.PartyGamesPath;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 上午 12:19
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse <T>{

    private String code = PartyGamesPath.SUCCESS_CODE;
    private String message;
    private String reflashToken;
    T result;

}
