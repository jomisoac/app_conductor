app.controller('GremioCtrl',function($scope, $rootScope,ConductorService,$ionicLoading){
    $ionicLoading.show();
    $scope.listaConductores = [];
    

  ConductorService.getAll($rootScope.gremio).then(
    function(respuesta){
      $scope.listaConductores = respuesta.data;
        $ionicLoading.hide();
    },function(error){
      console.log(error);
        $ionicLoading.hide();
    }
  );
})
