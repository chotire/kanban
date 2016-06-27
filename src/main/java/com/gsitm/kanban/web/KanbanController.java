package com.gsitm.kanban.web;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gsitm.kanban.model.Kanban;
import com.gsitm.kanban.repository.KanbanRepository;

@RestController
@RequestMapping(value="/api")
@Transactional
public class KanbanController {
	@Autowired
	private KanbanRepository repository;
	
	public List<Kanban> findAll() {
		return findAll(new String[]{"id", "name"});
	}
	
	@RequestMapping(value="/kanbans", method=RequestMethod.GET)
	public List<Kanban> findAll(String[] filters) {
		List<Kanban> kanbans = repository.findAll();
		
		if (filters != null && filters.length > 0 && kanbans != null) {
			List<Kanban> filteredKanbans = new ArrayList<Kanban>(kanbans.size());
			for (Kanban kanban : kanbans) {
				Kanban _kanban = new Kanban();
				for (String filter : filters) {
					try {
						BeanUtils.setProperty(_kanban, filter, BeanUtils.getProperty(kanban, filter));
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				}
				filteredKanbans.add(_kanban);
			}
			return filteredKanbans;
		}
		return kanbans;
	}
	
	@RequestMapping(value="/kanbans/{id}", method=RequestMethod.GET)
	public Kanban findById(@PathVariable Integer id, String[] filters) {
		Kanban kanban = repository.findOne(id);
		
		if (filters != null && filters.length > 0 && kanban != null) {
			Kanban _kanban = new Kanban();
			for (String filter : filters) {
				try {
					BeanUtils.setProperty(_kanban, filter, BeanUtils.getProperty(kanban, filter));
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			}
			return _kanban;
		}
		return (kanban == null) ? new Kanban() : kanban;
	}
	
	@RequestMapping(value="/kanbans", method=RequestMethod.POST)
	public List<Kanban> add(Kanban kanban) {
		repository.save(kanban);
		return findAll();
	}
	
	@RequestMapping(value="/kanbans/{id}", method=RequestMethod.PUT)
	public List<Kanban> update(Kanban kanban) {
		repository.save(kanban);
		return findAll();
	}
	
	@RequestMapping(value="/kanbans/{id}", method=RequestMethod.DELETE)
	public List<Kanban> delete(@PathVariable Integer id) {
		repository.delete(repository.findOne(id));
		return findAll();
	}
}