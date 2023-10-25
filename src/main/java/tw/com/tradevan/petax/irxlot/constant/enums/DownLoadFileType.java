package tw.com.tradevan.petax.irxlot.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum DownLoadFileType {

    @JsonProperty("CSV")
    CSV("CSV", "CSV"),
    @JsonProperty("PDF")
    PDF("PDF","PDF");

    @JsonValue
    private final String code;
    private final String text;

    DownLoadFileType(String code,String text) {
        this.code=code;
        this.text = text;
    }

    @JsonCreator
    public static DownLoadFileType getByCode(final String code) {
        for (DownLoadFileType unitEnum : DownLoadFileType.values()) {
            if (unitEnum.getCode().equalsIgnoreCase(code)) {
                return unitEnum;
            }
        }
        return null;
    }


}
