package tw.com.tradevan.petax.irxlot.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/6 下午 02:21
 */
@Getter
public enum MemberTp {

    @JsonProperty("C")
    CREDIT("C", "信用卡"),
    @JsonProperty("T")
    TW_PAY("T","台灣PAY"),
    @JsonProperty("E")
    E_PAY("E","第三方支付業者"),
    @JsonProperty("B")
    BANK("B","銀行");

    @JsonValue
    private final String code;
    private final String text;

    MemberTp(String code,String text) {
        this.code=code;
        this.text = text;
    }

    @JsonCreator
    public static MemberTp getByCode(final String code) {
        for (MemberTp unitEnum : MemberTp.values()) {
            if (unitEnum.getCode().equalsIgnoreCase(code)) {
                return unitEnum;
            }
        }
        return null;
    }



}
