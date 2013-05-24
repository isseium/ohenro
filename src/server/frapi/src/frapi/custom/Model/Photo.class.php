<?php
class Photo extends OhenroBase {
    public $id;
    public $spot_id;
    public $checkin_id;
    public $daizu_id;
    public $daizu_image_small;
    public $daizu_image_medium;
    public $daizu_image_large;
    public $created_at;
    public $updated_at;
    public $social = array();

    function __construct($spot_id, $checkin_id, $daizu_id, $daizu_image_small, $daizu_image_medium, $daizu_image_large){
        $this->spot_id = $spot_id;
        $this->checkin_id = $checkin_id;
        $this->daizu_id = $daizu_id;
        $this->daizu_image_small = $daizu_image_small;
        $this->daizu_image_medium = $daizu_image_medium;
        $this->daizu_image_large = $daizu_image_large;
    }

    /**
     * @params SocailToken[] $socialTokens ソーシャルトークン
     * @params boolean
     */
    function save (){
        $photosTable = new Zend_Db_Table('Photos');
        
        $photosTable->insert(array(
            'spot_id'           => $this->spot_id,
            'checkin_id'        => $this->checkin_id,
            'daizu_id'          => $this->daizu_id,
            'daizu_image_small' => $this->daizu_image_small,
            'daizu_image_medium' => $this->daizu_image_medium,
            'daizu_image_large' => $this->daizu_image_large,
            'created_at' => new Zend_Db_Expr('now()'),
        ));

        $this->id = $photosTable->getDefaultAdapter()->lastInsertId();

        return true;
    }
}
