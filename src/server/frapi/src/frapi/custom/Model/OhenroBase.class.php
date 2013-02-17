<?php
# Zend 自動読み込み
set_include_path(get_include_path() . PATH_SEPARATOR . dirname(__FILE__) . '/../Library');
set_include_path(get_include_path() . PATH_SEPARATOR . dirname(__FILE__) . '/../../library');
require_once 'Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->unregisterNamespace(array('Zend_', 'ZendX_'))
           ->setFallbackAutoloader(true);
#require '../Library/ApnsPHP/Autoload.php';

class OhenroBase {
    public function __construct (){
        // DB接続
        $config = new Zend_Config_Ini(dirname(__FILE__) . '/../Config/config.ini');
        $this->_db = Zend_Db::factory($config->db);
    }
}
