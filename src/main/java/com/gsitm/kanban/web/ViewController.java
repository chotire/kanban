package com.gsitm.kanban.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ViewController {
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String main() {
		return "main";
	}
	
	@RequestMapping(value="/kanbans/{id}", method=RequestMethod.GET)
	public String kanban(@PathVariable Integer id) {
		return "kanban";
	}
}