package com.gsitm.kanban.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gsitm.kanban.model.Kanban;

public interface KanbanRepository extends JpaRepository<Kanban, Integer> {
}