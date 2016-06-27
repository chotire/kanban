package com.gsitm.kanban.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gsitm.kanban.model.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {
	List<Member> findAllByKanbanId(Integer kanbanId);
	
	List<Member> findByKanbanIdAndNameContaining(Integer kanbanId, String name);
}