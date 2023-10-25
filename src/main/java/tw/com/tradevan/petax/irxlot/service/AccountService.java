package tw.com.tradevan.petax.irxlot.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tw.com.tradevan.petax.irxlot.bean.UserDetail;
import tw.com.tradevan.petax.irxlot.config.IrxLotPath;
import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;
import tw.com.tradevan.petax.irxlot.constant.exception.IrxLotException;
import tw.com.tradevan.petax.irxlot.vo.request.LoginRequest;
import tw.com.tradevan.petax.irxlot.vo.response.LoginResponse;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/28 下午 02:37
 */
@Service
@Log4j2
public class AccountService {


    @Autowired
    TokenService tokenService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    PasswordEncoder passwordEncoder;


    public LoginResponse doLogin(LoginRequest loginRequest) throws IrxLotException, JsonProcessingException {


        try{
            if(!tokenService.validateToken(loginRequest.getVerifyToken())){
                throw new IrxLotException(-9, "錯誤的驗證碼內容");
            }
        }catch (ExpiredJwtException e){
            throw new IrxLotException(-7, "驗證碼已過期 請重新產生驗證碼");
        }catch (Exception e){
            throw new IrxLotException(-9, "錯誤的驗證碼內容");
        }


        String encodeVerifyCode = tokenService.getUsernameFromToken(loginRequest.getVerifyToken());
        if(passwordEncoder.matches(loginRequest.getVerifyCode() , encodeVerifyCode)){
            //OK FINE
        }else{
            throw new IrxLotException(-6, "驗證碼錯誤");
        }


        if(YesNo.Y == IrxLotPath.IS_CHECK_DATE){
            if(LocalDateTime.now().compareTo(IrxLotPath.AP_START_DATE) < 0 || LocalDateTime.now().compareTo(IrxLotPath.AP_END_DATE) > 0){
                throw new IrxLotException(-5, "系統未開放 開放時間 "+ IrxLotPath.AP_START_DATE.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss") ) + "~" +  IrxLotPath.AP_END_DATE.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            }
        }







        //通過  準備組織 Login User token
        UserDetail userDetail = UserDetail.builder()
                .permissionList(Arrays.asList(loginRequest.getMode().getPermission()))
                .build();
        String token = tokenService.generateToken(objectMapper.writeValueAsString(userDetail));
        String freshToken = tokenService.generateFlashToken(objectMapper.writeValueAsString(userDetail));


        return LoginResponse.builder().account(userDetail.getAccount()).token(token).flashToken(freshToken).acType(userDetail.getAuthType()).build();



    }








}
