<?php
class SocialAccountManagerTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function test_存在しないuser_idからSocialAccountを生成すると空が返却() {
        $socialAccounts = SocialAccountManager::generateByUserId(-1);
        $this->assertEquals(0 ,count($socialAccounts), '空のarrayが返却');
    }

    public function test_存在するuser_idからSocialAccountクラスを生成() {
        $socialAccounts = SocialAccountManager::generateByUserId(1);
        $this->assertNotEquals(0, count($socialAccounts), 'arrayが返却');
    }

    public function test_存在するtokenからSocialAccountクラスを生成() {
        $socialAccount = SocialAccountManager::generateBySocialToken(1, "Modified_token");
        $this->assertEquals($socialAccount->token, 'Modified_token');
    }

    public function test_存在するtokenとsecretからSocialAccountクラスを生成() {
        $socialAccount = SocialAccountManager::generateBySocialToken(1, "Modified_token", "Modified_secret");
        $this->assertEquals($socialAccount->token, 'Modified_token');
        $this->assertEquals($socialAccount->secret, 'Modified_secret');
    }

    public function test_存在しないtokenとsecretからSocialAccountクラスを生成() {
        // token のみ存在する
        $socialAccount = SocialAccountManager::generateBySocialToken(1, "Modified_token", "Modified_secret_DUMMY");
        $this->assertNull($socialAccount);
        // secret のみ存在する
        $socialAccount = SocialAccountManager::generateBySocialToken(1, "Modified_token_DUMMY", "Modified_secret");
        $this->assertNull($socialAccount);
        // token/secret どちらも不正
        $socialAccount = SocialAccountManager::generateBySocialToken(1, "Modified_token_DUMMY", "Modified_secret_DUMMY");
        $this->assertNull($socialAccount);
    }
}
