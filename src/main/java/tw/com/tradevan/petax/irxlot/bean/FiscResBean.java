package tw.com.tradevan.petax.irxlot.bean;

public class FiscResBean {

	private String seqNo ="";            	//序號                                                                                                                                                                                                                                                               
	private String tax ="";              	//稅別                                                                                                                                                                                                                                                             
	private int timeOut = 30000;         	//連線逾時預設30秒                                                                                                                                                                                                                                                 
	private String fiscUrl = "";         	//財金URL                                                                                                                                                                                                                                                          
	private String respMsg = "";         	//回傳訊息                       
	
	private String SrcID           	= "" ;	//通路代號（訊息來源代碼），由財金公司編號                                                                                                              
	private String STAN            	= "" ;	//申報系統交易序號，同請求訊息內容                                                                                                                      
	private String TxnDatetime     	= "" ;	//訊息發送日期時間，YYYYMMDDhhmmss                                                                                                                      
	private String KeyID           	= "" ;	//MAC Seed Key識別碼                                                                                                                                    
	private String DivData         	= "" ;	//產製SessionKey過程中生成的隨機亂數值，以HEX格式表示                                                                                                   
	private String ICV             	= "" ;	//產製MAC過程中生成的隨機亂數值，以HEX格式表示                                                                                                          
	private String MAC             	= "" ;	//訊息押碼，以HEX格式表示                                                                                                                               
	private String PCode           	= "" ;	//8040                                                                                                                                                  
	private String RCode           	= "" ;	//回應代碼                                                                                                                                              
	private String PaymentType     	= "" ;	//繳款類別                                                                                                                                              
	private String TaxMonth        	= "" ;	//年期別（15類）YYYYMM，期別代號（11類），左靠右補空白                                                                                                                                  
	private String TxnAmount       	= "" ;	//本次應繳稅額，沒有小數和正負號，以整數處理                                                                                                                        
	private String PaymentDeadline 	= "" ;	//繳納截止日，YYYYMMDD                                                                           
	private String IdnBan          	= "" ;	//身份證/營利事業統一編號，15類為必填                                                            
	private String NoticeNo        	= "" ;	//銷帳編號，11類為必填                                                                           
	private String TaxNo           	= "" ;	//「營業稅自繳稅款」為必填：稅籍編號                                                                         
	                                        //「營利事業所得稅結算申報」為必填：第1位（未分配盈餘細稅代碼）；第2至8位（金額）；第9位補空白
	private String CityID          	= "" ;	//縣市代碼                                                                                                                                                    
	private String OrgID           	= "" ;	//機關代碼                                                                                                                                                                                                    
	private String TownID          	= "" ;	//鄉鎮代碼                                                                                                                                               
	private String PaymentDate     	= "" ;	//交易日期(YYYYMMDD)                                                                                                                                     
	private String PayedAmount     	= "" ;	//「個人房屋土地交易所得稅申報自繳稅款」為必填                                                                                                           
	private String LastSTAN        	= "" ;	//已繳總計金額                                                                                                                                           
	private String LastTxnDatetime 	= "" ;	//最近一次成功交易序號                                                                                                                                   
	private String LastTxnAmount   	= "" ;	//最近一次成功交易日期時間，YYYYMMDDhhmmss                                                                                                               
	private String LastTraBank     	= "" ;	//最近一次成功交易金額                                                                                                                                   
	private String LastTraAccount  	= "" ;	//最近一次成功交易轉出行庫代碼：前三碼為為總行代碼，後四碼為分行代碼                                                                                     
	private String LastCardIdn     	= "" ;	//最近一次成功交易轉出帳號/卡號，右靠左補零(7~12會以*表示)                                                                                               
	private String LastAuthCode    	= "" ;	//最近一次成功交易持卡人身份證/營利事業統一編號，信用卡交易使用本欄位；其餘交易為空白(後4位以*表示)                                                      
	private String LastTxnType     	= "" ;	//最近一次成功交易授權碼，信用卡交易使用本欄位；其餘交易為空白                                                                                           
	private String LastIdType      	= "" ;	//最近一次成功交易繳款管道，0：語音授權，1：申報程式授權，2：網際網路授權，3：人工授權/取消，5：晶片卡/活期，A~Z：行動支付業者                           
	                                      	//最近一次成功交易繳款方式，3：晶片金融卡繳稅，4：行動支付晶片金融卡繳稅，5：ID加帳號繳稅，6：行動支付ID加帳號繳稅，7：信用卡繳稅，8：行動支付信用卡繳稅
	public String getSeqNo() {
		return seqNo;
	}
	public String getTax() {
		return tax;
	}
	public int getTimeOut() {
		return timeOut;
	}
	public String getFiscUrl() {
		return fiscUrl;
	}
	public String getRespMsg() {
		return respMsg;
	}
	public String getSrcID() {
		return SrcID;
	}
	public String getSTAN() {
		return STAN;
	}
	public String getTxnDatetime() {
		return TxnDatetime;
	}
	public String getKeyID() {
		return KeyID;
	}
	public String getDivData() {
		return DivData;
	}
	public String getICV() {
		return ICV;
	}
	public String getMAC() {
		return MAC;
	}
	public String getPCode() {
		return PCode;
	}
	public String getRCode() {
		return RCode;
	}
	public String getPaymentType() {
		return PaymentType;
	}
	public String getTaxMonth() {
		return TaxMonth;
	}
	public String getTxnAmount() {
		return TxnAmount;
	}
	public String getPaymentDeadline() {
		return PaymentDeadline;
	}
	public String getIdnBan() {
		return IdnBan;
	}
	public String getNoticeNo() {
		return NoticeNo;
	}
	public String getTaxNo() {
		return TaxNo;
	}
	public String getCityID() {
		return CityID;
	}
	public String getOrgID() {
		return OrgID;
	}
	public String getTownID() {
		return TownID;
	}
	public String getPaymentDate() {
		return PaymentDate;
	}
	public String getPayedAmount() {
		return PayedAmount;
	}
	public String getLastSTAN() {
		return LastSTAN;
	}
	public String getLastTxnDatetime() {
		return LastTxnDatetime;
	}
	public String getLastTxnAmount() {
		return LastTxnAmount;
	}
	public String getLastTraBank() {
		return LastTraBank;
	}
	public String getLastTraAccount() {
		return LastTraAccount;
	}
	public String getLastCardIdn() {
		return LastCardIdn;
	}
	public String getLastAuthCode() {
		return LastAuthCode;
	}
	public String getLastTxnType() {
		return LastTxnType;
	}
	public String getLastIdType() {
		return LastIdType;
	}
	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}
	public void setTax(String tax) {
		this.tax = tax;
	}
	public void setTimeOut(int timeOut) {
		this.timeOut = timeOut;
	}
	public void setFiscUrl(String fiscUrl) {
		this.fiscUrl = fiscUrl;
	}
	public void setRespMsg(String respMsg) {
		this.respMsg = respMsg;
	}
	public void setSrcID(String srcID) {
		SrcID = srcID;
	}
	public void setSTAN(String sTAN) {
		STAN = sTAN;
	}
	public void setTxnDatetime(String txnDatetime) {
		TxnDatetime = txnDatetime;
	}
	public void setKeyID(String keyID) {
		KeyID = keyID;
	}
	public void setDivData(String divData) {
		DivData = divData;
	}
	public void setICV(String iCV) {
		ICV = iCV;
	}
	public void setMAC(String mAC) {
		MAC = mAC;
	}
	public void setPCode(String pCode) {
		PCode = pCode;
	}
	public void setRCode(String rCode) {
		RCode = rCode;
	}
	public void setPaymentType(String paymentType) {
		PaymentType = paymentType;
	}
	public void setTaxMonth(String taxMonth) {
		TaxMonth = taxMonth;
	}
	public void setTxnAmount(String txnAmount) {
		TxnAmount = txnAmount;
	}
	public void setPaymentDeadline(String paymentDeadline) {
		PaymentDeadline = paymentDeadline;
	}
	public void setIdnBan(String idnBan) {
		IdnBan = idnBan;
	}
	public void setNoticeNo(String noticeNo) {
		NoticeNo = noticeNo;
	}
	public void setTaxNo(String taxNo) {
		TaxNo = taxNo;
	}
	public void setCityID(String cityID) {
		CityID = cityID;
	}
	public void setOrgID(String orgID) {
		OrgID = orgID;
	}
	public void setTownID(String townID) {
		TownID = townID;
	}
	public void setPaymentDate(String paymentDate) {
		PaymentDate = paymentDate;
	}
	public void setPayedAmount(String payedAmount) {
		PayedAmount = payedAmount;
	}
	public void setLastSTAN(String lastSTAN) {
		LastSTAN = lastSTAN;
	}
	public void setLastTxnDatetime(String lastTxnDatetime) {
		LastTxnDatetime = lastTxnDatetime;
	}
	public void setLastTxnAmount(String lastTxnAmount) {
		LastTxnAmount = lastTxnAmount;
	}
	public void setLastTraBank(String lastTraBank) {
		LastTraBank = lastTraBank;
	}
	public void setLastTraAccount(String lastTraAccount) {
		LastTraAccount = lastTraAccount;
	}
	public void setLastCardIdn(String lastCardIdn) {
		LastCardIdn = lastCardIdn;
	}
	public void setLastAuthCode(String lastAuthCode) {
		LastAuthCode = lastAuthCode;
	}
	public void setLastTxnType(String lastTxnType) {
		LastTxnType = lastTxnType;
	}
	public void setLastIdType(String lastIdType) {
		LastIdType = lastIdType;
	}
	
	public String getRespString() {
		
		StringBuffer str = new StringBuffer("");
		str.append("\r\n");
		str.append("[Response]SrcID = " + this.SrcID  + "\r\n");
		str.append("[Response]STAN = " + this.STAN  + "\r\n");
		str.append("[Response]TxnDatetime = " + this.TxnDatetime  + "\r\n");
		str.append("[Response]KeyID = " + this.KeyID  + "\r\n");
		str.append("[Response]DivData = " + this.DivData  + "\r\n");
		str.append("[Response]ICV = " + this.ICV  + "\r\n");
		str.append("[Response]MAC = " + this.MAC  + "\r\n");
		str.append("[Response]PCode = " + this.PCode  + "\r\n");
		str.append("[Response]RCode = " + this.RCode  + "\r\n");
		str.append("[Response]PaymentType = " + this.PaymentType  + "\r\n");
		str.append("[Response]TaxMonth = " + this.TaxMonth  + "\r\n");
		str.append("[Response]TxnAmount = " + this.TxnAmount  + "\r\n");
		str.append("[Response]PaymentDeadline = " + this.PaymentDeadline + "\r\n");
		str.append("[Response]IdnBan = " + this.IdnBan  + "\r\n");
		str.append("[Response]NoticeNo = " + this.NoticeNo  + "\r\n");
		str.append("[Response]TaxNo = " + this.TaxNo  + "\r\n");
		str.append("[Response]CityID = " + this.CityID  + "\r\n");
		str.append("[Response]OrgID = " + this.OrgID  + "\r\n");
		str.append("[Response]TownID = " + this.TownID  + "\r\n");
		str.append("[Response]PaymentDate = " + this.PaymentDate  + "\r\n");
		str.append("[Response]PayedAmount = " + this.PayedAmount  + "\r\n");
		str.append("[Response]LastSTAN = " + this.LastSTAN  + "\r\n");
		str.append("[Response]LastTxnDatetime = " + this.LastTxnDatetime + "\r\n");
		str.append("[Response]LastTxnAmount = " + this.LastTxnAmount  + "\r\n");
		str.append("[Response]LastTraBank = " + this.LastTraBank  + "\r\n");
		str.append("[Response]LastTraAccount = " + this.LastTraAccount  + "\r\n");
		str.append("[Response]LastCardIdn = " + this.LastCardIdn  + "\r\n");
		str.append("[Response]LastAuthCode = " + this.LastAuthCode  + "\r\n");
		str.append("[Response]LastTxnType = " + this.LastTxnType  + "\r\n");
		str.append("[Response]LastIdType = " + this.LastIdType  + "\r\n");
		
		return str.toString();
	}
	                                        

	
}
