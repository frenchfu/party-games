package tw.com.fu.game.party.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tw.com.fu.game.party.config.PartyGamesPath;

import javax.servlet.http.HttpServletRequest;

@Controller
public class PageController {

	@Autowired
	PartyGamesPath partyGamesPath;


	@GetMapping("/Version-jsp")
	public String VersionJsp(HttpServletRequest request , @RequestParam(value="condition", required=false, defaultValue="nothing")  String condition ) {

		if(condition.equals("reget")){
			partyGamesPath.getValueFromDB();
		}

		if(condition.equals("reget") || condition.equals("allValue")){
			request.setAttribute("htmlOutPut", partyGamesPath.showAllValue());
		}else{
			request.setAttribute("htmlOutPut","");
		}

		return "Version";
	}


}