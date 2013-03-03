<?php
class SocialAccountManager extends OhenroBase {
    /**
     * user_id をもとに SocialAccount クラスを生成
     *
     * @params string $user_id 
     * @return User[]           存在しないときは空配列
     */
    public static function generateByUserId ($user_id, $social_type = null){
        $socialAccountsTable = new Zend_Db_Table('SocialAccounts');

        $select = $socialAccountsTable->select()->where('user_id = ?', $user_id);

        if($social_type){
            $select = $select->where('social_type = ?', $social_type);
        }

        $rows = $socialAccountsTable->fetchAll($select);

        // 存在しないときは 空配列 を返却
        $socialAccounts = array();
        foreach($rows as $row){
            $socialAccounts[] = new SocialAccount(
                $row->user_id, $row->social_type, $row->token, $row->secret, $row->share, $row->created_at, $row->updated_at
            );
        }

        return $socialAccounts;
    }

    public static function generateBySocialToken($social_type, $token, $secret = null){
        $socialAccountsTable = new Zend_Db_Table('SocialAccounts');
        $select = $socialAccountsTable->select()->where('social_type = ?', $social_type);
        

        if($token){
            $select = $select->where('token = ?', $token);
        }

        if($secret){
            $select = $select->where('secret = ?', $secret);
        }

        $row = $socialAccountsTable->fetchRow($select);

        // ヒットしないときは null を返却
        if(!$row){
            return null;
        }

        return new SocialAccount(
            $row->user_id, $row->social_type, $row->token, $row->secret, $row->share, $row->created_at, $row->updated_at
        );
    }
}
