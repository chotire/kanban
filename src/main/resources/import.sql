insert into kanban (name) values ('Sample');

insert into panel (kanban_id, name, color, sort_order) values (1, 'Backlog', '#777777', 1);
insert into panel (kanban_id, name, color, sort_order) values (1, '진행중', '#337ab7', 2);
insert into panel (kanban_id, name, color, sort_order) values (1, '검토중', '#d9534f', 3);
insert into panel (kanban_id, name, color, sort_order) values (1, '완료', '#5cb85c', 4);

insert into card (panel_id, name, color, due_date, note, sort_order) values (1, 'Cras justo odio', 'red', '2016-06-17', 'note', 1);
insert into card (panel_id, name, color, due_date, note, sort_order) values (1, 'Dapibus ac facilisis in', '#d8d7d7', '2016-06-26', null, 2);
insert into card (panel_id, name, color, due_date, note, sort_order) values (1, 'Morbi leo risus', '#d8d7d7', null, null, 3);
insert into card (panel_id, name, color, due_date, note, sort_order) values (1, 'Porta ac consectetur ac', '#d8d7d7', '2016-06-17', 'note', 4);
insert into card (panel_id, name, color, due_date, note, sort_order) values (1, 'Vestibulum at eros', '#d8d7d7', null, 'note', 5);
insert into card (panel_id, name, color, due_date, note, sort_order) values (2, 'Coffee', '#337ab7', null, 'note', 1);
insert into card (panel_id, name, color, due_date, note, sort_order) values (2, 'Tea', '#d8d7d7', null, 'note', 2);
insert into card (panel_id, name, color, due_date, note, sort_order) values (2, 'Coca Cola', '#d8d7d7', '2016-06-17', 'note', 3);

insert into member (kanban_id, name, picture) values (1, '정태호', 'IT0052.jpg');
insert into member (kanban_id, name, picture) values (1, '이득영', 'IT0055.jpg');
insert into member (kanban_id, name, picture) values (1, '조용상', 'IT0324.jpg');
insert into member (kanban_id, name, picture) values (1, '이수현', 'IT0709.jpg');

insert into card_member (card_id, member_id) values (1, 3);
insert into card_member (card_id, member_id) values (1, 2);
insert into card_member (card_id, member_id) values (6, 1);
insert into card_member (card_id, member_id) values (6, 2);
insert into card_member (card_id, member_id) values (6, 3);
insert into card_member (card_id, member_id) values (6, 4);
insert into card_member (card_id, member_id) values (7, 3);