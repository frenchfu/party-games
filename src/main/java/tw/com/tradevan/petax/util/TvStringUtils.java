package tw.com.tradevan.petax.util;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.regex.Pattern;

/**
 * @Author 6582 David.Fu
 * @create 2020/10/20 上午 11:42
 *
 *   一些字串相關檢查
 *
 */
@Log4j2
public class TvStringUtils {


    /**
     * 判斷合法URL
     * @param url
     * @return
     */
    @Deprecated
    public static boolean isLegalUrl(String url){

        boolean result;

        if(url == null){
            result =  false;
        }else{

            String regex = "^([hH][tT]{2}[pP]:/*|[hH][tT]{2}[pP][sS]:/*|[fF][tT][pP]:/*)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+(\\?{0,1}(([A-Za-z0-9-~]+\\={0,1})([A-Za-z0-9-~]*)\\&{0,1})*)$";
            Pattern pattern = Pattern.compile(regex);
            result = pattern.matcher(url).matches();

        }

        return result;

    }

    public static BigDecimal tryToBigDecimal(String numberStr, boolean toZero) {
        BigDecimal result = toZero ? BigDecimal.ZERO : null;
        try {
            result = new BigDecimal(numberStr);
        } catch (Exception e) {

        }
        return result;
    }

    public static Timestamp tryToTimeStamp(String timeStr, String formatType, boolean toNow) {

        Timestamp result = toNow ? new Timestamp(new Date().getTime()) : null;

        try {
            if(timeStr.length() > formatType.length()){
                timeStr = timeStr.substring(0, formatType.length());
            }else{
                formatType = formatType.substring(0, timeStr.length());
            }
            DateTimeFormatter df = DateTimeFormatter.ofPattern(formatType);
            result = Timestamp.valueOf(LocalDateTime.parse(timeStr, df));
        } catch (Exception e) {
            log.error("error happe",e);
        }


        return result;


    }

    public static String tryTimeToString(Timestamp validTime) {
        String retsult = "";
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            retsult = dateFormat.format(new Date());
        } catch (Exception e) {

        }
        return retsult;
    }

    public static String tryDateToString(Date date) {
        String retsult = "";
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            retsult = dateFormat.format(date);
        } catch (Exception e) {

        }
        return retsult;
    }

    public static String tryDateToString(Date date, String pattern) {
        String retsult = "";
        try {
           retsult = tryLocalDateTimeToString(date.toInstant()
                   .atZone(ZoneId.systemDefault())
                   .toLocalDateTime(),pattern);
        } catch (Exception e) {

        }
        return retsult;
    }

    public static String tryLocalDateTimeToString(LocalDateTime dateTime , String pattern) {
        String retsult = "";
        try {

            if(!pattern.contains("yyyy") && pattern.contains("yyy")){
                int year = dateTime.getYear();
                year = year-1911;
                String yearstr = String.format("%03d", year);
                pattern = pattern.replace("yyy", yearstr);
            }
            retsult = dateTime.format(DateTimeFormatter.ofPattern(pattern));

        } catch (Exception e) {

        }
        return retsult;
    }


    public static String getFileNameFromPath(String accessoryContractPath) {
        String result = "";
        try{
            int lastIndex = accessoryContractPath.lastIndexOf("/");
            result = accessoryContractPath.substring(lastIndex+1);
        }catch (Exception e){
            log.error("error happe",e);
        }
        return result;

    }

    public static LocalDateTime tryStringToLocalDatetime(String dateSty , String formater){
        LocalDateTime result = null;
        try{
            String str = dateSty;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formater);
            result = LocalDateTime.parse(str, formatter);
        }catch (Exception e){
            log.error("tryStringToLocalDatetime"+ ExceptionUtils.getStackTrace(e));
        }
        return result;
    }


}
