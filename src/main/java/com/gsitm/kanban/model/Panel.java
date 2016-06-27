package com.gsitm.kanban.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
public class Panel {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private Integer kanbanId;

	private String name = "";
	
	private String color = "";
	
	private Integer sortOrder;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="kanbanId", insertable=false, updatable=false)
	@JsonBackReference
	private Kanban kanban;
	
	@OneToMany(mappedBy="panel", fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	@OrderBy("sortOrder ASC")
	@JsonManagedReference
	private List<Card> cards;
}