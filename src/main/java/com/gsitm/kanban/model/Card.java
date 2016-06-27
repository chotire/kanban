package com.gsitm.kanban.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
public class Card {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private Integer panelId;
	
	private String name;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dueDate;
	
	private String color;
	
	private String note;
	
	private Integer sortOrder;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="panelId", insertable=false, updatable=false)
	@JsonBackReference
	private Panel panel;

	@ManyToMany(fetch=FetchType.LAZY, cascade={CascadeType.REMOVE})
	@JoinTable(name = "CardMember", 
		joinColumns = @JoinColumn(name = "cardId"),
		inverseJoinColumns = @JoinColumn(name = "memberId"))
	@JsonManagedReference
	List<Member> members;
}