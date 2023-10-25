package tw.com.tradevan.petax.irxlot.bean;

public class FiscReqBean {                                                                                                                                                                                                                     
                           	                                                                                                                                                                                                                                                                   
	private String SrcID ="";            	//通路代號（訊息來源代碼），由財金公司編號                                                                                                                                                                                                                       
	private String STAN ="";             	//申報系統交易序號，同請求訊息內容                                                                                                                                                                                                                                 
	private String KeyID ="";            	//MAC Seed Key識別碼                                                                                                                                                                                                                                               
	private String DivData ="";          	//產製SessionKey過程中生成的隨機亂數值，以HEX格式表示                                                                                                                                                                                                              
	private String ICV ="";              	//產製MAC過程中生成的隨機亂數值，以HEX格式表示                                                                                                                                                                                                                     
	private String MAC ="";              	//訊息押碼，以HEX格式表示                                                                                                                                                                                                                                          
	private String PCode ="8040";            //8040                                                                                                                                                                                                                                                           
	private String PaymentType ="";      	//繳款類別                                                                                                                                                                                                                                                         
	private String TxnAmount ="";        	//本次應繳稅額，沒有小數和正負號，以整數處理                                   
	private String TaxMonth ="";        	//年期別（15類）YYYYMM、期別代號（11類），左靠右補空白                                                                                                                                              
	private String IdType ="";        		//繳款方式，3：晶片金融卡繳稅，5：ID加帳號繳稅，7：信用卡繳稅；若選擇行動支付請帶晶片金融卡繳稅                                                                                                                                                                      
	private String PaymentDeadline ="";  	//繳納截止日，YYYYMMDD                                                                                                                                                                                                                                             
	private String IdnBan ="";           	//身份證/營利事業統一編號，15類為必填                                                                                                                                                                                                                              
	private String NoticeNo ="";         	//銷帳	編號，11類為必填                                                                                                                                                                                                                                           
	private String TaxNo ="";            	//「營業稅自繳稅款」為必填：稅籍編號                                                                                                                                                                                                                               
																				//「營利事業所得稅結算申報」為必填：第1位（未分配盈餘細稅代碼）；第2至8位（金額）；第9位補空白                                                                                                                                                                                       
	private String CityID ="";           	//縣市代碼                                                                                                                                                                                                                                                         
	private String OrgID ="";            	//機關代碼                                                                                                                                                                                                                                                         
	private String TownID ="";           	//鄉鎮代碼                                                                                                                                                                                                                                                         
	private String PaymentDate ="";      	//交易日期(YYYYMMDD) 「個人房屋土地交易所得稅申報自繳稅款」為必填                                                                                                                                                                                                  
	
	public String getSrcID() {
		return SrcID;
	}
	public String getSTAN() {
		return STAN;
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
	public String getPaymentType() {
		return PaymentType;
	}
	public String getTxnAmount() {
		return TxnAmount;
	}
	public String getIdType() {
		return IdType;
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
	public void setSrcID(String srcID) {
		SrcID = srcID;
	}
	public void setSTAN(String sTAN) {
		STAN = sTAN;
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
	public void setPaymentType(String paymentType) {
		PaymentType = paymentType;
	}
	public void setTxnAmount(String txnAmount) {
		TxnAmount = txnAmount;
	}
	public void setIdType(String idType) {
		IdType = idType;
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
	public String getTaxMonth() {
		return TaxMonth;
	}
	public void setTaxMonth(String taxMonth) {
		TaxMonth = taxMonth;
	}
	
}
