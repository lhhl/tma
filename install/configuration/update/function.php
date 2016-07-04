<?php
	function savechangemodule( $checkbox_arr ){
		$this->updateData( 'module', array(  
				'module_status' => 0
			));
		
		return 'a';
	}
?>