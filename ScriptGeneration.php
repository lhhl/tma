<?php
define( 'CUSTOM_PACKED_DIR', 'install' );
define( 'SYSTEM_HELPER_DIR', 'helper' );
define( 'MAIN_JS', '/main.js' );
define( 'INIT_JS', 'js/init.js' );
define( 'MODULE_INFO', '/module.info' );

define( 'APP_CONTROLLER', 'js/controller.js' );
/**
* 
*/
class ScriptGeneration
{
	function get_list_file( $directory = '.' ){

		$arr = array();
	    if ($directory != '.')
	    {
	        $directory = rtrim($directory, '/') . '/';
	    }

	    if ($handle = opendir($directory))
	    {
	        while (false !== ($file = readdir($handle)))
	        {
	            if ($file != '.' && $file != '..')
	            {
	                array_push($arr, $file);
	            }
	        }
	        
	        closedir($handle);
	    }
	    return $arr;
	}

	function get_list_dir( $path = '.' ){

		$path = rtrim($path, '/') . '/';
	    

		$dirs = array_filter(glob($path.'*'), 'is_dir');
		return $dirs;
	}

	//=================Custom========================


	function get_custom_modules(){
		$module_arr = array();
		$packed_arr = $this->get_list_dir(CUSTOM_PACKED_DIR);
		foreach ($packed_arr as $packed) {
			$module_in_packed = $this->get_list_dir($packed);
			foreach ($module_in_packed as $module) {
				array_push($module_arr, $module);
			}
		}
		return $module_arr;
	}

	function merge_script_custom(){
		$module_arr = $this->get_custom_modules();
		$data = '';
		foreach ($module_arr as $module) {
			
			$data .= $this->read_file_get_data($module . MAIN_JS);
			
		}
		return $data;
	}

	//====================Custom====================

	//====================System====================


	function merge_script_system(){
		$helper_arr = $this->get_list_dir(SYSTEM_HELPER_DIR);
		$data = '';
		foreach ($helper_arr as $helper) {
			
			$data .= $this->read_file_get_data($helper . MAIN_JS);
			
		}
		return $data;
	}


	function get_content_file_info()
	{
		$module_arr = $this->get_custom_modules();
		$data = array();
		foreach ($module_arr as $module) {
			$content = $this->read_file_get_data($module . MODULE_INFO, true);
			if(trim($content) != '')
			$data[$module] = $content;
		}
		return $data;
	}


	//====================System====================

	function generate_script(){
		$sys_script = '';
		
		$sys_script = $this->read_file_get_data(INIT_JS);
		
		$script_data = $this->add_wrap_comment('SYSTEM', $this->merge_script_system(), '=') . $sys_script . $this->merge_script_custom();

		

		$fp = @fopen(APP_CONTROLLER, "w+");
		$d = fwrite($fp, $script_data);
		fclose($fp);

		
		//echo 'Xong';
	}

	function read_file_get_data($filename, $not_wrap=false){
		if(file_exists($filename))
			{
				$fp = @fopen($filename, "r");

				if (!$fp) {
					echo 'Mở file không thành công';
					exit();
				}
					

				$d = fread($fp, filesize($filename));
				if($not_wrap)
			    {
			    	return $d;
			    }
				$d = "try {\n\n\t" . trim($d, "\n")  . "\n\n}catch(err){\n\t alert( 'Error from " . $filename . " : ' + err.message );\n}";
			    fclose($fp);


			    	return $this->add_wrap_comment($filename, $d, $char = '-');
			    
			}
	}

	function add_wrap_comment($title = '', $data, $char = '-')
	{
		return "//" . str_repeat($char, 12) . "BEGIN " . $title . str_repeat($char, 12) . "\n\n" . 
					$data . "\n\n" . 
					"//" . str_repeat($char, 12) . "END " . $title . str_repeat($char, 12) . "\n\n"
		;
	}
}


//echo merge_script_system();
//$sc = new ScriptGeneration();
// $s=new ScriptGeneration();
// $s->generate_script();
//$sc->generate_script();
//get_list_file('install/management');


?>