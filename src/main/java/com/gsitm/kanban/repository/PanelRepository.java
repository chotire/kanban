package com.gsitm.kanban.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gsitm.kanban.model.Panel;

public interface PanelRepository extends JpaRepository<Panel, Integer> {
	List<Panel> findAllByKanbanId(Integer kanbanId, Sort sort);
	
	@Query("select max(p.sortOrder) from #{#entityName} p where p.kanbanId = ?1")
	Integer getSortOrderMaxValue(Integer kanbanId);
}