<?php
class SocialAccount extends OhenroBase {
    public $user_id;
    public $social_type;
    public $token;
    public $secret;
    public $share;

    function __construct($user_id, $social_type, $token, $secret, $share, $created_at = null, $updated_at = null){
        $this->user_id = $user_id;
        $this->social_type = $social_type;
        $this->token = $token;
        $this->secret = $secret;
        $this->share = $share;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    /**
     * 保存する
     *
     * @params SocailToken[] $socialTokens ソーシャルトークン
     * @params boolean
     */
    function save (){
        // UPSERT
        $sql = <<<SQL
INSERT INTO SocialAccounts
(
      user_id
    , social_type
    , token
    , secret
    , share
    , created_at
)
VALUES
(
      :user_id
    , :social_type
    , :token
    , :secret
    , :share
    , now()
)
ON DUPLICATE KEY UPDATE
      token       =:token2
    , secret      =:secret2
    , share       =:share2
SQL;

        // FIXME: 名前付きパラメタが複数あると挙動がおかしい
        $db = Zend_Db_Table::getDefaultAdapter();
        $sth = $db->prepare($sql);
        $sth->bindValue(':user_id', $this->user_id);
        $sth->bindValue(':social_type',$this->social_type);
        $sth->bindValue(':secret', $this->secret);
        $sth->bindValue(':secret2', $this->secret);
        $sth->bindValue(':token', $this->token);
        $sth->bindValue(':token2', $this->token);
        $sth->bindValue(':share', $this->share);
        $sth->bindValue(':share2', $this->share);
        $sth->execute();

        return true;
    }
}
