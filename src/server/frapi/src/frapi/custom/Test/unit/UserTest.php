<?php
class UserTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function testGenerateObject() {
        $user = new User("name");
        $this->assertNotNull($user);
    }

    public function test_新規保存できることを確認() {
        $user = new User("name" . time());
        $this->assertTrue($user->save());
    }

    public function test_追記更新できることを確認() {
        $user = UserFactory::generateByToken('00a5f7f7e7124313e12ca14efe8f5c81e59b7a15');
        $user->name = 'name2';
        $this->assertTrue($user->save());

        $user = UserFactory::generateByToken('00a5f7f7e7124313e12ca14efe8f5c81e59b7a15');
        $this->assertEquals($user->name, 'name2');
    }

    public function test_シェア先の論理和を生成() {
        $user = UserFactory::generateByToken('00a5f7f7e7124313e12ca14efe8f5c81e59b7a15');
        $dist = $user->generateShareDist();
        $this->assertEquals($dist, 3);
    }
}
