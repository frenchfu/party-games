package tw.com.fu.game.party.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import tw.com.fu.game.party.vo.response.ApiResponse;

@Tag(name = "【APP共用類】")
@RestController
@RequiredArgsConstructor
public class AppCommController {



	//@LogIt(Function.APP_TOKEN_EXPIRE)
	@PostMapping(value = "/app/tokenExpire")
	public ApiResponse<String> tokenExpire() {
		ApiResponse<String> result = new ApiResponse<>();
		result.setCode ("-320");
		result.setMessage ("登入逾時，請重新登入");
		return result;
	}

	//@LogIt(Function.APP_TOKEN_KICKED)
	@PostMapping(value = "/app/gameReload")
	public ApiResponse<String> tokenKicked() {
		ApiResponse<String> result = new ApiResponse<>();
		result.setCode ("-321");
		result.setMessage ("遊戲已重置請重新登入");
		return result;
	}
}
