package tw.com.fu.game.party.config;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import tw.com.fu.game.party.constant.enums.YesNo;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.*;

/**
 * @Author 6582 David.Fu
 * @create 2021/12/3 下午 02:56
 */
@Log4j2
@Component
public class PartyGamesPath {

    //public static String JWT_SECRET = "irxLotSecretAptkEnJwt";
    public static String EAR_VERSION = "20231027";
    public static String GIT_TAG_VERSION = "v1.0.0";
    public static LocalDateTime WAR_DATE = LocalDateTime.now();



    public static String OP_OS_CODE = "S";
    public static Logger logger = Logger.getLogger("Path");
    public static final String SUCCESS_CODE = "000";
    public static final String SUCCESS_MESSAGE = "交易成功";
    public static String HANDLE_PC = "";
    public static String HANDLE_IP = "";
    public final static String AP_CODE= "PARTYGAMES";

    public static String YR = "113";//年度
    public static LocalDateTime AP_START_DATE = LocalDateTime.now();
    public static LocalDateTime AP_END_DATE = LocalDateTime.now().plusYears(1);
    public static YesNo IS_CHECK_DATE = YesNo.Y;
    public static Map<String, Object> pathConfigMap = new HashMap<>();


    public static Long G01_QUALIFICATIONS_PEOPLE_NUM = 0l;
    public static Long G02_QUALIFICATIONS_PEOPLE_NUM = 0l;
    public static Long G03_QUALIFICATIONS_PEOPLE_NUM = 0l;

    public static Set<Long> G01_DROWED_ID = new LinkedHashSet<>();
    public static Set<Long> G02_DROWED_ID = new LinkedHashSet<>();
    public static Set<Long> G03_DROWED_ID = new LinkedHashSet<>();


    //共用
    public static InputStream getFileFromResource(String fileName) throws URISyntaxException {
        InputStream is = PartyGamesPath.class.getResourceAsStream(fileName);
        return is;
    }


    @PostConstruct
    public void getValueFromDB() {

        InetAddress myComputer;
        try {
            myComputer = InetAddress.getLocalHost();
            HANDLE_IP = myComputer.getHostAddress();
            HANDLE_PC = myComputer.getHostName();
            initSysMappingFormDB();
        } catch (Exception e) {
            log.error(ExceptionUtils.getStackTrace(e));
        }

        pathConfigMap.put("AP_START_DATE", AP_START_DATE);
        pathConfigMap.put("LOT_YR", YR);
        pathConfigMap.put("AP_END_DATE", AP_END_DATE);
        pathConfigMap.put("IS_CHECK_DATE", IS_CHECK_DATE);
        pathConfigMap.put("G01_QUALIFICATIONS_PEOPLE_NUM", G01_QUALIFICATIONS_PEOPLE_NUM);
        pathConfigMap.put("G02_QUALIFICATIONS_PEOPLE_NUM", G02_QUALIFICATIONS_PEOPLE_NUM);
        pathConfigMap.put("G03_QUALIFICATIONS_PEOPLE_NUM", G03_QUALIFICATIONS_PEOPLE_NUM);

    }


    private synchronized boolean initSysMappingFormDB() {

        try {


            log.info("INIT END");



        } catch (Exception e) {
            log.error(ExceptionUtils.getStackTrace(e));
            return false;
        }
        return true;

    }


    public String showAllValue() {
        StringBuffer resultSb = new StringBuffer();

        resultSb.append("<table>\n");
        resultSb.append(this.getTr("名稱", "值"));
        Set<String> keys = this.pathConfigMap.keySet();
        for (String key : keys) {
            Object obj = pathConfigMap.get(key);
            resultSb.append(this.getTr(key, obj));
        }
        resultSb.append("</table>\n");
        return resultSb.toString();
    }

    private String getTr(String td1, Object td2) {
        String result = "";
        String sp = "\n";
        result = "<tr>";
        result = result + "<td>" + td1 + "</td>";
        result = result + "<td>" + td2 + "</td>";
        result = result + "</tr>" + sp;
        return result;
    }


}
