package tw.com.fu.game.party.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author 6582 David.Fu
 * @create 2021/10/17 上午 11:36
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FileModal {
    private String fileName ;
    private byte[] bytes;
}
