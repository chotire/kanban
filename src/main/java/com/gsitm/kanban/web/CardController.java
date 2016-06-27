package com.gsitm.kanban.web;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gsitm.kanban.model.Card;
import com.gsitm.kanban.repository.CardRepository;

@RestController
@RequestMapping(value="/api")
@Transactional
public class CardController {
	@Autowired
	private CardRepository repository;
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{panelId}/cards/{id}", method=RequestMethod.GET)
	public Card find(@PathVariable Integer id) {
		return repository.findOne(id);
	}
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{panelId}/cards", method=RequestMethod.POST)
	public void add(Card card) {
		Integer sortOrder = repository.getSortOrderMaxValue(card.getPanelId());
		card.setSortOrder(sortOrder == null ? 1 : sortOrder + 1);
		repository.save(card);
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{panelId}/cards/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable Integer id) {
		repository.delete(id);
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{panelId}/cards/{id}", method=RequestMethod.PUT)
	public void update(Card card) {
		repository.save(card);
	}
}