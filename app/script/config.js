app.config(configBlocks).run(runBlocks).controller("myController",function(){
	//console.log($http.defaults.route);
});
function configBlocks() {
}

function runBlocks($rootScope,$cacheFactory,$http,$state) {

	// setup defaults: $rootScope
    $rootScope.$state = $state;
	$http.defaults.$cacheFactory = $cacheFactory;
}

app.filter("generateImages",generateImages);
function generateImages(){
    return function(value) {
    	if(JSON.parse(value)[0]){
    		return "<img src='/images/"+JSON.parse(value)[0]+"' class='generateImages'>";
    	}else{
    		return "";
    	}
    }
}
