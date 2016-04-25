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