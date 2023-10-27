package tw.com.fu.game.party.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tw.com.fu.game.party.bean.UserDetail;
import tw.com.fu.game.party.bean.partyacc.Player;
import tw.com.fu.game.party.constant.enums.YesNo;
import tw.com.fu.game.party.service.plater.PlayerAccountService;
import tw.com.fu.game.party.vo.bingo.request.AdminChoiceNumRequest;
import tw.com.fu.game.party.vo.bingo.request.CheckBingoRequest;
import tw.com.fu.game.party.vo.bingo.response.AdminChoiceNumResponse;
import tw.com.fu.game.party.vo.bingo.response.CheckBingoResponse;
import tw.com.fu.game.party.vo.bingo.response.CheckCanClickResponse;
import tw.com.fu.game.party.vo.bingo.response.DrowCardResponse;
import tw.com.fu.game.party.vo.response.ApiResponse;

import java.util.*;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 01:57
 */
@RestController
@RequestMapping(BingoController.BASE_URL)
public class BingoController {

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

    public static Set<String> CAN_CLICK_SET = new HashSet<>();
    public static Integer REWARD_CONNECTION_NUM = 3;//多少線可以中獎
    public static Integer REWARD_NUM_MAX = 7;//可以中獎的人數
    public static Integer REWARD_NUM = 0;//目前中獎的人數
    public static List<Player> REWARD_PLAYERS = new ArrayList<>();

    public static final String BASE_URL = "/api/bingo";
    public static final String DROW_A_CARD = "/drow-a-card";
    public static final String CHECK_BINGO = "/check-bingo";
    public static final String CHECK_CAN_CLICK = "/check-can-click";
    public static final String ADMIN_CHOICE_NUM = "/admin-choice-num";
    public static final String DO_LOAD_PLAYER = "/do-load-player";


    @PostMapping(BingoController.DO_LOAD_PLAYER)
    public ApiResponse<Player> doLoadPlayer(@AuthenticationPrincipal UserDetail userDetail) {
        ApiResponse<Player> result = new ApiResponse<>();
        Player player = playerAccountService.getUser(userDetail);
        result.setResult(player);
        return result;

    }


    @PostMapping(BingoController.CHECK_BINGO)
    public ApiResponse<CheckBingoResponse> checkBingo(@AuthenticationPrincipal UserDetail userDetail,@RequestBody CheckBingoRequest checkBingoRequest) {

        ApiResponse<CheckBingoResponse> result = new ApiResponse<>();
        CheckBingoResponse checkBingoResponse = new CheckBingoResponse();
        Player player = playerAccountService.getUser(userDetail);

        if(player.getIsReward() == YesNo.Y){
            checkBingoResponse.setIsReward(YesNo.Y);
            result.setResult(checkBingoResponse);
            return result;
        }


        Map<String, String> bingoCard = player.getBingoCard();
        Set<String> choiceSet = this.getChoiceMap(CAN_CLICK_SET, bingoCard);
        choiceSet = this.doRemoveNotChecked(choiceSet, checkBingoRequest.getCheckNums());
        int connectionNum = this.getConnectionNum(choiceSet);

        if(player.getIsReward() == YesNo.Y){//已中獎 不用判斷
            checkBingoResponse.setIsReward(YesNo.Y);
        }else if(connectionNum >= REWARD_CONNECTION_NUM){
            boolean isReward = this.doGetBingo(player);
            if(isReward){
                checkBingoResponse.setIsReward(YesNo.Y);
                player.setIsReward(YesNo.Y);
                playerAccountService.updatePlayer(player);
            }else{
                result.setCode("-1");
                result.setMessage("抱歉 因為你點賓果的速度不夠快 中獎人數已滿");
                checkBingoResponse.setIsReward(YesNo.N);
            }
        }else{
            result.setCode("-1");
            result.setMessage("連線數不足喔 需要完成"+REWARD_CONNECTION_NUM+"條線!");
            checkBingoResponse.setIsReward(YesNo.N);
        }
        result.setResult(checkBingoResponse);
        return result;

    }

    private Set<String> doRemoveNotChecked(Set<String> canChoiceSet , Set<Integer> requestCheckNums) {
        // 创建一个新的集合，用于存储已经通过检查的元素
        Set<String> checkedSet = new HashSet<>(canChoiceSet);
        // 遍历canChoiceSet，检查每个元素是否出现在requestCheckNums中，如果没有，就从checkedSet中移除
        for (String element : canChoiceSet) {
            if (!requestCheckNums.contains(Integer.valueOf(element))) {
                checkedSet.remove(element);
            }
        }
        return checkedSet;
    }

    private synchronized boolean doGetBingo(Player player) {
        boolean result = false;
        if(REWARD_PLAYERS.size() <= REWARD_NUM_MAX){
            REWARD_PLAYERS.add(player);
            result = true;
            REWARD_NUM = REWARD_PLAYERS.size();
        }else{
            //donothing
        }
        return result;
    }

    private int getConnectionNum(Set<String> choiceSet) {
        int resultNum = 0;
        for(List<String> loopList : CONNECTION_CHECK_LIST){
            boolean hasThisLine = true;
            for(String loopNum : loopList){
                if(!choiceSet.contains(loopNum)){
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

    private Set<String> getChoiceMap(Set<String> canClickSet, Map<String, String> bingoCard) {
        Set<String> resultSet = new HashSet<>();
        for(String key : bingoCard.keySet()){
            if(canClickSet.contains(bingoCard.get(key))){
                resultSet.add(key);
            }
        }
        return resultSet;
    }


    @PostMapping(BingoController.ADMIN_CHOICE_NUM)
    public ApiResponse<AdminChoiceNumResponse> adminChoiceNum(@RequestBody AdminChoiceNumRequest adminChoiceNumRequest) {

        ApiResponse<AdminChoiceNumResponse> result = new ApiResponse<>();

        CAN_CLICK_SET.add(adminChoiceNumRequest.getChoiceNum());

        result.setResult(AdminChoiceNumResponse.builder().ok(YesNo.Y).build());
        return result;

    }


    @PostMapping(BingoController.CHECK_CAN_CLICK)
    public ApiResponse<CheckCanClickResponse> checkCanClick(@AuthenticationPrincipal UserDetail userDetail) {

        ApiResponse<CheckCanClickResponse> result = new ApiResponse<>();
        result.setResult(CheckCanClickResponse.builder().canCheckdNums(CAN_CLICK_SET).build());
        return result;

    }




    @Autowired
    PlayerAccountService playerAccountService;

    @PostMapping(BingoController.DROW_A_CARD)
    public ApiResponse<DrowCardResponse> dworCard(@AuthenticationPrincipal UserDetail userDetail) {

        ApiResponse<DrowCardResponse> result = new ApiResponse<>();

        Player targetPlayer = playerAccountService.getUser(userDetail);
        if(targetPlayer.getBingoCard() == null || targetPlayer.getBingoCard().isEmpty()){
            targetPlayer.setBingoCard(generateRandomNumberMap());
            playerAccountService.updatePlayer(targetPlayer);
        }else{
            //do Nothing
        }
        result.setResult(DrowCardResponse.builder().bingoCard(targetPlayer.getBingoCard()).build());
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




}
