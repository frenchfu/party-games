package tw.com.tradevan.petax.irxlot.bean;

public class ClientReqBean{

	private String seqNo ="";            	//序號                                                                                                                                                                                                                                                               
	private String tax ="";              	//稅別                                                                                                                                                                                                                                                             
	private int timeOut = 30000;         	//連線逾時預設30秒                                                                                                                                                                                                                                                 
	private String fiscUrl = "";         	//財金URL
	private String fiscVAUrl = "";         	//財金VAURL
	private String respMsg = "";         	//回傳訊息                       
	private String resultMsg = "";         	//狀態訊息      
	private int resultId = -1;         		//狀態代碼    
	private String ip = "";         		//來源IP
	private String vaIp = "";         		//VA主機IP
	private String handleName = "";         //主機名稱
	private String reqSessionKey = "";		//發送SessionKey
	private String resSessionKey = "";		//接收SessionKey
	private String seedKeyA = "";			//機碼A段
	private String seedKeyB = "";			//機碼B段
	private String txnType	= "";			//交易種類 0:8040查詢 1:財金繳稅
	
	
	//8040查詢物件
	private FiscReqBean reqBean = new FiscReqBean();
	private FiscResBean resBean = null;
	
	//線上繳稅物件
	private FiscTxnReqBean txnReqBean = new FiscTxnReqBean();
	private FiscTxnResBean txnResBean = null;
	
	
    
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
	public String getRespMsg() {
		return respMsg;
	}
	public void setRespMsg(String respMsg) {
		this.respMsg = respMsg;
	}
	public FiscReqBean getReqBean() {
		return reqBean;
	}
	public FiscResBean getResBean() {
		return resBean;
	}
	public void setReqBean(FiscReqBean reqBean) {
		this.reqBean = reqBean;
	}
	public void setResBean(FiscResBean resBean) {
		this.resBean = resBean;
	}
	public String getResultMsg() {
		return resultMsg;
	}
	public int getResultId() {
		return resultId;
	}
	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}
	public void setResultId(int resultId) {
		this.resultId = resultId;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getVaIp() {
		return vaIp;
	}
	public void setVaIp(String vaIp) {
		this.vaIp = vaIp;
	}
	public String getHandleName() {
		return handleName;
	}
	public void setHandleName(String handleName) {
		this.handleName = handleName;
	}
	public String getReqSessionKey() {
		return reqSessionKey;
	}
	public void setReqSessionKey(String reqSessionKey) {
		this.reqSessionKey = reqSessionKey;
	}
	public String getResSessionKey() {
		return resSessionKey;
	}
	public void setResSessionKey(String resSessionKey) {
		this.resSessionKey = resSessionKey;
	}
	public String getSeedKeyA() {
		return seedKeyA;
	}
	public String getSeedKeyB() {
		return seedKeyB;
	}
	public void setSeedKeyA(String seedKeyA) {
		this.seedKeyA = seedKeyA;
	}
	public void setSeedKeyB(String seedKeyB) {
		this.seedKeyB = seedKeyB;
	}
	public FiscTxnReqBean getTxnReqBean() {
		return txnReqBean;
	}
	public void setTxnReqBean(FiscTxnReqBean txnReqBean) {
		this.txnReqBean = txnReqBean;
	}
	public FiscTxnResBean getTxnResBean() {
		return txnResBean;
	}
	public void setTxnResBean(FiscTxnResBean txnResBean) {
		this.txnResBean = txnResBean;
	}
	public String getTxnType() {
		return txnType;
	}
	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}
	public String getFiscVAUrl() {
		return fiscVAUrl;
	}
	public void setFiscVAUrl(String fiscVAUrl) {
		this.fiscVAUrl = fiscVAUrl;
	}
	                                  
}
