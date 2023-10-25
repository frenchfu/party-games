package tw.com.tradevan.petax.irxlot.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Author: 6582 DAVID.FU
 * @create-date: 2023/6/25 下午 07:25
 */
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IrxLotListBean implements Serializable {


    private Long id; // 資料序號


    private String fileNumber; // 檔案編號

    private String taxpayerName; // 納稅義務人姓名

    private String idn; // 身分證統一編號

    private String comuAddr; // 通訊地址

    private String addr; // 戶籍地址

    private String tel; // 電話

    private String telExt; // 分機

    private String phone; // 行動電話

    private String email; // 電子郵件

    private String yr; // 申報年度

    private String orgMain; // 國稅局代號

    private String org; // 稽徵所代號

    private String rewardCd; // 獎項代號

    private String itemCd; // 獎次代號

    private Integer serialNo; // 抽取序號

    private LocalDateTime drawingTime; // 抽獎日期時間

    private String drawingAcc; // 抽獎人

    public String getIdn() {
        return idn.substring(0,3)+"****"+idn.substring(7,10);
    }

    public String getTaxpayerName() {

        if(taxpayerName.length() == 2) {

            return taxpayerName.substring(0,1)+"＊"+taxpayerName.substring(2,taxpayerName.length());

        }else if(taxpayerName.length() < 2) {
            return "＊";
        }else{
            return taxpayerName.substring(0,taxpayerName.length()-2)+"＊"+taxpayerName.substring(taxpayerName.length()-1);
        }

    }

    public String getAddr() {
        return addr.substring(0,3);
    }


    @JsonIgnore
    public String getFullAddr() {
        return addr;
    }

    @JsonIgnore
    public String getEmail(){
        return email;
    }

    @JsonIgnore
    public String getComuAddr() {
        return comuAddr;
    }

    @JsonIgnore
    public String getTel() {
        return tel;
    }
    @JsonIgnore
    public String getTelExt() {
        return telExt;
    }
    @JsonIgnore
    public String getPhone() {
        return phone;
    }
}
