package tw.com.fu.game.party.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import tw.com.fu.game.party.bean.UserDetail;
import tw.com.fu.game.party.constant.exception.PartyGamesException;
import tw.com.fu.game.party.controller.PlayerController;

import java.util.Optional;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/28 下午 06:25
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
@AllArgsConstructor
@Log4j2
public class JwtUserDetailsService implements UserDetailsService {

    private TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String token) {

        Optional<UserDetail> userDetailOp = Optional.empty();
        try{
            userDetailOp =  Optional.of(tokenService.getUserFromToken( token, UserDetail.class));
        } catch (JsonProcessingException e) {
            log.error("error at getUserFromToken:" , e);
        }
        if(userDetailOp.isPresent()){
            return userDetailOp.get();
        }else{
            throw new RuntimeException("帳號不存在");
        }
    }


}
