<?php
class SpotMaster extends OhenroBase {
    function getAllSpots(){
        $spotMasterTable = new Zend_Db_Table('SpotMaster');
        return $spotMasterTable->fetchAll();
    }
}
