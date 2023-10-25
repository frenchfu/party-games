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
public enum YesNo {

    @JsonProperty("Y")
    Y("Y"),
    @JsonProperty("N")
    N("N");

    @JsonValue
    private final String code;

    YesNo(String yn) {
        this.code=yn;
    }

    @JsonCreator
    public static YesNo getByCode(final String code) {
        for (YesNo unitEnum : YesNo.values()) {
            if (unitEnum.getCode().equalsIgnoreCase(code)) {
                return unitEnum;
            }
        }
        return null;
    }

}
