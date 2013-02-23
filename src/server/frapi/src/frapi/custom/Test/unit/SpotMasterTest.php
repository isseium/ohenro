<?php
class SpotMasterTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function testSample() {
        $spotMaster = new SpotMaster();
        $this->assertNotNull($spotMaster);
    }

    public function test_全体取得(){
        $spotMaster = new SpotMaster();
        $this->assertEquals(count($spotMaster->getAllSpots()), 2, 'TODO: 将来変更すること');
    }
}
