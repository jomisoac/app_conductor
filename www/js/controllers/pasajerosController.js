app.controller('PasajerosCtrl',function($scope,$location,$rootScope,$ionicLoading,$rootScope,$window,PasajerosService,NotificacionService){
    
    $scope.$on('$ionicView.enter',function(){
        $scope.mostrarAdvertencia = false;
        $ionicLoading.show();
        $scope.listaPasajeros = [];
        
        PasajerosService.getAll($window.localStorage['idConductor']).then(
            function(respuesta){
                $scope.listaPasajeros = respuesta.data;
                $rootScope.listaPasajeros = $scope.listaPasajeros;
                
                if($scope.listaPasajeros.length == 0)
                    $scope.mostrarAdvertencia = true;
                else
                    $scope.mostrarAdvertencia = false;
                $ionicLoading.hide();
            },function(error){
                console.log(error);
                $ionicLoading.hide();
            }
        );
    });
    
    $scope.volver = function(){
        $location.path("app/home");
    }
    
    $scope.recogerPasajeros = function(pasajero){
        $rootScope.infoPasajeroEncomienda = pasajero;
        $rootScope.bandera = "pasajero";
        NotificacionService.EnviarNotificacionPasajero(pasajero.identificacion).then(
            function(respuesta){
                console.log(respuesta);
            },function(error){
                console.log(error);
            }
        );
        $location.path("ubicacion-pasajeros");
    }

})
