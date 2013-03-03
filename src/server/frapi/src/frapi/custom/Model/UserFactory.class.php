<?php
class UserFactory extends OhenroBase {
    /**
     * OhenroToken をもとに ユーザクラスを生成
     *
     * @params string $token お遍路トークン
     * @return User          ユーザ / 存在しないときは null
     */
    public static function generateByToken ($token){
        $usersTable = new Zend_Db_Table('Users');

        // ユーザ
        $select = $usersTable->select()->where('token = ?', $token);
        $row = $usersTable->fetchRow($select);

        // 存在しないときは null を返却
        if(!$row){
            return null;
        }

        // ユーザクラスを生成して返却
        $user = new User($row->name, $row->token);
        $user->id         = $row->id;
        $user->created_at = $row->created_at;
        $user->updated_at = $row->updated_at;

        return $user;
    }

    public static function generateByUserId ($user_id){
        $usersTable = new Zend_Db_Table('Users');

        // ユーザ
        $select = $usersTable->select()->where('id = ?', $user_id);
        $row = $usersTable->fetchRow($select);

        // 存在しないときは null を返却
        if(!$row){
            return null;
        }

        // ユーザクラスを生成して返却
        $user = new User($row->name, $row->token);
        $user->id         = $row->id;
        $user->created_at = $row->created_at;
        $user->updated_at = $row->updated_at;

        return $user;
    }

    /*
     * OhenroToken の生成
     *
     * @return string   OhenroToken
     */
    private function generateToken($key, $seed = "Sample"){      # TODO: Seed の隠蔽
        return sha1($key . ":" . time());
    }
}
