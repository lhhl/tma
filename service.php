<?php 


if(isset($_GET['action'])){
	require('ScriptGeneration.php');
	require('DBLogic.php');
	require('ServiceRegister.php');

	$service = new ServiceRegister();

	$query = $_SERVER['QUERY_STRING'];
	$arr_query_str = explode('&',$query);
	$para_str = '';
	$arr_para = array();
	array_shift($arr_query_str);
	foreach ($arr_query_str as $key => $value) {
		$arr = explode('=', $value);
		array_push($arr_para, $arr[1]);
	}
	$data = eval( 'return $service->' . $_GET['action'] . '($arr_para);');
	header('Content-type: application/json; charset=utf-8');
	echo json_encode(array("result"=>$data ), JSON_UNESCAPED_UNICODE);
}




?>