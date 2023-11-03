package tw.com.fu.game.party.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tw.com.fu.game.party.dao.PlayerDao;
import tw.com.fu.game.party.vo.bingo.response.CheckCanClickResponse;
import tw.com.fu.game.party.vo.bingo.response.DoAdminReloadResponse;
import tw.com.fu.game.party.vo.response.ApiResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.UUID;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/10/23 下午 01:57
 */
@RestController
@RequestMapping(BingoAdminController.BASE_URL)
public class BingoAdminController {

    public static final String BASE_URL = "/api/bingo-admin";
    public static final String DO_ADMIN_RELOAD = "/do-admin-reload";
    public static final String DO_SET_MAX_REWARD_NUM = "/do-set-max-reward-num/{num}";
    public static final String DO_SET_GET_REWARD_CONNECTION_NUM = "/do-set-get-reward-connection-num/{num}";
    public static final String CHOICE_NUM = "/choice-num/{num}";
    public static final String CANCEL_NUM = "/cancel-num/{num}";
    public static final String RESET_GAME = "/reset-game";

    @PostMapping(BingoAdminController.RESET_GAME)
    public ApiResponse<DoAdminReloadResponse> doResetGame() {
        ApiResponse<DoAdminReloadResponse> apiResponse = new ApiResponse<>();

        BingoController.CAN_CLICK_SET = new HashSet<>();
        BingoController.REWARD_PLAYERS = new ArrayList<>();
        PlayerController.GAME_UUID = UUID.randomUUID().toString();
        PlayerDao.PLAYER_MAP = new HashMap<>();
        BingoController.REWARD_NUM = 0;

        apiResponse.setResult(DoAdminReloadResponse.builder()
                .canCheckdNums(BingoController.CAN_CLICK_SET)
                .rewardNumMax(BingoController.REWARD_NUM_MAX)
                .rewardNum(BingoController.REWARD_NUM)
                .rewardPlayers(BingoController.REWARD_PLAYERS)
                .getRewardConnectionNum(BingoController.REWARD_CONNECTION_NUM)
                .build()
        );
        return apiResponse;
    }

    @PostMapping(BingoAdminController.DO_ADMIN_RELOAD)
    public ApiResponse<DoAdminReloadResponse> doAdminReload() {
        ApiResponse<DoAdminReloadResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(DoAdminReloadResponse.builder()
                        .canCheckdNums(BingoController.CAN_CLICK_SET)
                        .rewardNumMax(BingoController.REWARD_NUM_MAX)
                        .rewardNum(BingoController.REWARD_NUM)
                        .rewardPlayers(BingoController.REWARD_PLAYERS)
                        .getRewardConnectionNum(BingoController.REWARD_CONNECTION_NUM)
                .build()
        );
        return apiResponse;
    }

    @PostMapping(BingoAdminController.DO_SET_MAX_REWARD_NUM)
    public ApiResponse<DoAdminReloadResponse> doSetMaxRewardNum(@PathVariable("num") String num) {
        ApiResponse<DoAdminReloadResponse> apiResponse = new ApiResponse<>();
        BingoController.REWARD_NUM_MAX = Integer.valueOf(num);
        apiResponse.setResult(DoAdminReloadResponse.builder()
                .canCheckdNums(BingoController.CAN_CLICK_SET)
                .rewardNumMax(BingoController.REWARD_NUM_MAX)
                .rewardNum(BingoController.REWARD_NUM)
                .rewardPlayers(BingoController.REWARD_PLAYERS)
                .getRewardConnectionNum(BingoController.REWARD_CONNECTION_NUM)
                .build()
        );
        return apiResponse;
    }

    @PostMapping(BingoAdminController.DO_SET_GET_REWARD_CONNECTION_NUM)
    public ApiResponse<DoAdminReloadResponse> doSetGetRewardConnectionNum(@PathVariable("num") String num) {
        ApiResponse<DoAdminReloadResponse> apiResponse = new ApiResponse<>();
        BingoController.REWARD_CONNECTION_NUM = Integer.valueOf(num);
        apiResponse.setResult(DoAdminReloadResponse.builder()
                .canCheckdNums(BingoController.CAN_CLICK_SET)
                .rewardNumMax(BingoController.REWARD_NUM_MAX)
                .rewardNum(BingoController.REWARD_NUM)
                .rewardPlayers(BingoController.REWARD_PLAYERS)
                .getRewardConnectionNum(BingoController.REWARD_CONNECTION_NUM)
                .build()
        );
        return apiResponse;
    }

    @PostMapping(BingoAdminController.CHOICE_NUM)
    public ApiResponse<CheckCanClickResponse> choiceNum(@PathVariable("num") String num) {
        ApiResponse<CheckCanClickResponse> apiResponse = new ApiResponse<>();
        BingoController.CAN_CLICK_SET.add(num);
        apiResponse.setResult(CheckCanClickResponse.builder().canCheckdNums(BingoController.CAN_CLICK_SET).build());
        return apiResponse;
    }

    @PostMapping(BingoAdminController.CANCEL_NUM)
    public ApiResponse<CheckCanClickResponse> cancelNum(@PathVariable("num") String num) {
        ApiResponse<CheckCanClickResponse> apiResponse = new ApiResponse<>();
        BingoController.CAN_CLICK_SET.remove(num);
        apiResponse.setResult(CheckCanClickResponse.builder().canCheckdNums(BingoController.CAN_CLICK_SET).build());
        return apiResponse;
    }

}
