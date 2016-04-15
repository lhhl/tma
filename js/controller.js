//============BEGIN SYSTEM============

//------------BEGIN helper/alert/main.js------------

try {

	app . controller('alert_helper', ['$scope','$rootScope', function( $scope , $rootScope ){
	$rootScope . $on( 'showalert', function( event, arg ){alert('a');
		$scope . alert_title = arg.title;
		$scope . alert_content = arg.content;
		$scope . alert_color = arg.color;

		$scope . alert_status = true;
	});

	
}]);

}catch(err){
	 alert( 'Error from helper/alert/main.js : ' + err.message );
}

//------------END helper/alert/main.js------------

//------------BEGIN helper/modal/main.js------------

try {

	app . controller('modal_helper', ['$scope','$rootScope', function( $scope, $rootScope ){
	$rootScope . $on( 'showmodal', function( event, arg ){
		$scope . modal_title = arg.title;
		$scope . modal_content = arg.content;
		$scope . modal_size = ( arg.size == 'small' ) ? 'modal-sm' : '' ;

		angular . element( '#myModal' ).modal({ backdrop : arg . option });
	});
}]);

}catch(err){
	 alert( 'Error from helper/modal/main.js : ' + err.message );
}

//------------END helper/modal/main.js------------



//============END SYSTEM============

//------------BEGIN js/init.js------------

try {

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

}catch(err){
	 alert( 'Error from js/init.js : ' + err.message );
}

//------------END js/init.js------------

//------------BEGIN install/configuration/update/main.js------------

try {

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

}catch(err){
	 alert( 'Error from install/configuration/update/main.js : ' + err.message );
}

//------------END install/configuration/update/main.js------------

//------------BEGIN install/management/bills/main.js------------

try {

	app . controller('bills', ['$scope','$rootScope', function($scope, $rootScope){
	$scope . name = 'bills';
	// var html = '<div style="background-color:black; width:500px; height:200px"></div>';
	// $rootScope . $broadcast('showmodal', { 
	// 	title : '<h2>Greeting</h2>',
	// 	content : html,
	// 	//size : 'small',
	// 	option : false
	// });

	// $rootScope . $broadcast('showalert', {
	// 	title : 'Chú ý!',
	// 	content : 'Giao dịch của bạn đã thất bại!',
	// 	color : 'danger'
	// });

}]);

}catch(err){
	 alert( 'Error from install/management/bills/main.js : ' + err.message );
}

//------------END install/management/bills/main.js------------

//------------BEGIN install/management/customers/main.js------------

try {

	app . controller( 'customers', function($scope){
	$scope . name = 'customers';
} );

}catch(err){
	 alert( 'Error from install/management/customers/main.js : ' + err.message );
}

//------------END install/management/customers/main.js------------

//------------BEGIN install/management/products/main.js------------

try {

	app . controller( 'products', function($scope){
	$scope . name = 'products';
} );

}catch(err){
	 alert( 'Error from install/management/products/main.js : ' + err.message );
}

//------------END install/management/products/main.js------------

