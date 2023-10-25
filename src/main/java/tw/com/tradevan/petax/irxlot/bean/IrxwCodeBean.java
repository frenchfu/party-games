package tw.com.tradevan.petax.irxlot.bean;

import java.util.ArrayList;

public class IrxwCodeBean {

	public String id = "";
	public String nm = "";
	private Object obj = null;
	private ArrayList<IrxwCodeBean> list = null;

	public IrxwCodeBean() {

	}

	public IrxwCodeBean(String id, String nm) {
		this.id = id;
		this.nm = nm;
	}
	public IrxwCodeBean(String id, String nm , ArrayList<IrxwCodeBean> list ) {
		this.id = id;
		this.nm = nm;
		this.list = list;

	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public ArrayList<IrxwCodeBean> getList() {
		return list;
	}

	public void setList(ArrayList<IrxwCodeBean> list) {
		this.list = list;
	}

}
