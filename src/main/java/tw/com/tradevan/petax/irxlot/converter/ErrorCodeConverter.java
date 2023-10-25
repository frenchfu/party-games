package tw.com.tradevan.petax.irxlot.converter;


import tw.com.tradevan.petax.irxlot.constant.enums.ErrorCode;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

/**
 * @Author 6582 David.Fu
 * @create 2021/5/3 下午 08:53
 */
@Converter(autoApply = true)
public class ErrorCodeConverter implements AttributeConverter<ErrorCode, String> {



    @Override
    public String convertToDatabaseColumn(ErrorCode errorCode) {
        if (errorCode == null) {
            return null;
        }
        return errorCode.getCode();
    }

    @Override
    public ErrorCode convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(ErrorCode.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }


}