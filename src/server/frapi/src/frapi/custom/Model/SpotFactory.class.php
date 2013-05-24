<?php
class SpotFactory extends OhenroBase {
    public static function generateBySpotId ($spot_id){
        $spotsTable = new Zend_Db_Table('SpotMaster');

        // スポット抽出
        $select = $spotsTable->select()->where('id = ?', $spot_id);
        $row = $spotsTable->fetchRow($select);

        // 存在しないときは null を返却
        if(!$row){
            return null;
        }

        // スポットクラスを生成して返却
        $spot = new Spot($row->id, $row->name, $row->number, $row->lat, $row->lon, $row->description);

        return $spot;
    }
}
