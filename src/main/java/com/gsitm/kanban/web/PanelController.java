package com.gsitm.kanban.web;

import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.util.ArrayUtils;

import com.gsitm.kanban.model.Card;
import com.gsitm.kanban.model.Panel;
import com.gsitm.kanban.repository.PanelRepository;

@RestController
@RequestMapping(value="/api")
@Transactional
public class PanelController {
	@Autowired
	private PanelRepository repository;
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{panelId}", method=RequestMethod.GET)
	public Panel findById(@PathVariable Integer panelId) {
		return repository.findOne(panelId);
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels", method=RequestMethod.POST)
	public void add(Panel panel) {
		Integer sortOrder = repository.getSortOrderMaxValue(panel.getKanbanId());
		panel.setSortOrder(sortOrder == null ? 1 : sortOrder + 1);
		repository.save(panel);
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{id}", method=RequestMethod.PUT)
	public void update(Panel panel) {
		repository.save(panel);
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/panels/{panelId}", method=RequestMethod.DELETE)
	public void delete(@PathVariable Integer panelId) {
		repository.delete(panelId);
	}
		
	@RequestMapping(value="/kanbans/{kanbanId}/panel/dnd", method=RequestMethod.PUT)
	public void dragAndDropPanel(@PathVariable Integer kanbanId, Integer panelId, Integer sortOrder) {
		List<Panel> panels = repository.findAllByKanbanId(kanbanId, new Sort(Sort.Direction.ASC, "sortOrder"));
		int order = 1;
		for (Panel panel : panels) {
			if (panel.getId() == panelId) {
				panel.setSortOrder(sortOrder);
				continue;
			}
			panel.setSortOrder((order < sortOrder) ? order++ : (order++) + 1);
		}
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/card/dnd", method=RequestMethod.PUT)
	public void dragAndDropCard(@PathVariable Integer kanbanId, Integer[] panelIds, Integer cardId, Integer sortOrder) {
		if (ArrayUtils.isEmpty(panelIds)) {
			return;
		}
		
		class CardSortOrder {
			public Panel findPanelById(List<Panel> panels, Integer id) {
				for (Panel panel : panels) {
					if (panel.getId() == id) {
						return panel;
					}
				}
				return null;
			}
			
			public void ordering(List<Card> cards, Integer dragedCardId, Integer fixedOrder) {
				int order = 1;
				for (Card card : cards) {
					if (card.getId() == dragedCardId) {
						continue;
					}
					card.setSortOrder((order < fixedOrder) ? order++ : (order++) + 1);
				}
			}
		}
		
		List<Panel> panels = repository.findAll(Arrays.asList(panelIds));
		CardSortOrder cardSortOrder = new CardSortOrder();
		
		if (panels.size() == 1) {
			List<Card> cards = panels.get(0).getCards();
			for (Card card : cards) {
				if (card.getId() == cardId) {
					card.setSortOrder(sortOrder);
				}
			}
			cardSortOrder.ordering(cards, cardId, sortOrder);
		} else {
			Panel givenPanel = cardSortOrder.findPanelById(panels, panelIds[0]);
			List<Card> cards = givenPanel.getCards();
			Card receiveCard = null;
			
			for (int i = 0; i < cards.size(); i++) {
				Card card = cards.get(i);
				if (card.getId() == cardId) {
					receiveCard = cards.remove(i);
				}
			}
			Panel receivePanel = cardSortOrder.findPanelById(panels, panelIds[1]);
			cardSortOrder.ordering(receivePanel.getCards(), cardId, sortOrder);
			receiveCard.setSortOrder(sortOrder);
			receiveCard.setPanelId(receivePanel.getId());
			receivePanel.getCards().add(receiveCard);
		}
		repository.save(panels);
	}
}