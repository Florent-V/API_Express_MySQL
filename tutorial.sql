DROP TABLE IF EXISTS `tutorial`;

CREATE TABLE IF NOT EXISTS `tutorial` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  published BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO
  tutorial (title, description, published)
VALUES
  (
    'title 1',
    'Description 1',
    true
  ),
  (
    'title 2',
    'Description 2',
    true
  ),
  (
    'title 3',
    'Description 3',
    false
  ),
  (
    'title 4',
    'Description 4',
    true
  ),
  (
    'title 5',
    'Description 5',
    false
  ),
  (
    'title 6',
    'Description 6',
    true
  );
