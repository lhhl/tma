<?php
/**
* 
*/
class ServiceRegister
{
	public $db;
	public $script;
	function __construct()
	{
		$this->db = new DBLogic();
		$this->script = new ScriptGeneration();
	}

	function getPacked(){
		return mysqli_fetch_all($this->db->getData( 'packed' ), MYSQLI_ASSOC);
	}

	function getModuleAvailable(){
		return mysqli_fetch_all($this->db->getWhere( 'module', array( 'module_status' => '1' ) ), MYSQLI_ASSOC);
	}

	function getModule()
	{
		return mysqli_fetch_all($this->db->getData( 'module' ), MYSQLI_ASSOC);
	}

	function getPermission(){
		return mysqli_fetch_all($this->db->getData( 'permission' ), MYSQLI_ASSOC);
	}

	function getpackedmodule($data = array()){

		$this->updateInfoModule();
		$packed = $this->getPacked();
		if(count($data)<=0) {
			$module = $this->getModule();
		}else
		{
			if($data[0] == 1){
				$module = $this->getModuleAvailable();
			}else
			{
				$module = $this->getModule();
			}
		}
		
		$res = array();
		foreach ( $packed as $k1 => $v1 ) {
			$packed[$k1]['modules'] = array();
			foreach ( $module as $k2 => $v2 ) {
				if( $v2['packed_id'] == $v1['packed_id'] ){
					$arr = array(
						"ID" => $v2['module_id'],
						"Name" => $v2['module_name'],
						"Version" => $v2['module_version'],
						"Template" => $v2['module_template'],
						"Status" => $v2['module_status'],
						"Status" => $v2['module_status'],
						"Permission" => $v2['permission_id'],
						"Readonly" => $v2['module_readonly']
					);
					array_push($packed[$k1]['modules'],$arr);
				}


			}
			if(count($packed[$k1]['modules'])>0){
				array_push($res, $packed[$k1]);
			}
		}
		return $res;
	}

	function updateInfoModule(){
		$data = $this->script->get_content_file_info();

		//$data = str_replace(' ','',$data);
		$data = str_replace(PHP_EOL,'',$data);
		$info = array();
		$arr3 = array();
		foreach ($data as $key => $value) {
			$arr1 = explode(';',$value);
			array_pop($arr1);
			foreach ($arr1 as $v) {
				$arr2 = explode('=',$v);
				$arr3[trim($arr2[0])] = trim($arr2[1]);
			}
			$info[$key] = $arr3;
		}


		$db_module = $this->getModule();
		$db_packed = $this->getPacked();
		$db_module_name = array();
		$db_packed_name = array();
		$dir_packed_name = array();
		$dir_module_name = array();

		foreach ($db_module as $value) {
			array_push( $db_module_name, $value['module_name']);
		}

		foreach ($db_packed as $value) {
			array_push( $db_packed_name, $value['packed_name']);
		}
		
		foreach ($info as $value) {
			array_push($dir_packed_name, $value['packed']);
			array_push($dir_module_name, $value['name']);
			$packed_id = 0;
			if(!in_array($value['packed'], $db_packed_name))
			{
				$this->db->insertData( 'packed', array( 
					'packed_name' => $value['packed'],
					'packed_sort' => '0'
					));
				
			}	
			$res = mysqli_fetch_assoc($this->db->getColWhere( 'packed_id', 'packed', array( 'packed_name' => $value['packed'] )));
				$packed_id = $res['packed_id'];
			

			if(!in_array($value['name'], $db_module_name))
			{
				$this->db->insertData( 'module', array( 
					'module_name' => $value['name'],
					'module_version' => $value['version'],
					'permission_id' => '1',
					'packed_id' => $packed_id,
					'module_status' => $value['readonly'] == '1' ? '1' : '0', 
					'module_sort' => '0', 
					'module_template' => $value['url'], 
					'module_readonly' => $value['readonly'], 
					));
			}else
			{
				$this->db->updateData( 'module', array( 
					'module_version' => $value['version'],
					'packed_id' => $packed_id, 
					'module_template' => $value['url'], 
					'module_readonly' => $value['readonly'], 
					), array( 'module_name' => $value['name'] ));
			}
		}//End Foreach
		//print_r(array_unique($dir_packed)).'   ';
		
		foreach ($db_packed_name as $value) {
			if(!in_array($value, array_unique($dir_packed_name))){
				$this->db->deleteData( 'packed', array( 'packed_name' => $value ) );
			}
		}
		
		foreach ($db_module_name as $value) {
			if(!in_array($value, array_unique($dir_module_name))){
				$this->db->deleteData( 'module', array( 'module_name' => $value ) );
			}
		}
	}
	function merge_script(){
		$this->script->generate_script();
	}
	

	function savechangemodule(){
		
	}

}
?>