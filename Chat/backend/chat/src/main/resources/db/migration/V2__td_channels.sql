CREATE TABLE IF NOT EXISTS td_channels(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_time DATETIME NOT NULL,
    last_modified DATETIME NOT NULL
)