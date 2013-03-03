<?php
class ShareQueue extends OhenroBase {
    /**
     * キューに積む
     */
    public static function enqueue (User $user, $checkin_id){
        $shareQueue = new Zend_Db_Table('ShareQueue');
        $shareQueue->insert(
            array(
                'checkin_id' => $checkin_id,
                'status'     => 1,              // Share 待ちとして保存
                'share_dist' => $user->generateShareDist(),
                'created_at' => new Zend_Db_Expr('now()'),
                'updated_at' => new Zend_Db_Expr('now()'),
            )
        );

        return true;
    }
}
