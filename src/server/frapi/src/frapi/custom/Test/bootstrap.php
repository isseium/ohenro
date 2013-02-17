<?php
set_include_path(get_include_path() . ':' . dirname(__file__) . '/unit');
set_include_path(get_include_path() . ':' . dirname(__file__) . '/../Model/');


require_once('Cheekit_PHPUnit_Framework_TestCase.class.php');

/**
 * オートロード設定
 */
spl_autoload_register(function ($class_name){
    include $class_name . ".class.php";
});



?>
