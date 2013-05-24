CREATE TABLE Photos
(
    id                  int(11)     NOT NULL AUTO_INCREMENT,
    spot_id             int(11)     NOT NULL,
    checkin_id          int(11)     NOT NULL,
    daizu_id            int(11)     NOT NULL,
    daizu_image_small   text        NOT NULL,
    daizu_image_medium  text        NOT NULL,
    daizu_image_large   text        NOT NULL,
    updated_at          timestamp   NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at          timestamp   NOT NULL DEFAULT '0000-00-00 00:00:00',
    PRIMARY KEY (id)
);
