package tw.com.fu.game.party.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import tw.com.fu.game.party.vo.response.ApiResponse;

@Tag(name = "【APP共用類】")
@RestController
@RequiredArgsConstructor
public class AppCommController {



	//@LogIt(Function.APP_TOKEN_EXPIRE)
	@PostMapping(value = "/app/tokenExpire")
	public HttpEntity<ApiResponse<String>> tokenExpire() {
		ApiResponse<String> result = new ApiResponse<>();
		result.setCode ("-320");
		result.setMessage ("登入逾時，請重新登入");
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return new ResponseEntity<>(result, headers, HttpStatus.UNAUTHORIZED); // 402 - Payment Required
	}

	//@LogIt(Function.APP_TOKEN_KICKED)
	@PostMapping(value = "/app/gameReload")
	public HttpEntity<ApiResponse<String>> tokenKicked() {
		ApiResponse<String> result = new ApiResponse<>();
		result.setCode ("-321");
		result.setMessage ("遊戲已重置請重新登入");
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return new ResponseEntity<>(result, headers, HttpStatus.PAYMENT_REQUIRED); // 402 - Payment Required
	}
}
