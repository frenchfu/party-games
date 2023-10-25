package tw.com.tradevan.petax.irxlot.converter;


import tw.com.tradevan.petax.irxlot.constant.enums.MemberTp;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

/**
 * @Author 6582 David.Fu
 * @create 2021/5/3 下午 08:53
 */
@Converter(autoApply = true)
public class MemberTpConverter implements AttributeConverter<MemberTp, String> {



    @Override
    public String convertToDatabaseColumn(MemberTp memberTp) {
        if (memberTp == null) {
            return null;
        }
        return memberTp.getCode();
    }

    @Override
    public MemberTp convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(MemberTp.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }


}