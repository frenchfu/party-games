package tw.com.tradevan.petax.irxlot.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/7 上午 08:48
 */
@Getter
public enum  ErrorCode {

    @JsonProperty("000")
    SUCCESS("000", "交易成功"),
    @JsonProperty("E99")
    E99("E99","其他類檢核錯誤，請聯繫客服協助處理。");



    @JsonValue
    private final String code;
    private final String text;

    ErrorCode(String code,String text) {
        this.code=code;
        this.text = text;
    }

    @JsonCreator
    public static ErrorCode getByCode(final String code) {
        for (ErrorCode unitEnum : ErrorCode.values()) {
            if (unitEnum.getCode().equalsIgnoreCase(code)) {
                return unitEnum;
            }
        }
        return null;
    }


}
