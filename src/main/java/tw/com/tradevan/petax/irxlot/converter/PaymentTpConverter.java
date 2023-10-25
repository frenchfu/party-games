package tw.com.tradevan.petax.irxlot.converter;


import tw.com.tradevan.petax.irxlot.constant.enums.PaymentType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

/**
 * @Author 6582 David.Fu
 * @create 2021/5/3 下午 08:53
 */
@Converter(autoApply = true)
public class PaymentTpConverter implements AttributeConverter<PaymentType, String> {

    @Override
    public String convertToDatabaseColumn(PaymentType paymentType) {
        if (paymentType == null) {
            return null;
        }
        return paymentType.getCode();
    }

    @Override
    public PaymentType convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(PaymentType.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }


}