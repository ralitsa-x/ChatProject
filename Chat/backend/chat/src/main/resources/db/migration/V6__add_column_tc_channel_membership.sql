ALTER TABLE tc_channel_membership
ADD COLUMN role_id INT NOT NULL;

ALTER TABLE tc_channel_membership
ADD FOREIGN KEY (role_id) REFERENCES td_roles(id);