package tw.com.fu.game.party.constant.exception;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tw.com.fu.game.party.constant.enums.ErrorCode;

//import javax.persistence.NamedEntityGraph;

@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper=false)
public class PartyGamesException extends Exception{

	private  String errCode;
	
	private  String errMsg;

	public PartyGamesException(String errCode, String errMsg) {
		super();
		this.errCode = errCode;
		this.errMsg = errMsg;
	}

	public PartyGamesException(Integer errCode, String errMsg) {
		super();
		this.errCode = errCode+"";
		this.errMsg = errMsg;
	}

	public PartyGamesException(ErrorCode errorCode) {
		super();
		this.errCode = errorCode.getCode();
		this.errMsg = errorCode.getText();
	}

	public PartyGamesException(ErrorCode errorCode, String errMsg) {
		super();
		this.errCode = errorCode.getCode();
		this.errMsg = errMsg;
	}
}