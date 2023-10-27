package tw.com.fu.game.party.dao;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import tw.com.fu.game.party.constant.enums.YesNo;
import tw.com.fu.game.party.bean.partyacc.Player;
import tw.com.fu.game.party.constant.exception.PartyGamesException;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 04:18
 */
@Component
@Log4j2
public class PlayerDao {

    public static Map<String, Player> PLAYER_MAP = new HashMap<>();
    public static int noCounter = 1;


    public Player save(Player inputPlayer) throws PartyGamesException {

        Player targetPlayer;
        if(StringUtils.isEmpty(inputPlayer.getNo()) || PLAYER_MAP.get(inputPlayer.getNo()) == null){
            targetPlayer = Player.builder()
                    .no(inputPlayer.getNo())
                    .score(0l).bingoReward(YesNo.N)
                    .bingoCard(null)
                    .name(inputPlayer.getName())
                    .build();
            PLAYER_MAP.put(targetPlayer.getNo(), targetPlayer);
        }else{
            //已存在
            throw new PartyGamesException("-2", "此編號已被使用");
        }

        return targetPlayer;

    }


    private synchronized int getNewNo(){
        return noCounter++;
    }


    public Player getUser(String account) {
        return PLAYER_MAP.get(account);
    }

    public Player update(Player targetPlayer) {
        PLAYER_MAP.put(targetPlayer.getNo(), targetPlayer);
        return targetPlayer;
    }

}
