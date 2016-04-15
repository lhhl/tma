app . controller('alert_helper', ['$scope','$rootScope', function( $scope , $rootScope ){
	$rootScope . $on( 'showalert', function( event, arg ){alert('a');
		$scope . alert_title = arg.title;
		$scope . alert_content = arg.content;
		$scope . alert_color = arg.color;

		$scope . alert_status = true;
	});

	
}]);