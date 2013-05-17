<?php
class CheckinTest extends Cheekit_PHPUnit_Framework_TestCase
{
    public function testGenerateObject() {
        $spot = new Checkin(1, 2, 3, "this is comment", "2013-01-01 23:23:23", "2013-01-03 01:02:03");
        $this->assertEquals($spot->id, 1);
        $this->assertEquals($spot->user_id, 2);
        $this->assertEquals($spot->spot_id, 3);
        $this->assertEquals($spot->comment, "this is comment");
        $this->assertEquals($spot->created_at, "2013-01-01 23:23:23");
        $this->assertEquals($spot->updated_at, "2013-01-03 01:02:03");
    }
}
