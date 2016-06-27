package com.gsitm.kanban.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
@SuppressWarnings("serial")
public class CardMember implements Serializable {
	@Id
	private Integer cardId;
	
	@Id
	private Integer memberId;
}