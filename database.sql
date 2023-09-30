-- CREATE DATABASE
CREATE DATABASE jwt;

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS users(
  username VARCHAR(100) PRIMARY KEY,
  password VARCHAR(100) NOT NULL,
  raw_password VARCHAR(100) NOT NULL
);

-- INSERT DATAS EXAMPLE
INSERT INTO users(username, password, raw_password) 
VALUES('john', '$2b$10$tCwc2mb7Z1BMfpFRFyWvcuwGATJDtjIKWlQd9bIfRgfaupfxSwkDi', 'john123'), ('doe', '$2b$10$XdGpz73dlTUFcPw8r3434uFZ5sG/Ylz9YwbgyAq75ZlQ3sTfTXFDW', 'doe123');

-- DROP TABLES
DROP TABLE users;