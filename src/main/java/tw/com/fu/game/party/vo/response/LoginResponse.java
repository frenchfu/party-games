package tw.com.fu.game.party.vo.response;

import lombok.*;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/26 上午 12:20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Generated
public class LoginResponse  {

    private String token;
    private String flashToken;
    private String acType;
    private String account;


}
