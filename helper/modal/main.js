app . controller('modal_helper', ['$scope','$rootScope', function( $scope, $rootScope ){
	$rootScope . $on( 'showmodal', function( event, arg ){
		$scope . modal_title = arg.title;
		$scope . modal_content = arg.content;
		$scope . modal_size = ( arg.size == 'small' ) ? 'modal-sm' : '' ;

		angular . element( '#myModal' ).modal({ backdrop : arg . option });
	});
}]);