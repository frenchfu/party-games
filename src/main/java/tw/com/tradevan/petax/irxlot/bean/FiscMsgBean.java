package tw.com.tradevan.petax.irxlot.bean;

import java.util.HashMap;

public class FiscMsgBean {

	public HashMap<String,String> fiscMsg = new HashMap<String,String>();
	
	public FiscMsgBean(){
		fiscMsg.put("4001","交易成功");
		fiscMsg.put("0101","訊息格式或內容編輯錯誤");
		fiscMsg.put("0102","訊息回應代碼錯誤");
		fiscMsg.put("0104","訊息發生一般檢核類錯誤");
		fiscMsg.put("2999","其他類檢核錯誤");
		fiscMsg.put("0301","押碼基碼不同步");
		fiscMsg.put("0302","訊息押碼錯誤");
		fiscMsg.put("0304","亂碼化設備故障");
		fiscMsg.put("0801","檔案故障");
		fiscMsg.put("1001","無效之訊息類別代碼或交易類別代碼");
		fiscMsg.put("1002","跨行交易序號重覆或繳費單位交易序號重覆");
		fiscMsg.put("1004","訊息內之跨行交易序號或繳費單位交易序號錯誤");
		fiscMsg.put("4801","繳款（稅）類別有誤；未經註冊之繳費交易");
		fiscMsg.put("4802","銷帳編號檢查碼有誤");
		fiscMsg.put("4804","繳款（稅）期限有誤；逾期／未到");
		fiscMsg.put("4805","事業機構代號有誤");
		fiscMsg.put("4806","身份證營利事業統一編號/營利事業營利事業統一編號與存款帳號之身份證營利事業統一編號/營利事業營利事業統一編號不相同");
		fiscMsg.put("9003","稅籍資料檢查錯誤");
		fiscMsg.put("9004","關貿連結之申報或自繳資料不存在");
		fiscMsg.put("9005","營業稅稅籍編號有誤 ,請關閉瀏覽器後重新輸入");
		fiscMsg.put("9006","繳費單位本項跨行業務停止或暫停營業");
		fiscMsg.put("9007","繳費單位本項跨行業務未停止或未暫停營業");
		fiscMsg.put("9008","訊息傳輸長度小於實際傳輸資料長度");
		fiscMsg.put("9009","縣市機關鄉鎮代號與營業稅稅籍編號檢核不符");
		fiscMsg.put("9010","現在仍有交易進行中，請稍候再試");
		fiscMsg.put("9101","繳費（稅）資料錯誤");
		fiscMsg.put("9997","系統服務到達上限。請稍後再試。");
		fiscMsg.put("9999","系統發生不明錯誤,若已啟動轉帳或繳稅交易,請洽財金公司詢問該筆交易狀況,以避免重覆扣帳");
	}
}

