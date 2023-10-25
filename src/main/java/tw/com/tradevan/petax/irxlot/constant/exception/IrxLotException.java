package tw.com.tradevan.petax.irxlot.constant.exception;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tw.com.tradevan.petax.irxlot.constant.enums.ErrorCode;

//import javax.persistence.NamedEntityGraph;

@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper=false)
public class IrxLotException extends Exception{

	private  String errCode;
	
	private  String errMsg;

	public IrxLotException(String errCode, String errMsg) {
		super();
		this.errCode = errCode;
		this.errMsg = errMsg;
	}

	public IrxLotException(Integer errCode, String errMsg) {
		super();
		this.errCode = errCode+"";
		this.errMsg = errMsg;
	}

	public IrxLotException(ErrorCode errorCode) {
		super();
		this.errCode = errorCode.getCode();
		this.errMsg = errorCode.getText();
	}

	public IrxLotException(ErrorCode errorCode, String errMsg) {
		super();
		this.errCode = errorCode.getCode();
		this.errMsg = errMsg;
	}
}