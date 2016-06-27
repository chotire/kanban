package com.gsitm.kanban.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gsitm.kanban.model.Card;

public interface CardRepository extends JpaRepository<Card, Integer> {
	@Query("select max(c.sortOrder) from #{#entityName} c where c.panelId = ?1")
	Integer getSortOrderMaxValue(Integer panelId);
}