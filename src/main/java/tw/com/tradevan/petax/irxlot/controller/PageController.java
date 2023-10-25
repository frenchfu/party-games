package tw.com.tradevan.petax.irxlot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tw.com.tradevan.petax.irxlot.config.IrxLotPath;

import javax.servlet.http.HttpServletRequest;

@Controller
public class PageController {

	@Autowired
    IrxLotPath irxLotPath;

	//@GetMapping(value = "/")
	//public String index() {
	//	return "forward:/frontend/index.html";
	//}



	@GetMapping("/Version-jsp")
	public String VersionJsp(HttpServletRequest request , @RequestParam(value="condition", required=false, defaultValue="nothing")  String condition ) {

		if(condition.equals("reget")){
			irxLotPath.getValueFromDB();
		}

		if(condition.equals("reget") || condition.equals("allValue")){
			request.setAttribute("htmlOutPut", irxLotPath.showAllValue());
		}else{
			request.setAttribute("htmlOutPut","");
		}

		return "Version";
	}


}