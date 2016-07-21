app.config(configBlocks).run().controller("myController",function(){});

function configBlocks($stateProvider) {
	$stateProvider
	.state("permission", {
		url: "/permission",
		templateUrl: "view/main.html",
		controller: "permissionController as ctrl",
		abstract: true
	})
	.state("permission.index", {
		url: "",
		templateUrl: "view/kim.html"
	})
	.state("permission.create", {
		url: "/create",
		views:{
			"":{
				templateUrl: "view/permission.create.html"
			}
		},
	})
	;
}
app.controller("permissionController",permissionController);
function permissionController($scope){
	$scope.contentpage = "Kitten 123";
}