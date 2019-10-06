'use strict';
  app.controller('loginController',['$scope','$http','$location', function($scope, $http,$location) {

$scope.checkUser = function () {
 $scope.form = [];

 $http.post('/check-user', angular.toJson($scope.form))
 .then(function(res) {
   if(res.data.ok === true){
    window.location = "/home";
   }else{
    window.location = "/index";
   }
 })
    // $http.post('/check-user', angular.toJson($scope.form))
    // .then(function(res){
    // //código en caso de éxito
    // //$location.path("/home");
    // console.log("Petición terminada. La respuesta es: ", angular.fromJson(res.data));
    // })
    // .error(function () {
    //     deferred.reject();
    //     $location.path("/home");
    //  });
  
  }
}]);