CREATE TABLE IF NOT EXISTS td_messages(
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    message_time DATETIME NOT NULL,
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (channel_id) REFERENCES td_channels(id),
    FOREIGN KEY (user_id) REFERENCES td_users(id)
);