package tw.com.tradevan.petax.irxlot.bean;

public class FiscIrcUpInfoBean {
	private int tag = -1;

	private boolean isFirstTimeUse = true;
	private int uploadTimes = 0;

	private String yr = "";

	private String idn = "";
	private String pfn = "";
	private String hsn = "";
	private String town = "";
	private String vill = "";
	private String juris = "";
	private String org = "";
	private String payType = "";

	private String firstSuccessDate = "";
	private String seqNo = "";
	//
	private String pageNo = "";

	public FiscIrcUpInfoBean(int tag, String idn, String seqNo) {
		this.tag = tag;
		this.idn = idn;
		this.seqNo = seqNo;

	}

	public String getYr() {
		return yr;
	}

	public void setYr(String yr) {
		this.yr = yr;
	}

	public int getTag() {
		return tag;
	}

	public void setTag(int tag) {
		this.tag = tag;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getIdn() {
		return idn;
	}

	public void setIdn(String idn) {
		this.idn = idn;
	}

	public boolean isFirstTimeUse() {
		return isFirstTimeUse;
	}

	public void setFirstTimeUse(boolean isFirstTimeUse) {
		this.isFirstTimeUse = isFirstTimeUse;
	}

	public int getUploadTimes() {
		return uploadTimes;
	}

	public void setUploadTimes(int uploadTimes) {
		this.uploadTimes = uploadTimes;
	}

	public String getPfn() {
		return pfn;
	}

	public void setPfn(String pfn) {
		this.pfn = pfn;
	}

	public String getHsn() {
		return hsn;
	}

	public void setHsn(String hsn) {
		this.hsn = hsn;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public String getVill() {
		return vill;
	}

	public void setVill(String vill) {
		this.vill = vill;
	}

	public String getFirstSuccessDate() {
		return firstSuccessDate;
	}

	public void setFirstSuccessDate(String firstSuccessDate) {
		this.firstSuccessDate = firstSuccessDate;
	}

	public String getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}

	public String getJuris() {
		return juris;
	}

	public void setJuris(String juris) {
		this.juris = juris;
	}

	public String getOrg() {
		return org;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

}
