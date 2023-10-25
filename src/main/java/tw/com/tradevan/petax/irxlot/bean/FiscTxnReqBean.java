package tw.com.tradevan.petax.irxlot.bean;

public class FiscTxnReqBean {
	private String	srcId ="";            			//通路代號（訊息來源代碼），由財金公司編號                                                                                                                                                                                                                       
	private String	stan ="";             			//申報系統交易序號，同請求訊息內容                                                                                                                                                                                                                                 
	private String	keyId ="";            			//MAC Seed Key識別碼                                                                                                                                                                                                                                               
	private String	divData ="";          			//產製SessionKey過程中生成的隨機亂數值，以HEX格式表示                                                                                                                                                                                                              
	private String	icv ="";              			//產製MAC過程中生成的隨機亂數值，以HEX格式表示                                                                                                                                                                                                                     
	private String	mac ="";              			//訊息押碼，以HEX格式表示                                                                                                                                                                                                                                          
	private String	pcode ="";                          
	private String	length	=	"";					//Length
	private String	txnTime	=	"";					//TXN initiate date and time	N14	14	CCYYMMDDhhmmss
	private String	amount	=	"";					//Txn Amount	繳稅金額
	private String	paymentType	=	"";				//Payment Type繳款類別
	private String	idnBan	=	"";					//IDN/BAN	AN10	不需轉碼，左靠右補空白
	private String	paymentDeadline	=	"";			//Payment Deadline	YYYYMMDD
	private String	taxNo	=	"";					//Tax No.	營業稅稅籍編號
	private String	cityId	=	"";					//CityID	縣市代碼，除營業稅外，皆為空白
	private String	taxMonth	=	"";				//Tax Month	年期別(15類)YYYYMM期別代號(11類)，左靠右補空白
	private String	bankId	=	"";					//Transferer Bank ID	轉出銀行
	private String	account	=	"";					//Transferer Account No.	轉出帳號
	private String	noticeNo	=	"";				//Notice No.	銷帳編號(11類)，15類請帶空白。
	private String	checkId	=	"";					//Check ID	識別碼
	private String	terminalId	=	"";				//Terminal ID	端末設備代號
	private String	terminalType	=	"";			//Terminal Type	端末設備型態
	private String	cardNo	="";					//CardNo	信用卡卡號，左靠右補空白
	private String	expiredDate	="";				//ExpiredDate	信用卡有效年月(YYMM)
	private String	txnTp	=	"";					//交易類別 1:活儲繳費 2:信用卡授權
	
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getTxnTime() {
		return txnTime;
	}
	public void setTxnTime(String txnTime) {
		this.txnTime = txnTime;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getIdnBan() {
		return idnBan;
	}
	public void setIdnBan(String idnBan) {
		this.idnBan = idnBan;
	}
	public String getPaymentDeadline() {
		return paymentDeadline;
	}
	public void setPaymentDeadline(String paymentDeadline) {
		this.paymentDeadline = paymentDeadline;
	}
	public String getTaxNo() {
		return taxNo;
	}
	public void setTaxNo(String taxNo) {
		this.taxNo = taxNo;
	}
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getTaxMonth() {
		return taxMonth;
	}
	public void setTaxMonth(String taxMonth) {
		this.taxMonth = taxMonth;
	}
	public String getBankId() {
		return bankId;
	}
	public void setBankId(String bankId) {
		this.bankId = bankId;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getNoticeNo() {
		return noticeNo;
	}
	public void setNoticeNo(String noticeNo) {
		this.noticeNo = noticeNo;
	}
	public String getCheckId() {
		return checkId;
	}
	public void setCheckId(String checkId) {
		this.checkId = checkId;
	}
	public String getTerminalId() {
		return terminalId;
	}
	public void setTerminalId(String terminalId) {
		this.terminalId = terminalId;
	}
	public String getTerminalType() {
		return terminalType;
	}
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	public String getExpiredDate() {
		return expiredDate;
	}
	public void setExpiredDate(String expiredDate) {
		this.expiredDate = expiredDate;
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
	public String getTxnTp() {
		return txnTp;
	}
	public void setTxnTp(String txnTp) {
		this.txnTp = txnTp;
	}
}
