<?php
class UserFactoryTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function test_存在しないトークンからユーザを生成するとnullが返却() {
        $user = UserFactory::generateByToken('aaa');
        $this->assertNull($user);
    }

# NOTE: 環境依存のためコメントアウト
#    public function test_存在するトークンからユーザを生成するとユーザクラスが返却() {
#        $user = UserFactory::generateByToken('00a5f7f7e7124313e12ca14efe8f5c81e59b7a15');
#        $this->assertInstanceOf("User", $user);
#    }

    public function test_存在するuser_idからユーザを生成するとユーザクラスが返却() {
        $user = UserFactory::generateByUserId(1);
        $this->assertInstanceOf("User", $user);
        $this->assertEquals(1, $user->id);
    }

    public function test_存在しないuser_idからユーザを生成するとnullが返却() {
        $user = UserFactory::generateByUserId(0);
        $this->assertNull($user);
    }
}
