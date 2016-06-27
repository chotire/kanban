package com.gsitm.kanban.model;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
public class Member {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private Integer kanbanId;
	
	private String name;
	
	private String picture;
	
	@JsonIgnore
	@Transient
	private MultipartFile pictureFile;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="kanbanId", insertable=false, updatable=false)
	@JsonBackReference
	private Kanban kanban;
	
//	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "members")
//	@JsonBackReference
//	private Collection<Kanban> kanbans;
	
	//http://ojc.asia/bbs/board.php?bo_table=LecJpa&wr_id=183
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name = "CardMember", 
		joinColumns = @JoinColumn(name = "memberId"),
		inverseJoinColumns = @JoinColumn(name = "cardId"))
	@JsonBackReference
	private Collection<Card> cards;
}