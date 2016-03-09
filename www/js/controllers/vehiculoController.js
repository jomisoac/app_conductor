app.controller('VehiculoCtrl',function($scope,VehiculoService,$rootScope,$ionicPopup,$location,$filter,$ionicLoading,$window,$filter){
  
  var informacionVehiculo;
    
  $scope.$on('$ionicView.enter',function(){
    $scope.date = new Date();
    $ionicLoading.show();
    $scope.vehiculo = {};
    $scope.documentos = {};
      
    VehiculoService.getById($window.localStorage['idConductor']).then(
        function(respuesta){
            console.log(respuesta);
            if(respuesta.data){
                informacionVehiculo = true;
                $scope.vehiculo = respuesta.data;
                if(respuesta.data.fecha_soat)
                    $scope.vehiculo.fecha_soat = new Date(respuesta.data.fecha_soat);
                if(respuesta.data.fecha_tecnomecanica)
                    $scope.vehiculo.fecha_tecnomecanica = new Date(respuesta.data.fecha_tecnomecanica);
                $ionicLoading.hide();
            }else{
                informacionVehiculo = false;
            }
        } ,function(error){
            $ionicLoading.hide();
            mostarAlert("Error", "Error al consultar la información, intente más tarde");
        }
    );
  });
    
  $scope.registarActualizar = function(){
      console.log(informacionVehiculo);
      $ionicLoading.show();
      if(informacionVehiculo){
          VehiculoService.actualizar($scope.vehiculo).then(
              function(respuesta){
                  if(respuesta.statusText == "OK"){
                      $ionicLoading.hide();
                      mostarAlert("Registro del Vehiculo","Vehiculo registrado correctamente.");
                  }
              },function(error){
                  $ionicLoading.hide();
                  console.log(error.data);
                  mostarAlert("Registro del Vehiculo","Error al registrar el vehiculo, intenten más tarde");
              }
          );
      }else{
          VehiculoService.registrar($scope.vehiculo).then(
              function(respuesta){
                  if(respuesta.statusText == "OK"){
                      $ionicLoading.hide();
                      mostarAlert("Registro del Vehiculo","Vehiculo registrado correctamente.");
                  }
              },function(error){
                  $ionicLoading.hide();
                  console.log(error.data);
                  mostarAlert("Registro del Vehiculo","Error al registrar el vehiculo, intenten más tarde");
              }
          );
      }
  }
  
  $scope.registarActualizarDocumentacion = function(){
      $ionicLoading.show();
      $scope.documentos.vehiculo_id = $scope.vehiculo.id;
      $scope.documentos.fecha_soat = $filter('date')($scope.documentos.fecha_soat, "yyyy-MM-dd");
      $scope.documentos.fecha_tecnomecanica = $filter('date')($scope.documentos.fecha_tecnomecanica, "yyyy-MM-dd");
      console.log($scope.documentos.fecha_soat+"  "+$scope.documentos.fecha_tecnomecanica);
      VehiculoService.actualizarDocumentacion($scope.documentos).then(
        function(respuesta){
            $ionicLoading.hide();
            mostarAlert("Actualizar Docuementación","Documentos actualizados correctamente");
        },function(error){
            $ionicLoading.hide();
            mostarAlert("Actualizar Docuementación","Error al actualizar la documentacion, intente más tarde");
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
