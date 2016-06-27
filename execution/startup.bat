SET mypath=%~dp0
SET PATH=%PATH%;%mypath%java\jre1.8.0_77\bin
java -Dencoding=utf-8 -Dfile.encoding=utf-8 -jar kanban-1.0.jar --server.port=80 --spring.jpa.hibernate.ddl-auto=create