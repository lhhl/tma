<?php

class DBLogic{

	public $dbcon;

	function __construct(){
		$this->dbcon = mysqli_connect( 'localhost', 'long', '123', 'sma' ) or die( "Can't connect to DB server!" );
		mysqli_set_charset($this->dbcon, "utf8");
	}

	function getData( $table )
	{

		$sql = "SELECT * FROM " . $table;
		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your getData query is incorrect');
		}

		return $result;
	}

	function getWhere( $table,  $whereArray = array() )
	{
		$get_str = '';
		$sql = "SELECT * FROM " . $table . " WHERE ";
		foreach ($whereArray as $key => $value) {
			$get_str .= " ".$key . " = '" . $value . "' AND";
		}

		$sql .= rtrim($get_str, 'AND');
		
		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your getWhere query is incorrect');
		}
		return $result;
	}

	function getColWhere( $col, $table, $whereArray = array() ){
		$get_str = '';
		$sql = "SELECT " . $col . " FROM " . $table . " WHERE ";
		foreach ($whereArray as $key => $value) {
			$get_str .= " ".$key . " = '" . $value . "' AND";
		}

		$sql .= rtrim($get_str, 'AND');
		
		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your getColWhere query is incorrect');
		}
		return $result;
	}

	function insertData( $table, $dataArray = array() ){
		$sql = '';
		$field = '';
		$data = '';

		foreach ($dataArray as $key => $value) {
			$field .= $key . ",";
			$data .= "'" . $value . "',";
		}

		$field = rtrim($field, ',');
		$data = rtrim($data, ',');

		$sql .= "INSERT INTO " . $table;
		$sql .= " (" . $field . ") VALUES";
		$sql .= " ( " . $data . " )";
		
		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your insertData query is incorrect');
		}
		
	}

	function updateData( $table, $dataArray = array(), $whereArray = array() ){
		$sql = '';
		$update_str = '';


		$sql .= "UPDATE " . $table;
		$sql .= " SET ";
		

		foreach ($dataArray as $key => $value) {
			$update_str .= $key . " = '" . $value . "',";
		}

		$update_str = rtrim($update_str, ',') . " WHERE ";

		foreach ($whereArray as $key => $value) {
			$update_str .= " ".$key . " = '" . $value . "' AND";
		}

		$sql .= rtrim($update_str, 'AND');

		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your updateData query is incorrect');
		}
		
	}

	function deleteData( $table, $whereArray = array() ){
		$sql = '';
		$del_str = '';


		$sql .= "DELETE FROM " . $table;
		$sql .= " WHERE ";
		

		foreach ($whereArray as $key => $value) {
			$del_str .= " ".$key . " = '" . $value . "' AND";
		}

		$sql .= rtrim($del_str, 'AND');

		
		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your query is incorrect');
		}
		
	}

	function unsafeQuery($sql){
		$result = mysqli_query( $this->dbcon, $sql );
		if (!$result){
		    die ('Your query is incorrect');
		}
		return $result;
	}

	

}

 //$data=$db->getData( 'packed' );
// $row=mysqli_fetch_assoc($data);
 //print_r($data);

//echo $db->insertData( 'packed', array( 'packed_name'=>'Quản lý', 'packed_sort'=>'1' ) );

?>
