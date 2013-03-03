<?php
class SpotTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function testGenerateObject() {
        $spot = new Spot(1, "name", 1, 40.123456, 140.123456, "This is description");
        $this->assertNotNull($spot);
    }

    public function test_チェックインを確認() {
        // テスト用
        $user = new User("name");
        $user->id = "1";

        // チェックイン
        $spot = new Spot(1, "name", 1, 40.123456, 140.123456, "This is description");
        $result = $spot->checkin($user, "Hello, World : time=" . time());
        $this->assertTrue($result);
    }
}
