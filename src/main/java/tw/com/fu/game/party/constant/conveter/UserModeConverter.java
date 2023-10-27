package tw.com.fu.game.party.constant.conveter;


import tw.com.fu.game.party.constant.enums.UserMode;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

/**
 * @Author 6582 David.Fu
 * @create 2021/10/20 下午 02:21
 */
@Converter(autoApply = true)
public class UserModeConverter implements AttributeConverter<UserMode, String> {

    @Override
    public String convertToDatabaseColumn(UserMode UserMode) {
        if (UserMode == null) {
            return null;
        }
        return UserMode.getCode();
    }

    @Override
    public UserMode convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(UserMode.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }


}