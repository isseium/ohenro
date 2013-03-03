<?php
class CheckinManager extends OhenroBase {
    public static function generateByCheckinId($checkin_id){
        $spotMasterTable = new Zend_Db_Table('Checkin');
        $select = $spotMasterTable->select()->where('id = ?', $checkin_id);
        $r = $spotMasterTable->fetchRow($select);

        if(!$r){
            // TODO: エラー管理
            throw new Exception(sprintf('Invalid checkin id [id=%s]', $checkin_id));
        }

        // Spot 作成
        $checkin = new Checkin($r->id, $r->user_id, $r->spot_id, $r->comment, $r->created_at, $r->updated_at);

        return $checkin;
    }
}
