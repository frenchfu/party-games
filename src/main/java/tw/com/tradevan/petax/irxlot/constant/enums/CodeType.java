package tw.com.tradevan.petax.irxlot.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/7/11 上午 11:51
 */
@Getter
public enum CodeType {

    @JsonProperty("REWARD")
    REWARD("REWARD", "獎種"),
    @JsonProperty("ITEM")
    ITEM("ITEM","獎項");

    @JsonValue
    private final String code;
    private final String text;

    CodeType(String code,String text) {
        this.code=code;
        this.text = text;
    }

    @JsonCreator
    public static CodeType getByCode(final String code) {
        for (CodeType unitEnum : CodeType.values()) {
            if (unitEnum.getCode().equalsIgnoreCase(code)) {
                return unitEnum;
            }
        }
        return null;
    }



}
