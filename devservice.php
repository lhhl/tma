<?php 
require( 'setting.php' );
require( CLASS_SERVER_DIR . 'ScriptGeneration.php' );
require( CLASS_SERVER_DIR . 'DBLogic.php' );
require( CLASS_SERVER_DIR . 'DevServiceRegister.php' );

if(isset($_GET['action'])){
	$service = new DevServiceRegister();

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
}else
{
	$post_data = file_get_contents('php://input');
	$request = json_decode($post_data, true);
	$str_para = $request['action'] . '(';
	array_shift($request);
	foreach ($request as $key => $value) {
		if($key == "p1")
			$str_para .= '$request["' . $key . '"]';
		else
			$str_para .= ', $request["' . $key . '"]';
	}
	$str_para .= ');';
	//echo $str_para;
	$service = new DevServiceRegister();
	$data = eval( 'return $service->' . $str_para);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode(array("result"=>$data ), JSON_UNESCAPED_UNICODE);
}

?>