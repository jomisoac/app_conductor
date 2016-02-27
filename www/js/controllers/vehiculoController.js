app.controller('VehiculoCtrl',function($scope,VehiculoService,$rootScope,$ionicPopup,$location,$filter,$ionicLoading){
  $scope.$on('$ionicView.enter',function(){
    var informacionVehiculo = false;
    $scope.date = new Date();
  });

    $ionicLoading.show();
    
    $scope.vehiculo = {};

  VehiculoService.getById($rootScope.placa).then(
    function(respuesta){
      console.log(respuesta.data);
      if(respuesta.data != "" || respuesta.data != null){
        informacionVehiculo = true;
        $scope.vehiculo = respuesta.data;
        $scope.vehiculo.fecha_soat = new Date(respuesta.data.fecha_soat);
        $scope.vehiculo.fecha_tecnomecanica = new Date(respuesta.data.fecha_tecnomecanica);
          $ionicLoading.hide();
      }else{
          $scope.vehiculo.conductor_id = $rootScope.placa;
      }
    }
    ,function(error){
      console.log(error);
        $ionicLoading.hide();
        $scope.vehiculo.conductor_id = $rootScope.placa;
    });

  $scope.registarActualizar = function(){
      $ionicLoading.show();
    if(informacionVehiculo){
      VehiculoService.actualizar($scope.vehiculo).then(
        function(respuesta){
          if(respuesta.statusText == "OK"){
              $ionicLoading.hide();
              mostarAlert("Actualizacion del Vehiculo","Vehiculo actualizado correctamente.");
          }
        },function(error){
            $ionicLoading.hide();
          console.log(error);
        });
    }
  }
  
  function mostarAlert(titulo,contenido){
    var alertPopup = $ionicPopup.alert({
      title: titulo,
      template: contenido
    });
    alertPopup.then(function (res) {
    });
  }
    
    
})
