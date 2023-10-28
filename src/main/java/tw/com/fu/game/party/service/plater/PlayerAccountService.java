package tw.com.fu.game.party.service.plater;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tw.com.fu.game.party.bean.UserDetail;
import tw.com.fu.game.party.bean.partyacc.Player;
import tw.com.fu.game.party.constant.RoleConstants;
import tw.com.fu.game.party.constant.exception.PartyGamesException;
import tw.com.fu.game.party.controller.PlayerController;
import tw.com.fu.game.party.dao.PlayerDao;
import tw.com.fu.game.party.service.TokenService;
import tw.com.fu.game.party.vo.acc.request.SingUpRequest;
import tw.com.fu.game.party.vo.acc.response.SingUpResponse;

import java.util.Arrays;
import java.util.Optional;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 04:16
 */
@Service
@Log4j2
public class PlayerAccountService {


    @Autowired
    PlayerDao playerDao;
    @Autowired
    TokenService tokenService;
    @Autowired
    ObjectMapper objectMapper;



    public SingUpResponse doSingUp(SingUpRequest request) throws JsonProcessingException, PartyGamesException {

        if(StringUtils.isEmpty(request.getName()) || StringUtils.isEmpty(request.getNo())){
            throw new PartyGamesException("-1" , "參數錯誤");
        }

        Player player = playerDao.save(Player.builder()
                        .no(request.getNo())
                        .name(request.getName())
                .build());


        //通過  準備組織 Login User token
        UserDetail userDetail = UserDetail.builder()
                .account(player.getNo())
                .authType("P")
                .gameUuid(PlayerController.GAME_UUID)
                .permissionList(Arrays.asList(RoleConstants.PLAYER))
                .build();
        String token = tokenService.generateToken(objectMapper.writeValueAsString(userDetail));

        return SingUpResponse.builder()
                .no(player.getNo())
                .name(player.getName())
                .token(token)
                .build();

    }


    public Player getUser(UserDetail userDetail){
        return playerDao.getUser(userDetail.getAccount());
    }


    public Player updatePlayer(Player targetPlayer) {
        return playerDao.update(targetPlayer);
    }

    public SingUpResponse doLoad(SingUpRequest request) throws PartyGamesException, JsonProcessingException {

        if(StringUtils.isEmpty(request.getName()) || StringUtils.isEmpty(request.getNo())){
            throw new PartyGamesException("-1" , "參數錯誤");
        }
        Optional<Player> targetPlayerOp = Optional.of(playerDao.getUser(request.getNo()));
        if(!targetPlayerOp.isPresent()){
            throw new PartyGamesException("-2" , "帳號不存在");
        }else{
            if(!targetPlayerOp.get().getName().equals(request.getName())){
                throw new PartyGamesException("-3" , "大名和編號不一致...");
            }
        }

        //通過  準備組織 Login User token
        UserDetail userDetail = UserDetail.builder()
                .account(targetPlayerOp.get().getNo())
                .authType("P")
                .gameUuid(PlayerController.GAME_UUID)
                .permissionList(Arrays.asList(RoleConstants.PLAYER))
                .build();
        String token = tokenService.generateToken(objectMapper.writeValueAsString(userDetail));


        return SingUpResponse.builder()
                .no(targetPlayerOp.get().getNo())
                .name(targetPlayerOp.get().getName())
                .token(token)
                .build();


    }
}
