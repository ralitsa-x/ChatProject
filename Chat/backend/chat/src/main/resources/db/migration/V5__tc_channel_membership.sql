CREATE TABLE IF NOT EXISTS tc_channel_membership(
    id INT AUTO_INCREMENT PRIMARY KEY,
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT unique_channel_user UNIQUE (channel_id, user_id),
    FOREIGN KEY (channel_id) REFERENCES td_channels(id),
    FOREIGN KEY (user_id) REFERENCES td_users(id)
)