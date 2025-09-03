create database notebooks;
use notebooks;
CREATE TABLE notebook (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) DEFAULT NULL
);

select * from notebook;
UPDATE notebook
SET title = 'PC Lenovo',
    content = 'falla en arranque'
WHERE id = 1;

DELETE FROM notebook
WHERE id <> 1;
