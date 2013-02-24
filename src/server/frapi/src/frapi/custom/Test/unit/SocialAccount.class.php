<?php
class SocialAccountTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function testGenerateObject() {
        $object = new SocialAccount(1, 1, "token", "secret", 1);
        $this->assertNotNull($object);
    }

    public function test_新規保存できることを確認() {
        $socialAccount = new SocialAccount(1, 1, "token", "secret", 1);
        $this->assertTrue($socialAccount->save());
    }

    public function test_追記更新できることを確認() {
        $socialAccounts = SocialAccountManager::generateByUserId(1);

        foreach($socialAccounts as $socialAccount){
            $socialAccount->share = 0;
            $socialAccount->token = "Modified_token";
            $socialAccount->secret = "Modified_secret";
            $this->assertTrue($socialAccount->save());
        }
    }
}
