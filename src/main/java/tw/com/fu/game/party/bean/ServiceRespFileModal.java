package tw.com.fu.game.party.bean;

import lombok.Data;

/**
 * @Author 6582 David.Fu
 * @create 2021/4/24 上午 11:07
 */
@Data
public class ServiceRespFileModal extends ServiceRespModal{

    private byte[] bytes;
    private String fileNams;

    @Override
    public String toString() {
        return "ServiceRespFileModal{" +
                "bytes=" + (bytes == null ? 0: bytes.length) +
                ", message='" + message + '\'' +
                ", code=" + code +
                '}';
    }
}
