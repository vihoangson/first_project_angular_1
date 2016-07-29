app.config(configBlocks).run(runBlocks).controller("myController",function(){
	//console.log($http.defaults.route);
});
function configBlocks($compileProvider, $httpProvider, $urlRouterProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter= function($http,config,jwHelper){

    }
}

function runBlocks($rootScope,$cacheFactory,$http,$state) {

	// setup defaults: $rootScope
    $rootScope.$state = $state;
	$http.defaults.$cacheFactory = $cacheFactory;
}

