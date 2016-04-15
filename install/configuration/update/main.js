app . controller('update_controller', ['$rootScope', '$scope', '$http',  function( $rootScope, $scope, $http ){
	
	$scope . update_export_checkbox = function( checked, disabled, id )
	{
		var val = '';
		if( checked == 1 )
		{
			val += 'checked=checked ';
		}

		if( disabled == 1 )
		{
			val += 'disabled=disabled';
		}

		var ex_html = '<input value="'+ id +'" type="checkbox" '+ val +'>';
		return ex_html;
	}

	$scope . selectOption = function( obj, id){
		for( i=0;i<obj.length;i++ ){
			if(obj[i].permission_id == id)
			{
				return obj[i];
			}
		}
	}

	$http({
		 method : 'GET',
		 url : 'http://localhost/SMA/service.php',
		 params : { action : 'getpackedmodule' },
		 headers: {'Content-Type': undefined}
	}) . then( function(response){
		$scope . update_packed =  response . data . result;
	});

	$http({
		 method : 'GET',
		 url : 'http://localhost/SMA/service.php',
		 params : { action : 'getPermission' },
		 headers: {'Content-Type': undefined}
	}) . then( function(response){
		$scope . update_permission =  response . data . result;
	});


	$scope . refresh_code = function(){
		$http({
			 method : 'GET',
			 url : 'http://localhost/SMA/service.php',
			 params : { action : 'merge_script' },
			 headers: {'Content-Type': undefined}
		}) . then( function(response){
			location.reload();
		});
	}

	$scope . refresh_module = function(){
			$http({
			 method : 'GET',
			 url : 'http://localhost/SMA/service.php',
			 params : { action : 'getpackedmodule' },
			 headers: {'Content-Type': undefined}
		}) . then( function(response){
			$scope . update_packed =  response . data . result;
		});
	} 

}]);