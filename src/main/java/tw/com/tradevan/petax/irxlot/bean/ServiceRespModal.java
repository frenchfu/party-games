package tw.com.tradevan.petax.irxlot.bean;

import lombok.Data;

/**
 * @Author 6582 David.Fu
 * @create 2021/4/24 上午 11:07
 */
@Data
public class ServiceRespModal {

    protected String message = "SUCCESS";
    protected Integer code = 0;
    protected Integer counter = 0;
    protected String uuid;
    protected String codeStr;

    protected String reason;

    public void setErrorMsg(String message){
        this.message = message;
        this.code = -1;
    }

}
