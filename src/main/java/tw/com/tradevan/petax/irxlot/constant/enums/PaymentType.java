package tw.com.tradevan.petax.irxlot.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/6 下午 02:17
 */
@Getter
public enum PaymentType {

    @JsonProperty("15001")
    TP_15001("15001");

    @JsonValue
    private final String code;

    PaymentType(String yn) {
        this.code=yn;
    }

    @JsonCreator
    public static PaymentType getByCode(final String code) {
        for (PaymentType unitEnum : PaymentType.values()) {
            if (unitEnum.getCode().equalsIgnoreCase(code)) {
                return unitEnum;
            }
        }
        return null;
    }

}
