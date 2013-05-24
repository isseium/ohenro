<?php
class Spot extends OhenroBase {
    public $spot_id;
    public $name;
    public $number;
    public $lat;
    public $lon;
    public $description;

    // checkin
    public $checkin_id;
    public $checkin_user_id;
    public $checkin_comment;

    public function __construct($spot_id, $name, $number, $lat, $lon, $description){
        $this->spot_id = $spot_id;
        $this->name    = $name;
        $this->numbera = $number;
        $this->lat     = $lat;
        $this->lon     = $lon;
        $this->description = $description;
    }

    public function checkin(User $user, $comment){
        $this->checkin_user_id = $user->id;
        $this->checkin_comment = $comment;

        // save
        $checkinTable = new Zend_Db_Table('Checkin');

        // Upsert
        $sql = <<<SQL
INSERT INTO Checkin
(
      id
    , user_id
    , spot_id
    , comment
    , created_at
)
VALUES
(
      NULL
    , :user_id
    , :spot_id
    , :comment
    , now()
)
ON DUPLICATE KEY UPDATE
      id = LAST_INSERT_ID(id)
    , comment = :comment_duplicate
SQL;

        // FIXME: 名前付きパラメタが複数あると挙動がおかしい
        $db = Zend_Db_Table::getDefaultAdapter();
        $sth = $db->prepare($sql);
        $sth->bindValue(':user_id', $this->checkin_user_id);
        $sth->bindValue(':spot_id', $this->spot_id);
        $sth->bindValue(':comment', $this->checkin_comment);
        $sth->bindValue(':comment_duplicate', $this->checkin_comment);
        $sth->execute();

//        // 単純インサート
//        $insertId = $checkinTable->insert(
//            array(
//                'user_id' => $user->id, 
//                'spot_id' => $this->checkin_user_id,
//                'comment' => $this->checkin_comment,
//                'created_at' => new Zend_Db_Expr('now()'),
//            )
//        );

        $insertId = $db->lastInsertId();
        $this->checkin_id = $insertId;

        return true;
    }

    public function fetchImageLatest(){
        $photosTable = new Zend_Db_Table('Photos');
        // select * from (photos join checkin on photos.checkin_id = checkin.id) join users on checkin.user_id = users.id;
        $select = $photosTable
            ->select()
            ->setIntegrityCheck(false)
            ->from(array('p' => 'Photos'),
                array(
                    'author' => 'u.name',
                    'daizu_image_small' => 'p.daizu_image_small',
                    'daizu_image_medium' => 'p.daizu_image_medium',
                    'daizu_image_large' => 'p.daizu_image_large',
                )
            )->join(array('c' => 'Checkin'), 'p.checkin_id = c.id' )
            ->join(array('u' => 'Users'), 'c.user_id = u.id' )
            ->where('c.spot_id = ?', $this->spot_id)->order('p.created_at desc');
        error_log($select->__toString());

        $row = $photosTable->fetchRow($select);

        return $row;
    }
}
