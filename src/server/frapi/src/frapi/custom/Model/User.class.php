<?php
class User extends OhenroBase {
    public $id;
    public $name;
    public $token;
    public $created_at;
    public $updated_at;
    public $social = array();

    function __construct($name, $token = null){
        $this->name = $name;
        $this->token = $token;
    }

    /**
     * @params SocailToken[] $socialTokens ソーシャルトークン
     * @params boolean
     */
    function save (SocialToken $socailTokens = null){
        $usersTable = new Zend_Db_Table('Users');
        $socialAccountsTable = new Zend_Db_Table('SocialAccounts');

        // TODO: トランザクション

        if($this->token == null){
            // ユーザ新規追加
            $this->token = $this->generateToken($this->name);
            $usersTable->insert(array(
                'name'  => $this->name,
                'token' => $this->token,
                'created_at' => new Zend_Db_Expr('now()'),
            ));

            $this->id = $usersTable->getDefaultAdapter()->lastInsertId();
        }else{
            // ユーザ更新
            $where = $usersTable->getAdapter()->quoteInto('token = ?', $this->token);
            $affected_count = $usersTable->update(
                array(
                    'name'  => $this->name,
                ),
                $where
            );

            // TODO: あとで
            // 影響行が 0 のときは 失敗をスロー
#            if($affected_count === 0){
#                throw new Exception ('Failed to update', 10000);
#            }

        }

        return true;
    }

    /**
     * シェア先（social_type）の論理和を返却
     */
    public function generateShareDist(){
        $socialAccounts = SocialAccountManager::generateByUserId($this->id);

        $result = 0;
        foreach($socialAccounts as $s){
            $result |= $s->social_type;
        }

        return $result;
    }

    /*
     * OhenroToken の生成
     *
     * @return string   OhenroToken
     */
    private function generateToken($key, $seed = "Sample"){      # TODO: Seed の隠蔽
        return sha1($key . ":" . time());
    }


    // 一意制約チェック
    private function _isUniqueName($name){
    }
}
