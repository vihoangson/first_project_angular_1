app.config(configBlocks).run(runBlocks).controller("myController",function(){
	//console.log($http.defaults.route);
});
function configBlocks() {
}

function runBlocks($rootScope,$state) {
	// setup defaults: $rootScope
    $rootScope.$state = $state;
}
