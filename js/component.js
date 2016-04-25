const BASE_URL = window.location.origin + '/tma/';
const SERVICE_SERVER = BASE_URL + 'service.php';
const TEMPLATE_FILE = 'template.html';
const PACKED_DIR = 'install/';

app . service ( 'config', function(){
	this . prepare = function( method, url, paramArray, contentType ){

		var req = {
		 method : method,
		 url : url,
		 
		 headers: {'Content-Type': contentType}
		};
		var param_name = 'params';
		if( method == 'POST' )
		{
			param_name = 'data';
		}

		req[param_name] = {};
		for(var i = 0; i < paramArray . length; i++){
			if( i == 0 )
			{
				req[param_name]['action'] = paramArray[0];
			}else{
				req[param_name]['p'+i] = paramArray[i];
			}
		}
		return req;
	}
});


app . filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});