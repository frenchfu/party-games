package tw.com.tradevan.petax.util;

import lombok.extern.log4j.Log4j2;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

/**
 * @Author 6582 David.Fu
 * @create 2021/6/6 下午 02:01
 *
 * 使用更加隨機的亂數產生器 來修補弱點  Use_of_Cryptographically_Weak_PRNG
 *
 *
 *
 */
@Log4j2
public class SecureRandomUtils {


    static SecureRandom random;

    static {
        try {
            random = SecureRandom.getInstance("SHA1PRNG");
        } catch (NoSuchAlgorithmException e) {
            log.error("error happe",e);
        }
    }

    public static Integer getRandomZeroToTenValue(){
        return random.nextInt(11);
    }

    /**
     * 回傳 0 ~ (input -1) 之間的亂數
     * @param round
     * @return
     */
    public static Integer getRandom(int round){
        return random.nextInt(round);
    }

//    public static void main(String[] args) {
//
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//        log.info(getRandomZeroToTenValue());
//
//
//        for(int i = 0 ; i < 1000 ; i++){
//            log.info(getRandom(100));
//        }
//
//
//    }


}
