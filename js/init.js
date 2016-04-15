app . controller( 'my_app_controller', [ '$rootScope', '$scope', '$http' , function(  $rootScope, $scope, $http ){		
	//--------------------
	$scope . main_load = 'main_load.html';
	//--------------------

	$http({
		 method : 'GET',
		 url : 'http://localhost/SMA/service.php',
		 params : { action : 'getpackedmodule', p1 : '1' },
		 headers: {'Content-Type': undefined}
	}) . then( function(response){
		$scope . packed =  response . data . result;
	});

	$scope . get_content = function( arg ){
		$scope . content = 'install/' + arg + '/main.html';
	};

	
		
}]);

app . factory('get_data', function( $http ){
	var a = '';
    $http . get( 'install/packed.json' ) . then( function( response ){
		a = response . data . packed;
	});
	return a;
});