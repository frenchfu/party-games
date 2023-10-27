package tw.com.fu.game.party.model;

import lombok.Data;

/**
 * @Author 6582 David.Fu
 * @create 2021/4/24 上午 11:07
 */
@Data
public class ServiceRespContentBeanModel<T> extends ServiceRespModel {
    T resultBean;
}
