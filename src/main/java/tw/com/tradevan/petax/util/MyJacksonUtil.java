package tw.com.tradevan.petax.util;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.log4j.Log4j2;

import java.util.Map;

@Log4j2
public class MyJacksonUtil {

    public static String object2Json(Object obj) {
        if (obj == null) {
            return null;
        }
        String jsonStr = "";
        try {
            ObjectMapper om = new ObjectMapper();
//            om.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
            om.setSerializationInclusion(Include.NON_NULL);
            om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            om.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            jsonStr = om.writeValueAsString(obj);
        } catch (Exception e1) {
            e1.printStackTrace();
            return null;
        }
        return jsonStr;
    }

    public static Object json2Object(String jsonString, Class toClass) {
        Object obj = null;
        try {
            ObjectMapper om = new ObjectMapper();
            // 將json字符串轉換成對象
            Map map = om.readValue(jsonString, Map.class);
            obj = toClass.newInstance();
            obj = om.convertValue(map, toClass);
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return obj;
    }

    public static String getSingleField(String json, String fieldName) {
        String str = "";
        try {
            ObjectNode node = new ObjectMapper().readValue(json, ObjectNode.class);
            if (node.has(fieldName)) {
                str = node.get(fieldName).textValue();
            }
        } catch (Exception e) {
            log.error("error happe",e);
        }
        return str;
    }

}