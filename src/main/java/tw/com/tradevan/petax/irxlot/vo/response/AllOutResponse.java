package tw.com.tradevan.petax.irxlot.vo.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@JsonPropertyOrder({"result" , "message"})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllOutResponse<T> {

    @JsonProperty("result")
    private String result ;

    @JsonProperty("message")
    private String message ;


}
