package tw.com.tradevan.petax.irxlot.constant.conveter;

import tw.com.tradevan.petax.irxlot.constant.enums.DownLoadFileType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;


@Converter(autoApply = true)
public class DownLoadFileTypeConvert  implements AttributeConverter<DownLoadFileType, String> {

    @Override
    public String convertToDatabaseColumn(DownLoadFileType UserMode) {
        if (UserMode == null) {
            return null;
        }
        return UserMode.getCode();
    }

    @Override
    public DownLoadFileType convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(DownLoadFileType.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }



}
