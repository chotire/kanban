package com.gsitm.kanban.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import com.gsitm.kanban.Application;
import com.gsitm.kanban.model.Member;
import com.gsitm.kanban.repository.MemberRepository;

@RestController
@RequestMapping(value="/api")
@Transactional
public class MemberController {
	private final DateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS", Locale.KOREA);
	
	@Autowired
	private MemberRepository repository;
	
	@RequestMapping(value="/kanbans/{kanbanId}/members", method=RequestMethod.GET)
	public List<Member> findAll(@PathVariable Integer kanbanId, String name) {
		return StringUtils.isEmpty(name) ? 
				repository.findAllByKanbanId(kanbanId) : repository.findByKanbanIdAndNameContaining(kanbanId, name);
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/members", method=RequestMethod.POST)
	public List<Member> add(Member member) throws Exception {
		MultipartFile pictureFile = member.getPictureFile();
		if (pictureFile != null && !pictureFile.isEmpty()) {
			String extension = FilenameUtils.getExtension(member.getPictureFile().getOriginalFilename());
			String filename = formatter.format(new Date()) + "." + extension;
			member.setPicture(filename);
			
			BufferedOutputStream stream = null;
			try {
				stream = new BufferedOutputStream(new FileOutputStream(getSavedPictureFile(filename)));
	            FileCopyUtils.copy(pictureFile.getInputStream(), stream);
			} finally {
				if (stream != null) {
					stream.close();
				}
			}
		}
		repository.save(member);
		return repository.findAllByKanbanId(member.getKanbanId());
	}
	
	@RequestMapping(value="/kanbans/{kanbanId}/members/{id}", method=RequestMethod.DELETE)
	public List<Member> delete(@PathVariable Integer kanbanId, @PathVariable Integer id) {
		Member member = repository.findOne(id);
		repository.delete(member);
		FileUtils.deleteQuietly(getSavedPictureFile(member.getPicture()));
		return findAll(kanbanId, null);
	}
	
	@RequestMapping(value="/pictures/{picture:.+}", method=RequestMethod.GET)
	public FileSystemResource downloadPicture(@PathVariable String picture) {
		return new FileSystemResource(getSavedPictureFile(picture));
	}

	private File getSavedPictureFile(String name) {
		return new File(Application.REPO + File.separator + name);
	}
}