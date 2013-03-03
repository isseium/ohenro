<?php
class SpotManager extends OhenroBase {
    public function generateBySpotId($spot_id){
        $spotMasterTable = new Zend_Db_Table('SpotMaster');
        $select = $spotMasterTable->select()->where('id = ?', $spot_id);
        $r = $spotMasterTable->fetchRow($select);

        if(!$r){
            // TODO: エラー管理
            throw new Exception('Invalid spot id ' . $spot_id);
        }

        // Spot 作成
        $spot = new Spot($r->id, $r->name, $r->number, $r->lat, $r->lon, $r->description);

        return $spot;
    }
}
