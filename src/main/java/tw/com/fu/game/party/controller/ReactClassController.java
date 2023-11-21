package tw.com.fu.game.party.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tw.com.fu.game.party.constant.enums.YesNo;
import tw.com.fu.game.party.constant.exception.PartyGamesException;
import tw.com.fu.game.party.service.plater.PlayerAccountService;
import tw.com.fu.game.party.vo.acc.request.SingUpRequest;
import tw.com.fu.game.party.vo.acc.response.SingUpResponse;
import tw.com.fu.game.party.vo.bingo.request.CheckBingoRequest;
import tw.com.fu.game.party.vo.bingo.response.CheckBingoResponse;
import tw.com.fu.game.party.vo.bingo.response.DrowCardResponse;
import tw.com.fu.game.party.vo.response.ApiResponse;

import java.util.*;


@RestController
@RequestMapping(ReactClassController.BASE_URL)
public class ReactClassController {

    public static final String BASE_URL = "/api/react-class";
    public static final String DROW_A_CARD = "/drow-a-card";
    public static final String CHECK_BINGO = "/check-bingo";

    public static final String GET_TOKEN = "/get-token";
    public static final String TEST_402 = "/test-402";
    public static final String TEST_401 = "/test-401";
    public  static  List<List<String>> CONNECTION_CHECK_LIST = Arrays.asList(
            Arrays.asList("1","2","3","4","5"),
            Arrays.asList("6","7","8","9","10"),
            Arrays.asList("11","12","13","14","15"),
            Arrays.asList("16","17","18","19","20"),
            Arrays.asList("21","22","23","24","25"),
            Arrays.asList("1","6","11","16","21"),
            Arrays.asList("2","7","12","17","22"),
            Arrays.asList("3","8","13","18","23"),
            Arrays.asList("4","9","14","19","24"),
            Arrays.asList("5","10","15","20","25"),
            Arrays.asList("1","7","13","19","25"),
            Arrays.asList("5","9","13","17","21")
    );


    @Autowired
    PlayerAccountService playerAccountService;

    @PostMapping(ReactClassController.DROW_A_CARD)
    public ApiResponse<DrowCardResponse> dworCard() {

        ApiResponse<DrowCardResponse> result = new ApiResponse<>();
        result.setResult(DrowCardResponse.builder().bingoCard(generateRandomNumberMap()).build());
        return result;

    }



    @PostMapping(ReactClassController.TEST_402)
    public HttpEntity<ApiResponse<DrowCardResponse>> test402() {

        ApiResponse<DrowCardResponse> result = new ApiResponse<>();
        result.setResult(DrowCardResponse.builder().bingoCard(generateRandomNumberMap()).build());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<ApiResponse<DrowCardResponse>>(result, headers, HttpStatus.PAYMENT_REQUIRED); // 402 - Payment Required

    }

    @PostMapping(ReactClassController.TEST_401)
    public HttpEntity<ApiResponse<DrowCardResponse>> test401() {

        ApiResponse<DrowCardResponse> result = new ApiResponse<>();
        result.setResult(DrowCardResponse.builder().bingoCard(generateRandomNumberMap()).build());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<ApiResponse<DrowCardResponse>>(result, headers, HttpStatus.UNAUTHORIZED); // 401

    }

    @PostMapping(ReactClassController.GET_TOKEN)
    public ApiResponse<SingUpResponse> getToken() throws JsonProcessingException, PartyGamesException {

        ApiResponse<SingUpResponse> result = new ApiResponse<>();
        SingUpRequest request = new SingUpRequest();
        request.setName("TEST");
        request.setNo((new Random().nextInt(999999))+"");
        SingUpResponse response = playerAccountService.doSingUp(request);
        result.setResult(response);

        return result;

    }


    @PostMapping(ReactClassController.CHECK_BINGO)
    public ApiResponse<CheckBingoResponse> checkBingo( @RequestBody CheckBingoRequest checkBingoRequest) {

        ApiResponse<CheckBingoResponse> result = new ApiResponse<>();
        CheckBingoResponse checkBingoResponse = new CheckBingoResponse();

        int connectionNum = this.getConnectionNum(checkBingoRequest.getCheckNums());

        if(connectionNum >= 3){
            checkBingoResponse.setIsReward(YesNo.Y);
        }else{
            result.setCode("-1");
            result.setMessage("連線數不足喔 需要完成3條線!");
            checkBingoResponse.setIsReward(YesNo.N);
        }

        result.setResult(checkBingoResponse);
        return result;

    }

    private Map<String, String> generateRandomNumberMap() {
        Map<String, String> numberMap = new HashMap<>();
        Set<String> usedValues = new HashSet<>();
        Random random = new Random();

        for (int i = 1; i <= 25; i++) {
            String key = String.valueOf(i);
            int randomValue;
            do {
                randomValue = random.nextInt(25) + 1;
            } while (usedValues.contains(randomValue+""));

            numberMap.put(key, randomValue+"");
            usedValues.add(randomValue+"");
        }
        return numberMap;


    }


    private int getConnectionNum(Set<Integer> choiceSet) {
        int resultNum = 0;
        for(List<String> loopList : CONNECTION_CHECK_LIST){
            boolean hasThisLine = true;
            for(String loopNum : loopList){
                if(!choiceSet.contains(Integer.valueOf(loopNum))){
                    hasThisLine = false;
                    break;
                }
            }
            if(hasThisLine){
                resultNum++;
            }
        }
        return resultNum;
    }

}
