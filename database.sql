-- CREATE DATABASE
CREATE DATABASE tournamence;

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS users(
  username VARCHAR(30) PRIMARY KEY,
  password VARCHAR(30) NOT NULL
);

-- INSERT DATAS EXAMPLE
INSERT INTO users(username, password) VALUES('john', 'john123'), ('doe', 'doe123');