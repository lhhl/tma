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