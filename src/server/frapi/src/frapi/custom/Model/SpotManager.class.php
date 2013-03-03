<?php
class SpotManager extends OhenroBase {
    public static function generateBySpotId($spot_id){
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

    /**
     * ユーザID から ユーザがチェックインしたスポット情報を検索し返却する
     */
    public static function generateByUserId($user_id){
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()
            ->from(array('c' => 'Checkin'))
            ->join(
                array('s' => 'SpotMaster'),
                's.id = c.spot_id',
                array(
                    'spot_id' => 'id',
                    'name' => 'name',
                )
            )
            ->where('c.user_id = ?', $user_id);

        $rows = $db->fetchAll($select);

        if(!$rows){
            // TODO: エラー管理
            throw new Exception(sprintf('Invalid checkin id [id=%s]', $checkin_id));
        }

        // TODO: 一部データ返却できていません
        $spots = array();
        foreach($rows as $r){
            // Spot 作成
            $spots[] = array(
                "spot" => self::generateBySpotId($r["spot_id"]),
                "checkin" => CheckinManager::generateByCheckinId($r["id"])
            );
        }

        return $spots;
    }
}
