<?php
class Checkin extends OhenroBase {
    public $id;
    public $user_id;
    public $spot_id;
    public $number;
    public $lat;
    public $lon;
    public $description;

    // checkin
    public $checkin_id;
    public $checkin_user_id;
    public $checkin_comment;

    public function __construct($id, $user_id, $spot_id, $comment, $created_at, $updated_at){
        $this->id = $id;
        $this->user_id = $user_id;
        $this->spot_id = $spot_id;
        $this->comment = $comment;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }
}
