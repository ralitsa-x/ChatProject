CREATE TABLE IF NOT EXISTS tc_friendships(
    id INT AUTO_INCREMENT PRIMARY KEY,
    current_user_id INT NOT NULL,
    other_user_id INT NOT NULL,
    UNIQUE (current_user_id, other_user_id),
    FOREIGN KEY (current_user_id) REFERENCES td_users(id),
    FOREIGN KEY (other_user_id) REFERENCES td_users(id)
)