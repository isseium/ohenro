<?php
class Cheekit_PHPUnit_Framework_TestCase extends PHPUnit_Framework_TestCase
{
    public function testOk()
    {
        $this->assertEquals('cheekit', 'cheekit');
    }
}
