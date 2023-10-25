package tw.com.tradevan.petax.irxlot.bean;

public class IrxwFiscCodeBean {
	public String fiscId = "";
	public String irxwId = "";
	public String nm = "";

	public String cardType = "";
	public String payMethod = "";
	public IrxwCodeBean codeBean = null;

	public IrxwFiscCodeBean(String fiscId, IrxwCodeBean code, String payMethod, String cardType) {

		this.fiscId = fiscId;
		this.irxwId = code.getId();
		this.nm = code.getNm();
		this.cardType = cardType;
		this.payMethod = payMethod;
		this.codeBean = code;
	}

	public IrxwCodeBean getCodeBean() {
		return codeBean;
	}

	public void setCodeBean(IrxwCodeBean codeBean) {
		this.codeBean = codeBean;
	}

	public String getFiscId() {
		return fiscId;
	}

	public void setFiscId(String fiscId) {
		this.fiscId = fiscId;
	}

	public String getIrxwId() {
		return irxwId;
	}

	public void setIrxwId(String irxwId) {
		this.irxwId = irxwId;
	}

	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public String getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}

}
