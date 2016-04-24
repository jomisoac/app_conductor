app.controller('EncomiendaCtrl',function($scope,$location,EncomiendaService,$rootScope,$ionicLoading,NotificacionService){
    
    
    $scope.$on('$ionicView.enter',function(){
        $scope.mostrarAdvertencia = false;
        $ionicLoading.show();
        $scope.listaEncomiendas = [];
        $scope.encomienda = {};
        
        EncomiendaService.getAll($rootScope.placa).then(
            function(respuesta){
                $scope.listaEncomiendas = respuesta.data;
                if($scope.listaEncomiendas.length == 0)
                    $scope.mostrarAdvertencia = true;
                else
                    $scope.mostrarAdvertencia = false;
                    $ionicLoading.hide();
                },function(error){
                    $ionicLoading.hide();
                    console.log(error);
                }
        );
    });
    
    
    $scope.recogerEncomienda = function(encomienda){
        $rootScope.infoPasajeroEncomienda = encomienda;
        $rootScope.bandera = "encomienda";
        
        var data = {
            "identificacion" : encomienda.ide_remitente
        };
        
        NotificacionService.EnviarNotificacionGiro(data).then(
            function(respuesta){
                console.log(respuesta)
            },function(error){
                console.log(error);
            }
        );
        
        $location.path("ubicacion-pasajeros");
    }
    
    $scope.volver = function(){
        $location.path("app/home");
    }
})
