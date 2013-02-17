CREATE TABLE SpotMaster 
(
    id          int(11) NOT NULL AUTO_INCREMENT,
    name        text    NOT NULL,
    number      int(11) NOT NULL,
    lat         decimal(9, 6) NOT NULL,
    lon         decimal(9, 6) NOT NULL,
    description text,
    picture     text,
    PRIMARY KEY (id)
);

