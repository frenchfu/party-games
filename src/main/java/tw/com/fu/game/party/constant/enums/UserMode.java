package tw.com.fu.game.party.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import tw.com.fu.game.party.constant.RoleConstants;

@Getter
public enum UserMode {


    ADMIN("ADMIN","後台","A", RoleConstants.ADMIN),
    LOT("LOT","前台",null, RoleConstants.LOT);

    @JsonValue
    String code;
    String text;
    String dbCode;
    String permission;

    UserMode ( String code, String text , String dbCode, String permission) {
        this.code = code ;
        this.text = text;
        this.dbCode=dbCode;
        this.permission=permission;
    }

    @JsonCreator
    public static UserMode getByCode(String code ){
        for ( UserMode unitEnum : UserMode.values() ){
            if(unitEnum.getCode().equals(code) ){
                return unitEnum;
            }
        }
        return null;
    }

}
