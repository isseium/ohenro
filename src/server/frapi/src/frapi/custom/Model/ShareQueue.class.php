<?php
class ShareQueue extends OhenroBase {
    /**
     * キューに積む
     */
    public static function enqueue (User $user, $checkin_id, $message){
        $shareQueue = new Zend_Db_Table('ShareQueue');
        $shareQueue->insert(
            array(
                'checkin_id' => $checkin_id,
                'status'     => 1,              // Share 待ちとして保存
                'share_dist' => $user->generateShareDist(),
                'message'    => $message,
                'created_at' => new Zend_Db_Expr('now()'),
                'updated_at' => new Zend_Db_Expr('now()'),
            )
        );

        return true;
    }

    /**
     * デキューする
     */
    public static function dequeue (){
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = $db->select()
            ->from(array('sq' => 'ShareQueue'), array('queue_id' => 'id', 'share_dist', 'message'))
            ->join(
                array('ci' => 'Checkin'),
                'sq.checkin_id = ci.id',
                array('checkin_id' => 'id', 'user_id', 'spot_id')
            )
            ->where('status = ?', 1);
            ;

        return $db->fetchAll($select);
    }

    /**
     * ステータス変更
     */
    public static function changeStatus($share_id, $status){
        $shareQueue = new Zend_Db_Table('ShareQueue');
        $where = $shareQueue->getAdapter()->quoteInto('id = ?', $share_id);
        return $shareQueue->update( array('status' => $status), $where);
    }
}
