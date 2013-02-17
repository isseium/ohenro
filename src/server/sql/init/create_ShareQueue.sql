CREATE TABLE ShareQueue
(
    id          int(11) NOT NULL AUTO_INCREMENT,
    checkin_id  int(11) NOT NULL,
    status      int(1)  NOT NULL,
    share_dist  int(3)  NOT NULL,
    updated_at  timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at  timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
    PRIMARY KEY (id)
);

