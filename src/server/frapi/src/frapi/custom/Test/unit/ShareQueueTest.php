<?php
class ShareQueueTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function test_キューに積む() {
        $user = UserFactory::generateByToken('00a5f7f7e7124313e12ca14efe8f5c81e59b7a15');
        $checkins = SpotManager::generateByUserId($user->id);
        $result = ShareQueue::enqueue($user, $checkins[0]["checkin"]->id);
        $this->assertTrue($result);
    }
}
