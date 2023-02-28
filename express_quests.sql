DROP TABLE IF EXISTS movie;

CREATE TABLE movie (
  id int primary key NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  director varchar(255) NOT NULL,
  year varchar(255) NOT NULL,
  description TEXT NOT NULL,
  duration int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
  movie (title, director, year, description, duration)
VALUES
  (
    'Citizen Kane',
    'Orson Wells',
    '1941',
    'Description 1',
    120
  ),
  (
    'The Godfather',
    'Francis Ford Coppola',
    '1972',
    'Description 2',
    180
  ),
  (
    'Pulp Fiction',
    'Quentin Tarantino',
    '1994',
    'Description 3',
    180
  ),
  (
    'Apocalypse Now',
    'Francis Ford Coppola',
    '1979',
    'Description 4',
    150
  ),
  (
    '2001 a space odyssey',
    'Stanley Kubrick',
    '1968',
    'Description 5',
    160
  ),
  (
    'The Dark Knight',
    'Christopher Nolan',
    '2008',
    'Description 5',
    150
  );

DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    city varchar(255) DEFAULT NULL,
    language varchar(255) DEFAULT NULL,
    hashedPassword varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  user (firstname, lastname, email, city, language, hashedPassword)
VALUES
(
    'John',
    'Doe',
    'john.doe@example.com',
    'Paris',
    'English',
    "$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ"
  ),(
    'Valeriy',
    'Appius',
    'valeriy.ppius@example.com',
    'Moscow',
    'Russian',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZQ$eSetR6KPUNAGW+q+wDadcw'
  ),(
    'Ralf',
    'Geronimo',
    'ralf.geronimo@example.com',
    'New York',
    'Italian',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZXphZGF6ZGQ$a0bg5DZB6H6v3jjQC81DXg'
  ),(
    'Maria',
    'Iskandar',
    'maria.iskandar@example.com',
    'New York',
    'German',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA'
  ),(
    'Jane',
    'Doe',
    'jane.doe@example.com',
    'London',
    'English',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$VCzq45PL9t8khtc44Kk5iw'
  ),(
    'Johanna',
    'Martino',
    'johanna.martino@example.com',
    'Milan',
    'Spanish',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$UKaGZ9hGFn/S5SBQDMe/Uw'
  );
