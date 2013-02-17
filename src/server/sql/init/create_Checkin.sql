CREATE TABLE Checkin
(
    id          int(11) NOT NULL AUTO_INCREMENT,
    user_id     int(11) NOT NULL,
    spot_id     int(11) NOT NULL,
    comment     text,
    updated_at  timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at  timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
    PRIMARY KEY (id)
);

