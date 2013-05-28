<?php
// If you remove this. You might die.
define('FRAPI_CACHE_ADAPTER', 'apc');

// Use the constant CUSTOM_MODEL to access the custom model directory
// IE: require CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'ModelName.php';
// Or add an autolaoder if you are brave.

// Other data

defined('CUSTOM_LIBRARY') || define('CUSTOM_LIBRARY', CUSTOM_PATH. DIRECTORY_SEPARATOR . 'Library');
defined('CUSTOM_LIBRARY_FRAPI_PLUGINS') || define('CUSTOM_LIBRARY_FRAPI_PLUGINS', CUSTOM_LIBRARY . DIRECTORY_SEPARATOR . 'Frapi' . DIRECTORY_SEPARATOR . 'Plugins');


// Zend 自動読み込み
set_include_path(get_include_path() . PATH_SEPARATOR . CUSTOM_LIBRARY );
set_include_path(get_include_path() . PATH_SEPARATOR . ROOT_PATH . DIRECTORY_SEPARATOR . 'library');
set_include_path(get_include_path() . PATH_SEPARATOR . CUSTOM_PATH . DIRECTORY_SEPARATOR . 'Model');
require_once 'Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();
#$autoloader->unregisterNamespace(array('Zend_', 'ZendX_'))
#           ->setFallbackAutoloader(true);

// Model以下自動読み込み
//spl_autoload_register(function ($class_name){
//    switch($class_name){
//    case "modules":
//        break;
//    default:
//        include $class_name . ".class.php";
//    }
//});

$config = new Zend_Config_Ini(CUSTOM_PATH . '/Config/config.ini');
$dbAdapter = Zend_Db::factory($config->db);
define('IMG_ENDPOINT_URL', $config->img->endpoint_url);
Zend_Db_Table::setDefaultAdapter($dbAdapter);

// Model以下の読み込み
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'OhenroBase.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'SpotMaster.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'User.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'UserFactory.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'SocialAccount.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'SocialAccountManager.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'Spot.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'SpotFactory.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'SpotManager.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'Checkin.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'CheckinManager.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'ShareQueue.class.php');
require_once(CUSTOM_MODEL . DIRECTORY_SEPARATOR . 'Photo.class.php');


// ログレベル
// error_reporting( E_ALL | E_STRICT );
