app.controller('VehiculoCtrl',function($scope,VehiculoService,$rootScope,$ionicPopup,$location,$filter,$ionicLoading,$window,$filter){
  
  var informacionVehiculo;
    
  $scope.$on('$ionicView.enter',function(){
    $scope.date = new Date();
    $ionicLoading.show();
    $scope.vehiculo = {};
      
    VehiculoService.getById($window.localStorage['idConductor']).then(
        function(respuesta){
            console.log(respuesta);
            if(respuesta.data){
                informacionVehiculo = true;
                $scope.vehiculo = respuesta.data;
                $scope.vehiculo.fecha_soat = new Date(respuesta.data.fecha_soat);
                $scope.vehiculo.fecha_tecnomecanica = new Date(respuesta.data.fecha_tecnomecanica);
                $ionicLoading.hide();
            }else{
                informacionVehiculo = false;
            }
        } ,function(error){
            $ionicLoading.hide();
            mostarAlert("Error", "Error al registrar intente mas tarde");
        }
    );
  });
    
  $scope.registarActualizar = function(){
      $ionicLoading.show();
      VehiculoService.registrar($scope.vehiculo).then(
          function(respuesta){
              if(respuesta.statusText == "OK"){
                  $ionicLoading.hide();
                  mostarAlert("Registro del Vehiculo","Vehiculo registrado correctamente.");
              }
          },function(error){
              $ionicLoading.hide();
              mostarAlert("Registro del Vehiculo","Error al registrar la información.");
          }
      );
  }
  
  $scope.registarActualizarDocumentacion = function(){
      var vehiculoModificado = $scope.vehiculo;
      $ionicLoading.show();
      vehiculoModificado.fecha_soat = new Date(vehiculoModificado.fecha_soat);
      vehiculoModificado.fecha_tecnomecanica = new Date(vehiculoModificado.fecha_tecnomecanica);
      console.log(vehiculoModificado);
      VehiculoService.registrar(vehiculoModificado).then(
          function(respuesta){
              if(respuesta.statusText == "OK"){
                  $ionicLoading.hide();
                  mostarAlert("Registro del Vehiculo","Vehiculo registrado correctamente.");
              }
          },function(error){
              $ionicLoading.hide();
              mostarAlert("Registro del documentación","Error al registrar la información.");
          }
      );
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
