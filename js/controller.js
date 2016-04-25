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

	app . controller( 'my_app_controller', [ '$rootScope', '$scope', '$http', 'config', '$compile',  function(  $rootScope, $scope, $http, config, $compile ){		
	//--------------------
	$scope . main_load = 'main_load.html';
	//--------------------

	//---------------------
	var conf = config.prepare( 'GET', SERVICE_SERVER, ['getpackedmodule', '1'], undefined );
	$http( conf ) . then( function( response ){
		$scope . packed = response . data . result;
		$scope . get_content( 'configuration/update', 'Cập nhật' );

	});
	//-------------------
	$scope . closeItemTab = function(event){
		//alert(angular . element(event.currentTarget) .parents('a') . attr('href'));
		angular . element(event.currentTarget) . parents('li') .remove();
		var id_content = angular . element(event.currentTarget) .parents('a') . attr('href');
		angular . element(id_content) . remove();
		angular . element( '#title-tab li' ) . last() . addClass( 'active' );
		id_content = angular . element( '#title-tab li' ) . last() . children() . attr('href');
		angular . element( '#content-tab ' + id_content ) . addClass( ' in active' );
		//alert(angular . element( '#content-tab ' + id_content ) . html());
	};

	//--------------------
	$scope . getmachinename = function( temp_url ){
		var arr = temp_url . split('/');
		return arr[1];
	};

	//--------------------
	var i = 0;
	$scope . get_content = function( temp_url, name ){
		//==============Remove active=================
		angular . element( '#title-tab li' ) . removeClass( 'active' );
		angular . element( '#content-tab div' ) . removeClass( 'in active' );

		//==============Load Item===================
		
		var arr = temp_url . split('/');

		var template_file = "'" + PACKED_DIR + temp_url + '/' + TEMPLATE_FILE + "'";
		var title = '<li class="active"><a data-toggle="tab" href="#' + arr[1] + i + '">' + name + '<span class="glyphicon glyphicon-remove" ng-click="closeItemTab($event)"></span></a></li>';
		var content = '<div id="' + arr[1]  + i + '" class="tab-pane fade in active"><h3>' + name + '</h3><div ng-include="' + template_file + '"></div></div>';
		

		var comp = $compile(title)($scope);
		angular . element( '#title-tab' ) . append( comp );

		comp = $compile(content)($scope);
		angular . element( '#content-tab' ) . append( comp );
		//$scope . content = PACKED_DIR + temp_url + '/' + TEMPLATE_FILE;
		i++;

		
	};
	//--------------------

}]);

}catch(err){
	 alert( 'Error from js/init.js : ' + err.message );
}

//------------END js/init.js------------

//------------BEGIN install/configuration/setting/main.js------------

try {

	app . controller('setting_controller', ['$rootScope', '$scope', '$http', 'config',  function( $rootScope, $scope, $http, config ){
	
	
}]);

}catch(err){
	 alert( 'Error from install/configuration/setting/main.js : ' + err.message );
}

//------------END install/configuration/setting/main.js------------

//------------BEGIN install/configuration/update/main.js------------

try {

	app . controller('update_controller', ['$rootScope', '$scope', '$http', 'config',  function( $rootScope, $scope, $http, config ){
	
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

		var ex_html = '<input class = "ckbox_display" idmod="'+ id +'" type="checkbox" '+ val +'>';
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

	var conf = config.prepare( 'GET', SERVICE_SERVER, ['getpackedmodule'], undefined );
	$http( conf ) . then( function( response ){
		$scope . update_packed = response . data . result;
	});

	
	conf = config.prepare( 'GET', SERVICE_SERVER, ['getPermission'], undefined );
	$http( conf ) . then( function( response ){
		$scope . update_permission = response . data . result;
	});

	
	$scope . refresh_code = function(){

		conf = config.prepare( 'GET', SERVICE_SERVER, ['merge_script'], undefined );
		$http( conf ) . then( function( response ){
			location.reload();
		});
		
	}

	$scope . refresh_module = function(){
		conf = config.prepare( 'GET', SERVICE_SERVER, ['getpackedmodule'], undefined );
		$http( conf ) . then( function( response ){
			$scope . update_packed = response . data . result;
		});
	}

	$scope . save_change = function(){
		var arr = [];
		angular . element( '.ckbox_display:checked' ) . each( function(){
			arr.push( angular . element(this) . attr('idmod') );
		});
		
		conf = config.prepare( 'POST', SERVICE_SERVER, ['savechangemodule', arr], 'application/json' );
		alert(JSON.stringify(conf));
		$http( conf ) . then( function( response ){
			alert(JSON.stringify(response . data));
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

