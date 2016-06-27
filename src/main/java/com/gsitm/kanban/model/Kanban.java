package com.gsitm.kanban.model;

import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Kanban {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id = -1;

	private String name = "";
	
	@OneToMany(mappedBy="kanban", fetch=FetchType.LAZY)
	@OrderBy("sortOrder ASC")
	@JsonManagedReference
	List<Panel> panels;
	
	@OneToMany(mappedBy="kanban", fetch=FetchType.LAZY)
	@JsonManagedReference
	Collection<Member> members;

//	@ManyToMany(fetch=FetchType.LAZY)
//	@JoinTable(name = "KanbanMember", 
//		joinColumns = {@JoinColumn(name="kanbanId", nullable=false, updatable=false) }, inverseJoinColumns = {
//				@JoinColumn(name="memberId", nullable=false, updatable=false) })
//	@JsonManagedReference
//	Collection<Member> members;
}