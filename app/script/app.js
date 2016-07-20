var app = angular.module("booker",[]);

app.run(function ($rootScope){
  $rootScope.title="Trang sách";
})

app.controller("myController",function($scope){
  $scope.item = "Item contract";
})