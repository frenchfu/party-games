package tw.com.tradevan.petax.irxlot.converter;


import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

/**
 * @Author 6582 David.Fu
 * @create 2021/5/3 下午 08:53
 */
@Converter(autoApply = true)
public class YesNoConverter implements AttributeConverter<YesNo, String> {



    @Override
    public String convertToDatabaseColumn(YesNo yesNo) {
        if (yesNo == null) {
            return null;
        }
        return yesNo.getCode();
    }

    @Override
    public YesNo convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(YesNo.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }


}