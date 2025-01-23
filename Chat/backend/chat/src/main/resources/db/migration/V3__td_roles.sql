CREATE TABLE IF NOT EXISTS td_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO td_roles (role_name) VALUES
    ('OWNER'),
    ('ADMIN'),
    ('GUEST');