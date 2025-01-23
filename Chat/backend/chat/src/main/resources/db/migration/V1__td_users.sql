CREATE TABLE IF NOT EXISTS td_users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_time DATETIME NOT NULL ,
    last_modified DATETIME NOT NULL
)