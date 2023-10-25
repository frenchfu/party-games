package tw.com.tradevan.petax.irxlot.config;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tw.com.tradevan.petax.irxlot.constant.enums.YesNo;
import tw.com.tradevan.petax.irxlot.entity.IrcApConfig;
import tw.com.tradevan.petax.util.TvStringUtils;

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
public class IrxLotPath {

    //public static String JWT_SECRET = "irxLotSecretAptkEnJwt";
    public static String EAR_VERSION = "20230822001";
    public static String GIT_TAG_VERSION = "v1.1.2";
    public static LocalDateTime WAR_DATE = LocalDateTime.now();



    public static String OP_OS_CODE = "S";

    public static Logger logger = Logger.getLogger("Path");
    public static final String SUCCESS_CODE = "000";
    public static final String SUCCESS_MESSAGE = "交易成功";
    public static String HANDLE_PC = "";
    public static String HANDLE_IP = "";
    public final static String AP_CODE= "irxlot";

    public static String LOT_YR = "111";//年度
    public static LocalDateTime AP_START_DATE = LocalDateTime.now();
    public static LocalDateTime AP_END_DATE = LocalDateTime.now().plusYears(1);
    public static YesNo IS_CHECK_DATE = YesNo.Y;

    public static Map<String, Object> pathConfigMap = new HashMap<>();


    //年度

    //用來記憶池子的大小
    public static Long G01_QUALIFICATIONS_PEOPLE_NUM = 0l;
    public static Long G02_QUALIFICATIONS_PEOPLE_NUM = 0l;
    public static Long G03_QUALIFICATIONS_PEOPLE_NUM = 0l;
    //用來保存已經抽重的名單
    public static Set<Long> G01_DROWED_ID = new LinkedHashSet<>();
    public static Set<Long> G02_DROWED_ID = new LinkedHashSet<>();
    public static Set<Long> G03_DROWED_ID = new LinkedHashSet<>();

    //抽獎種子 不可用 因為亂數種子 只要相同 順序都是不變的
    //public static long  SEED = UUID.randomUUID().getLeastSignificantBits();

    //共用
    public static InputStream getFileFromResource(String fileName) throws URISyntaxException {
        InputStream is = IrxLotPath.class.getResourceAsStream(fileName);
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
        pathConfigMap.put("LOT_YR", LOT_YR);
        pathConfigMap.put("AP_END_DATE", AP_END_DATE);
        pathConfigMap.put("IS_CHECK_DATE", IS_CHECK_DATE);
        pathConfigMap.put("G01_QUALIFICATIONS_PEOPLE_NUM", G01_QUALIFICATIONS_PEOPLE_NUM);
        pathConfigMap.put("G02_QUALIFICATIONS_PEOPLE_NUM", G02_QUALIFICATIONS_PEOPLE_NUM);
        pathConfigMap.put("G03_QUALIFICATIONS_PEOPLE_NUM", G03_QUALIFICATIONS_PEOPLE_NUM);

    }


    private synchronized boolean initSysMappingFormDB() {

        try {


//            List<IrcApConfig> dataList = ircApConfigRepository.findBySnameLike(AP_CODE+"%");
//            dataList.addAll(ircApConfigRepository.findBySname("irc.path"));

//            for (IrcApConfig loopData : dataList) {
//
//                if (loopData.getSname().equals(AP_CODE+"."+"ap_start_date")) {
//                    AP_START_DATE = TvStringUtils.tryStringToLocalDatetime(loopData.getValue(), "yyyy/MM/dd HH:mm:ss");
//                }else if (loopData.getSname().equals(AP_CODE+"."+"ap_end_date")) {
//                    AP_END_DATE = TvStringUtils.tryStringToLocalDatetime(loopData.getValue(), "yyyy/MM/dd HH:mm:ss");
//                }else if (loopData.getSname().equals(AP_CODE+"."+"is_check_date")) {
//                    IS_CHECK_DATE = YesNo.getByCode(loopData.getValue());
//                }else if (loopData.getSname().equals("irc.path")){
//                    LOT_YR = loopData.getValue();
//                }
//
//            }


//            G01_QUALIFICATIONS_PEOPLE_NUM = irxLotListG01Repository.count();
//            G02_QUALIFICATIONS_PEOPLE_NUM = irxLotListG02Repository.count();
//            G03_QUALIFICATIONS_PEOPLE_NUM = irxLotListG03Repository.count();
//
//            G01_DROWED_ID = irxLotListG01Repository.findAllBySerialNoNotNullOrderById();
//            G02_DROWED_ID = irxLotListG02Repository.findAllBySerialNoNotNullOrderById();
//            G03_DROWED_ID = irxLotListG03Repository.findAllBySerialNoNotNullOrderById();
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
