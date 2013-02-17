CREATE TABLE SocialAccounts
(
    social_type int(3) NOT NULL AUTO_INCREMENT,
    token       text,
    secret      text,
    user_id     int(11) NOT NULL,
    share       int(2),
    updated_at  timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at  timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
    PRIMARY KEY (social_type, user_id)
);

