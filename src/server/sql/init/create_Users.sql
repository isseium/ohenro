CREATE TABLE Users
(
    id          int(11)     NOT NULL AUTO_INCREMENT,
    name        varchar(20) NOT NULL,
    token       varchar(40) NOT NULL,
    updated_at  timestamp   NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at  timestamp   NOT NULL DEFAULT '0000-00-00 00:00:00',
    PRIMARY KEY (id),
    UNIQUE      (name),
    UNIQUE      (token)
);
