package tw.com.tradevan.petax.irxlot.bean;

public class FiscTxnResBean {
	private String srcId 			 =  "";	//通路代號（訊息來源代碼），由財金公司編號                                                                                                                                                                                                                       
	private String stan 			 =  "";	//申報系統交易序號，同請求訊息內容                                                                                                                                                                                                                                 
	private String keyId 			 =  "";	//MAC Seed Key識別碼                                                                                                                                                                                                                                               
	private String divData 			 =  ""; //產製SessionKey過程中生成的隨機亂數值，以HEX格式表示                                                                                                                                                                                                              
	private String icv 				 =  "";	//產製MAC過程中生成的隨機亂數值，以HEX格式表示                                                                                                                                                                                                                     
	private String mac 				 =  ""; //訊息押碼，以HEX格式表示                                                                                                                                                                                                                                          
	private String pcode 			 =  "";                          
	private String length            =	"";	//訊息總長度(126)
	private String txnDate           =	"";	//CCYYMMDDhhmmss
	private String txnNo             =	"";	//當日唯一交易序號
	private String lastStan          =	"";	//上次成功跨行交易成功交易序號，若為授權交易則回傳0000000000
	private String lastTxnAmount     =	"";	//上次成功交易金額，若為授權交易則回傳00000000000
	private String lastCardNo        =	"";	//上次成功交易使用卡號(7~12碼會以*表示)，若為授權交易則回傳0000000000000000
	private String lastAuthCode      =	"";	//上次成功交易授權碼，若為授權交易則回傳000000
	private String lastAuthDateTime  =	"";	//CCYYMMDDhhmmss上次成功交易授權時間，若為授權交易則回傳00000000000000
	private String taxStan           =	"";	//繳稅交易跨行交易序號，若為查詢交易則回傳0000000000
	private String taxTxnNo          =	"";	//事業單位交易序號，若為查詢交易則回傳0000000
	private String txnAmount         =	"";	//交易金額，若為查詢交易則回傳00000000000
	private String authCode          =	"";	//授權碼，若為查詢交易則回傳000000
	private String authDateTime      =	"";	//CCYYMMDDhhmmss授權時間，若為查詢交易則回傳00000000000000
	private String rcode			 =  ""; //交易回傳代碼
	private String rcodeDesc		 =	"";	//交易回應代碼描述
	private String noticeNo			 =	"";	//銷帳編號
	
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getTxnDate() {
		return txnDate;
	}
	public void setTxnDate(String txnDate) {
		this.txnDate = txnDate;
	}
	public String getTxnNo() {
		return txnNo;
	}
	public void setTxnNo(String txnNo) {
		this.txnNo = txnNo;
	}
	public String getLastStan() {
		return lastStan;
	}
	public void setLastStan(String lastStan) {
		this.lastStan = lastStan;
	}
	public String getLastTxnAmount() {
		return lastTxnAmount;
	}
	public void setLastTxnAmount(String lastTxnAmount) {
		this.lastTxnAmount = lastTxnAmount;
	}
	public String getLastCardNo() {
		return lastCardNo;
	}
	public void setLastCardNo(String lastCardNo) {
		this.lastCardNo = lastCardNo;
	}
	public String getLastAuthCode() {
		return lastAuthCode;
	}
	public void setLastAuthCode(String lastAuthCode) {
		this.lastAuthCode = lastAuthCode;
	}
	public String getLastAuthDateTime() {
		return lastAuthDateTime;
	}
	public void setLastAuthDateTime(String lastAuthDateTime) {
		this.lastAuthDateTime = lastAuthDateTime;
	}
	public String getTaxStan() {
		return taxStan;
	}
	public void setTaxStan(String taxStan) {
		this.taxStan = taxStan;
	}
	public String getTaxTxnNo() {
		return taxTxnNo;
	}
	public void setTaxTxnNo(String taxTxnNo) {
		this.taxTxnNo = taxTxnNo;
	}
	public String getTxnAmount() {
		return txnAmount;
	}
	public void setTxnAmount(String txnAmount) {
		this.txnAmount = txnAmount;
	}
	public String getAuthCode() {
		return authCode;
	}
	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}
	public String getAuthDateTime() {
		return authDateTime;
	}
	public void setAuthDateTime(String authDateTime) {
		this.authDateTime = authDateTime;
	}
	@Override
	public String toString() {
		return "length=" + length + ", txnDate=" + txnDate + ", txnNo=" + txnNo + ", lastStan=" + lastStan
				+ ", lastTxnAmount=" + lastTxnAmount + ", lastCardNo=" + lastCardNo + ", lastAuthCode=" + lastAuthCode
				+ ", lastAuthDateTime=" + lastAuthDateTime + ", taxStan=" + taxStan + ", taxTxnNo=" + taxTxnNo
				+ ", txnAmount=" + txnAmount + ", authCode=" + authCode + ", authDateTime=" + authDateTime;
	}
	public String getRcode() {
		return rcode;
	}
	public void setRcode(String rcode) {
		this.rcode = rcode;
	}
	public String getRcodeDesc() {
		return rcodeDesc;
	}
	public void setRcodeDesc(String rcodeDesc) {
		this.rcodeDesc = rcodeDesc;
	}
	public String getSrcId() {
		return srcId;
	}
	public void setSrcId(String srcId) {
		this.srcId = srcId;
	}
	public String getStan() {
		return stan;
	}
	public void setStan(String stan) {
		this.stan = stan;
	}
	public String getKeyId() {
		return keyId;
	}
	public void setKeyId(String keyId) {
		this.keyId = keyId;
	}
	public String getDivData() {
		return divData;
	}
	public void setDivData(String divData) {
		this.divData = divData;
	}
	public String getIcv() {
		return icv;
	}
	public void setIcv(String icv) {
		this.icv = icv;
	}
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
	}
	public String getPcode() {
		return pcode;
	}
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	public String getNoticeNo() {
		return noticeNo;
	}
	public void setNoticeNo(String noticeNo) {
		this.noticeNo = noticeNo;
	}

}
