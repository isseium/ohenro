<?php
class SpotManagerTest extends Cheekit_PHPUnit_Framework_TestCase
{
    protected $target_spot_id;
    protected $user_id = 1;

    function setUp(){
        // テスト用
        $user = new User("name");
        $user->id = $this->user_id;

        $spot = new Spot(1, "name", 1, 40.123456, 140.123456, "This is description");
        $result = $spot->checkin($user, "Hello, World : time=" . time());

        $this->target_spot_id = $spot->spot_id;
    }

    public function test_UserIDからユーザにひもづいたスポットを取得できること() {
        $spots = SpotManager::generateByUserId($this->user_id);
        $this->assertNotNull($spots);
    }
}
