package tw.com.tradevan.petax.irxlot.service.plater;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tw.com.tradevan.petax.irxlot.bean.UserDetail;
import tw.com.tradevan.petax.irxlot.bean.partyacc.Player;
import tw.com.tradevan.petax.irxlot.constant.RoleConstants;
import tw.com.tradevan.petax.irxlot.constant.exception.IrxLotException;
import tw.com.tradevan.petax.irxlot.dao.PlayerDao;
import tw.com.tradevan.petax.irxlot.service.TokenService;
import tw.com.tradevan.petax.irxlot.vo.acc.request.SingUpRequest;
import tw.com.tradevan.petax.irxlot.vo.acc.response.SingUpResponse;

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



    public SingUpResponse doSingUp(SingUpRequest request) throws JsonProcessingException, IrxLotException {

        if(StringUtils.isEmpty(request.getName()) || StringUtils.isEmpty(request.getNo())){
            throw new IrxLotException("-1" , "參數錯誤");
        }

        Player player = playerDao.save(Player.builder()
                        .no(request.getNo())
                        .name(request.getName())
                .build());


        //通過  準備組織 Login User token
        UserDetail userDetail = UserDetail.builder()
                .account(player.getNo())
                .authType("P")
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

    public SingUpResponse doLoad(SingUpRequest request) throws IrxLotException, JsonProcessingException {

        if(StringUtils.isEmpty(request.getName()) || StringUtils.isEmpty(request.getNo())){
            throw new IrxLotException("-1" , "參數錯誤");
        }
        Optional<Player> targetPlayerOp = Optional.of(playerDao.getUser(request.getNo()));
        if(!targetPlayerOp.isPresent()){
            throw new IrxLotException("-2" , "帳號不存在");
        }else{
            if(!targetPlayerOp.get().getName().equals(request.getName())){
                throw new IrxLotException("-3" , "大名和編號不一致...");
            }
        }

        //通過  準備組織 Login User token
        UserDetail userDetail = UserDetail.builder()
                .account(targetPlayerOp.get().getNo())
                .authType("P")
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
