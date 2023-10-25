//package tw.com.tradevan.petax.irxlot.constant.enums;
//
//import com.fasterxml.jackson.annotation.JsonCreator;
//import com.fasterxml.jackson.annotation.JsonValue;
//import lombok.Getter;
//import tw.com.tradevan.petax.irxlot.controller.*;
//
///**
// * @Author: 6582 DAVID.FU
// * @create-date: 2023/7/18 下午 12:10
// */
//@Getter
//public enum ApiAction {
//
//
//    L_LOGIN("L_LOGIN", AccountController.BASE_URL+AccountController.LOT_LOGIN_URL, "登入抽獎", true)
//    ,A_lOGIN("A_lOGIN", AccountController.BASE_URL+AccountController.ADMIN_LOGIN_URL, "登入後台", true)
//    ,LIST_ADMIN_REWARDS("A_LIST_RWD", AdminController.BASE_URL+AdminController.LIST_URL, "後台查詢獎項清單", true)
//    ,ADMIN_RESET_REWARDS("A_RESET_R", AdminRewardsController.BASE_URL+AdminRewardsController.RESET_URL, "重置獎項", true)
//    ,LIST_REWARDS("L_LIST_RWD", IrxLotRewardsController.BASE_URL+IrxLotRewardsController.LIST_URL, "前台查詢獎項", true)
//    ,DROW_REWARDS("D_RWD", LotDrowingController.BASE_URL+ LotDrowingController.DROW_URL, "前台抽獎", true)
//    ,DROW_RESULTS_REWARDS("D_RESULT", LotDrowingController.BASE_URL+ LotDrowingController.RESULT_URL, "前台抽獎結果查詢", true)
//    ,DROW_RESULTS_PDF_DOWNLOAD("D_PDF", PlListPdfController.BASE_URL+ PlListPdfController.DOWNLOAD_URL, "抽獎PDF匯出BY獎項", false)
//    ,DROW_RESULTS_ADMIN_DOWNLOAD("A_EXPORT", PlListPdfController.BASE_URL+ PlListPdfController.CONDITION_DOWNLOAD_URL, "後台抽獎匯出", false)
//   ;
//
//    @JsonValue
//    private String action;
//    private String url;
//    private String text;
//    private Boolean saveResponse;
//
//    ApiAction(String action, String url, String text, Boolean saveResponse) {
//        this.action=action;
//        this.url=url;
//        this.text = text;
//        this.saveResponse = saveResponse;
//    }
//
//
//    @JsonCreator
//    public static ApiAction getByAction(final String action) {
//        for (ApiAction unitEnum : ApiAction.values()) {
//            if (unitEnum.getAction().equalsIgnoreCase(action)) {
//                return unitEnum;
//            }
//        }
//        return null;
//    }
//
//    public static ApiAction getByUrl(final String url) {
//        for (ApiAction unitEnum : ApiAction.values()) {
//            if ( url.contains(unitEnum.getUrl())) {
//                return unitEnum;
//            }
//        }
//        return null;
//    }
//
//
//
//}
