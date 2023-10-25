package tw.com.tradevan.petax.irxlot.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tw.com.tradevan.petax.irxlot.constant.exception.IrxLotException;
import tw.com.tradevan.petax.irxlot.service.plater.PlayerAccountService;
import tw.com.tradevan.petax.irxlot.vo.acc.request.SingUpRequest;
import tw.com.tradevan.petax.irxlot.vo.acc.response.SingUpResponse;
import tw.com.tradevan.petax.irxlot.vo.response.ApiResponse;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 01:57
 */
@RestController
@RequestMapping(PlayerController.BASE_URL)
public class PlayerController {

    public static final String BASE_URL = "/api/player";
    public static final String SIGN = "/sign";
    public static final String LOAD = "/load";

    @Autowired
    PlayerAccountService playerAccountService;



    @PostMapping(PlayerController.SIGN)
    public ApiResponse<SingUpResponse> sing(@RequestBody SingUpRequest request) throws JsonProcessingException, IrxLotException {

        ApiResponse<SingUpResponse> result = new ApiResponse<>();

        SingUpResponse response = playerAccountService.doSingUp(request);
        result.setResult(response);

        return result;

    }

    @PostMapping(PlayerController.LOAD)
    public ApiResponse<SingUpResponse> load(@RequestBody SingUpRequest request) throws JsonProcessingException, IrxLotException {

        ApiResponse<SingUpResponse> result = new ApiResponse<>();

        SingUpResponse response = playerAccountService.doLoad(request);
        result.setResult(response);

        return result;

    }



}
